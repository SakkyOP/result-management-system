const multer = require("multer");
const { fileService: { storage, excelFilter } } = require("../services");

const uploadExcel = multer({
    storage,
    limits: {
        fileSize: 100 * 1024 * 1024   // File size limit : 100 MB
    },
    fileFilter: excelFilter,
}).single("file");

const uploadMiddlewares = {
    uploadExcel
}

module.exports = uploadMiddlewares;