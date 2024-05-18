import React, { useContext, useEffect, useState } from "react";
import "./Results.css";

import { Link } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { makeGetAPICall } from "../../helpers/ApiHelpers";
import Swal from "sweetalert2";
import { MathJax } from "better-react-mathjax";
import sanitizeHtml from "sanitize-html";
import { getFromStorage, insertNewLine, sanitizeHtmlOption } from "../../assets";

function Results() {
  const { exam, setExam, user } = useContext(AppContext);

  const [selections, setSelections] = useState(null);

  const result = JSON.parse(getFromStorage("result"));

  const endExam = () => {
    localStorage.removeItem("result");
    localStorage.removeItem("exam");
    localStorage.removeItem("currentQuestion");
    localStorage.removeItem("answers");
    localStorage.removeItem("timeLeft");
    setExam(null);
  };

  useEffect(() => {
    if (exam?.show_summary) {
      makeGetAPICall(
        "exams.php",
        {
          action: "list_student_selections",
          exam_id: exam?.id,
          student_id: user.id,
        },
        (response) => {
          setSelections(response.data);
        },
        () => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Couldn't get questions for this exam. Please inform a teacher, refresh and try again",
          });
        }
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="results-container">
        <div className="header-text">EXAM COMPLETED </div>
        <div className="mt-3">
          <div className="row">
            <div className="row">
              <div className="col-lg-2">
                <p className="header-content-text">Instruction:</p>
              </div>
              <div
                className="col-lg-10 instruction"
                dangerouslySetInnerHTML={{
                  __html: exam?.end_instructions,
                }}
              />
            </div>
          </div>
        </div>
      </div>
      {exam?.show_result === "1" ? (
        <div className="result-text">
          <div className="col-12 d-flex justify-content-center align-items-center mt-4 summary-row bg-secondary">EXAM SUMMARY</div>
          <div className="col-12 d-flex justify-content-center align-items-center summary-row bg-white">
            <div className="col-8 d-flex justify-content-between align-items-center" style={{ maxWidth: 400 }}>
              <p className="m-0">Total Number of Questions</p>
              <p className="m-0">{exam?.total_question}</p>
            </div>
          </div>
          <div className="col-12 d-flex justify-content-center align-items-center summary-row bg-white">
            <div className="col-8 d-flex justify-content-between align-items-center" style={{ maxWidth: 400 }}>
              <p className="m-0">Number of Questions Attempted</p>
              <p className="m-0">{result.q_attempted}</p>
            </div>
          </div>
          <div className="col-12 d-flex justify-content-center align-items-center summary-row bg-white">
            <div className="col-8 d-flex justify-content-between align-items-center" style={{ maxWidth: 400 }}>
              <p className="m-0">Number of Correct Answers</p>
              <p className="m-0">{result.q_correct}</p>
            </div>
          </div>
          <div className="col-12 d-flex justify-content-center align-items-center summary-row bg-white">
            <div className="col-8 d-flex justify-content-between align-items-center" style={{ maxWidth: 400 }}>
              <p className="m-0">Number of Wrong Answers</p>
              <p className="m-0">{result.q_failed}</p>
            </div>
          </div>
          <div className="col-12 d-flex justify-content-center align-items-center summary-row bg-white">
            <div className="col-8 d-flex justify-content-between align-items-center" style={{ maxWidth: 400 }}>
              <p className="m-0">Score</p>
              <p className="m-0">{result.score.toFixed(0)} %</p>
            </div>
          </div>
        </div>
      ) : null}

      {exam?.show_summary === "1" && !!selections?.selection?.length ? (
        <div className="table-responsive">
          {selections?.selection?.map((selection, selectionIndex) => {
            let question = selection.question;
            return (
              <div className="qa-container" key={`question-${selectionIndex}`}>
                <div className="qa-number">
                  Question {selectionIndex + 1}
                  <div className="d-flex">
                    {selection.marks !== "0" ? <div className="qa-correct">Correct</div> : <div className="qa-incorrect">Incorrect</div>}
                  </div>
                </div>
                <MathJax>
                  <div
                    className="qa-text"
                    dangerouslySetInnerHTML={{
                      __html: sanitizeHtml(insertNewLine(question.question_title), sanitizeHtmlOption),
                    }}
                  />
                </MathJax>
                <div className="qa-option-container">
                  <div>
                    <div className="row">
                      {Object.keys(question.options).map((optionKey, index) => {
                        let option = question.options[optionKey];
                        return (
                          <div className="col-md-6" key={`option-${optionKey}`}>
                            <MathJax>
                              <div
                                className="option"
                                dangerouslySetInnerHTML={{
                                  __html: `<div class="d-flex align-items-center mb-2"><p class="option-label">Option ${index + 1}</p>${
                                    selection.answer_option === optionKey ? '<p class="qa-selected">Selected</p>' : ""
                                  }</div>${sanitizeHtml(insertNewLine(option), sanitizeHtmlOption)}`,
                                }}
                              />
                            </MathJax>
                          </div>
                        );
                      })}
                    </div>
                    <p className="option-label correct m-0 p-0">Correct Answer: Option {question.answer_option}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : null}

      <Link to="/home" onClick={() => endExam()}>
        <button className="start">End Exam</button>
      </Link>
    </>
  );
}

export default Results;
