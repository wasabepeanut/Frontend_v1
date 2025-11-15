import React from "react";
import { styles } from "../styles/commonStyles";

function LayoutCard({ header, children, footer }) {
  return (
    <div style={styles.card}>
      <div style={styles.header}>{header}</div>
      <div style={styles.divider}></div>
      <div style={styles.content}>{children}</div>
      {footer && <div style={styles.footer}>{footer}</div>}
    </div>
  );
}

export default LayoutCard;
