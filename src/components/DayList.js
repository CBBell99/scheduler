import React from "react";
import DayListItem from "./DayListItem";

function DayList(props) {
  const { days, day, setDay } = props

  const daysArray = days.map(day => {
    return <DayListItem key={day.id} name={day.name} spots={day.spots}
      selected={day.name === props.day} setDay={setDay} />
  })

  return (
    < ul >
      {daysArray}
    </ul >
  )

}

export default DayList;