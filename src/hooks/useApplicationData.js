
import { useState, useEffect } from 'react';
import axios from 'axios';


function useApplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });

  //  live updates spots available for each day
  const updateSpots = (state, day, appointmentsObj) => {

    const appointmentIdForDay = state.days.findIndex((item) => {
      return item.name === day;
    });

    const daysAppointments = state.days[appointmentIdForDay].appointments
    const availableAppointments = daysAppointments.filter(apt => !appointmentsObj[apt].interview)
    const spots = availableAppointments.length

    const newDayObj = {
      ...state.days[appointmentIdForDay],
      spots
    }

    const newDaysArr = [...state.days]

    newDaysArr[appointmentIdForDay] = newDayObj

    return newDaysArr
  };

  // books interview in api
  function bookInterview(id, interview) {

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    const days = updateSpots(state, state.day, appointments)

    return axios.put(`/api/appointments/${id}`, { interview: { ...interview } })

      .then(() => {
        setState({ ...state, appointments, days })
      })
  }

  //deletes interview from api
  function cancelInterview(id) {

    const appointment = {
      ...state.appointments[id],
      interview: null
    }

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    const days = updateSpots(state, state.day, appointments)

    return axios.delete(`/api/appointments/${id}`, { interview: id })
      .then(() => {
        setState({ ...state, appointments, days })
      })

  }

  //request from api for data
  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      const [days, appointments, interviewers] = all

      setState(prev => ({ ...prev, days: days.data, appointments: appointments.data, interviewers: interviewers.data }));

    })
  }, [])

  return { state, setDay, bookInterview, cancelInterview }
}



export default useApplicationData