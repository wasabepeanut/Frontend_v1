import React from "react";
import { dsStyles } from "../styles/dsStyles";

export default function GradeSlider({ value, onChange }) {
  const numbers = [1, 2, 3, 4, 5];

  return (
    <div style={{ width: "100%", ...dsStyles.labelText, }}>
      {/* Slider */}
      <input
        type="range"
        min="1"
        max="5"
        step="1"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{
          width: "100%",
          accentColor: "#005a94",
        }}
      />

      {/* Number Labels */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          padding: "0 2px",
          fontSize: "14px",
        }}
      >
        {numbers.map((n) => (
          <span key={n}>{n}</span>
        ))}
      </div>
    </div>
  );
}
