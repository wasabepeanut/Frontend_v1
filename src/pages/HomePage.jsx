import React from "react";
import { useNavigate } from "react-router-dom";
import LayoutCard from "../components/LayoutCard";
import logo from "../assets/logo.png";
import { styles } from "../styles/commonStyles";

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

export default HomePage;
