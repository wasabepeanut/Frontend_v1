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


function TeacherAddComponentPage() {
    const navigate = useNavigate();
    const { courseId, yearId } = useParams();

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
                        ds-text="Luo kortti"
                        ds-icon="chevron_forward"
                        ds-weight="bold"
                        ds-href={`/teacherYears/${yearId}/teacherCourses/${courseId}/groups`}
                    />
                    <ds-link
                        ds-text="Uusi komponentti"
                        ds-weight="bold"
                        ds-href={`/teacherYears/${yearId}/teacherCourses/${courseId}/groups/teacherCreateCards`}
                    />
                </div>

                {/* Sivun otsikko */}
                <h1 style={dsStyles.pageTitle}>Uusi komponentti</h1>
                <p style={commonStyles.divider}></p>

                {/* Sisältö */}
                <ds-text-input
                    style={dsStyles.textInput}
                    ds-label="Komponentin nimi"
                />

                <ds-combobox
                    style={dsStyles.textInput}
                    ds-label="Komponentin tyyppi"
                    ds-filtering-strategy="dynamic"
                >
                    <ds-option ds-value="Tekstikenttä">Tekstikenttä</ds-option>
                    <ds-option ds-value="Valintaruutu">Valintaruutu</ds-option>
                    <ds-option ds-value="Pudotusvalikko">Pudotusvalikko</ds-option>
                </ds-combobox>

                <div style={dsStyles.buttonContainer}>
                    <ds-button
                        onClick={() => { alert("Komponentti lisätty!"); }}
                        ds-value="Lisää komponentti"
                        ds-variant="primary"
                        ds-full-width="true"
                    />
                    <ds-button
                        onClick={() => navigate(-1)}
                        ds-value="Peruuta"
                        ds-variant="secondary"
                        ds-full-width="true"
                    />
                </div>
            </LayoutCard>
        </div>
    )
}
export default TeacherAddComponentPage;