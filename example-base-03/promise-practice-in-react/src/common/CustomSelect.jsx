import React, { useEffect, useState } from "react";
import { childComponentNames } from "../utils/router-constants";

const CustomSelect = ({ initialSelectedValue = "", onChange = () => { } }) => {
    const handleChange = (event) => {
        setSelectedValue(event.target.value);
        // console.log(`Selected value: ${event.target.value}`);
        onChange(event.target.value);
    };

    const options = Object.entries(childComponentNames).map(([key, value]) => {
        return {
            value: value,
            label: key,
        };
    });

    const [selectedValue, setSelectedValue] = useState("");

    useEffect(() => {
        refreshSelect();
    },[]);

    const refreshSelect=()=>{
        if (initialSelectedValue) {
            const option = options.find((opt) => opt.value === initialSelectedValue);
            if (option) {
                setSelectedValue(() => option.value);
            }
        }
    }

    const styles = {
        container: {
            fontFamily: "Arial, sans-serif",
            padding: "5px",
            maxWidth: "400px",
            //margin: '0 auto',
            border: "1px solid #ccc",
            borderRadius: "8px",
            backgroundColor: "#f9f9f9",
        },
        label: {
            display: "block",
            //marginBottom: '10px',
            fontWeight: "bold",
        },
        select: {
            width: "100%",
            // padding: '5px',
            borderRadius: "4px",
            border: "1px solid #ccc",
            fontSize: "12px",
        },
        selectedValue: {
            marginTop: "5px",
            padding: "5px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            backgroundColor: "#e9e9e9",
            fontSize: "12px",
        },
    };

    return (
        <div style={styles.container}>
            {/* <pre>{JSON.stringify(childComponentNames,null,2)}</pre> */}
            <label htmlFor="conversationSelect" style={styles.label}>
                Select a Child:
            </label>
            <select
                id="conversationSelect"
                style={styles.select}
                onChange={handleChange}
                value={selectedValue}
            >
                <option value="" disabled>
                    Select a Child
                </option>
                {options.map((item, index) => (
                    <option key={index} value={item.value}>
                        {item.label}
                    </option>
                ))}
            </select>
            {selectedValue && (
                <div style={styles.selectedValue}>Selected Child: {selectedValue}</div>
            )}
        </div>
    );
};

export default CustomSelect;
