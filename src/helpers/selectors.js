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



export function getInterview(state, interview) {
  if (!interview) {
    return null
  };
  let interviewerID = interview.interviewer
  let apptInterviewer = state.interviewers[interviewerID]
  return { ...interview, interviewer: apptInterviewer }

}

export function getInterviewersForDay(state, day) {


  let dayInterviewers = [];
  state.days.forEach(item => {
    if (item.name === day) {
      dayInterviewers.push(...item.interviewers)

    }
  })

  return dayInterviewers.map(int => state.interviewers[int]);
}


