export const styles = {
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
    width: "620px",
    maxWidth: "90vw",
    minHeight: "820px",
    backgroundColor: "#fff",
    borderRadius: "30px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  header: {
    padding: "30px 40px 20px 30px",
  },
  divider: {
    height: "1px",
    backgroundColor: "#000000ff",
    width: "100%",
  },
  content: {
    flexGrow: 1,
    padding: "15px 40px",
    overflowY: "auto",
    boxSizing: "border-box",
  },
  footer: {
    padding: "2px 40px",
    textAlign: "center",
    borderTop: "1px solid #e0e0e0",
  },
  logo: {
    width: "100px",
    height: "auto",
  },
  appName: {
    fontSize: "clamp(34px, 4vw, 36px)",
    fontWeight: "700",
    margin: "10px 0",
    marginTop: "180px"
  },
  appNameMini: {
    fontSize: "clamp(16px, 2vw, 18px)",
    fontWeight: "700",
    margin: "1px 0",
  },
  subtitle: {
    fontSize: "14px",
    color: "#5C5C5C",
    lineHeight: "1.2",
  },
  subtitle2: {
    fontSize: "16px",
    color: "#000",
    marginTop: "10px",
  },
  pageTitle: {
    fontSize: "20px",
    fontWeight: "500",
    marginBottom: "5px",
    marginTop: "40px",
    lineHeight: "1"
  },
  courseContainer: {
    marginTop: "20px",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    flexGrow: 1,
  },
  courseList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  courseButton: {
    padding: "12px 20px",
    fontSize: "16px",
    borderRadius: "0px",
    border: "1px solid #005A94",
    backgroundColor: "#005A94",
    color: "#fff",
    cursor: "pointer",
    width: "100%",
  },
  backButton: {
    padding: "5px 5px",
    fontSize: "14px",
    borderRadius: "0px",
    border: "1px solid #000",
    backgroundColor: "#fff",
    color: "#000",
    cursor: "pointer",
    marginBottom:"15px"
  },
  button: {
    padding: "15px 20px",
    width: "100%",
    backgroundColor: "#005A94",
    color: "white",
    border: "none",
    borderRadius: "0px",
    cursor: "pointer",
    fontSize: "clamp(14px, 2.5vw, 18px)",
    fontWeight:"600"
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    width: "100%",
    alignItems: "center",
    marginTop: "160px"
  },
  alatunniste: {
    fontSize: "16px",
    color: "#5C5C5C",
  },
};
