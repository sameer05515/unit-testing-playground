import employeeData from "./employeeData";
import moment from "moment";

/**
 * Experimental @global @constant SKIP_SIMULATION
 * 
 * If true, all promises will only show success results
 * 
 */
const SKIP_SIMULATION = false;

const DEFAULT_THRESHOLD = 0.8;
const MAX_TIMEOUT_IN_MS = 10000;
const MIN_TIMEOUT_IN_MS = 1;
const DEFAULT_TIMEOUT_IN_MS = 1000;

/**
 * Validate the simulation and timeout parameters.
 *
 * @param {Object} options - The options for validation.
 * @param {number} options.timeoutInMS - The timeout in milliseconds.
 * @param {number} [options.threshold=DEFAULT_THRESHOLD] - The threshold for random number generation.
 * @returns {Object} - An object containing the random number, result, and calculated timeout.
 */
const validateSimulationAndTimeout = ({ timeoutInMS, threshold = DEFAULT_THRESHOLD }) => {
    const calculatedTimeOut =
        timeoutInMS && !isNaN(timeoutInMS) && timeoutInMS <= MAX_TIMEOUT_IN_MS && timeoutInMS >= MIN_TIMEOUT_IN_MS
            ? timeoutInMS
            : DEFAULT_TIMEOUT_IN_MS;

    if (SKIP_SIMULATION) {
        return {
            randomNumber: 0.5,
            result: true,
            calculatedTimeOut,
        };
    }

    const randomNumber = Math.random();

    return {
        randomNumber,
        result: randomNumber < threshold,
        calculatedTimeOut,
    };
};

/**
 * Fetch user data.
 *
 * @param {number} [timeoutInMS=DEFAULT_TIMEOUT_IN_MS] - The timeout in milliseconds.
 * @returns {Promise} - A promise that resolves with the user data.
 */
export const fetchUsers = (timeoutInMS = DEFAULT_TIMEOUT_IN_MS) => {
    return new Promise((resolve, reject) => {
        const { randomNumber: rand, calculatedTimeOut, result } = validateSimulationAndTimeout({ timeoutInMS });

        setTimeout(() => {
            if (result) {
                const data = employeeData.map(({ id, employeeCode, name }) => ({
                    id,
                    employeeCode,
                    name,
                }));
                resolve({ data: data, randomNumber: rand, message: "Users Data Loaded successfully!!" });
            } else {
                reject({
                    data: [],
                    randomNumber: rand,
                    message: "Error occurred in fetch Users data.",
                });
            }
        }, calculatedTimeOut);
    });
};

/**
 * Fetch user details for a given employee code.
 *
 * @param {string} empCode - The employee code.
 * @param {number} [timeoutInMS=DEFAULT_TIMEOUT_IN_MS] - The timeout in milliseconds.
 * @returns {Promise} - A promise that resolves with the user details.
 */
export const fetchUserDetailsForEmpCode = (empCode, timeoutInMS = DEFAULT_TIMEOUT_IN_MS) => {
    return new Promise((resolve, reject) => {
        const empCodeType = typeof empCode;
        const validEmpCodeType = empCodeType === "string";

        if (!empCode || !validEmpCodeType) {
            return reject({
                data: [],
                randomNumber: 0,
                message: `Invalid empCode: '${empCode}' ${validEmpCodeType ? "" : `, or its type: '${empCodeType}'`}.`,
            });
        }

        const { randomNumber: rand, calculatedTimeOut, result } = validateSimulationAndTimeout({ timeoutInMS });

        setTimeout(() => {
            if (result) {
                const data = employeeData.find(({ employeeCode }) => employeeCode === empCode);
                if (data) {
                    resolve({
                        data: data,
                        randomNumber: rand,
                        message: `Successfully fetched data for empCode: ${empCode}.`,
                    });
                } else {
                    reject({
                        data: [],
                        randomNumber: rand,
                        message: `No data found for empCode: ${empCode}.`,
                    });
                }
            } else {
                reject({
                    data: [],
                    randomNumber: rand,
                    message: `Error occurred in fetch data for empCode: ${empCode}.`,
                });
            }
        }, calculatedTimeOut);
    });
};

/**
 * Fetch user attendance for a given employee code.
 *
 * @param {string} empCode - The employee code.
 * @param {number} [timeoutInMS=DEFAULT_TIMEOUT_IN_MS] - The timeout in milliseconds.
 * @returns {Promise} - A promise that resolves with the user attendance details.
 */
export const fetchUserAttendanceForDateRange = (empCode, dateRange, timeoutInMS = DEFAULT_TIMEOUT_IN_MS) => {
    return new Promise((resolve, reject) => {
        const empCodeType = typeof empCode;
        const validEmpCodeType = empCodeType === "string";

        if (!empCode || !validEmpCodeType) {
            return reject({
                data: [],
                randomNumber: 0,
                message: `Invalid empCode: '${empCode}' ${validEmpCodeType ? "" : `, or its type: '${empCodeType}'`}.`,
            });
        }

        const { randomNumber: rand, calculatedTimeOut, result } = validateSimulationAndTimeout({ timeoutInMS });

        setTimeout(() => {
            if (result) {
                const empData = employeeData.find(({ employeeCode }) => employeeCode === empCode);
                if (!empData) {
                    reject({
                        data: [],
                        randomNumber: rand,
                        message: `No Employee data found for empCode: ${empCode}.`,
                    });
                }

                const employeeAttendanceData = generateEmployeeAttendanceData(
                    [empData].map(({ id, employeeCode, name, department }) => ({
                        id,
                        employeeCode,
                        name,
                        department,
                    }))
                );

                if(employeeAttendanceData && employeeAttendanceData.length>0){
                    resolve({
                        data: employeeAttendanceData,
                        randomNumber: rand,
                        message: `Successfully fetched Employee Attendance data for empCode: ${empCode}.`,
                    });
                }else{
                    reject({
                        data: [],
                        randomNumber: rand,
                        message: `No Employee Attendance data found for empCode: ${empCode}.`,
                    });
                }

            } else {
                reject({
                    data: [],
                    randomNumber: rand,
                    message: `Error occurred in fetch Employee Attendance data for empCode: ${empCode}.`,
                });
            }
        }, calculatedTimeOut);
    });
};

// Function to generate a date range array
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

// Function to generate employee attendance data
const generateEmployeeAttendanceData = (employees, dateRange) => {
    // debugger;
    let startDate, endDate;

    if (!dateRange) {
        const now = new Date();
        endDate = new Date(now.getFullYear(), now.getMonth(), 0); // Last day of the previous month
        startDate = new Date(endDate.getFullYear(), endDate.getMonth(), 1); // First day of the previous month
        startDate = moment(startDate).format("DD/MMM/YYYY");
        endDate = moment(endDate).format("DD/MMM/YYYY");
    } else {
        [startDate, endDate] = dateRange.split(" - ");
    }

    const dateArray = generateDateRange(startDate, endDate);
    const attendanceData = [];

    employees.forEach((employee) => {
        dateArray.forEach((date) => {
            attendanceData.push({
                ...employee,
                employeeCode: employee.employeeCode,
                date: date,
                isPresent: Math.random() < 0.8, // 80% chance of being present
            });
        });
    });

    return attendanceData;
};



