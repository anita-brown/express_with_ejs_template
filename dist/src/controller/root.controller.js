"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBook = exports.deleteAuthor = exports.updateBook = exports.updateAuthor = exports.postBook = exports.postAuthor = exports.getABook = exports.getAuthorById = exports.getAllAuthors = void 0;
const express_1 = __importDefault(require("express"));
const utils_1 = require("../utils/utils");
const utils_2 = require("../utils/utils");
var control = (0, express_1.default)();
const getAllAuthors = (req, res, next) => {
    const data = (0, utils_1.readFile)();
    res.status(200).json({ message: 'succesfull', data: data });
};
exports.getAllAuthors = getAllAuthors;
// new add
const getAuthorById = (req, res, _next) => {
    const data = (0, utils_1.readFile)();
    const authorData = data.find((item) => `${item.id}` === req.params.id);
    if (!authorData) {
        return res.status(404).json({ message: `author not found` });
    }
    res.status(200).json({ message: "success", data: authorData });
};
exports.getAuthorById = getAuthorById;
const getABook = (req, res, next) => {
    const data = (0, utils_1.readFile)();
    const authorData = data.find((item) => `${item.id}` === req.params.authorId);
    if (!authorData) {
        return res.status(404).json({ message: `author with the id ${req.params.authorId} not found!` });
    }
    const bookData = authorData.books.find((item) => `${item.id}` === req.params.bookId);
    if (!bookData) {
        return res.status(404).json({ message: `book with the id ${req.params.bookId} not found` });
    }
    res.status(200).json({ mesaage: "success", data: bookData });
};
exports.getABook = getABook;
const postAuthor = (req, res, _next) => {
    const { error } = (0, utils_2.validateEntry)(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    else {
        const data = (0, utils_1.readFile)();
        const newBook = { ...req.body, books: (0, utils_2.getIdForBooks)(req.body.books) };
        const newData = { id: data.length + 1, dateRegistered: new Date().getTime(), ...newBook };
        const allNewData = [...data, newData];
        console.log(allNewData, "DATA");
        (0, utils_1.writeFile)(allNewData);
        res.status(201).json({ message: "create new book...", data: newData });
    }
};
exports.postAuthor = postAuthor;
// export const postBook = (req:Request, res:Response) => {
//     const data = readFile();
//     const authorFind = data.find(((item: {item:author, id: number})=> `${item.id}` === req.params.id));
//     const newBook = {...req.body, books: getIdForBooks==(req.body.books)}
// }
const postBook = (req, res) => {
    const data = (0, utils_1.readFile)();
    let authorFind = data.find(((item) => `${item.id}` === req.params.authorId));
    if (!authorFind) {
        return res.status(404).json({ message: "author does not exist" });
    }
    authorFind = {
        ...authorFind,
        books: [...authorFind.books, { id: `book${authorFind.books.length + 1}`, ...req.body }]
    };
    res.status(201).json({ message: "new book added", author: authorFind });
};
exports.postBook = postBook;
const updateAuthor = (req, res, next) => {
    const data = (0, utils_1.readFile)();
    const dataToUpdate = data.find((item) => `${item.id}` === req.params.id);
    if (!dataToUpdate) {
        return res.status(404).json({ message: "does not exist" });
    }
    const newData = { ...dataToUpdate, ...req.body };
    const dataIndex = data.findIndex((item) => `${item.id}` === req.params.id);
    data.splice(dataIndex, 1, newData);
    (0, utils_1.writeFile)(data);
    console.log(dataToUpdate);
    res.status(201).json({ message: "author updated...", data: newData });
};
exports.updateAuthor = updateAuthor;
const updateBook = (req, res, next) => {
    const data = (0, utils_1.readFile)();
    const authorFind = data.find((item) => `${item.id}` === req.params.authorId);
    if (!authorFind) {
        return res.status(404).json({ message: `author with the id ${req.params.authorId} does not exist` });
    }
    const bookToUpdate = authorFind.books.find((item) => `${item.id}` === req.params.bookId);
    if (!bookToUpdate) {
        return res.status(404).json({ message: `book with the id ${req.params.bookId} does not exist` });
    }
    const newData = { ...bookToUpdate, ...req.body };
    const dataIndex = authorFind.books.findIndex((item) => `${item.id}` === req.params.bookId);
    authorFind.books.splice(dataIndex, 1, newData);
    (0, utils_1.writeFile)(authorFind.books);
    res.status(201).json({ message: "book updated...", data: newData });
};
exports.updateBook = updateBook;
const deleteAuthor = (req, res, next) => {
    const data = (0, utils_1.readFile)();
    const dataToDelete = data.find((item) => `${item.id}` === req.params.id);
    if (!dataToDelete) {
        return res.status(404).json({ message: "not found" });
    }
    const dataIndex = data.findIndex((item) => `${item.id}` === req.params.id);
    data.splice(dataIndex, 1);
    (0, utils_1.writeFile)(data);
    res.status(200).json({ message: "Trashed!", data: data });
};
exports.deleteAuthor = deleteAuthor;
const deleteBook = (req, res, next) => {
    const data = (0, utils_1.readFile)();
    const authorFind = data.find((item) => `${item.id}` === req.params.authorId);
    if (!authorFind) {
        return res.status(404).json({ message: `author with the id ${req.params.authorId} does not exist` });
    }
    const bookToDelete = authorFind.books.find((item) => `${item.id}` === req.params.bookId);
    if (!bookToDelete) {
        return res.status(404).json({ message: `book with the id ${req.params.bookId} does not exist` });
    }
    const dataIndex = authorFind.books.findIndex((item) => `${item.id}` === req.params.id);
    authorFind.books.splice(authorFind.books, 1);
    (0, utils_1.writeFile)(data);
    res.status(200).json({ message: `Book with the id ${req.params.bookId} has been trashed...` });
};
exports.deleteBook = deleteBook;
