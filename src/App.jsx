import React from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate, useParams } from "react-router-dom";
import logo from "./assets/logo.png";
import TeacherAddCard from "./TeacherAddCard";

// Etusivu
function HomePage() {
  const navigate = useNavigate();

  return (
    <div style={styles.app}>
      <div style={styles.card}>
        <img src={logo} alt="Logo" style={styles.logo} />
        <div>
          <h1 style={styles.appName}>DigiDens</h1>
          <p style={styles.subtitle}>
            Helsingin Yliopiston<br />Hammaslääketieteen oppimisympäristö
          </p>
        </div>

        <div style={styles.bottomContainer}>
          <div style={styles.buttonContainer}>
            <button style={styles.button} onClick={() => navigate("/teacher")}>
              Kirjaudu Sisään Opettajana
            </button>
            <button style={styles.button}>Kirjaudu Sisään Opiskelijana</button>
          </div>
          <p style={styles.alatunniste}>Helsingin Yliopisto</p>
        </div>
      </div>
    </div>
  );
}

// Opettajan kurssivalikkosivu
function TeacherCoursesPage() {
  const navigate = useNavigate();
  const courses = ["Kurssi 1", "Kurssi 2", "Kurssi 3"];

  return (
    <div style={styles.app}>
      <div style={styles.card}>
        <img src={logo} alt="Logo" style={styles.logo} />
  <button style={styles.backButton} onClick={() => navigate("/")}>
            ← Takaisin etusivulle
          </button>
        <div>
          <h1 style={styles.appNameMini}>DigiDens</h1>
          <p style={styles.subtitle}>
            Tervetuloa opettajan kurssinäkymään! <br />
          </p>
        
          <h2 style={styles.pageTitle}>Kurssivalikko</h2>
          <p style={styles.subtitle2}>
            Valitse kurssi jatkaaksesi tehtävien hallintaan
          </p>
        </div>

        <div style={styles.courseContainer}>
          <ul style={styles.courseList}>
            {courses.map((course, index) => (
              <li key={index} style={styles.courseItem}>
                <button
                  style={styles.courseButton}
                  onClick={() => navigate(`/teacher/${course}`)}
                >
                  {course}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <p style={styles.alatunniste}>Helsingin Yliopisto</p>
      </div>
    </div>
  );
}

// TeacherAddCard wrapper
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

// Router
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/teacher" element={<TeacherCoursesPage />} />
        <Route path="/teacher/:courseName" element={<TeacherAddCardWrapper />} />
      </Routes>
    </Router>
  );
}


const styles = {
  app: {
    minHeight: "100vh",
    width: "100vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#dcdcdc",
    padding: "20px",
    boxSizing: "border-box",
  },
  card: {
    width: "100%",
    maxWidth: "820px",
    minHeight: "980px",
    padding: "40px",
    boxSizing: "border-box",
    backgroundColor: "#ffffff",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  logo: {
    width: "50px",
    height: "auto",
    marginBottom: "1px", // yhdenmukaistettu
  },
  appName: {
    fontSize: "clamp(22px, 4vw, 36px)",
    fontWeight: "500",
    marginBottom: "2px",
  },
  appNameMini: {
    fontSize: "clamp(18px, 4vw, 1px)",
    fontWeight: "500",
    marginTop: "30px", // yhdenmukaistettu
    marginBottom: "2px",
  },
  pageTitle: {
    fontSize: "clamp(20px, 3vw, 26px)",
    fontWeight: "500",
    marginBottom: "1px",
    marginTop: "90px",
  },
  subtitle: {
    fontSize: "16px",
    color: "#5C5C5C",
    lineHeight: "1.2",
  },
  subtitle2: {
    fontSize: "18px",
    color: "#000000ff",
    lineHeight: "1.2",
  },
  courseContainer: {
    marginTop: "20px",
    overflowY: "auto",
    maxHeight: "520px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "stretch",
    gap: "15px",
    flexGrow: 1,
  },
  courseList: {
    listStyle: "none",
    padding: 0,
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    alignItems: "center",
    marginTop: "20px",
  },
  courseButton: {
    padding: "12px 20px",
    fontSize: "16px",
    borderRadius: "10px",
    border: "1px solid #48A39B",
    backgroundColor: "#48A39B",
    color: "#fff",
    cursor: "pointer",
    width: "100%",
  },
  alatunniste: {
    textAlign: "center",
    marginTop: "25px",
    fontSize: "17px",
    color: "#5C5C5C",
  },
  button: {
    padding: "15px 20px",
    width: "100%",
    backgroundColor: "#48A39B",
    color: "white",
    border: "none",
    borderRadius: "25px",
    cursor: "pointer",
    fontSize: "clamp(14px, 2.5vw, 18px)",
    fontWeight: "400",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    width: "100%",
    alignItems: "center",
  },
  bottomContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  backButton: {
    padding: "8px 16px",
    fontSize: "14px",
    borderRadius: "8px",
    border: "1px solid #000",
    backgroundColor: "#fff",
    color: "#000",
    cursor: "pointer",
    maxWidth: "120px",
    marginTop: "50px",
    marginBottom: "10px"
  },
};

export default App;
