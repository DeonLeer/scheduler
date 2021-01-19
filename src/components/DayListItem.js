import React from "react";

import classnames from "classnames";



export default function DayListItem(props) {

  const DayListItemClass = classnames(

  )

  return (
    <li onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{props.spots}</h3>
    </li>
  );

}