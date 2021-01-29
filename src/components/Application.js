import React, { useState, useEffect } from "react";
import axios from "axios";

import "components/Application.scss";

import DayList from "./DayList"

import Appointment from "./Appointment/index"

import { getAppointmentsForDay, getInterviewersForDay, getInterview } from "../Helpers/selectors"

import useApplicationData from "hooks/useApplicationData";



export default function Application(props) {

  const {state, setState, setDay, bookInterview, deleteInterview} = useApplicationData();


  let dailyAppointments = [];
  let dailyInterviewers = [];

  dailyAppointments = getAppointmentsForDay(state, state.day);
  dailyInterviewers = getInterviewersForDay(state, state.day);

  const mappedAppointments = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    const interviewerForDay = getInterviewersForDay(state, state.day);

    return (
      <Appointment key={appointment.id} id={appointment.id} time={appointment.time} interview={interview} interviewers={interviewerForDay} bookInterview={bookInterview} deleteInterview={deleteInterview}/> 
    )
  });


  useEffect(() => {
    const urls = [`http://localhost:8001/api/days`, `http://localhost:8001/api/appointments`, `http://localhost:8001/api/interviewers`]

    Promise.all([
      axios.get(urls[0]),
      axios.get(urls[1]),
      axios.get(urls[2])
    ])
    .then((all) => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }))
    })
      
  })


  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            day={state.day}
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {mappedAppointments} <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
