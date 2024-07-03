import React, { useEffect, useState } from "react";
import moment from "moment";

const DateComponent = () => {
    const [currentDate /*setCurrentDate*/] = useState(
        moment().format("DD/MMM/YYYY")
    );

    return (
        <div>
            <h1>Current Date</h1>
            <p>{currentDate}</p>
        </div>
    );
};

const DateRangeComponent = () => {
    const [dateRange, setDateRange] = useState([]);

    useEffect(() => {
        const generateDateRange = (startDate, endDate) => {
            let start = moment(startDate, "DD/MMM/YYYY");
            let end = moment(endDate, "DD/MMM/YYYY");
            let dateArray = [];

            while (start <= end) {
                dateArray.push(start.format("DD/MMM/YYYY"));
                start = start.add(1, "days");
            }

            return dateArray;
        };

        const startDate = "01/Jul/2024";
        const endDate = "10/Jul/2024";
        const range = generateDateRange(startDate, endDate);
        setDateRange(range);
    }, []);

    return (
        <div>
            <h1>Date Range</h1>
            <ul>
                {dateRange.map((date) => (
                    <li key={date}>{date}</li>
                ))}
            </ul>
        </div>
    );
};

const DateRangeComponentV2 = () => {
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [dateRange, setDateRange] = useState([]);

    const generateDateRange = (startDate, endDate) => {
        let start = moment(startDate, "DD/MMM/YYYY");
        let end = moment(endDate, "DD/MMM/YYYY");
        let dateArray = [];

        while (start <= end) {
            dateArray.push(start.format("DD/MMM/YYYY"));
            start = start.add(1, "days");
        }

        return dateArray;
    };

    const handleGenerate = () => {
        if (startDate && endDate) {
            const range = generateDateRange(startDate, endDate);
            setDateRange(range);
        }
    };

    return (
        <div style={styles.container}>
            <h1>Date Range Component</h1>
            <div style={styles.inputContainer}>
                <label style={styles.label}>Start Date:</label>
                <input
                    type="text"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    placeholder="DD/MMM/YYYY"
                    style={styles.input}
                />
            </div>
            <div style={styles.inputContainer}>
                <label style={styles.label}>End Date:</label>
                <input
                    type="text"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    placeholder="DD/MMM/YYYY"
                    style={styles.input}
                />
            </div>
            <button onClick={handleGenerate} style={styles.button}>
                Generate Date Range
            </button>
            {dateRange.length > 0 && (
                <ul style={styles.list}>
                    {dateRange.map((date, index) => (
                        <li key={index} style={styles.listItem}>
                            {date}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

const DateRangeComponentV3 = () => {
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [dateRange, setDateRange] = useState([]);

    useEffect(() => {
        const now = new Date();
        let endDate = new Date(now.getFullYear(), now.getMonth(), 0); // Last day of the previous month
        let startDate = new Date(endDate.getFullYear(), endDate.getMonth(), 1); // First day of the previous month
        startDate = moment(startDate).format("DD/MMM/YYYY");
        endDate = moment(endDate).format("DD/MMM/YYYY");
        setStartDate(() => startDate);
        setEndDate(() => endDate);
        setDateRange(() => generateDateRange(startDate, endDate));
    }, []);

    const generateDateRange = (startDate, endDate) => {
        let start = moment(startDate, "DD/MMM/YYYY");
        let end = moment(endDate, "DD/MMM/YYYY");
        let dateArray = [];

        while (start <= end) {
            dateArray.push({
                date: start.format("DD/MMM/YYYY"),
                isPresent: Math.random() < 0.8, // 80% chance of being present
            });
            start = start.add(1, "days");
        }

        return dateArray;
    };

    const handleGenerate = () => {
        if (startDate && endDate) {
            const range = generateDateRange(startDate, endDate);
            setDateRange(range);
        }
    };

    return (
        <div style={styles.container}>
            <h1>Date Range Component</h1>
            <div style={styles.inputContainer}>
                <label style={styles.label}>Start Date:</label>
                <input
                    type="text"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    placeholder="DD/MMM/YYYY"
                    style={styles.input}
                />
            </div>
            <div style={styles.inputContainer}>
                <label style={styles.label}>End Date:</label>
                <input
                    type="text"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    placeholder="DD/MMM/YYYY"
                    style={styles.input}
                />
            </div>
            <button onClick={handleGenerate} style={styles.button}>
                Generate Date Range
            </button>
            {dateRange.length > 0 && (
                <ul style={styles.list}>
                    <li
                        key={"header-list-item"}
                        style={{
                            ...styles.listItem,
                            backgroundColor: "#007BFF",
                            padding: "0px",
                            fontWeight: "bold",
                            display: "flex",
                        }}
                    >
                        <span style={styles.listCell}>Date</span>
                        <span style={styles.listCell}>Attendance</span>
                    </li>
                    {dateRange.map(({ date, isPresent }, index) => (
                        <li
                            key={index}
                            style={{ ...styles.listItem, padding: "0px", display: "flex" }}
                        >
                            <span style={{ ...styles.listCell, fontWeight: "bold" }}>
                                {date}
                            </span>
                            <span
                                style={{
                                    ...styles.listCell,
                                    color: isPresent ? "green" : "red",
                                }}
                            >
                                {isPresent ? "Present" : "Absent"}
                            </span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

const styles = {
    container: {
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        width: "300px",
        margin: "0 auto",
        textAlign: "center",
    },
    inputContainer: {
        margin: "10px 0",
    },
    label: {
        marginRight: "10px",
    },
    input: {
        padding: "5px",
        width: "150px",
    },
    button: {
        padding: "10px 20px",
        backgroundColor: "#007BFF",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
    },
    list: {
        listStyleType: "none",
        padding: 0,
    },
    listItem: {
        backgroundColor: "#f9f9f9",
        padding: "10px",
        borderBottom: "1px solid #ddd",
    },
    listCell: {
        flex: 1,
        border: "1px solid #ddd",
        padding: "8px",
    },
};

export {
    DateComponent,
    DateRangeComponent,
    DateRangeComponentV2,
    DateRangeComponentV3,
};
