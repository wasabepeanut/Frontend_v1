import LayoutCard from "../components/LayoutCard";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { styles } from "../styles/commonStyles";
import { dsStyles } from "../styles/dsStyles";
import { vuosikurssit } from "../mockData/vuosikurssit";
import { kurssit } from "../mockData/kurssit";
import { tehtavat } from "../mockData/tehtavat";



function TeacherGradings() {
    const [query, setQuery] = useState("");
    const { courseId, yearId, groupId, studentId, taskId } = useParams();

    // Year for breadcrumbs
    const year = vuosikurssit.find((y) => y.id === parseInt(yearId));
    const course = kurssit.find((c) => c.id === parseInt(courseId));
    const task = tehtavat.find((t) => t.id === parseInt(taskId));


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
                    ds-text={`Opiskelijat`}
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

        </LayoutCard>
    </div>;
}
export default TeacherGradings;