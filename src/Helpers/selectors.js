export function getAppointmentsForDay(state, day) {
  let appointmentsArray = []
  for (let checkDay of state.days) {
    if (checkDay.name === day) {
      for (let appointment of checkDay.appointments) {
        appointmentsArray.push(state.appointments[appointment])
      }
    }
  }
  return appointmentsArray
}

export function getInterviewersForDay(state, day) {
  let interviewersArray = []
  for (let checkDay of state.days) {
    if (checkDay.name === day) {
      for (let interviewer of checkDay.interviewers) {
        interviewersArray.push(state.interviewers[interviewer])
      }
    }
  }
  return interviewersArray;
}

export function getInterview(state, interview) {
  if (!interview || !state) {
    return null;
  } else {
    const interviewerID = interview.interviewer;
    const interviewer = state.interviewers[interviewerID];
    const student = interview.student;
    const result = {
    student,
    interviewer,
    };
    return result;
  }
}
