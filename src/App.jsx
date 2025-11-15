import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import TeacherCoursesPage from "./pages/TeacherCoursesPage";
import TeacherAddCardWrapper from "./pages/TeacherAddCardWrapper";
import StudentFrontPage from "./studentFrontPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/teacher" element={<TeacherCoursesPage />} />
        <Route path="/teacher/:courseName" element={<TeacherAddCardWrapper />} />
        <Route path="/student" element={<StudentFrontPage />} />
      </Routes>
    </Router>
  );
}

export default App;
