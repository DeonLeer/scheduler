import React from "react";

import "components/DayList.scss";



import DayListItem from "./DayListItem";



export default function DayList(props) {


  return (
    <ul>
      {props.days.map(day => {
        return(
          <DayListItem
            name={day.name}
            key={day.id}
            spots={day.spots}
            selected={day.name===props.day}
            setDay={() => props.setDay(day.name)}/>
        )
      })}
    </ul>
  )
}