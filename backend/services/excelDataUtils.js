/*
    This service is written to validate the data
    that we recieve in the form of excel sheets
    it provides the fields that prewritten models
    need like Attendance, Assessment, etc. 
    
    There is also a generic function that checks
    the field based on the array of strings provided
    in the arguments.
*/
const xlsx = require("xlsx");

const ASSESSMENT_FIELDS = [
    "SID",
    "Student Name",
    "Marks",
    "Remarks",
];

const ATTENDANCE_FIELDS = [
    "SID",
    "Student Name",
    "Date",
    "Status"
];

const LINKEDINPOST_FIELDS = [
    "SID",
    "Student Name",
    "Links",
    "Marks",
    "Remarks",
];

const PROJECT_FIELDS = [
    "SID",
    "Student Name",
    "Review Marks",
    "Review Remarks",
    "Submission Marks",
    "Submission Remarks",
];

// To map the excel fields to actual fields
const STUDENT_MAP = {
    "SID": "student",
    "Marks": "marks",
    "Remarks": "remarks",
    "Date": "date",
    "Status": "status",
    "Links": "links",
    "Review Marks": "review.marks",
    "Review Remarks": "review.remarks",
    "Submission Marks": "submission.marks",
    "Submission Remarks": "submission.remarks"
};

/*
    This function is to make nested objects in
    the extracted data for fields like review.marks
    or submission.remarks, etc.
*/
function setNestedProperty(obj, path, value) {
    const keys = path.split('.');
    let current = obj;

    keys.forEach((key, index) => {
        if (index === keys.length - 1) {
            current[key] = value;
        } else {
            current[key] = current[key] || {};
            current = current[key];
        }
    });
}

/*
    This is a helper function extracts the data from
    the excel and returns the data in json format
*/
function readExcelFile(filePath) {
    const workbook = xlsx.readFile(filePath);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    return xlsx.utils.sheet_to_json(sheet, { header: 1 });
}


/*
    This is validation function that verifies that the
    file has the headers 
*/
function validateData(filePath, requiredHeaders) {
    const data = readExcelFile(filePath);
    const headers = data[0];

    return requiredHeaders.every(header => headers.includes(header));
}

/*
    This function extracts the data from the excel
    and maps them to their respective attribute names
    by referencing fieldMap which is a mapping of headers
    to actual attribute names in the schema

    After extraction the file is deleted

    Returns the data in as array if json objects
*/
function extractDataFromExcel(filePath, fieldMap) {
    const data = readExcelFile(filePath);
    const headers = data[0].map(field => fieldMap[field]);
    const rows = data.slice(1);

    const extractedData = rows.map(row => {
        let extracted = {};
        headers.forEach((field, index) => {
            setNestedProperty(extracted, field, row[index]);
        });
        return extracted;
    });
    
    fs.unlink(filePath, (err) => {
        if (err) {
            console.error('Error deleting file:', err);
        } else {
            console.log('File successfully deleted:', filePath);
        }
    });

    return extractedData;
}

const validationService = {
    validateData,
    extractDataFromExcel,
    ASSESSMENT_FIELDS,
    ATTENDANCE_FIELDS,
    PROJECT_FIELDS,
    LINKEDINPOST_FIELDS,
    STUDENT_MAP,
}

module.exports = validationService;