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
