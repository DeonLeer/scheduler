import React from "react"
import "components/Appointment/styles.scss"
import Header from "./Header"
import Show from "./Show"
import Empty from "./Empty"
import useVisualMode from "../../hooks/useVisualMode";
import Form from "./Form"
import Status from "./Status"
import Confirm from "./Confirm"
import Error from "./Error"

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVING = "ERROR_SAVING";
const ERROR_DELETING = "ERROR_DELETING";


export default function Appointments(props) {



  const save = function(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING, true);
    props.bookInterview(props.id, interview).then(() => {
      console.log("index!")
      transition(SHOW)
    }).catch(() => transition(ERROR_SAVING, true))
  };

  const deleteInterview = function(id) {
    transition(DELETING, true)
    return props.deleteInterview(id).then(() => {
      transition(EMPTY)
    }).catch(() => transition(ERROR_DELETING, true))
  };

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  return (
    <article className="appointment" data-testid="appointment">
      <Header time={props.time}/>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SAVING && <Status message={SAVING} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          id={props.id}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode == CONFIRM && (
        <Confirm 
          message={CONFIRM}
          onCancel={() => back()}
          onConfirm={() => (deleteInterview(props.id))}
        />
      )}
      {mode === DELETING && <Status message={DELETING} />}
      {mode === CREATE && <Form interviewers={props.interviewers} onCancel={back} onSave={save}/>}
      {mode === EDIT && <Form interviewers={props.interviewers} onCancel={back} onSave={save} name={props.interview.student} interviewer={props.interview.interviewer.id}/>}
      {mode === ERROR_SAVING && <Error message={ERROR_SAVING} onClose={back}/>}
      {mode === ERROR_DELETING && <Error message={ERROR_DELETING} onClose={back}/>}
      
    </article>
  )
}