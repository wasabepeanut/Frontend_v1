import React from "react";
import { useNavigate } from "react-router-dom";
import LayoutCard from "../components/LayoutCard";
import logo from "../assets/logo.png";
import { kurssit } from "../mockData/kurssit";
import { styles } from "../styles/commonStyles";

function TeacherCoursesPage() {
  const navigate = useNavigate();

  return (
    <div style={styles.app}>
      <LayoutCard
        header={
          <>
            <img src={logo} alt="Logo" style={styles.logo} />
          </>
        }
        footer={<p style={styles.alatunniste}>@Helsingin Yliopisto</p>}
      >
        <button style={styles.backButton} onClick={() => navigate("/")}>
          ← Takaisin
        </button>

        <h1 style={styles.appNameMini}>DigiDens</h1>
        <p style={styles.subtitle}>Tervetuloa opettajan kurssinäkymään!</p>

        <h2 style={styles.pageTitle}>Kurssivalikko</h2>
        <p style={styles.subtitle2}>Valitse kurssi jatkaaksesi tehtävien hallintaan</p>

        <div style={styles.courseContainer}>
          <ul style={styles.courseList}>
            {kurssit.map((course) => (
              <li key={course.id} style={styles.courseItem}>
                <button
                  style={styles.courseButton}
                  onClick={() => navigate(`/teacher/${course.kurssitunnus}`)}
                >
                  {course.kurssitunnus} — {course.nimi}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </LayoutCard>
    </div>
  );
}

export default TeacherCoursesPage;
