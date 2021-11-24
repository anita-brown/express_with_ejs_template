"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const root_controller_1 = require("../controller/root.controller");
const router = express_1.default.Router();
router.get('/', root_controller_1.getAllAuthors);
router.get('/:id', root_controller_1.getAuthorById);
router.get('/:authorId/book/:bookId', root_controller_1.getABook);
router.post('/', root_controller_1.postAuthor);
router.post('/:authorId/add-book', root_controller_1.postBook);
router.put('/:id', root_controller_1.updateAuthor);
router.put('/:authorId/book/:bookId', root_controller_1.updateBook);
router.delete('/:id', root_controller_1.deleteAuthor);
router.delete('/:authorId/book/:bookId', root_controller_1.deleteBook);
exports.default = router;
