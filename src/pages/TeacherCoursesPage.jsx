import React, { useState } from "react";
import { useParams } from "react-router-dom";
import LayoutCard from "../components/LayoutCard";
import { kurssit } from "../mockData/kurssit";
import { vuosikurssit } from "../mockData/vuosikurssit";
import { kurssiOsallistuminen } from "../mockData/kurssiOsallistuminen";
import { styles } from "../styles/commonStyles";
import { dsStyles } from "../styles/dsStyles";
import { styles as commonStyles } from "../styles/commonStyles";

function TeacherCoursesPage({ opiskelijaId = 1 }) {
  const { yearId } = useParams();
  const [query, setQuery] = useState("");

  // Combined filter: year + search query
  const filteredCourses = kurssit.filter((course) => {
    const matchesYear = yearId ? course.vuosikurssiId === parseInt(yearId) : true;
    const matchesQuery =
      course.nimi.toLowerCase().includes(query.toLowerCase()) ||
      course.kurssitunnus.toLowerCase().includes(query.toLowerCase());
    return matchesYear && matchesQuery;
  });

  // Get year info for breadcrumbs
  const year = vuosikurssit.find((y) => y.id === parseInt(yearId));

  return (
    <div style={styles.app}>
      <LayoutCard
        header={
          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <ds-icon
              ds-name="ds_flame"
              ds-size="4rem"
              ds-colour="ds-palette-black-95"
            />
          </div>
        }
        footer={<p style={dsStyles.footer}>@Helsingin Yliopisto</p>}
      >
        {/* Navigointipalkit */}
        <div style={{ marginTop: "-10px", marginBottom: "30px" }}>
          <ds-link
            ds-text="Kotisivu"
            ds-icon="chevron_forward"
            ds-weight="bold"
            ds-href="/"
          />
          {year && (
            <ds-link
              ds-text={year.nimi}
              ds-weight="bold"
              ds-href={`/teacherYears`}
            />
          )}
        </div>

        {/* Sivun otsikko */}
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


        {/* Kurssien ja kurssitunnusten haku */}
        <div style={styles.listContainer}>
          {filteredCourses.map((course) => {
            const osallistuminen = kurssiOsallistuminen.find(
              (ko) => ko.id === course.id && ko.opiskelijaId === opiskelijaId
            );

            const completed = osallistuminen?.tehtavatValmiina || 0;
            const total = osallistuminen?.tehtavatYhteensa || 0;
            const progressPercent = total > 0 ? Math.floor((completed / total) * 100) : 0;

            {/* Kurssikortit */ }
            return (
              <ds-card
                key={course.id}
                ds-eyebrow={course.kurssitunnus || ""}
                ds-heading={course.nimi}
                ds-subtitle={`Edistyminen ${completed}/${total}`}
                ds-url={yearId ? `/teacherYears/${yearId}/teacherCourses/${course.id}/groups` : `/teacherCourses/${course.id}/groups`}
                ds-url-target="_self"
                ds-tag="Kurssi"
              >
                {/* Edistymispalkki kortin sisällä */}
                <div
                  slot="content"                >
                  <div
                    style={dsStyles.progressBarContainer}
                  >
                    <div
                      style={{
                        ...dsStyles.progressBarFill,
                        width: `${progressPercent}%`,
                      }}
                    />
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

export default TeacherCoursesPage;
