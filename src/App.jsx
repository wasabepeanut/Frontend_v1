import React from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate, useParams } from "react-router-dom";
import logo from "./assets/logo.png";
import TeacherAddCard from "./TeacherAddCard";
import StudentFrontPage from "./studentFrontPage";

//  Yhteinen "Card" rakenne 
function LayoutCard({ header, children, footer }) {
  return (
    <div style={styles.card}>
      <div style={styles.header}>{header}</div>
      <div style={styles.divider}></div>
      <div style={styles.content}>{children}</div>
      {footer && <div style={styles.footer}>{footer}</div>}
    </div>
  );
}

//  Etusivu
function HomePage() {
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
              <h1 style={styles.appName}>DigiDens</h1>
            <p style={styles.subtitle}>
              Helsingin Yliopiston<br />Hammaslääketieteen oppimisympäristö
            </p>
        <div style={styles.buttonContainer}>
          <button style={styles.button} onClick={() => navigate("/teacher")}>
            Kirjaudu Sisään Opettajana
          </button>
         <button style={styles.button} onClick={() => navigate("/student")}>
  Kirjaudu Sisään Opiskelijana
</button>
        </div>
      </LayoutCard>
    </div>
  );
}
// Voidaan käyttää kun on kirjautumistoiminto:
//<Route path="/student/:id" element={<StudentFrontPage />} />
//onClick={() => navigate("/student/1")}

//  Opettajan kurssinäkymä
function TeacherCoursesPage() {
  const navigate = useNavigate();
  const courses = ["Kurssi 1", "Kurssi 2", "Kurssi 3", "Kurssi 4", "Kurssi 5"];

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
      </LayoutCard>
    </div>
  );
}




//  TeacherAddCard wrapper
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

//  Router
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

//  Tyylit
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
    width: "620px",
    maxWidth: "90vw",
    minHeight: "820px",
    backgroundColor: "#fff",
    borderRadius: "30px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  header: {
    padding: "30px 40px 20px 30px",
  },
  
  divider: {
    height: "1px",
    backgroundColor: "#000000ff",
    width: "100%",
  },
  content: {
    flexGrow: 1,
    padding: "15px 40px",
    overflowY: "auto",
    boxSizing: "border-box",
  },
  footer: {
    padding: "2px 40px",
    textAlign: "center",
    borderTop: "1px solid #e0e0e0",
  },
  headerRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    width: "100px",
    height: "auto",
  },
  appName: {
    fontSize: "clamp(34px, 4vw, 36px)",
    fontWeight: "700",
    margin: "10px 0",
    marginTop: "180px"
  },
  appNameMini: {
    fontSize: "clamp(16px, 2vw, 18px)",
    fontWeight: "700",
    margin: "1px 0",
    
  },
  subtitle: {
    fontSize: "14px",
    color: "#5C5C5C",
    lineHeight: "1.2",
  },
  subtitle2: {
    fontSize: "16px",
    color: "#000",
    marginTop: "10px",
  },
  pageTitle: {
    fontSize: "20px",
    fontWeight: "500",
    marginBottom: "5px",
    marginTop: "40px",
    lineHeight: "1"
  },
  courseContainer: {
    marginTop: "20px",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    flexGrow: 1,
  },
  courseList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  courseButton: {
    padding: "12px 20px",
    fontSize: "16px",
    borderRadius: "0px",
    border: "1px solid #005A94",
    backgroundColor: "#005A94",
    color: "#fff",
    cursor: "pointer",
    width: "100%",
  },
  alatunniste: {
    fontSize: "16px",
    
    color: "#5C5C5C",
  },
  button: {
    padding: "15px 20px",
    width: "100%",
    backgroundColor: "#005A94",
    color: "white",
    border: "none",
    borderRadius: "0px",
    cursor: "pointer",
    fontSize: "clamp(14px, 2.5vw, 18px)",
    fontWeight:"600"
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    width: "100%",
    alignItems: "center",
    marginTop: "160px"
  },
  backButton: {
    padding: "5px 5px",
    fontSize: "14px",
    borderRadius: "0px",
    border: "1px solid #000",
    backgroundColor: "#fff",
    color: "#000",
    cursor: "pointer",
    marginBottom:"15px"
  },
};

export default App;
