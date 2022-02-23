import React from "react"
import "components/InterviewerListItem.scss"
import classNames from "classnames"

export default function InterviewerListItem(props) {

  const { id, name, avatar, selected, setInterviewer } = props

  const interviewerClass = classNames("interviewers__item", {
    "interviewers__item--selected": selected
  })

  return (
    <li className={interviewerClass} onClick={() => setInterviewer(id)}>
      <img src={avatar} alt={name} className="interviewers__item-image" />
      {selected ? name : ''}
    </li>
  )
}