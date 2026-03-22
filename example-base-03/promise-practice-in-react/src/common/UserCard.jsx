import React from "react";

const styles = {
  card: {
    border: "1px solid #ddd",
    borderRadius: "5px",
    padding: "16px",
    margin: "16px",
    width: "300px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  },
  header: {
    marginTop: "0",
    color: "#333",
  },
  paragraph: {
    margin: "8px 0",
  },
  list: {
    listStyleType: "none",
    padding: "0",
  },
  listItem: {
    background: "#f4f4f4",
    margin: "4px 0",
    padding: "4px",
    borderRadius: "3px",
  },
};

const UserCard = ({ userDetails }) => {
  if (!userDetails) return null;

  return (
    <div style={styles.card}>
      <h2 style={styles.header}>{userDetails.name}</h2>
      <p style={styles.paragraph}>
        <strong>Employee Code:</strong> {userDetails.employeeCode}
      </p>
      <p style={styles.paragraph}>
        <strong>Date of Birth:</strong> {userDetails.dob}
      </p>
      <p style={styles.paragraph}>
        <strong>Designation:</strong> {userDetails.designation}
      </p>
      <p style={styles.paragraph}>
        <strong>Department:</strong> {userDetails.department}
      </p>
      <div>
        <strong>Skills:</strong>
        <ul style={styles.list}>
          {userDetails.skills.map((skill, index) => (
            <li key={index} style={styles.listItem}>
              {skill}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <strong>Languages:</strong>
        <ul style={styles.list}>
          {userDetails.languages.map((language, index) => (
            <li key={index} style={styles.listItem}>
              {language}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserCard;
