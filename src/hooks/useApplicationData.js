import { useState } from "react";

import axios from "axios";

export default function useApplicationData(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day })

  let dayNumber;
  if (state.day === "Monday") dayNumber = 0;
  if (state.day === "Tuesday") dayNumber = 1;
  if (state.day === "Wednesday") dayNumber = 2;
  if (state.day === "Thursday") dayNumber = 3;
  if (state.day === "Friday") dayNumber = 4;

  

  const bookInterview = function(id, interview) {

  

    let day = state.days[dayNumber]
    let spots = state.days[dayNumber].spots
    if (!state.appointments[id].interview) {
      spots--
    }
    day.spots = spots
    const days= [...state.days];
    days[dayNumber]= day;

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`http://localhost:8001/api/appointments/${id}`, appointment)
    .then(() => {

      setState({
        ...state,
        appointments,
        days
      })

    })
  }

  const deleteInterview = function(id) {

    const day = {
      ...state.days[dayNumber],
      spots: (state.days[dayNumber].spots + 1)
    }

    const days = [
      ...state.days,
    ]
    

    days[dayNumber] = day;

    console.log(state.days)
    console.log(state.appointments)

    
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios
      .delete(`http://localhost:8001/api/appointments/${id}`)
      .then(() => {

        setState(prev => ({...prev, days, appointments: appointments}))


      });
  }

  return { state, setState, setDay, bookInterview, deleteInterview }
}