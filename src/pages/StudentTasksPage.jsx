import React, { useState } from "react";
import LayoutCard from "../components/LayoutCard";
import { styles } from "../styles/commonStyles";
import { dsStyles } from "../styles/dsStyles";
import { useParams } from "react-router-dom";
import { tehtavat } from "../mockData/tehtavat";
import { kurssit } from "../mockData/kurssit";
import { styles as commonStyles } from "../styles/commonStyles";


function StudentTasksPage() {

    const [query, setQuery] = useState("");
    const { courseId } = useParams();

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

    const course = courseId ? kurssit.find((k) => k.id === parseInt(courseId)) : null;

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

                {/* Navigointipalkit */}
                <div style={{ marginTop: "-10px", marginBottom: "30px" }}>
                    <ds-link ds-text="Kotisivu" ds-weight="bold" ds-href="/" ds-icon="chevron-forward" />
                    <ds-link ds-text={course.nimi} ds-weight="bold" ds-href="/studentCourses" />
                </div>

                <h1 style={dsStyles.pageTitle}>Tehtävät</h1>
                <p style={commonStyles.divider}></p>

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
                            ds-url={`/studentCourses/${courseId}/studentTasks/${task.id}/studentGradings`}
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

export default StudentTasksPage;