import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Loader, QuestionsListPerQuestion } from "../../components";
import { AppContext } from "../../context/AppContext";
import "./exampage.css";
import { decryptData, encryptData, getFromStorage, removefromStorage, setToStorage } from "../../assets";
import { makePostAPICall } from "../../helpers/ApiHelpers";

function ExamPagePerQuestion() {
  let navigate = useNavigate();
  let params = useParams();
  const { exam, setExam, user } = useContext(AppContext);

  const [loading, setLoading] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(decryptData(getFromStorage("currentQuestion")) || 1);
  const [answers, setAnswers] = useState(decryptData(getFromStorage("answers")) || {});

  const markExamPerQuestion = (answers, examQuestions) => {
    setLoading(true);
    let questions = [];
    for (const property in answers) {
      questions.push({
        id: property,
        answer: answers[property].substr(6, 1),
      });
    }

    let duration = decryptData(getFromStorage("timeLeft"));

    makePostAPICall(
      "exams.php",
      {
        action: "submit_exam",
        user_id: user.id,
        exam_id: exam?.id,
        marks: exam?.marks_per_answer,
        duration: duration ?? 0,
        questions,
      },
      (response) => {
        setToStorage("result", JSON.stringify(response.data));
        navigate(`/exam/${params.id}/end`);
        setExam((prevState) => {
          const { questions, ...others } = prevState;
          return { ...others, examStatus: "ended" };
        });
      },
      () => markExamPerQuestion(answers, examQuestions)
    );
  };

  useEffect(() => {
    if (exam?.examStatus === "ended") {
      navigate(`/exam/${params.id}/end`);
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setToStorage("answers", encryptData(answers));
  }, [answers]);

  useEffect(() => {
    setToStorage("currentQuestion", encryptData(currentQuestion));
  }, [currentQuestion]);

  const numQuestions = exam?.questions.length;
  const examQuestions = exam?.questions;

  const handleNextButton = () => {
    removefromStorage("timeLeft");
    if (currentQuestion === numQuestions) {
      markExamPerQuestion(answers, examQuestions);
      return;
    }
    setCurrentQuestion((prevState) => prevState + 1);
  };

  if (loading) return <Loader />;

  return (
    <div>
      <div className="my-container mt-4">
        <div className="topic">{exam?.title}</div>
        {exam?.questions.map(
          (question, questionIndex) =>
            parseInt(currentQuestion) === parseInt(questionIndex + 1) && (
              <QuestionsListPerQuestion
                key={questionIndex}
                setLoading={setLoading}
                answers={answers}
                setAnswers={setAnswers}
                currentQuestion={currentQuestion}
                setCurrentQuestion={setCurrentQuestion}
                question={question}
                questionIndex={questionIndex}
              />
            )
        )}
        <div className="scroll-pagination">
          {exam?.questions.map((question, questionIndex) => {
            let additionalClassName = "";
            if (answers.hasOwnProperty(question.id)) {
              additionalClassName += "answered ";
            }
            if (currentQuestion === questionIndex + 1) {
              additionalClassName += "current";
            }
            return (
              <div className={`scroll-item ${additionalClassName}`} key={question.id}>
                {questionIndex + 1}
              </div>
            );
          })}
        </div>
        <div className="exam-qa-btn-container">
          <div className="d-flex justify-content-end align-items-center">
            <button className="next" onClick={handleNextButton}>
              {currentQuestion === numQuestions ? "Submit" : "Next"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExamPagePerQuestion;
