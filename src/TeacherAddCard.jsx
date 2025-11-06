import React, { useState } from "react";
import logo from "./assets/logo.png";

function TeacherAddCard({ courseName, navigateBack }) {
  const [cards, setCards] = useState([]);
  const [newCardName, setNewCardName] = useState("");

  const addCard = () => {
    if (!newCardName.trim()) return;
    setCards(prev => [
      { name: newCardName, columns: [], newColumnName: "", rows: [] },
      ...prev
    ]);
    setNewCardName("");
  };

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
      const oldVal = row[newCards[cardIndex].columns[colIndex].name];
      if (value === "checkbox" && typeof oldVal !== "boolean")
        newCards[cardIndex].rows.forEach(r => r[newCards[cardIndex].columns[colIndex].name] = false);
      if (value === "radio")
        newCards[cardIndex].rows.forEach(r => r[newCards[cardIndex].columns[colIndex].name] = "");
      if (value !== "checkbox" && value !== "radio")
        newCards[cardIndex].rows.forEach(r => {
          if (typeof r[newCards[cardIndex].columns[colIndex].name] === "boolean")
            r[newCards[cardIndex].columns[colIndex].name] = "";
        });
      return row;
    });

    setCards(newCards);
  };

  const handleColumnOptionsChange = (cardIndex, colIndex, value) => {
    const newCards = [...cards];
    newCards[cardIndex].columns[colIndex].optionsRaw = value;
    newCards[cardIndex].columns[colIndex].options = value.split(",");
    setCards(newCards);
  };

  const handleResponderChange = (cardIndex, colIndex, value) => {
    const newCards = [...cards];
    newCards[cardIndex].columns[colIndex].responder = value;
    setCards(newCards);
  };

  const handleCellChange = (cardIndex, rowIndex, colName, value) => {
    const newCards = [...cards];
    newCards[cardIndex].rows[rowIndex][colName] = value;
    setCards(newCards);
  };

  return (
    <div style={styles.app}>
      <div style={styles.card}>
      <img src={logo} alt="Logo" style={styles.logo} />
    <button style={styles.backButton} onClick={navigateBack}>
            ← Takaisin kursseille
          </button>

        <div>
          <h1 style={styles.appNameMini}>DigiDens</h1>
              <p style={styles.subtitle}>
            Tervetuloa opettajan suoritekorttinäkymään! <br />
          </p>
          <div style={styles.header}>
      
       
        </div>
          <h2 style={styles.pageTitle}>Suoritekortit</h2>
             <div style={styles.header}>
          {courseName && <span style={styles.courseNameHeader}>{courseName}</span>}
        </div>
          <p style={styles.subtitle2}>
            Luo ja hallinnoi tehtäväkortteja.
          </p>
        </div>

        <div style={styles.taskContainer}>
          <input
            type="text"
            placeholder="Uuden kortin nimi"
            value={newCardName}
            onChange={(e) => setNewCardName(e.target.value)}
            style={styles.input}
          />
          <button style={styles.button} onClick={addCard}>Luo uusi kortti</button>
        </div>

        <div style={styles.cardsContainer}>
          {cards.map((card, ci) => (
            <div key={ci} style={styles.cardItem}>
              <div style={styles.cardHeader}>
                <h3>{card.name}</h3>
                <button style={styles.deleteButton} onClick={() => deleteCard(ci)}>Poista kortti</button>
              </div>

              <div style={styles.columnRow}>
                <input
                  type="text"
                  placeholder="Uuden sarakkeen nimi"
                  value={card.newColumnName || ""}
                  onChange={(e) => { 
                    const newCards = [...cards];
                    newCards[ci].newColumnName = e.target.value;
                    setCards(newCards);
                  }}
                  style={styles.input}
                />
                <button style={styles.smallButton} onClick={() => addColumn(ci)}>Lisää sarake</button>
                <button style={styles.smallButton} onClick={() => addRow(ci)}>Lisää rivi</button>
              </div>

              {card.columns.length > 0 && (
                <div style={{ overflowX: "auto" }}>
                  <table style={styles.table}>
                    <thead>
                      <tr>
                        {card.columns.map((col, colIndex) => (
                          <th key={colIndex} style={{ ...styles.tableHeader, width: "200px" }}>
                            <div>Sarakkeen nimi</div>
                            <input
                              type="text"
                              value={col.name}
                              onChange={(e) => handleColumnNameChange(ci, colIndex, e.target.value)}
                              style={styles.columnInput}
                            />
                            <div>Kysymyksen tyyppi</div>
                            <select
                              value={col.type}
                              onChange={(e) => handleColumnTypeChange(ci, colIndex, e.target.value)}
                              style={styles.selectInput}
                            >
                              <option value="text">Teksti</option>
                              <option value="checkbox">Checkbox</option>
                              <option value="radio">Radio</option>
                            </select>
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
                            <div>Vastaaja</div>
                            <select
                              value={col.responder}
                              onChange={(e) => handleResponderChange(ci, colIndex, e.target.value)}
                              style={styles.selectInput}
                            >
                              <option value="teacher">Opettaja</option>
                              <option value="student">Oppilas</option>
                            </select>
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

        <p style={styles.alatunniste}>Helsingin Yliopisto</p>
      </div>
    </div>
  );
}

const styles = {
  app: {
    minHeight: "100vh",
    width: "100vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#dcdcdc",
    padding: "20px",
    boxSizing: "border-box",
  },
  card: {
    width: "100%",
    maxWidth: "820px",
    minHeight: "980px",
    padding: "40px",
    boxSizing: "border-box",
    backgroundColor: "#ffffff",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  logo: {
    width: "50px",
    height: "auto",
    marginBottom: "1px",
  },
  appNameMini: {
    fontSize: "clamp(18px, 4vw, 1px)",
    fontWeight: "500",
    marginBottom: "2px",
    marginTop: "22px"
  },
  pageTitle: {
    fontSize: "clamp(20px, 3vw, 26px)",
    fontWeight: "500",
    marginBottom: "1px",
    marginTop: "70px",
  },
  subtitle2: {
    fontSize: "18px",
    color: "#000000ff",
    lineHeight: "1.2",
  },

    subtitle: {
    fontSize: "16px",
    color: "#5C5C5C",
    lineHeight: "1.2",
  },
  taskContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    flexGrow: 0,
    flexShrink: 0,
    overflowY: "visible",
  },
  cardsContainer: {
    marginTop: "20px",
    overflowY: "auto",
    maxHeight: "520px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "stretch",
    gap: "15px",
    flexGrow: 1,
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    width: "100%",
    boxSizing: "border-box",
  },
  button: {
    padding: "12px 20px",
    backgroundColor: "#48A39B",
    color: "#fff",
    border: "none",
    borderRadius: "25px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "500",
    width: "100%",
  },
  smallButton: {
    padding: "8px 15px",
    backgroundColor: "#48A39B",
    color: "#fff",
    border: "none",
    borderRadius: "15px",
    cursor: "pointer",
    fontSize: "14px",
  },
  deleteButton: {
    padding: "5px 10px",
    backgroundColor: "#000",
    color: "#fff",
    border: "1px solid #000",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "14px",
  },
  deleteButtonSmall: {
    padding: "3px 6px",
    backgroundColor: "#fff",
    color: "#000",
    border: "1px solid #000",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "12px",
    marginLeft: "5px",
  },
  cardItem: {
    border: "1px solid #ccc",
    padding: "15px",
    borderRadius: "10px",
    backgroundColor: "#f9f9f9",
    marginBottom: "20px",
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  columnRow: {
    display: "flex",
    gap: "10px",
    marginBottom: "10px",
    flexWrap: "wrap",
    alignItems: "center",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "10px",
  },
  tableHeader: {
    border: "1px solid #ccc",
    padding: "5px",
    verticalAlign: "top",
    minWidth: "150px",
  },
  columnInput: {
    width: "100%",
    padding: "5px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    marginBottom: "5px",
    boxSizing: "border-box",
  },
  selectInput: {
    padding: "4px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    marginBottom: "5px",
    width: "100%",
    boxSizing: "border-box",
  },
  cellTd: {
    border: "1px solid #ccc",
    padding: "3px",
  },
  cellInput: {
    width: "100%",
    padding: "5px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    boxSizing: "border-box",
  },
  cellInputCheckbox: {
    display: "block",
    margin: "0 auto",
    width: "20px",
    height: "20px",
  },
  alatunniste: {
    textAlign: "center",
    marginTop: "20px",
    fontSize: "17px",
    color: "#5C5C5C",
  },
  header: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "40px",
  },
  backButton: {
    padding: "8px 16px",
    fontSize: "14px",
    borderRadius: "8px",
    border: "1px solid #000",
    backgroundColor: "#fff",
    color: "#000",
    cursor: "pointer",
    maxWidth: "120px",
    marginTop: "50px",
    marginBottom: "20px"
  },
  courseNameHeader: {
    fontSize: "20px",
    fontWeight: "500",
  },
};


export default TeacherAddCard;
