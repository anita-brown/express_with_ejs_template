"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeFile = exports.getIdForBooks = exports.readFile = exports.validateEntry = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const joi_1 = __importDefault(require("joi"));
// import uuidv4 from 'uuidv4'
// Export and Create interface for keys types in the object
// Export, Create, Read and write files to database in json format
const myFilePath = path_1.default.join(__dirname, '../database.json');
const validateEntry = (data) => {
    const schema = joi_1.default.object({
        author: joi_1.default.string().required(),
        age: joi_1.default.number().required(),
        address: joi_1.default.string().required(),
        books: joi_1.default.array().required()
    }).unknown();
    return schema.validate(data);
};
exports.validateEntry = validateEntry;
const readFile = () => {
    try {
        const data = fs_1.default.readFileSync(myFilePath, { encoding: 'utf8' });
        return JSON.parse(data);
    }
    catch (error) {
        return [];
    }
};
exports.readFile = readFile;
function getIdForBooks(booksData) {
    return booksData.map((book, index) => {
        return { id: `book${index + 1}`, ...book };
    });
}
exports.getIdForBooks = getIdForBooks;
const writeFile = (data) => {
    fs_1.default.writeFileSync(myFilePath, JSON.stringify(data, null, 4));
};
exports.writeFile = writeFile;
