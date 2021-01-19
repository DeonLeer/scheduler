import React from "react";

import "components/DayList.scss";

import classnames from "classnames";

import DayListItem from "./DayListItem";



export default function DayList(props) {


  return (
    <ul>
      {props.days.map(day => {
        return(
          <DayListItem
            spots={day.spots}
            selected={day.name===props.day}
            setDay={() => props.setDay(day.name)}/>
        )
      })}
    </ul>
  )
}