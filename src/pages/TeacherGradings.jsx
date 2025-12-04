import LayoutCard from "../components/LayoutCard";
import { useNavigate, useParams } from "react-router-dom";
import React, { useState } from "react";
import { styles } from "../styles/commonStyles";
import { dsStyles } from "../styles/dsStyles";
import { vuosikurssit } from "../mockData/vuosikurssit";
import { kurssit } from "../mockData/kurssit";
import { tehtavat } from "../mockData/tehtavat";
import GradeSlider from "../components/GradeSlider";
import { styles as commonStyles } from "../styles/commonStyles";
import { opiskelijat } from "../mockData/opiskelijat";


function TeacherGradings() {
    const [query, setQuery] = useState("");
    const [grade, setGrade] = useState(1);
    const navigate = useNavigate();
    const { courseId, yearId, groupId, studentId, taskId } = useParams();

    // Year for breadcrumbs
    const year = vuosikurssit.find((y) => y.id === parseInt(yearId));
    const course = kurssit.find((c) => c.id === parseInt(courseId));
    const task = tehtavat.find((t) => t.id === parseInt(taskId));
    const student = opiskelijat.find((s) => s.id === parseInt(studentId));


    return <div style={styles.app}>
        <LayoutCard
            header={
                <div style={{}}>
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
                <ds-link
                    ds-text={task.kuvaus}
                    ds-weight="bold"
                    ds-href={`/teacherYears/${yearId}/teacherCourses/${courseId}/groups/${groupId}/${studentId}/studentTasks`}
                />
            </div>

            <h1 style={dsStyles.pageTitle}>{task.kuvaus}</h1>
            <p style={commonStyles.divider} />

            <div>
                <h2 style={dsStyles.labelText}>Arviointi:</h2>
                <GradeSlider
                    value={grade}
                    onChange={setGrade} />
            </div>

            <ds-text-area
                style={{ marginTop: "15px" }}
                ds-full-width="true"
                ds-placeholder="Palaute opiskelijalle..."
            >
            </ds-text-area>

            <h2 style={dsStyles.labelText}>Suoritus:</h2>
            <ds-radio-button-group>
                <ds-radio-button
                    ds-text="Hyväksytty"
                    ds-value="accepted"
                    ds-checked={true}
                />
                <ds-radio-button
                    ds-text="Kesken"
                    ds-value="pending"
                    ds-checked={false}
                />
                <ds-radio-button
                    ds-text="Hylätty"
                    ds-value="rejected"
                    ds-checked={false}
                />
            </ds-radio-button-group>

            <div style={{...dsStyles.buttonContainer, marginTop: "-160px"}}>
                <ds-button
                    ds-value="Tallenna"
                    ds-variant="primary"
                />
                <ds-button
                    onClick={() => navigate(`/teacherYears/${yearId}/teacherCourses/${courseId}/groups/${groupId}/${studentId}/studentTasks`)}
                    ds-value="Peruuta"
                    ds-variant="secondary"
                />
            </div>

        </LayoutCard >
    </div >;
}
export default TeacherGradings;