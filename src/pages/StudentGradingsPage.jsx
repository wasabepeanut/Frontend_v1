import React, { useState } from "react";
import LayoutCard from "../components/LayoutCard";
import { styles } from "../styles/commonStyles";
import { dsStyles } from "../styles/dsStyles";
import { useNavigate, useParams } from "react-router-dom";
import { tehtavat } from "../mockData/tehtavat";
import { kurssit } from "../mockData/kurssit";
import { styles as commonStyles } from "../styles/commonStyles";
import GradeSlider from "../components/GradeSlider";
import { openArvioinnit } from "../mockData/openArvioinnit";
import { opettajat } from "../mockData/opettajat"


function StudentGradingsPage() {
    const navigate = useNavigate();
    const [query, setQuery] = useState("");
    const { courseId, taskId } = useParams();
    const [grade, setGrade] = useState(1);

    const course = courseId ? kurssit.find((k) => k.id === parseInt(courseId)) : null;
    const task = taskId ? tehtavat.find((t) => t.id === parseInt(taskId)) : null;
    const arviointi = openArvioinnit.find((a => a.tehtavaId === task.id));
    const opettaja = arviointi ? opettajat.find((o) => o.id === arviointi.opettajaId) : null;


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
                    <ds-link ds-text="Kotisivu"
                        ds-weight="bold"
                        ds-href="/"
                        ds-icon="chevron-forward"
                    />
                    <ds-link
                        ds-text={course.nimi}
                        ds-weight="bold"
                        ds-href="/studentCourses"
                        ds-icon="chevron-forward"
                    />
                    <ds-link
                        ds-text={task.kuvaus}
                        ds-weight="bold"
                        ds-href={`/studentCourses/${courseId}/studentTasks`}
                    />
                </div>

                <h1 style={dsStyles.pageTitle}>{task.kuvaus}</h1>
                <p style={commonStyles.divider}></p>

                {/* Arviointiosiot */}
                <ds-accordion>
                    <div slot="header">Itsearviointi</div>
                    <div slot="content">
                        <GradeSlider
                            value={grade}
                            onChange={setGrade} />
                        <ds-text-area
                            style={{ marginTop: "15px" }}
                            ds-full-width="true"
                            ds-placeholder="Oma arviointi..."
                        ></ds-text-area>
                    </div>
                </ds-accordion>
                <ds-accordion>
                    <div slot="header">Opettajan arviointi</div>
                    <div slot="content">

                        {/* DIMMED, NON-EDITABLE SLIDER */}
                        <div style={{ pointerEvents: "none", cursor: "not-allowed" }}>
                            <GradeSlider
                                value={arviointi ? arviointi.arvio : 1}
                                onChange={() => { }}
                            />
                        </div>

                        <ds-text-area
                            style={{ marginTop: "15px" }}
                            ds-full-width="true"
                            ds-placeholder="Palaute opiskelijalle..."
                            ds-readonly="true"
                            ds-value={arviointi ? arviointi.kuvaus : ""}
                        ></ds-text-area>

                        <h2 style={dsStyles.labelText}>Hyväksytty:</h2>

                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                marginTop: "10px"
                            }}
                        >
                            <p>{arviointi.pvm}</p>
                            <p>
                                {opettaja ? `${opettaja.etunimi} ${opettaja.sukunimi}` : "Tuntematon opettaja"}
                            </p>
                        </div>
                    </div>
                </ds-accordion>

                {/* Tallenna ja Peruuta napit */}
                <div style={{ ...dsStyles.buttonContainer, marginTop: "-160px" }}>
                    <ds-button
                        ds-value="Tallenna"
                        ds-variant="primary"
                    />
                    <ds-button
                        onClick={() => navigate(`/studentCourses/${courseId}/studentTasks`)}
                        ds-value="Peruuta"
                        ds-variant="secondary"
                    />
                </div>
            </LayoutCard>
        </div>
    );
}

export default StudentGradingsPage;