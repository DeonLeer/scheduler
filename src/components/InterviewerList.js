import React from "react";

import "components/InterviewerList.scss"

import classnames from "classnames";

import InterviewerListItem from "./InterviewerListItem"

export default function InterviewerList(props) {

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
              setInterviewer={() => props.setInterviewer(interviewer.id)}
            />
          )
        })}
      </div>
    </div>
  )

}