const supertest = require('supertest')
const host_url = 'http://localhost:5000/';
const getAll_url = '/person'


describe('asasas', () => {
    

    test('should return all users', async() => {
        const container = supertest('http://localhost:3000');
        const response = await container.get('/person')
        console.log(response.body);
        expect(response.statusCode).toBe(200)
    })
    
})





