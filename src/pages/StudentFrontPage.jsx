import React, { useState } from "react"; 
import { opiskelijat } from "../mockData/opiskelijat";
import { kurssit } from "../mockData/kurssit";
import { kurssiOsallistuminen } from "../mockData/osallistuminenKurssille";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import LayoutCard from "../components/LayoutCard";
import { studentFrontStyles as styles } from "../styles/commonStyles";

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
                {/* Uusi opiskelijan tiedot näkyviin */}
                <div style={styles.studentInfo}>
                  {opiskelija.etunimi} {opiskelija.sukunimi} {opiskelija.opiskelijanumero} 
                </div>
                <span style={styles.filter}>Suodata: Kaikki</span>
                <span style={styles.hamburger}>☰</span>
              </div>
            </div>
          </>
        }
        dividerStyle={{ backgroundColor: "#00000022" }}
        contentStyle={{ padding: "15px 30px" }}
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
      
        <div style={styles.itemContainer}>
          {kurssitOppilaalle.map((k) => {
            const edistyminen = Math.floor(
              (k.tehtavatValmiina / k.tehtavatYhteensa) * 100
            );
            return (
              <ds-card
                key={k.id}
                onClick={() =>
                  alert(`Siirryt suoritekortille: ${k.nimi}`)
                }

  ds-heading={k.kurssitunnus || ""} 
  ds-eyebrow={k.nimi} 
  ds-url="#" // nuoli symboli tulee tällä
  ds-subtitle={`Edistyminen ${k.tehtavatValmiina || 0}/${k.tehtavatYhteensa || 0}`}
  ds-tag="Kurssi"
  ds-horizontal="false"
              >
              
               <div slot="content">
<div style={styles.progressBar}>
                  <div
                    style={{
                      ...styles.progress,
                      width: `${edistyminen}%`,
                    }}
                  ></div>
                </div>
</div>


              </ds-card>
            );
          })}
        </div>
      </LayoutCard>
    </div>
  );
}
