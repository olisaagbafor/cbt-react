import React, { useState, useMemo } from "react";
import "./App.css";

import { AppContext } from "./context/AppContext";
import { ThemeProvider } from "styled-components";

import { BrowserRouter as Router, Navigate, Outlet, Route, Routes } from "react-router-dom";

import { Exams, ExamPage, Instruction, Login, Results, Layout, Review, ChangePassword, Home, ExamPagePerQuestion, History, Register } from "./pages";
import { decryptData, getFromStorage } from "./assets";
import { MathJaxContext } from "better-react-mathjax";

function App() {
  const theme = {
    primary: "#C51C2F",
    secondary: "#FFE0E4",
    white: "white",
    grey: "#4A4A4A",
    text_grey: "#8A8383",
    black: "#000000",
    error: "#FF0000",
    background: "#F2F4F8",
  };

  const [token, setToken] = useState(getFromStorage("studentToken") || null);
  const [user, setUser] = useState(decryptData(getFromStorage("studentUser")) || null);
  const [exam, setExam] = useState(decryptData(getFromStorage("exam")) || null);
  const [school, setSchool] = useState(decryptData(getFromStorage("school")) || null);

  const providerValue = useMemo(
    () => ({
      user,
      setUser,
      exam,
      setExam,
      token,
      setToken,
      school,
      setSchool,
    }),
    [user, setUser, exam, setExam, token, setToken, school, setSchool]
  );

  return (
    <div className="App">
      <Router>
        <ThemeProvider theme={theme}>
          <MathJaxContext>
            <AppContext.Provider value={providerValue}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/:school_code/register" element={<Register />} />
                <Route element={<Wrapper token={token} user={user} />}>
                  <Route index path="/home" element={<Exams />} />
                  <Route path="/profile" element={<ChangePassword />} />
                  {!!parseInt(school?.is_tertiary_institution) && <Route path="/history/:exam_id" element={<History />} />}
                  <Route path="/exam/:id" element={<Layout />}>
                    <Route index element={<Instruction />} />
                    <Route path="start" element={exam?.duration_type === "exam" ? <ExamPage /> : <ExamPagePerQuestion />} />
                    <Route path="review" element={<Review />} />
                    <Route path="end" element={<Results />} />
                  </Route>
                </Route>
                <Route path="/login">
                  <Route index element={<Login />} />
                  <Route path=":school_code" element={<Login />} />
                </Route>
              </Routes>
            </AppContext.Provider>
          </MathJaxContext>
        </ThemeProvider>
      </Router>
    </div>
  );
}

const Wrapper = ({ token, user }) => {
  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default App;
