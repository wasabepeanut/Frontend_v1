import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import TeacherAddCard from "../TeacherAddCard";

function TeacherAddCardWrapper() {
  const { courseName } = useParams();
  const navigate = useNavigate();

  return (
    <TeacherAddCard
      courseName={courseName}
      navigateBack={() => navigate("/teacher")}
    />
  );
}

export default TeacherAddCardWrapper;
