import React, { useState } from "react";
import { opiskelijat } from "./mockData/opiskelijat";
import { kurssit } from "./mockData/kurssit";
import { kurssiOsallistuminen } from "./mockData/osallistuminenKurssille";
import { useNavigate } from "react-router-dom";
import logo from "./assets/logo.png";

// LayoutCard kuten aiemmin
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

export default function StudentFrontPage({ opiskelijaId = 1 }) {
  const navigate = useNavigate();
  const opiskelija = opiskelijat.find((o) => o.id === opiskelijaId);

  // Kurssit navigointipalkkiin aakkosjärjestyksessä
  const kurssitOppilaalle = kurssit
    .filter((k) => k.vuosikurssiId === opiskelija.vuosikurssiId)
    .sort((a, b) => a.nimi.localeCompare(b.nimi))
    .map((k) => {
      const osallistuminen = kurssiOsallistuminen.find(
        (ko) => ko.kurssiId === k.id && ko.opiskelijaId === opiskelija.id
      );
      return {
        ...k,
        tila: osallistuminen?.tila || "kesken",
        tehtavatValmiina: osallistuminen?.tehtavatValmiina || 0,
        tehtavatYhteensa: osallistuminen?.tehtavatYhteensa || 0,
      };
    });

  return (
    <div style={styles.app}>
      <LayoutCard
        header={
          <>
            <div style={styles.headerRow}>
              <img src={logo} alt="Logo" style={styles.logo} />
              <div style={styles.topRight}>
                <span style={styles.filter}>Suodata: Kaikki</span>
                <span style={styles.hamburger}>☰</span>
              </div>
            </div>
          </>
        }
        footer={<p style={styles.footerText}>@Helsingin Yliopisto</p>}
      >
        {/* Takaisin-painike */}
        <button style={styles.backButton} onClick={() => navigate(-1)}>
          ← Takaisin
        </button>

        {/* Kurssinavigointipalkki */}
        <div style={styles.navBar}>
          {kurssitOppilaalle.map((k) => (
            <button key={k.id} style={styles.navButton}>
              {k.nimi}
            </button>
          ))}
        </div>

        {/* Kurssit isona painikkeena */}
        <div style={styles.courseContainer}>
          {kurssitOppilaalle.map((k) => {
            const edistyminen = Math.floor(
              (k.tehtavatValmiina / k.tehtavatYhteensa) * 100
            );
            return (
              <button
                key={k.id}
                style={styles.courseButton}
                onClick={() =>
                  alert(`Siirryt suoritekortille: ${k.nimi}`)
                }
              >
                <div style={styles.courseInfo}>
                  <div>
                    <h3>{k.tunnus || k.kurssitunnus}</h3>
                    <p>{k.nimi}</p>
                    <p>Edistyminen {k.tehtavatValmiina}/{k.tehtavatYhteensa}</p>
                  </div>
                  <div style={styles.arrow}>→</div>
                </div>
                <div style={styles.progressBar}>
                  <div
                    style={{
                      ...styles.progress,
                      width: `${edistyminen}%`,
                    }}
                  ></div>
                </div>
              </button>
            );
          })}
        </div>
      </LayoutCard>
    </div>
  );
}

// Tyylit
const styles = {
  app: {
    minHeight: "100vh",
    width: "100vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    backgroundColor: "#dcdcdc",
    padding: "20px",
    boxSizing: "border-box",
  },
  card: {
    width: "700px",
    maxWidth: "95vw",
    minHeight: "820px",
    backgroundColor: "#fff",
    borderRadius: "30px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    paddingBottom: "20px",
  },
  header: {
    padding: "20px 30px",
  },
  divider: {
    height: "1px",
    backgroundColor: "#00000022",
    width: "100%",
  },
  content: {
    flexGrow: 1,
    padding: "15px 30px",
    overflowY: "auto",
    boxSizing: "border-box",
  },
  footer: {
    padding: "2px 30px",
    textAlign: "center",
    borderTop: "1px solid #e0e0e0",
  },
  logo: {
    width: "100px",
    height: "auto",
  },
  headerRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  topRight: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    fontSize: "14px",
    color: "#333",
  },
  filter: {},
  hamburger: { cursor: "pointer", fontSize: "18px" },
  backButton: {
    padding: "6px 12px",
    fontSize: "14px",
    borderRadius: "0px",
    border: "1px solid #000",
    backgroundColor: "#fff",
    color: "#000",
    cursor: "pointer",
    marginBottom: "10px",
  },
  navBar: {
    display: "flex",
    gap: "8px",
    marginBottom: "15px",
    flexWrap: "wrap",
  },
  navButton: {
    padding: "6px 12px",
    fontSize: "13px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    backgroundColor: "#f7f7f7",
    cursor: "pointer",
  },
  courseContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  courseButton: {
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    backgroundColor: "#f0f4ff",
    border: "1px solid #d0d7ff",
    borderRadius: "8px",
    padding: "12px",
    cursor: "pointer",
  },
  courseInfo: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  arrow: {
    fontSize: "20px",
    fontWeight: "700",
  },
  progressBar: {
    height: "8px",
    width: "100%",
    backgroundColor: "#e0e0e0",
    borderRadius: "4px",
    marginTop: "8px",
  },
  progress: {
    height: "8px",
    backgroundColor: "#005A94",
    borderRadius: "4px",
  },
  footerText: {
    fontSize: "16px",
    color: "#5C5C5C",
  },
};
