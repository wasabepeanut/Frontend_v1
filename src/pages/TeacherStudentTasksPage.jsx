import React, { useState } from "react";
import LayoutCard from "../components/LayoutCard";
import { styles } from "../styles/commonStyles";
import { dsStyles } from "../styles/dsStyles";
import { useParams } from "react-router-dom";
import { tehtavat } from "../mockData/tehtavat";
import { kurssit } from "../mockData/kurssit";
import { vuosikurssit } from "../mockData/vuosikurssit";
import { opiskelijat } from "../mockData/opiskelijat";


function TeacherStudentTasksPage() {
    const [query, setQuery] = useState("");
    const { courseId, yearId, groupId, studentId } = useParams();

    // Year for breadcrumbs
    const year = vuosikurssit.find((y) => y.id === parseInt(yearId));
    const course = kurssit.find((c) => c.id === parseInt(courseId));

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
                        ds-text={`Opiskelijat`}
                        ds-icon="chevron_forward"
                        ds-weight="bold"
                        ds-href={`/teacherYears/${yearId}/teacherCourses/${courseId}/groups/${groupId}`}
                    />
                </div>

                <h1 style={dsStyles.pageTitle}>Tehtävät</h1>

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
                            ds-subtitle={`Tila: ${task.tila}`}
                            ds-url={`/teacherYears/${yearId}/teacherCourses/${courseId}/groups/${groupId}/${studentId}/studentTasks/${task.id}/teacherGradings`}
                            ds-url-target="_self"
                        >
                            <div
                                slot="content"
                                style={{
                                    display: "flex",
                                    justifyContent: "flex-end", // push icon to the right
                                    marginTop: "-35px",
                                    width: "100%",
                                }}
                            >
                                <ds-icon
                                    ds-size="1.5rem"
                                    ds-name={task.tila === "Valmis" ? "check_circle_fill" : "check_circle"}
                                    ds-colour={
                                        task.tila === "Valmis"
                                            ? "ds-palette-green-50"
                                            : "ds-palette-black-50"
                                    }
                                    style={{
                                        marginRight: "16px",  // move a little to the left
                                        marginBottom: "5px",   // move a little up
                                    }}
                                />
                            </div>
                        </ds-card>
                    ))}
                </div>
            </LayoutCard>
        </div>
    );
}

export default TeacherStudentTasksPage;