import React, { useState } from "react";
import { useParams } from "react-router-dom";
import LayoutCard from "../components/LayoutCard";
import { kurssit } from "../mockData/kurssit";
import { vuosikurssit } from "../mockData/vuosikurssit";
import { kurssiOsallistuminen } from "../mockData/osallistuminenKurssille";
import { styles } from "../styles/commonStyles";
import { dsStyles } from "../styles/dsStyles";

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
          <ds-link
            ds-text="Lukuvuodet"
            ds-icon="chevron_forward"
            ds-weight="bold"
            ds-href="/teacherYears"
          />
          {year && (
            <ds-link
              ds-text={year.nimi}
              ds-icon="chevron_forward"
              ds-weight="bold"
              ds-href={`/teacherYears/${yearId}/teacherCourses`}
            />
          )}
          <ds-link
            ds-text="Kurssit"
            ds-icon="chevron_forward"
            ds-weight="bold"
            ds-href={yearId ? `/teacherYears/${yearId}/teacherCourses` : "/teacherCourses"}
          />
        </div>

        {/* Sivun otsikko */}
        <h1 style={dsStyles.pageTitle}>Kurssit</h1>

        {/* Hakukenttä */}
        <ds-text-input
          style={dsStyles.textInput}
          ds-placeholder="Hae kurssia tai tunnusta"
          ds-icon="search"
          value={query}
          onInput={(e) => setQuery(e.target.value)}
        />

        {/* Kurssikortit */}
        <div style={styles.listContainer}>
          {filteredCourses.map((course) => {
            const osallistuminen = kurssiOsallistuminen.find(
              (ko) => ko.kurssiId === course.id && ko.opiskelijaId === opiskelijaId
            );

            const completed = osallistuminen?.tehtavatValmiina || 0;
            const total = osallistuminen?.tehtavatYhteensa || 0;
            const progressPercent = total > 0 ? Math.floor((completed / total) * 100) : 0;

            return (
              <ds-card
                key={course.id}
                ds-eyebrow={course.nimi}
                ds-heading={course.kurssitunnus || ""}
                ds-subtitle={`Edistyminen ${completed}/${total}`}
                ds-url={yearId ? `/teacherYears/${yearId}/teacherCourses/${course.kurssitunnus}` : `/teacherCourses/${course.kurssitunnus}`}
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
