export function getAppointmentsForDay(state, day) {
  let dayAppointments = [];
  // console.log(state.days)
  state.days.forEach(item => {
    if (item.name === day) {
      item.appointments.forEach(id => {
        dayAppointments.push(state.appointments[id])
      })
    }
  })
  return dayAppointments;
}

export function getInterview(state, interview) {
  if (!interview) {
    return null
  };
  let interviewerID = interview.interviewer
  let apptInterviewer = state.interviewers[interviewerID]
  // console.log('state!:', state.interviewers)
  // console.log('interview!:', interview.interviewer)
  return { ...interview, interviewer: apptInterviewer }

}


