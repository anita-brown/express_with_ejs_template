import express, {Request, Response, NextFunction} from 'express';
import { readFile, writeFile, author } from '../utils/utils';
import {getIdForBooks, validateEntry} from '../utils/utils';



var control = express();

export const getAllAuthors = (req: Request, res: Response, next: NextFunction) => {
    const data = readFile();
    res.status(200).json({message: 'succesfull', data: data})
}

// new add

export const getAuthorById = (req:Request, res:Response, _next:NextFunction) => {
    const data = readFile();
    const authorData = data.find((item: author) => `${item.id}` === req.params.id)
    if(!authorData){
        return res.status(404).json({message: `author not found`})
    }
    res.status(200).json({message: "success", data: authorData})
}

export const getABook = (req: Request, res: Response, next:NextFunction)=>{
    const data = readFile();
    const authorData = data.find((item: author)=> `${item.id}` === req.params.authorId);
    if(!authorData){
        return res.status(404).json({message: `author with the id ${req.params.authorId} not found!`})
    }
    const bookData = authorData.books.find((item:author) => `${item.id}` === req.params.bookId)
    if(!bookData){
        return res.status(404).json({message: `book with the id ${req.params.bookId} not found`})
    }
    res.status(200).json({mesaage: "success", data: bookData})
}

export const postAuthor = (req:Request, res:Response, _next:NextFunction)=>{
    const {error} = validateEntry(req.body)
    if(error){
        return res.status(400).send(error.details[0].message)
    }else{
        const data = readFile();
        // const newBook = { ...req.body, books: getIdForBooks(req.body.books)  }
        const {author, age, address}  = req.body
        // const newData = {id: data.length + 1, dateRegistered: new Date().getTime(), ...newBook};
        let newAuthor
        let allNewData
        if(data.length === 0){
            newAuthor = {
                id: 1,
                author,
                age,
                address,
                dateRegistered: Date.now(),
                books: []
            }
            allNewData = [newAuthor]
        }else{
            newAuthor = {
                id: data.length + 1,
                author,
                age,
                address,
                dateRegistered: Date.now(),
                books: []
            }
            allNewData = [...data, newAuthor];
        }
         console.log(allNewData, "DATA")
    
         writeFile(allNewData);
    
        res.status(201).json({message: "create new book...", data: newAuthor})
    }

}

// export const postBook = (req:Request, res:Response) => {
//     const data = readFile();
//     const authorFind = data.find(((item: {item:author, id: number})=> `${item.id}` === req.params.id));
//     const newBook = {...req.body, books: getIdForBooks==(req.body.books)}
// }


export const postBook = (req:Request, res:Response) => {

const data = readFile();

let authorFind = data.find(((item: {item:author, id: number})=> `${item.id}` === req.params.authorId));
const authorIndex = data.findIndex((item: {item:author, id: number}) => `${item.id}` === req.params.authorId)

if(!authorFind){

return res.status(404).json({message:"author does not exist"})

}

const {name, isPublished, datePublished, serialNumber} = req.body
let bookId
if(authorFind.books.length === 0){
    bookId = 'book1'
}else{
    bookId = `book${authorFind.books.length + 1}`
}

const newBook = {
    id: bookId,
    name,
    isPublished,
    datePublished: datePublished || null,
    serialNumber: serialNumber || null
}

authorFind = {

...authorFind,

books: [ ...authorFind.books, newBook ]
}

data[authorIndex] = authorFind
writeFile(data);

res.status(201).json({message: "new book added", author: authorFind })

}

export const updateAuthor = (req:Request, res:Response, next:NextFunction)=>{
    const data = readFile();
    const dataToUpdate = data.find((item: {item:author, id: number})=> `${item.id}` === req.params.id)
    if(!dataToUpdate){
        return res.status(404).json({message:"does not exist"})
    }
    const newData = {...dataToUpdate, ...req.body };
    const dataIndex = data.findIndex((item:{id:number})=>`${item.id}` === req.params.id)
    data.splice(dataIndex, 1, newData);
    writeFile(data);
    console.log(dataToUpdate);
    res.status(201).json({message: "author updated...", data: newData})
}

export const updateBook = (req: Request, res:Response, next:NextFunction) =>{
    const data = readFile();
    const authorFind = data.find((item: {item:author, id: number})=> `${item.id}` === req.params.authorId);
    if(!authorFind){
        return res.status(404).json({message: `author with the id ${req.params.authorId} does not exist`})
    }
    const bookToUpdate = authorFind.books.find((item: {item:author, id: number})=> `${item.id}` === req.params.bookId)
    if(!bookToUpdate){
        return res.status(404).json({message: `book with the id ${req.params.bookId} does not exist`})
    }
    const newData = {...bookToUpdate, ...req.body};
    const dataIndex = authorFind.books.findIndex((item:author) => `${item.id}` === req.params.bookId)
    authorFind.books.splice(dataIndex, 1, newData);
    writeFile(authorFind.books)
    res.status(201).json({message: "book updated...", data: newData})
}

export const deleteAuthor = (req:Request, res:Response, next:NextFunction)=>{
    const data = readFile();
    const dataToDelete = data.find((item:{item:author, id: number}) => `${item.id}` === req.params.id);
    if(!dataToDelete){
       return res.status(404).json({message:"not found"})
    }
    const dataIndex = data.findIndex((item:{item:author, id: number}) => `${item.id}` === req.params.id);
    data.splice(dataIndex, 1)
    writeFile(data);
    res.status(200).json({message: "Trashed!", data: data})
}

export const deleteBook = (req:Request, res:Response, next:NextFunction) =>{
    const data = readFile();
    const authorFind = data.find((item: {item:author, id: number})=> `${item.id}` === req.params.authorId);
    if(!authorFind){
        return res.status(404).json({message: `author with the id ${req.params.authorId} does not exist`})
    }
    const bookToDelete = authorFind.books.find((item: {item:author, id: number})=> `${item.id}` === req.params.bookId)
    if(!bookToDelete){
        return res.status(404).json({message: `book with the id ${req.params.bookId} does not exist`})
    }
    const dataIndex = authorFind.books.findIndex((item:{item:author, id: number}) => `${item.id}` === req.params.id);
    authorFind.books.splice(authorFind.books, 1);
    writeFile(data);
    res.status(200).json({message: `Book with the id ${req.params.bookId} has been trashed...`})
}