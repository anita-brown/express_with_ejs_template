import express, {NextFunction, Request, Response} from 'express';
import{getAllAuthors, getAuthorById, getABook, postAuthor,postBook,updateAuthor, updateBook,deleteAuthor,deleteBook } from '../controller/root.controller';



const router = express.Router();

router.get('/', getAllAuthors)
router.get('/:id', getAuthorById)
router.get('/:authorId/book/:bookId', getABook)
router.post('/', postAuthor)
router.post('/:authorId/add-book', postBook)
router.put('/:id',updateAuthor)
router.put('/:authorId/book/:bookId', updateBook)
router.delete('/:id',deleteAuthor)
router.delete('/:authorId/book/:bookId', deleteBook)


export default router;
