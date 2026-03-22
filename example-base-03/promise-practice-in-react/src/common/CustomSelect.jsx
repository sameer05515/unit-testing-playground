import React, { useEffect, useMemo, useState } from "react";
import { childComponentNames } from "../utils/router-constants";

const CustomSelect = ({ initialSelectedValue = "", onChange = () => {} }) => {
    const options = useMemo(
        () =>
            Object.entries(childComponentNames).map(([label, value]) => ({
                value,
                label,
            })),
        []
    );

    const [selectedValue, setSelectedValue] = useState(
        () => initialSelectedValue || ""
    );

    useEffect(() => {
        if (!initialSelectedValue) return;
        if (options.some((opt) => opt.value === initialSelectedValue)) {
            setSelectedValue(initialSelectedValue);
        }
    }, [initialSelectedValue, options]);

    const handleChange = (event) => {
        const { value } = event.target;
        setSelectedValue(value);
        onChange(value);
    };

    const styles = {
        container: {
            fontFamily: "Arial, sans-serif",
            padding: "5px",
            maxWidth: "400px",
            border: "1px solid #ccc",
            borderRadius: "8px",
            backgroundColor: "#f9f9f9",
        },
        label: {
            display: "block",
            fontWeight: "bold",
        },
        select: {
            width: "100%",
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
                {options.map((item) => (
                    <option key={item.value} value={item.value}>
                        {item.label}
                    </option>
                ))}
            </select>
            {selectedValue && (
                <div style={styles.selectedValue}>
                    Selected Child: {selectedValue}
                </div>
            )}
        </div>
    );
};

export default CustomSelect;
