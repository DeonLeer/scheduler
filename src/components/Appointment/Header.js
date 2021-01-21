import React from "react";

import classnames from "classnames";

export default function Header(props) {

  return (
    <header className="appointment__time">
      <h4 className="text--semi-bold">{props.time}</h4>
      <hr className="appointment-separator"></hr>
    </header>
  )

}