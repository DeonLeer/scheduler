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

  const bookInterview = function(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    setState({
      ...state,
      appointments
    });

    return axios.put(`/api/appointments/${id}`, appointment)
    .then(() => {
      setState({
        ...state,
        appointments
      })
    })
  }

  const deleteInterview = function(id) {
    return axios.delete(`/api/appointments/${id}`)
    .then(() => {
      return setState(prev => {
        return { ...prev }
      })
    })
    .then(() => {
      return axios.get(`/api/days`)
    })
    .then((data) => {
      setState({
        ...state,
        days: data.data
      })
    })
  }

  return { state, setState, setDay, bookInterview, deleteInterview }
}