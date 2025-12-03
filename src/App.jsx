import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import TeacherCoursesPage from "./pages/TeacherCoursesPage";
import TeacherAddCardPage from "./pages/TeacherAddCardPage";
import StudentFrontPage from "./pages/StudentFrontPage";
import TeacherYearsPage from "./pages/TeacherYearsPage";
import TeacherGroupsPage from "./pages/TeacherGroups.page";
import TeacherStudentListPage from "./pages/TeacherStudentListPage";
import TeacherStudentDetailsPage from "./pages/TeacherStudentDetailsPage";
import StudentTasksPage from "./pages/StudentTasksPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />

        {/* Teacher routes */}
        <Route path="/teacherYears" element={<TeacherYearsPage />} />
        <Route path="/teacherYears/:yearId/teacherCourses" element={<TeacherCoursesPage />} />
        <Route path="/teacherYears/:yearId/teacherCourses/:courseId/groups" element={<TeacherGroupsPage />} />
        <Route path="/teacherYears/:yearId/teacherCourses/:courseId/groups/teacherAddCards" element={<TeacherAddCardPage />} />
        <Route path="/teacherYears/:yearId/teacherCourses/:courseId/groups/:groupId" element={<TeacherStudentListPage />} />
        <Route path="/teacherYears/:yearId/teacherCourses/:courseId/groups/:groupId/studentDetails/:studentId" element={<TeacherStudentDetailsPage />} />

        {/* Student routes */}
        <Route path="/studentCourses" element={<StudentFrontPage />} />
        <Route path="/studentCourses/:courseId/studentTasks" element={<StudentTasksPage />} />

      </Routes>
    </Router>
  );
}

export default App;
