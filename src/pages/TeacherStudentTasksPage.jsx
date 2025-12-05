import React, { useState } from "react";
import LayoutCard from "../components/LayoutCard";
import { styles } from "../styles/commonStyles";
import { dsStyles } from "../styles/dsStyles";
import { useParams } from "react-router-dom";
import { tehtavat } from "../mockData/tehtavat";
import { kurssit } from "../mockData/kurssit";
import { vuosikurssit } from "../mockData/vuosikurssit";
import { opiskelijat } from "../mockData/opiskelijat";
import { styles as commonStyles } from "../styles/commonStyles";


function TeacherStudentTasksPage() {
    const [query, setQuery] = useState("");
    const { courseId, yearId, groupId, studentId } = useParams();

    // Year for breadcrumbs
    const year = vuosikurssit.find((y) => y.id === parseInt(yearId));
    const course = kurssit.find((c) => c.id === parseInt(courseId));
    const student = opiskelijat.find((s) => s.id === parseInt(studentId));

    const q = query.trim().toLowerCase();
    const filteredTasks = tehtavat.filter((t) => {
        const matchesCourse = courseId ? t.kurssiId === parseInt(courseId) : true;
        const matchesQuery =
            !q ||
            t.kuvaus.toLowerCase().includes(q) ||
            String(t.id).includes(q) ||
            (t.pvm || "").toLowerCase().includes(q);
        return matchesCourse && matchesQuery;
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
                    <ds-link
                        ds-text={student.sukunimi + " " + student.etunimi}
                        ds-icon="chevron_forward"
                        ds-weight="bold"
                        ds-href={`/teacherYears/${yearId}/teacherCourses/${courseId}/groups/${groupId}`}
                    />
                </div>

                <h1 style={dsStyles.pageTitle}>Tehtävät</h1>
                <p style={commonStyles.divider} />

                {/* Hakukenttä */}
                <ds-text-input
                    style={dsStyles.textInput}
                    ds-placeholder="Hae tehtävää tai päivämäärää"
                    ds-icon="search"
                    value={query}
                    onInput={(e) => setQuery(e.target.value)}
                />


                {/* Tehtäväkortit */}
                <div style={styles.listContainer}>
                    {filteredTasks.map((task) => (
                        <ds-card
                            key={task.id}
                            ds-eyebrow={task.pvm}
                            ds-heading={task.kuvaus}
                            ds-url={`/teacherYears/${yearId}/teacherCourses/${courseId}/groups/${groupId}/${studentId}/studentTasks/${task.id}/teacherGradings`}
                            ds-url-target="_self"
                        >

                            <div slot="content">
                                <div style={{ margin: "-0.2rem 1rem 1rem 1rem" }}>
                                    <ds-tag
                                        ds-colour={task.tila === "Valmis" ? "success" : task.tila === "Kesken" ? "attention" : "danger"}
                                    >
                                        {task.tila}
                                    </ds-tag>
                                </div>
                            </div>
                        </ds-card>
                    ))}
                </div>
            </LayoutCard>
        </div>
    );
}

export default TeacherStudentTasksPage;