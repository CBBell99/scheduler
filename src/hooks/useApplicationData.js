
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

  // function updateSpots(id, increment = true) {
  //   let day = state.days.filter((day) =>
  //     day.appointments.includes(id)
  //   )[0]
  //   increment ? (day.spots += 1) : (day.spots -= 1)
  //   const days = [...state.days]
  //   const dayIndex = day.id - 1
  //   days[dayIndex] = day

  //   return days
  // }
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

    // const days = updateSpots(id, false)
    return axios.put(`/api/appointments/${id}`, { interview: { ...interview } })

      .then(() => {
        // const days = updateSpots(id, false)
        setState({ ...state, appointments, days })
      })
  }

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
        // const days = updateSpots(id, true)
        setState({ ...state, appointments, days })
      })

  }
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