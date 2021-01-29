import React from "react";

import "components/InterviewerList.scss"

import PropTypes from "prop-types"


import InterviewerListItem from "./InterviewerListItem"

function InterviewerList(props) {

  return (
    <div className="interviewers">
      <div className="interviewers__header">
        Interviewer
      </div>
      <div className="interviewers__list">
        {props.interviewers.map(interviewer => {
          return (
            <InterviewerListItem
              name={interviewer.name}
              avatar={interviewer.avatar}
              selected={interviewer.id===props.interviewer}
              setInterviewer={() => props.onChange(interviewer.id)}
            />
          )
        })}
      </div>
    </div>
  )
}

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};

export default InterviewerList