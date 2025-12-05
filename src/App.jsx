import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import TeacherCoursesPage from "./pages/TeacherCoursesPage";
import TeacherAddCardPage from "./pages/TeacherAddCardPage";
import TeacherYearsPage from "./pages/TeacherYearsPage";
import TeacherGroupsPage from "./pages/TeacherGroupsPage";
import TeacherStudentListPage from "./pages/TeacherStudentListPage";
import TeacherStudentTasksPage from "./pages/TeacherStudentTasksPage";
import TeacherGradings from "./pages/TeacherGradings";
import TeacherCreateCardsPage from "./pages/TeacherCreateCardsPage";

import StudentTasksPage from "./pages/StudentTasksPage";
import StudentFrontPage from "./pages/StudentFrontPage";
import StudentGradingsPage from "./pages/StudentGradingsPage";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />

        {/* Teacher routes */}
        <Route path="/teacherYears" element={<TeacherYearsPage />} />
        <Route path="/teacherYears/:yearId/teacherCourses" element={<TeacherCoursesPage />} />
        <Route path="/teacherYears/:yearId/teacherCourses/:courseId/groups" element={<TeacherGroupsPage />} />
        <Route path="/teacherYears/:yearId/teacherCourses/:courseId/groups/teacherCreateCards" element={<TeacherCreateCardsPage />} />
        <Route path="/teacherYears/:yearId/teacherCourses/:courseId/groups/:groupId" element={<TeacherStudentListPage />} />
        <Route path="/teacherYears/:yearId/teacherCourses/:courseId/groups/:groupId/:studentId/studentTasks" element={<TeacherStudentTasksPage />} />
        <Route path="/teacherYears/:yearId/teacherCourses/:courseId/groups/:groupId/:studentId/studentTasks/:taskId/teacherGradings" element={<TeacherGradings />} />

        {/* Student routes */}
        <Route path="/studentCourses" element={<StudentFrontPage />} />
        <Route path="/studentCourses/:courseId/studentTasks" element={<StudentTasksPage />} />
        <Route path="/studentCourses/:courseId/studentTasks/:taskId/studentGradings" element={<StudentGradingsPage />} />

      </Routes>
    </Router>
  );
}

export default App;
