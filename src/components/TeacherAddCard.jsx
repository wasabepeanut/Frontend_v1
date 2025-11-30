import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LayoutCard from "./LayoutCard";
import { teacherAddCardStyles as styles } from "../styles/commonStyles";
import { dsStyles } from "../styles/dsStyles";
import { vuosikurssit } from "../mockData/vuosikurssit";

function TeacherAddCard({ courseName }) {
  const [cards, setCards] = useState([]);
  const [newCardName, setNewCardName] = useState("");
  const [savedCards, setSavedCards] = useState([]);
  const { yearId } = useParams();

  // Lisää uusi kortti /TeacherCards
  const addCard = () => {
    if (!newCardName.trim()) return;
    setCards(prev => [
      { name: newCardName, columns: [], newColumnName: "", rows: [] },
      ...prev
    ]);
    setNewCardName("");
  };

  // Get year info for breadcrumbs
  const year = vuosikurssit.find((y) => y.id === parseInt(yearId));


  const deleteCard = (index) => {
    const newCards = [...cards];
    newCards.splice(index, 1);
    setCards(newCards);
  };

  const addColumn = (cardIndex) => {
    const newCards = [...cards];
    const colName = newCards[cardIndex].newColumnName.trim();
    if (!colName) return;

    newCards[cardIndex].columns.push({
      name: colName,
      type: "text",
      options: [],
      optionsRaw: "",
      responder: "student"
    });

    newCards[cardIndex].rows = newCards[cardIndex].rows.map(row => ({
      ...row,
      [colName]: newCards[cardIndex].columns.find(c => c.name === colName)?.type === "checkbox" ? false : ""
    }));

    newCards[cardIndex].newColumnName = "";
    setCards(newCards);
  };

  const addRow = (cardIndex) => {
    const newCards = [...cards];
    const row = {};
    newCards[cardIndex].columns.forEach(col => {
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
    newCards[cardIndex].rows = newCards[cardIndex].rows.map(row => {
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
    newCards[cardIndex].columns[colIndex].name = value;
    newCards[cardIndex].rows = newCards[cardIndex].rows.map(row => {
      const newRow = { ...row };
      newRow[value] = newRow[oldName];
      delete newRow[oldName];
      return newRow;
    });
    setCards(newCards);
  };

  const handleColumnTypeChange = (cardIndex, colIndex, value) => {
    const newCards = [...cards];
    newCards[cardIndex].columns[colIndex].type = value;

    newCards[cardIndex].rows = newCards[cardIndex].rows.map(row => {
      const colName = newCards[cardIndex].columns[colIndex].name;
      if (value === "checkbox") row[colName] = false;
      else if (value === "radio") row[colName] = "";
      else row[colName] = "";
      return row;
    });

    setCards(newCards);
  };

  const handleColumnOptionsChange = (cardIndex, colIndex, value) => {
    const newCards = [...cards];
    newCards[cardIndex].columns[colIndex].optionsRaw = value;
    newCards[cardIndex].columns[colIndex].options = value.split(", ");
    setCards(newCards);
  };

  const handleResponderChange = (cardIndex, colIndex, value) => {
    const newCards = [...cards];
    newCards[cardIndex].columns[colIndex].responder = value;
    setCards(newCards);
  };

  const handleCellChange = (cardIndex, rowIndex, colName, value) => {
    const newCards = [...cards];
    const column = newCards[cardIndex].columns.find(c => c.name === colName);

    // Estetään muokkaus jos responder on student
    if (column.responder === "student") return;

    newCards[cardIndex].rows[rowIndex][colName] = value;
    setCards(newCards);
  };

  const saveCard = (cardIndex) => {
    const cardToSave = JSON.parse(JSON.stringify(cards[cardIndex])); // syväkopio tallennettavaksi
    setSavedCards(prev => [...prev, cardToSave]);

    // Poistetaan kortti cards-listasta, jotta muokkauslomake katoaa
    const newCards = [...cards];
    newCards.splice(cardIndex, 1);
    setCards(newCards);
  };


  // Renderöidään komponentti
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
          <ds-link ds-text="Kotisivu" ds-icon="chevron_forward" ds-weight="bold" ds-href="/" />
          <ds-link ds-text="Lukuvuodet" ds-icon="chevron_forward" ds-weight="bold" ds-href="/teacherYears" />
          {year && (
            <ds-link
              ds-text={year.nimi}
              ds-icon="chevron_forward"
              ds-weight="bold"
              ds-href={`/teacherYears/${yearId}/teacherCourses`}
            />
          )}
          <ds-link
            ds-text="Kurssit"
            ds-icon="chevron_forward"
            ds-weight="bold"
            ds-href={
              yearId
                ? `/teacherYears/${yearId}/teacherCourses`
                : "/teacherCourses"
            }
          />
          <ds-link
            ds-text="Ryhmät ja kortit"
            ds-icon="chevron_forward"
            ds-weight="bold"
            ds-href={
              yearId
                ? `/teacherYears/${yearId}/teacherCourses/${courseName}`
                : `/teacherCourses/${courseName}`
            }
          />
          {courseName && (
            <ds-link
              ds-text="Suoritekorttien luonti"
              ds-icon="chevron_forward"
              ds-weight="bold"
              ds-href={
                yearId
                  ? `/teacherYears/${yearId}/teacherCourses/${courseName}/teacherAddCards`
                  : `/teacherCourses/${courseName}/teacherAddCards`
              }
            />
          )}


        </div>

        {/* Sivun otsikko */}
        <h2 style={dsStyles.pageTitle}>Suoritekortit</h2>
        <p style={dsStyles.subTitle}>Luo ja hallinnoi tehtäväkortteja.</p>

        <ds-text-input 
          style={dsStyles.textInput}
          ds-placeholder="Uuden kortin nimi"
          value={newCardName}
          onChange={(e) => setNewCardName(e.target.value)}
        />
        <ds-button
          onClick={addCard}
          ds-value="Luo uusi suoritekortti"
          ds-required="true"
          ds-full-width="true"
          ds-icon="edit"
        >
        </ds-button>

        <div style={styles.cardsContainer}>
          {cards.map((card, ci) => (
            <div key={ci} style={styles.cardItem}>
              <div style={styles.cardHeader}>
                <h3>{card.name}</h3>
                <ds-button
                  style={{ marginLeft: "auto" }}
                  ds-value="Poista kortti"
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
                  value={card.newColumnName || ""}
                  onChange={(e) => {
                    const newCards = [...cards];
                    newCards[ci].newColumnName = e.target.value;
                    setCards(newCards);
                  }}
                />
                <ds-button
                  ds-value="Lisää sarake"
                  ds-variant="secondary"
                  ds-size="small"
                  onClick={() => addColumn(ci)}
                />
                <ds-button
                  ds-value="Lisää rivi"
                  ds-variant="secondary"
                  ds-size="small"
                  onClick={() => addRow(ci)}
                />
                <ds-button
                  style={{ marginLeft: "auto" }}
                  ds-value="Tallenna suoritekortti"
                  ds-variant="primary"
                  ds-size="small"
                  ds-icon="check"
                  onClick={() => saveCard(ci)}
                />
              </div>

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
                              value={col.name}
                              onChange={(e) => handleColumnNameChange(ci, colIndex, e.target.value)}
                            />
                            <div style={dsStyles.bodyText}>Kysymyksen tyyppi</div>
                            <ds-select 
                              ds-label=""
                              ds-placeholder="Valitse tyyppi"
                              ds-clearable="false"
                              value={col.type}
                              onChange={(e) => handleColumnTypeChange(ci, colIndex, e.target.value)}
                              >
                              <ds-option ds-value="text">Teksti</ds-option>
                              <ds-option ds-value="checkbox">Checkbox</ds-option>
                              <ds-option ds-value="radio">Radio</ds-option>
                            </ds-select>
                            
                            {col.type === "radio" && (
                              <>
                                <div>Vastausvaihtoehdot</div>
                                <input
                                  type="text"
                                  placeholder="Pilkuilla erotettuna"
                                  value={col.optionsRaw ?? ""}
                                  onChange={(e) => handleColumnOptionsChange(ci, colIndex, e.target.value)}
                                  style={styles.columnInput}
                                />
                              </>
                            )}
                            <div style={dsStyles.bodyText}>Vastaaja</div>
                            <ds-select
                              ds-label=""
                              ds-clearable="false"
                              value={col.responder}
                              onChange={(e) => handleResponderChange(ci, colIndex, e.target.value)}
                            >
                              <ds-option ds-value="teacher">Opettaja</ds-option>
                              <ds-option ds-value="student">Oppilas</ds-option>
                            </ds-select>
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
                              {col.type === "checkbox" ? (
                                <input
                                  type="checkbox"
                                  checked={row[col.name]}
                                  onChange={(e) => handleCellChange(ci, ri, col.name, e.target.checked)}
                                  style={styles.cellInputCheckbox}
                                />
                              ) : col.type === "radio" ? (
                                <div>
                                  {col.options?.map((opt, idx) => (
                                    <label key={idx} style={{ display: "block" }}>
                                      <input
                                        type="radio"
                                        name={`${ci}-${ri}-${colIndex}`}
                                        value={opt}
                                        checked={row[col.name] === opt}
                                        onChange={(e) => handleCellChange(ci, ri, col.name, e.target.value)}
                                      />
                                      {opt}
                                    </label>
                                  ))}
                                </div>
                              ) : (
                                <input
                                  type="text"
                                  value={row[col.name]}
                                  onChange={(e) => handleCellChange(ci, ri, col.name, e.target.value)}
                                  style={styles.cellInput}
                                />
                              )}
                            </td>
                          ))}
                          <td>
                            <button style={styles.deleteButtonSmall} onClick={() => deleteRow(ci, ri)}>Poista</button>
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

        {/* Tallennetut kortit sivun alaosassa */}
        <div style={styles.savedCardsContainer}>
          {savedCards.map((card, ci) => (
            <div key={ci} style={styles.savedCard}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h1 style={dsStyles.labelText}>{card.name}</h1>
                <ds-button
                  style={{ marginLeft: "auto" }}
                  ds-value="Poista kortti"
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
                        <th
                          key={colIndex}
                          style={{ border: "1px solid #ccc", padding: "6px", textAlign: "left" }}
                        >
                          {col.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {card.rows.map((row, ri) => (
                      <tr key={ri}>
                        {card.columns.map((col, colIndex) => (
                          <td
                            key={colIndex}
                            style={{ border: "1px solid #ccc", padding: "6px", textAlign: "left" }}
                          >
                            {col.type === "checkbox" ? (
                              <input type="checkbox" checked={row[col.name]} disabled />
                            ) : col.type === "radio" ? (
                              col.options.map((opt, idx) => (
                                <label key={idx} style={{ display: "block" }}>
                                  <input
                                    type="radio"
                                    name={`${ci}-${ri}-${colIndex}`}
                                    value={opt}
                                    checked={row[col.name] === opt}
                                    disabled
                                  />
                                  {opt}
                                </label>
                              ))
                            ) : (
                              row[col.name]
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
