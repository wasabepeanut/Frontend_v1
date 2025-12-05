import React, { useState } from "react";
import { opiskelijat } from "../mockData/opiskelijat";
import { kurssit } from "../mockData/kurssit";
import { kurssiOsallistuminen } from "../mockData/kurssiOsallistuminen";
import LayoutCard from "../components/LayoutCard";
import { studentFrontStyles as styles } from "../styles/commonStyles";
import { dsStyles } from "../styles/dsStyles";
import { styles as commonStyles } from "../styles/commonStyles";

export default function StudentFrontPage({ opiskelijaId = 1 }) {
  const opiskelija = opiskelijat.find((o) => o.id === opiskelijaId) || {};
  const [query, setQuery] = useState("");
  const [activeView, setActiveView] = useState("Kaikki");

  const kurssitOppilaalle = kurssit
    .filter((k) => k.vuosikurssiId === opiskelija.vuosikurssiId)
    .filter((k) => {
      if (activeView === "Kaikki") return true;
      return k.nimi.toLowerCase().includes(activeView.toLowerCase());
    })
    .filter((k) => {
      const q = query.trim().toLowerCase();
      if (!q) return true;
      return (
        k.nimi.toLowerCase().includes(q) ||
        (k.kurssitunnus || "").toLowerCase().includes(q)
      );
    })
    .sort((a, b) => a.id - b.id)
    .map((k) => {
      const osallistuminen = kurssiOsallistuminen.find(
        (ko) => ko.id === k.id && ko.opiskelijaId === opiskelija.id
      ) || {};
      return {
        ...k,
        tehtavatValmiina: osallistuminen.tehtavatValmiina || 0,
        tehtavatYhteensa: osallistuminen.tehtavatYhteensa || 0,
      };
    });

  return (
    <div style={styles.app}>
      <LayoutCard

        header={
          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <ds-icon
              ds-name="ds_flame"
              ds-size="4rem"
              ds-colour="ds-palette-black-95" />
            <div>
              <h2 style={{ ...dsStyles.pageTitle }}>Tervetuloa, {opiskelija.etunimi} {opiskelija.sukunimi}!</h2>
            </div>
          </div>
        }
        footer={<p style={dsStyles.footer}>@Helsingin Yliopisto</p>}
      >

        {/* Navigointipalkit */}
        <div style={{ marginTop: "-10px", marginBottom: "30px" }}>
          <ds-link ds-text="Kotisivu" ds-weight="bold" ds-href="/" />
        </div>

        {/* Näkymän vaihto painikkeet */}
        <div style={{ display: "flex", gap: 12, marginBottom: 12 }}>
          <ds-button ds-value="Kaikki" ds-variant={activeView === "Kaikki" ? "primary" : "secondary"} onClick={() => setActiveView("Kaikki")} />
          <ds-button ds-value="Kariologia" ds-variant={activeView === "Kariologia" ? "primary" : "secondary"} onClick={() => setActiveView("Kariologia")} />
          <ds-button ds-value="Kirurgia" ds-variant={activeView === "Kirurgia" ? "primary" : "secondary"} onClick={() => setActiveView("Kirurgia")} />
        </div>

        <h1 style={dsStyles.pageTitle}>Kurssit</h1>
        <p style={commonStyles.divider}></p>


        {/* Hakukenttä */}
        <ds-text-input
          style={dsStyles.textInput}
          ds-placeholder="Hae kurssia tai tunnusta"
          ds-icon="search"
          value={query}
          onInput={(e) => setQuery(e.target.value)}
        />
        {/* Näkymät */}
        <div style={styles.itemContainer}>
          {kurssitOppilaalle.length === 0 ? (
            <p>Ei tuloksia.</p>
          ) : (
            kurssitOppilaalle.map((k) => {
              const completed = k.tehtavatValmiina || 0;
              const total = k.tehtavatYhteensa || 0;
              const progressPercent = total > 0 ? Math.floor((completed / total) * 100) : 0;
              return (
                <ds-card
                  key={k.id}
                  ds-eyebrow={k.kurssitunnus || ""}
                  ds-heading={k.nimi}
                  ds-subtitle={`Edistyminen ${completed}/${total}`}
                  ds-url={`/studentCourses/${k.id}/studentTasks`}
                  ds-url-target="_self"
                  ds-tag="Kurssi"
                >
                  <div slot="content" style={{ marginBottom: 5 }}>
                    <div style={dsStyles.progressBarContainer}>
                      <div style={{ ...dsStyles.progressBarFill, width: `${progressPercent}%` }} />
                    </div>
                  </div>
                </ds-card>
              );
            })
          )}
        </div>
      </LayoutCard>
    </div>
  );
}
