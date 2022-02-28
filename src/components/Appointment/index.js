// import Appointment from "components/Appointment";
import React from 'react'
import './styles.scss';
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form'
import useVisualMode from 'hooks/useVisualMode';
import Status from './Status';

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE"
const SAVING = "SAVING";

const interviewers = []

export default function Appointment(props) {
  const { id, time, interview, interviewersForDay, bookInterview } = props

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING)
    bookInterview(id, interview)
      .then(() => transition(SHOW))
  }

  return (
    <article className="appointment">
      <Header time={time} />

      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={interview.interviewer}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={interviewersForDay}
          onCancel={() => back()}
          onSave={(name, interviewer) => save(name, interviewer)}
        // onSave={onSave}
        />
      )}
      {mode === SAVING && <Status />}
    </article>
  )
}

// {interview ? <Show student={interview.student} interviewer={interview.interviewer} /> : <Empty />}