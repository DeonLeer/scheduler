import React from "react"
import "components/Appointment/styles.scss"
import Header from "./Header"
import Show from "./Show"
import Empty from "./Empty"

export default function Appointments(props) {

  let appointment;
  props.interview ? appointment = (
    <Show 
      student={props.interview.student}
      interviewer={props.interview.interviewer}
    /> 
  ) : appointment = <Empty onAdd = {props.onAdd} />;

  return (
    <article className="appointment">
      <Header time={props.time}/>
      {appointment}
      
    </article>
  )
}