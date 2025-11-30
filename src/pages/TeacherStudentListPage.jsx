import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LayoutCard from "../components/LayoutCard";
import { studentFrontStyles as styles } from "../styles/commonStyles";
import { opiskelijat } from "../mockData/opiskelijat";
import { dsStyles } from "../styles/dsStyles";
import { vuosikurssit } from "../mockData/vuosikurssit";

export default function TeacherStudentListPage() {
  const { courseName, yearId, groupId } = useParams();
  const [query, setQuery] = useState("");

  // Opiskelijat tässä ryhmässä
  const studentsInGroup = opiskelijat.filter(
    (student) => student.ryhmaId === parseInt(groupId)
  );

  // Filteröinti hakukyselyn perusteella
  const filteredStudents = studentsInGroup.filter((student) => {
    const q = query.toLowerCase();
    return (
      student.etunimi.toLowerCase().includes(q) ||
      student.sukunimi.toLowerCase().includes(q) ||
      student.opiskelijanumero.toString().includes(q)
    );
  });

  // Year for breadcrumbs
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
          <ds-link ds-text="Kotisivu" ds-icon="chevron_forward" ds-weight="bold" ds-href="/" />
          <ds-link ds-text="Lukuvuodet" ds-icon="chevron_forward" ds-weight="bold" ds-href="/teacherYears" />
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
            ds-href={
              yearId
                ? `/teacherYears/${yearId}/teacherCourses`
                : "/teacherCourses"
            }
          />
          <ds-link
            ds-text="Ryhmät ja kortit"
            ds-icon="chevron_forward"
            ds-weight="bold"
            ds-href={
              yearId
                ? `/teacherYears/${yearId}/teacherCourses/${courseName}`
                : `/teacherCourses/${courseName}`
            }
          />
          <ds-link
            ds-text={`Ryhmä ${groupId}: Opiskelijat`}
            ds-icon="chevron_forward"
            ds-weight="bold"
            ds-href={
              yearId
                ? `/teacherYears/${yearId}/teacherCourses/${courseName}/group/${groupId}`
                : `/teacherCourses/${courseName}/group/${groupId}`
            }
          />
        </div>

        <h1 style={dsStyles.pageTitle}>Ryhmä {groupId}: Opiskelijat</h1>

        {/* Hakukenttä */}
        <ds-text-input
          style={dsStyles.textInput}
          ds-placeholder="Hae opiskelijoita"
          ds-icon="search"
          value={query}
          onInput={(e) => setQuery(e.target.value)}
        />

        {/* Opiskelijalista */}
        <div style={styles.itemContainer}>
          {filteredStudents.map((student) => (
            <ds-card
              key={student.id}
              onClick={() =>
                alert(
                  `Siirryt suoritekortille: ${student.etunimi} ${student.sukunimi}`
                )
              }
              ds-eyebrow={student.opiskelijanumero}
              ds-heading={`${student.etunimi} ${student.sukunimi}`}
              ds-url="#"
              ds-url-target="_self"
            />
          ))}
        </div>
      </LayoutCard>
    </div>
  );
}
