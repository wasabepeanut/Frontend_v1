import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LayoutCard from "./LayoutCard";
import { teacherAddCardStyles as styles } from "../styles/commonStyles";
import { dsStyles } from "../styles/dsStyles";
import { vuosikurssit } from "../mockData/vuosikurssit";
import { kurssit } from "../mockData/kurssit";
import { styles as commonStyles } from "../styles/commonStyles";

function TeacherAddCard({ courseId }) {
  const [cards, setCards] = useState([]);
  const [newCardName, setNewCardName] = useState("");
  const [savedCards, setSavedCards] = useState([]);
  const { yearId } = useParams();

  // Helper to safely read event values from both web components and native inputs
  const safeEventValue = (e) => {
    if (!e) return undefined;
    // web components often put payload in detail
    if (e.detail && typeof e.detail.value !== "undefined") return e.detail.value;
    if (e.detail && typeof e.detail.checked !== "undefined") return e.detail.checked;
    // fallback to target.value / target.checked (native inputs)
    if (e.target && typeof e.target.value !== "undefined") return e.target.value;
    if (e.target && typeof e.target.checked !== "undefined") return e.target.checked;
    return undefined;
  };

  // Lisää uusi kortti
  const addCard = () => {
    if (!newCardName.trim()) return;
    setCards((prev) => [
      { name: newCardName, columns: [], newColumnName: "", rows: [] },
      ...prev,
    ]);
    setNewCardName("");
  };

  // Get year info for breadcrumbs
  const year = vuosikurssit.find((y) => y.id === parseInt(yearId));

  // Get course info for breadcrumbs
  const course = kurssit.find((c) => c.id === parseInt(courseId));
  console.log(course);

  const deleteCard = (index) => {
    const newCards = [...cards];
    newCards.splice(index, 1);
    setCards(newCards);
  };

  const addColumn = (cardIndex) => {
    const newCards = [...cards];
    const colName = newCards[cardIndex].newColumnName?.trim();
    if (!colName) return;

    newCards[cardIndex].columns.push({
      name: colName,
      type: "text", // default
      options: [],
      optionsRaw: "",
      responder: "student",
      required: false,
    });

    // ensure each existing row gets the new column with default value
    newCards[cardIndex].rows = newCards[cardIndex].rows.map((row) => ({
      ...row,
      [colName]: false, // default false; will be normalized below
    }));

    // normalize default values according to type (text -> "", checkbox -> false)
    const col = newCards[cardIndex].columns[newCards[cardIndex].columns.length - 1];
    if (col.type === "checkbox") {
      newCards[cardIndex].rows = newCards[cardIndex].rows.map((row) => ({
        ...row,
        [colName]: false,
      }));
    } else {
      newCards[cardIndex].rows = newCards[cardIndex].rows.map((row) => ({
        ...row,
        [colName]: "",
      }));
    }

    newCards[cardIndex].newColumnName = "";
    setCards(newCards);
  };

  const addRow = (cardIndex) => {
    const newCards = [...cards];
    const row = {};
    newCards[cardIndex].columns.forEach((col) => {
      if (col.type === "checkbox") row[col.name] = false;
      else if (col.type === "radio") row[col.name] = "";
      else row[col.name] = "";
    });
    newCards[cardIndex].rows.push(row);
    setCards(newCards);
  };

  const deleteColumn = (cardIndex, colIndex) => {
    const newCards = [...cards];
    const colName = newCards[cardIndex].columns[colIndex].name;
    newCards[cardIndex].columns.splice(colIndex, 1);
    newCards[cardIndex].rows = newCards[cardIndex].rows.map((row) => {
      const newRow = { ...row };
      delete newRow[colName];
      return newRow;
    });
    setCards(newCards);
  };

  const deleteRow = (cardIndex, rowIndex) => {
    const newCards = [...cards];
    newCards[cardIndex].rows.splice(rowIndex, 1);
    setCards(newCards);
  };

  const handleColumnNameChange = (cardIndex, colIndex, value) => {
    const newCards = [...cards];
    const oldName = newCards[cardIndex].columns[colIndex].name;
    const newName = value;
    newCards[cardIndex].columns[colIndex].name = newName;

    newCards[cardIndex].rows = newCards[cardIndex].rows.map((row) => {
      const newRow = { ...row };
      newRow[newName] = newRow[oldName];
      delete newRow[oldName];
      return newRow;
    });

    setCards(newCards);
  };

  const handleColumnTypeChange = (cardIndex, colIndex, value) => {
    const newCards = [...cards];
    const col = newCards[cardIndex].columns[colIndex];
    col.type = value;

    // Normalize existing rows for this column based on new type
    newCards[cardIndex].rows = newCards[cardIndex].rows.map((row) => {
      const newRow = { ...row };
      if (value === "checkbox") newRow[col.name] = !!newRow[col.name] && newRow[col.name] !== "";
      else if (value === "radio") newRow[col.name] = newRow[col.name] || "";
      else newRow[col.name] = newRow[col.name] || "";
      return newRow;
    });

    setCards(newCards);
  };

  const handleColumnOptionsChange = (cardIndex, colIndex, value) => {
    const newCards = [...cards];
    // store raw string
    newCards[cardIndex].columns[colIndex].optionsRaw = value;
    // parse comma-separated options: split by comma, trim, remove empty
    newCards[cardIndex].columns[colIndex].options = value
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    setCards(newCards);
  };

  const handleResponderChange = (cardIndex, colIndex, value) => {
    const newCards = [...cards];
    newCards[cardIndex].columns[colIndex].responder = value;
    setCards(newCards);
  };

  const handleRequiredChange = (cardIndex, colIndex, checked) => {
    const newCards = [...cards];
    newCards[cardIndex].columns[colIndex].required = !!checked;
    setCards(newCards);
  };

  const handleCellChange = (cardIndex, rowIndex, colName, value) => {
    const newCards = [...cards];
    const column = newCards[cardIndex].columns.find((c) => c.name === colName);

    // Prevent editing if responder is 'student'
    if (column && column.responder === "student") return;

    newCards[cardIndex].rows[rowIndex][colName] = value;
    setCards(newCards);
  };

  const saveCard = (cardIndex) => {
    const cardToSave = JSON.parse(JSON.stringify(cards[cardIndex])); // deep copy
    setSavedCards((prev) => [...prev, cardToSave]);

    // remove from editing list
    const newCards = [...cards];
    newCards.splice(cardIndex, 1);
    setCards(newCards);
  };

  return (
    <div style={styles.app}>
      <LayoutCard
        header={
          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <ds-icon ds-name="ds_flame" ds-size="4rem" ds-colour="ds-palette-black-95" />
          </div>
        }
        footer={<p style={dsStyles.footer}>@Helsingin Yliopisto</p>}
      >
        {/* Breadcrumbs */}
        <div style={{ marginTop: "-10px", marginBottom: "30px" }}>
          <ds-link ds-text="Kotisivu" ds-icon="chevron_forward" ds-weight="bold" ds-href="/" />
          {year && (
            <ds-link
              ds-text={year.nimi}
              ds-icon="chevron_forward"
              ds-weight="bold"
              ds-href={`/teacherYears/${yearId}/teacherCourses`}
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
            ds-text="Luo uusi kortti"
            ds-icon="chevron_forward"
            ds-weight="bold"
            ds-href={`/teacherYears/${yearId}/teacherCourses/${courseId}/groups`}
          />
        </div>

        <h2 style={dsStyles.pageTitle}>Uuden kortin luonti</h2>
        <p style={commonStyles.divider}></p>
        <p style={dsStyles.subTitle}>Luo ja hallinnoi tehtäväkortteja.</p>

        <ds-text-input
          style={dsStyles.textInput}
          ds-placeholder="Uuden kortin nimi"
          ds-value={newCardName}
          onInput={(e) => {
            const v = safeEventValue(e);
            setNewCardName(typeof v === "string" ? v : e.target?.value ?? "");
          }}
        />

        <ds-button
          onClick={addCard}
          ds-value="Luo uusi suoritekortti"
          ds-required="true"
          ds-full-width="true"
          ds-icon="edit"
        />

        <div style={styles.cardsContainer}>
          {cards.map((card, ci) => (
            <div key={ci} style={styles.cardItem}>
              <div style={{ ...dsStyles.labelText, display: "flex", alignItems: "center", justifyContent: "space-between", gap: "8px", marginBottom: "10px" }}>
                <h3 style={{ margin: 0 }}>{card.name}</h3>
                <ds-button
                  ds-value="Poista kortti"
                  ds-variant="secondary"
                  ds-colour="black"
                  ds-size="small"
                  ds-icon="close"
                  onClick={() => deleteCard(ci)}
                />
              </div>

              <div style={styles.columnRow}>
                <ds-text-input
                  style={dsStyles.textInput}
                  ds-placeholder="Uuden sarakkeen nimi"
                  ds-value={card.newColumnName || ""}
                  onInput={(e) => {
                    const v = safeEventValue(e);
                    const newCards = [...cards];
                    newCards[ci].newColumnName = typeof v === "string" ? v : e.target?.value ?? "";
                    setCards(newCards);
                  }}
                />
                <ds-button ds-value="Lisää sarake" ds-variant="secondary" ds-size="small" onClick={() => addColumn(ci)} />
                <ds-button ds-value="Lisää rivi" ds-variant="secondary" ds-size="small" onClick={() => addRow(ci)} />
                <ds-button
                  style={{ marginLeft: "auto" }}
                  ds-value="Tallenna suoritekortti"
                  ds-variant="primary"
                  ds-size="small"
                  ds-icon="check"
                  onClick={() => saveCard(ci)}
                />
              </div>

              {/* Columns editor */}
              {card.columns.length > 0 && (
                <div style={{ overflowX: "auto" }}>
                  <table style={styles.table}>
                    <thead>
                      <tr>
                        {card.columns.map((col, colIndex) => (
                          <th key={colIndex} style={{ ...styles.tableHeader, width: "200px" }}>
                            <div style={dsStyles.bodyText}>Sarakkeen nimi</div>
                            <ds-text-input
                              style={dsStyles.textInput}
                              ds-placeholder="Sarakkeen nimi"
                              ds-value={col.name}
                              onInput={(e) => {
                                const v = safeEventValue(e);
                                handleColumnNameChange(ci, colIndex, typeof v === "string" ? v : e.target?.value ?? "");
                              }}
                            />

                            <div style={{ marginTop: 8 }}>
                              <div style={dsStyles.bodyText}>Vastaaja</div>
                              <ds-select
                                ds-label=""
                                ds-clearable="false"
                                ds-value={col.responder}
                                onChange={(e) => handleResponderChange(ci, colIndex, e.detail?.value ?? col.responder)}
                              >
                                <ds-option ds-value="student">Oppilas</ds-option>
                                <ds-option ds-value="teacher">Opettaja</ds-option>
                              </ds-select>
                            </div>

                            <div style={{ marginTop: 8 }}>
                              <div style={dsStyles.bodyText}>Kysymyksen tyyppi</div>

                              {/* OPTION A: three stacked ds-radio-button */}
                              <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 6 }}>
                                <ds-radio-button
                                  name={`type-${ci}-${colIndex}`}
                                  ds-text="Teksti"
                                  ds-value="text"
                                  ds-checked={col.type === "text"}
                                  onChange={(e) => handleColumnTypeChange(ci, colIndex, e.detail?.value ?? "text")}
                                />
                                <ds-radio-button
                                  name={`type-${ci}-${colIndex}`}
                                  ds-text="Checkbox"
                                  ds-value="checkbox"
                                  ds-checked={col.type === "checkbox"}
                                  onChange={(e) => handleColumnTypeChange(ci, colIndex, e.detail?.value ?? "checkbox")}
                                />
                                <ds-radio-button
                                  name={`type-${ci}-${colIndex}`}
                                  ds-text="Monivalinta (Radio)"
                                  ds-value="radio"
                                  ds-checked={col.type === "radio"}
                                  onChange={(e) => handleColumnTypeChange(ci, colIndex, e.detail?.value ?? "radio")}
                                />
                              </div>
                            </div>

                            {/* Radio options input (comma-separated) */}
                            {col.type === "radio" && (
                              <>
                                <div style={dsStyles.bodyText} >Vastausvaihtoehdot (pilkuilla erotettuna)</div>
                                <ds-text-input
                                  style={dsStyles.textInput}
                                  ds-placeholder="Esim: Kyllä, Ei, Ehkä"
                                  ds-value={col.optionsRaw ?? ""}
                                  onInput={(e) => {
                                    const v = safeEventValue(e);
                                    handleColumnOptionsChange(ci, colIndex, typeof v === "string" ? v : e.target?.value ?? "");
                                  }}
                                />
                              </>
                            )}


                            <div style={{ marginTop: 8 }}>

                            </div>

                          </th>
                        ))}
                        <th></th>
                      </tr>
                    </thead>

                    <tbody>
                      {card.rows.map((row, ri) => (
                        <tr key={ri}>
                          {card.columns.map((col, colIndex) => (
                            <td key={colIndex} style={{ ...styles.cellTd, width: "200px" }}>
                              {/* Render cell editor according to column type using ds-components */}
                              {col.type === "checkbox" ? (
                                <ds-checkbox
                                  ds-text=""
                                  ds-checked={!!row[col.name]}
                                  onChange={(e) => handleCellChange(ci, ri, col.name, !!(e.detail?.checked ?? e.target?.checked))}
                                />
                              ) : col.type === "radio" ? (
                                <div>
                                  {col.options?.map((opt, idx) => (
                                    <ds-radio-button
                                      key={idx}
                                      name={`radio-${ci}-${ri}-${colIndex}`}
                                      ds-text={opt}
                                      ds-value={opt}
                                      ds-checked={row[col.name] === opt}
                                      onChange={(e) => handleCellChange(ci, ri, col.name, e.detail?.value ?? e.target?.value)}
                                    />
                                  ))}
                                </div>
                              ) : (
                                <ds-text-input
                                  ds-value={row[col.name] ?? ""}
                                  onInput={(e) => handleCellChange(ci, ri, col.name, e.detail?.value ?? e.target?.value)}
                                />
                              )}
                            </td>
                          ))}
                          <td>
                            <ds-button
                              ds-value="Poista rivi"
                              ds-variant="supplementary"
                              ds-colour="black"
                              ds-size="small"
                              ds-icon="close"
                              onClick={() => deleteRow(ci, ri)}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Saved cards */}
        <div style={styles.savedCardsContainer}>
          {savedCards.map((card, ci) => (
            <div key={ci} style={styles.savedCard}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h1 style={dsStyles.labelText}>{card.name}</h1>
                <ds-button
                  style={{ marginLeft: "auto" }}
                  ds-value="Poista kortti"
                  ds-variant="secondary"
                  ds-colour="black"
                  ds-size="small"
                  ds-icon="close"
                  onClick={() => {
                    const newSaved = [...savedCards];
                    newSaved.splice(ci, 1);
                    setSavedCards(newSaved);
                  }}
                />
              </div>

              {card.columns.length > 0 && (
                <table style={{ ...styles.table, borderCollapse: "collapse", width: "100%" }}>
                  <thead>
                    <tr>
                      {card.columns.map((col, colIndex) => (
                        <th key={colIndex} style={{ border: "1px solid #ccc", padding: "6px", textAlign: "left" }}>
                          <span style={dsStyles.bodyText}>{col.name}</span>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {card.rows.map((row, ri) => (
                      <tr key={ri}>
                        {card.columns.map((col, colIndex) => (
                          <td key={colIndex} style={{ border: "1px solid #ccc", padding: "6px", textAlign: "left" }}>
                            {col.type === "checkbox" ? (
                              <input type="checkbox" checked={row[col.name]} disabled />
                            ) : col.type === "radio" ? (
                              col.options.map((opt, idx) => (
                                <label key={idx} style={{ display: "block" }}>
                                  <input type="radio" name={`${ci}-${ri}-${colIndex}`} value={opt} checked={row[col.name] === opt} disabled />
                                  <span style={dsStyles.bodyText}>{opt}</span>
                                </label>
                              ))
                            ) : (
                              <span style={dsStyles.bodyText}>{row[col.name]}</span>
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          ))}
        </div>
      </LayoutCard>
    </div>
  );
}

export default TeacherAddCard;
