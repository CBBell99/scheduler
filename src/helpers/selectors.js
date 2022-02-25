export function getAppointmentsForDay(state, day) {
  let dayAppointments = [];
  state.days.forEach(item => {
    if (item.name === day) {
      item.appointments.forEach(id => {
        dayAppointments.push(state.appointments[id])
      })
    }
  })
  return dayAppointments;
}