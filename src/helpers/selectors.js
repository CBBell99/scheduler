

//retrieve appointments for selected day
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


//retrieve interview for selected day
export function getInterview(state, interview) {
  if (!interview) {
    return null
  };
  let interviewerID = interview.interviewer
  let apptInterviewer = state.interviewers[interviewerID]
  return { ...interview, interviewer: apptInterviewer }

}

//get available interviewers for the day
export function getInterviewersForDay(state, day) {


  let dayInterviewers = [];
  state.days.forEach(item => {
    if (item.name === day) {
      dayInterviewers.push(...item.interviewers)

    }
  })

  return dayInterviewers.map(int => state.interviewers[int]);
}


