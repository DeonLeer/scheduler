import React from "react";

import classnames from "classnames";

import "components/DayListItem.scss"

const formatSpots = function(spots) {
  if (spots === 0) return "no spots";
  if (spots === 1) return "1 spot";
  else return `${spots} spots`;
}

export default function DayListItem(props) {

  const DayListItemClass = classnames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": (props.spots === 0)
  });

  return (
    <li
      className={DayListItemClass}
      onClick={props.setDay}
      data-testid="day"
    >
      <h2>{props.name}</h2>
      <h3>{formatSpots(props.spots)} remaining</h3>
    </li>
  );

}