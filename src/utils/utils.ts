import fs from 'fs';
import path from 'path';
import Joi from 'joi';
// import uuidv4 from 'uuidv4'
// Export and Create interface for keys types in the object
// Export, Create, Read and write files to database in json format
const myFilePath = path.join(__dirname, '../database.json');



export const validateEntry = (data: author) => {
    const schema = Joi.object({
        author: Joi.string().required(),
        age: Joi.number().required(),
        address: Joi.string().required(),
        books: Joi.array().required()
    }).unknown();
    return schema.validate(data)
}


export const readFile = () => {
    try{
        const data = fs.readFileSync(myFilePath, {encoding:'utf8'})
        return JSON.parse(data);

    }catch(error){
        return []
    }
    
}

    
export function getIdForBooks (booksData: books[]): books[] {
    return booksData.map((book: books, index) => {
        return {id:`book${index + 1}`, ...book}
    })
}



export interface author {
    id?: number,
    author: string,
    dateRegistered: number,
    age: number,
    address: number,
    books: books[]
}


export interface books {
    id?: string,
    name: string,
    isPublished: boolean,
    datePublished: Date | null,
    serialNumber: number|null
}

export const writeFile = (data: author[]) =>{
        fs.writeFileSync(myFilePath, JSON.stringify(data, null, 4));

}
    