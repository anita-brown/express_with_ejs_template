"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../src/app"));
describe('GET AUTHORS', () => {
    test('should return 200 status for all authors', async () => {
        const res = await (0, supertest_1.default)(app_1.default).get('/author');
        expect(res.statusCode).toEqual(200);
    });
    test('should return 200 status for a single author', async () => {
        const res = await (await (0, supertest_1.default)(app_1.default).get('/author/1'));
        expect(res.statusCode).toEqual(200);
    });
});
describe('POST AUTHOR', () => {
    test('return status code 201 if author data is passed correctly ', async () => {
        await (0, supertest_1.default)(app_1.default).post('/author').send({
            "author": "mary Dawn",
            "age": 28,
            "address": "5, Wall Street, Buckingham",
            "books": [
                {
                    "name": "Tomorrow is coming",
                    "isPublished": true,
                    "datePublished": 1637159508581,
                    "serialNumber": 10
                },
                {
                    "name": "Octobers very own",
                    "isPublished": false,
                    "datePublished": null,
                    "serialNumber": null
                }
            ]
        }).set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201)
            .expect(res => {
            res.body.data.length > 0;
        });
    });
    test('should return bad request if some data is missing', async () => {
        const res = await (0, supertest_1.default)(app_1.default).post('/author').send({
            author: "mary Dawn",
            address: "5, Wall Street, Buckingham",
            books: [
                {
                    "name": "Tomorrow is coming",
                    "isPublished": true,
                    "datePublished": 1637159508581,
                    "serialNumber": 10
                },
                {
                    "name": "Octobers very own",
                    "isPublished": false,
                    "datePublished": null,
                    "serialNumber": null
                }
            ]
        });
        expect(res.statusCode).toEqual(400);
    });
});
describe('DELETE AN AUTHOR', () => {
    test('it responds witha a message of Deleted', async () => {
        const newAuthor = await (0, supertest_1.default)(app_1.default)
            .post('/author')
            .send({
            "author": "mary Dawn",
            "age": 28,
            "address": "5, Wall Street, Buckingham",
            "books": [
                {
                    "name": "Tomorrow is coming",
                    "isPublished": true,
                    "datePublished": 1637159508581,
                    "serialNumber": 10
                },
                {
                    "name": "Octobers very own",
                    "isPublished": false,
                    "datePublished": null,
                    "serialNumber": null
                }
            ]
        });
        const removedAuthor = await (0, supertest_1.default)(app_1.default).delete(`/author/${newAuthor.body.data.id}`);
        expect(removedAuthor.body.message).toEqual(`Trashed!`);
    });
});
describe('PUT AUTHOR', () => {
    test('it responds with an updated data', async () => {
        const newAuthor = await (0, supertest_1.default)(app_1.default)
            .post('/author')
            .send({
            "author": "mary daniel",
            "age": 25,
            "address": "5, Wall Street, ajson street, odumota lagos ",
            "books": [
                {
                    "name": "Tomorrow is coming",
                    "isPublished": true,
                    "datePublished": 1637159508581,
                    "serialNumber": 10
                },
                {
                    "name": "Octobers very own",
                    "isPublished": false,
                    "datePublished": null,
                    "serialNumber": null
                }
            ]
        });
        const updatedAuthor = await (0, supertest_1.default)(app_1.default)
            .put(`/author/${newAuthor.body.data.id}`)
            .send({ author: "John kernel" });
        expect(updatedAuthor.body.data.author).toBe("John kernel");
        expect(updatedAuthor.body.data).toHaveProperty("id");
        expect(updatedAuthor.statusCode).toBe(201);
    });
});
