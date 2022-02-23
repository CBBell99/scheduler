import React from "react";
import "components/InterviewerList.scss";

export default function InterviewerList(props) {
  const { interviewers, setInterview, interviewer } = props;

  return (
    <section className="interviewers">
      <h4 className="interviewer__header text--light">Interviewer</h4>
      <ul className="interviewers__list"></ul>
    </section>
  );
}