import React, { act, useState } from "react";
import { ryhmat } from "../mockData/ryhmat";
import { opiskelijat } from "../mockData/opiskelijat";
import { useNavigate, useParams } from "react-router-dom";
import LayoutCard from "../components/LayoutCard";
import { studentFrontStyles as styles } from "../styles/commonStyles";
import { dsStyles } from "../styles/dsStyles";
import { vuosikurssit } from "../mockData/vuosikurssit";
import { kurssit } from "../mockData/kurssit";

export default function TeacherGroupsPage() {
  const navigate = useNavigate();
  const { courseId, yearId } = useParams();

  const [activeView, setActiveView] = useState("groups");
  const [query, setQuery] = useState("");

  // Groups sorted alphabetically
  const ryhmalistaus = [...ryhmat].sort((a, b) =>
    a.nimi.localeCompare(b.nimi)
  );

  // Count students in a group
  const getStudentCount = (ryhmaId) => {
    return opiskelijat.filter((s) => s.ryhmaId === ryhmaId).length;
  };

  // Filteröinti hakukyselyn perusteella
  const filteredGroups = ryhmalistaus.filter((ryhma) =>
    ryhma.nimi.toLowerCase().includes(query.toLowerCase())
  );

  // Placeholder card list
  const kortit = [];

  const filteredCards = kortit.filter((card) =>
    card.nimi?.toLowerCase().includes(query.toLowerCase())
  );

  // Year for breadcrumbs
  const year = vuosikurssit.find((y) => y.id === parseInt(yearId));

  // Course for breadcrumbs
  const course = kurssit.find((c) => c.id === parseInt(courseId));

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
          <ds-link ds-text="Kotisivu" ds-icon="chevron_forward" ds-weight="bold" ds-href="/" />
          {year && (
            <ds-link
              ds-text={year.nimi}
              ds-icon="chevron_forward"
              ds-weight="bold"
              ds-href={`/teacherYears`}
            />
          )}
          {course && (
            <ds-link
              ds-text={course.nimi}
              ds-weight="bold"
              ds-href={`/teacherYears/${yearId}/teacherCourses`}
            />
          )}
        </div>

        {/* Näkymät */}
        <div style={{ display: "flex", gap: "15px" }}>
          <ds-button
            ds-value="Ryhmät"
            ds-variant={activeView === "groups" ? "primary" : "secondary"}
            onClick={() => {
              setQuery("");
              setActiveView("groups");
            }}
          />
          <ds-button
            ds-value="Kortit"
            ds-variant={activeView === "cards" ? "primary" : "secondary"}
            onClick={() => {
              setQuery("");
              setActiveView("cards");
            }}
          />
        </div>

        {/* Ryhmänäkymä */}
        {activeView === "groups" ? (
          <>
            <h1 style={dsStyles.pageTitle}>{course.kurssitunnus}: Ryhmät</h1>

            {/* Hakukenttä*/}
            <ds-text-input
              style={dsStyles.textInput}
              ds-placeholder="Hae ryhmiä"
              ds-icon="search"
              value={query}
              onInput={(e) => setQuery(e.target.value)}
            />

            <div style={styles.itemContainer}>
              {filteredGroups.map((ryhma) => {
                const studentCount = getStudentCount(ryhma.id);
                return (
                  <ds-card
                    key={ryhma.id}
                    ds-eyebrow={`Aloitusaika: ${ryhma.aloitusaika}`}
                    ds-heading={ryhma.nimi}
                    ds-subtitle={`${studentCount} opiskelijaa`}
                    ds-url={
                      yearId
                        ? `/teacherYears/${yearId}/teacherCourses/${courseId}/groups/${ryhma.id}`
                        : `/teacherCourses/${courseId}/groups/${ryhma.id}`
                    }
                    ds-url-target="_self"
                  />
                );
              })}
            </div>
          </>
        ) : (
          <>
            {/* Korttinäkymä */}
            <h1 style={dsStyles.pageTitle}>{course.kurssitunnus}: Kortit</h1>

            {/* Hakukenttä EI TOIMINNALLINEN */}
            <ds-text-input
              style={dsStyles.textInput}
              ds-placeholder="Hae kortteja"
              ds-icon="search"
              value={query}
              onInput={(e) => setQuery(e.target.value)}
            />

            <div style={styles.itemContainer}>
              {filteredCards.length === 0 ? (
                <p>Ei vielä kortteja. Lisää uusi kortti.</p>
              ) : (
                filteredCards.map((kortti) => (
                  <button key={kortti.id} style={styles.itemButton}>
                    <div style={styles.courseInfo}>
                      <p>{kortti.nimi}</p>
                      <div style={styles.arrow}>→</div>
                    </div>
                  </button>
                ))
              )}
            </div>

              {/* Luo uusi kortti -painike */}
            <div style={{ ...dsStyles.buttonContainer, marginTop: "120px" }}>
              <ds-button
                ds-value="Luo uusi kortti"
                ds-icon="edit"
                ds-full-width="true"
                onClick={() => {
                  const route = yearId
                    ? `/teacherYears/${yearId}/teacherCourses/${courseId}/groups/teacherAddCards`
                    : `/teacherCourses/${courseId}/groups/teacherAddCards`;
                  navigate(route);
                }}
              />
            </div>
          </>
        )}
      </LayoutCard>
    </div>
  );
}
