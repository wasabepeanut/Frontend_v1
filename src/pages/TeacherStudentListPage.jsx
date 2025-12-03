import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LayoutCard from "../components/LayoutCard";
import { studentFrontStyles as styles } from "../styles/commonStyles";
import { opiskelijat } from "../mockData/opiskelijat";
import { dsStyles } from "../styles/dsStyles";
import { vuosikurssit } from "../mockData/vuosikurssit";
import { kurssit } from "../mockData/kurssit";
import { kurssiOsallistuminen } from "../mockData/kurssiOsallistuminen";

export default function TeacherStudentListPage() {
  const { courseId, yearId, groupId } = useParams();
  const [query, setQuery] = useState("");

  // Breadcrumb data
  const year = vuosikurssit.find((y) => y.id === parseInt(yearId));
  const course = kurssit.find((c) => c.id === parseInt(courseId));

  // Students belonging to this group
  const studentsInGroup = opiskelijat.filter(
    (s) => s.ryhmaId === parseInt(groupId)
  );

  // Filter by search
  const filteredStudents = studentsInGroup.filter((student) => {
    const q = query.toLowerCase();
    return (
      student.etunimi.toLowerCase().includes(q) ||
      student.sukunimi.toLowerCase().includes(q) ||
      student.opiskelijanumero.toString().includes(q)
    );
  });

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
        {/* Breadcrumbs */}
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
              ds-icon="chevron_forward"
              ds-weight="bold"
              ds-href={`/teacherYears`}
            />
          )}
          {course && (
            <ds-link
              ds-text={course.nimi}
              ds-icon="chevron_forward"
              ds-weight="bold"
              ds-href={`/teacherYears/${yearId}/teacherCourses`}
            />
          )}
          <ds-link
            ds-text={`Ryhmä ${groupId}`}
            ds-icon="chevron_forward"
            ds-weight="bold"
            ds-href={`/teacherYears/${yearId}/teacherCourses/${courseId}/groups`}
          />
        </div>

        {/* Title */}
        <h1 style={dsStyles.pageTitle}>Ryhmä {groupId}: Opiskelijat</h1>

        {/* Search */}
        <ds-text-input
          style={dsStyles.textInput}
          ds-placeholder="Hae opiskelijoita"
          ds-icon="search"
          value={query}
          onInput={(e) => setQuery(e.target.value)}
        />

        {/* Student list */}
        <div style={styles.itemContainer}>
          {filteredStudents.map((student) => {
            // Student progress for THIS course
            const osallistuminen = kurssiOsallistuminen.find(
              (ko) =>
                ko.opiskelijaId === student.id &&
                ko.kurssiId === parseInt(courseId)
            );

            const completed = osallistuminen?.tehtavatValmiina || 0;
            const total = osallistuminen?.tehtavatYhteensa || 0;
            const progressPercent =
              total > 0 ? Math.floor((completed / total) * 100) : 0;

            return (
              <ds-card
                key={student.id}
                ds-eyebrow={student.opiskelijanumero}
                ds-heading={`${student.etunimi} ${student.sukunimi}`}
                ds-subtitle={`Edistyminen ${completed}/${total}`}
                ds-url={`/teacherYears/${yearId}/teacherCourses/${courseId}/groups/${groupId}/${student.id}/studentTasks`}
                ds-url-target="_self"
              >
                {/* Progress bar */}
                <div slot="content">
                  <div style={dsStyles.progressBarContainer}>
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
