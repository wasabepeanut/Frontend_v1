import React, { useState } from "react";
import LayoutCard from "../components/LayoutCard";
import { vuosikurssit } from "../mockData/vuosikurssit";
import { kurssit } from "../mockData/kurssit";
import { styles } from "../styles/commonStyles";
import { dsStyles } from "../styles/dsStyles";
import { styles as commonStyles } from "../styles/commonStyles";

// Vuosivalikko (/teacherYears)
function TeacherYearsPage() {
  const [query, setQuery] = useState("");

  const getCourseCount = (yearId) => {
    return kurssit.filter((course) => course.vuosikurssiId === yearId).length;
  };

  // Filter years based on search query (matches year name or season)
  const filteredYears = vuosikurssit.filter((year) =>
    year.nimi.toLowerCase().includes(query.toLowerCase()) ||
    year.kausi.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div style={styles.app}>
      <LayoutCard
        header={
          <div style={{ display: "flex" }}>
            <ds-icon
              ds-name="ds_flame"
              ds-size="4rem"
              ds-colour="ds-palette-black-95"
            ></ds-icon>
          </div>
        }
        footer={<p style={dsStyles.footer}>@Helsingin Yliopisto</p>}
      >
        {/* Navigointipalkit */}
        <div style={{ marginTop: "-10px", marginBottom: "30px" }}>
          <ds-link
            ds-text="Kotisivu"
            ds-weight="bold"
            ds-href="/"
          ></ds-link>
        </div>

        {/* Sivun otsikko */}
        <h1 style={dsStyles.pageTitle}>Lukuvuodet</h1>
        <p style={commonStyles.divider}></p>

        {/* Hakukenttä */}
        <ds-text-input
          style={dsStyles.textInput}
          ds-placeholder="Hae vuosikurssia tai kautta"
          ds-icon="search"
          value={query}                 
          onInput={(e) => setQuery(e.target.value)} 
        ></ds-text-input>

        {/* Vuosikortit */}
        <div style={styles.listContainer}>
          {filteredYears.map((year) => (
            <ds-card
              key={year.id}
              ds-eyebrow={year.kausi}
              ds-heading={year.nimi}
              ds-subtitle={`Kurssit: ${getCourseCount(year.id)}`}
              ds-url={`/teacherYears/${year.id}/teacherCourses`}
              ds-url-target="_self"
            ></ds-card>
          ))}
        </div>
      </LayoutCard>
    </div>
  );
}

export default TeacherYearsPage;
