import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import TeacherAddCard from "../components/TeacherAddCard";

function TeacherAddCardPage() {
  const { courseId } = useParams();

  return (
    <TeacherAddCard
      courseId={courseId}
    />
  );
}

export default TeacherAddCardPage;
