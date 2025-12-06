import React, { act, useState } from "react";
import { ryhmat } from "../mockData/ryhmat";
import { opiskelijat } from "../mockData/opiskelijat";
import { useNavigate, useParams } from "react-router-dom";
import LayoutCard from "../components/LayoutCard";
import { studentFrontStyles as styles } from "../styles/commonStyles";
import { dsStyles } from "../styles/dsStyles";
import { vuosikurssit } from "../mockData/vuosikurssit";
import { kurssit } from "../mockData/kurssit";
import { kortit } from "../mockData/kortit";
import { styles as commonStyles } from "../styles/commonStyles";


function TeacherCreateCardsPage() {
    const { courseId, yearId } = useParams();
    const navigate = useNavigate();
    const [components, setComponents] = useState([]);

    // Year for breadcrumbs
    const year = vuosikurssit.find((y) => y.id === parseInt(yearId));
    const course = kurssit.find((c) => c.id === parseInt(courseId));

    const addComponentRow = () => {
        setComponents([...components, { id: Date.now(), value: "" }]);
    };

    const deleteComponentRow = (id) => {
        setComponents(components.filter((comp) => comp.id !== id));
    };

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
                        ds-text="Luo kortti"
                        ds-weight="bold"
                        ds-href={`/teacherYears/${yearId}/teacherCourses/${courseId}/groups`}
                    />
                </div>

                {/* Sivun otsikko */}
                <h1 style={dsStyles.pageTitle}>Uusi kortti</h1>
                <p style={commonStyles.divider}></p>

                {/* Sisältö */}
                <ds-text-input
                    style={dsStyles.textInput}
                    ds-label="Kortin nimi"
                >
                </ds-text-input>
                <ds-combobox
                    style={dsStyles.textInput}
                    ds-label="Kurssi"
                    ds-filtering-strategy="dynamic"
                >
                    {(yearId ? kurssit.filter(c => c.vuosikurssiId === parseInt(yearId)) : kurssit).map((c) => (
                        <ds-option key={c.id} ds-value={c.id}>{c.nimi} {c.kurssitunnus ? `(${c.kurssitunnus})` : ''}</ds-option>
                    ))}
                </ds-combobox>

                

                {components.map((comp, idx) => (
                    <div key={comp.id} style={{ display: "flex", gap: "8px", alignItems: "flex-end" }}>
                        <ds-combobox
                            style={{ ...dsStyles.textInput, flex: 1 }}
                            ds-label={`Komponentti ${idx + 1}`}
                            ds-filtering-strategy="none"
                        >
                            {(kortit.sarakkeet || []).map((s, i) => (
                                <ds-option key={i} ds-value={s}>{s}</ds-option>
                            ))}
                        </ds-combobox>
                        <ds-button
                            onClick={() => deleteComponentRow(comp.id)}
                            ds-variant="supplementary"
                            ds-icon="close-small"
                            ds-colour="black"
                            style={{ ...dsStyles.bodyText, marginBottom: "20px", fontSize: "14px" }}
                        />
                    </div>
                ))}

                <div style={{ ...dsStyles.buttonContainer, marginTop: "-190px", marginBottom: "90px" }}>
                    <ds-button
                        onClick={addComponentRow}
                        ds-value="Lisää komponentti"
                        ds-variant="supplementary"
                        ds-icon="add"
                        ds-colour="blue"
                    />
                    <ds-button
                        onClick={() => navigate(`/teacherYears/${yearId}/teacherCourses/${courseId}/groups/teacherCreateCards/teacherAddComponent`)}
                        ds-value="Luo komponentti"
                        ds-variant="supplementary"
                        ds-colour="blue"
                    />
                </div>
                <ds-button
                    onClick={() => { alert("Kortti luotu!"); }}
                    ds-value="Tallenna kortti"
                    ds-variant="primary"
                    ds-full-width="true"
                />
                <ds-button
                    onClick={() => navigate(-1)}
                    ds-value="Peruuta"
                    ds-variant="secondary"
                    ds-full-width="true"
                    style={{ marginTop: "10px" }}
                />

            </LayoutCard>
        </div>
    );
}
export default TeacherCreateCardsPage;