import React, { useState } from "react";

import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

export default function Form(props) {

  const [name, setName] = useState(props.name || "")
  const [interviewer, setInterviewer] = useState(props.interviewer || null)
  const [error, setError] = useState("");

  function reset() {
    setName("");
    setError("");
    setInterviewer(null);
  }

  function cancel() {
    reset();
    props.onCancel();
  }

  function validate() {
    if (!interviewer) {
      setError("Please select an interviewer")
    }
    if (name === "") {
      setError("Student name cannot be blank");
      return;
    }
    setError("");
    props.onSave(name, interviewer);
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appoinment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semibold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={name}
            onChange={event => { setName(event.target.value) }}
            data-testid="student-name-input"
          />
        </form>

        <section className="appoinment__validation">{error}</section>
        <InterviewerList
          interviewers={props.interviewers}
          value={interviewer}
          onChange={setInterviewer}
        />
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          {/* {!interviewer && <Button onClick={'pl'}confirm>Save</Button>} */}
          {/* {interviewer &&  */}
          <Button onClick={validate} confirm>
            Save
          </Button>}
        </section>
      </section>
    </main>
  )
}
