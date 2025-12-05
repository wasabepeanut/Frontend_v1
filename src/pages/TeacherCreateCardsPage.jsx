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

    // Year for breadcrumbs
    const year = vuosikurssit.find((y) => y.id === parseInt(yearId));
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
                        ds-text="Luo kortit"
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

                <ds-combobox
                    style={dsStyles.textInput}
                    ds-label="Komponentit"
                    ds-filtering-strategy="none"
                >
                    {(kortit.sarakkeet || []).map((s, i) => (
                        <ds-option key={i} ds-value={s}>{s}</ds-option>
                    ))}
                </ds-combobox>
                    
                <div style={{...dsStyles.buttonContainer, marginTop: "-190px", marginBottom: "90px"}}>
                    <ds-button
                    onClick={() => { alert("Kortti luotu!"); }}
                    ds-value="Uusi komponentti"
                    ds-variant="supplementary"
                    ds-icon="add"
                    ds-colour="blue"
                />
                </div>
                <ds-button
                    onClick={() => { alert("Kortti luotu!"); }}
                    ds-value="Luo kortti"
                    ds-variant="primary"
                    ds-full-width="true"
                />
                <ds-button
                    onClick={() => navigate(`/teacherYears/${yearId}/teacherCourses/${courseId}/groups`)}
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