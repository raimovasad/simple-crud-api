const supertest = require('supertest')
const host_url = 'http://localhost:5000/';
const getAll_url = '/person'


describe('asasas', () => {
    let container;
    let response;
    beforeEach(async()=>{
         container = supertest('http://localhost:3000');
         clearDatabase = await container.get('/clearperson')
    })

    test('should return all persons with status code 200',async() => {
        response = await container.get('/person');
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    })
    

    test('should create a new person with status code 201', async() => {
        response = await container.post('/person').send({name:'Asadbek',age:34,hobbies:['wrestling', 'boxing']})
        expect(response.statusCode).toBe(201)
        expect(response.body).toBeInstanceOf(Object) 
        expect(response.body.name).toBe('Asadbek') 
        expect(response.body.age).toBe(34) 
        expect(response.body.hobbies).toEqual(['wrestling','boxing'])
    })

    test('should return the created person with status code 200', async() => {
        response = await container.post('/person').send({name:'John',age:25,hobbies:['tennis', 'swimming']})
        let person = response.body
        let getById = await container.get(`/person/${person.id}`)
        expect(getById.body).toEqual(person)
        expect(getById.statusCode).toBe(200)
    })
    

    test('should edit the person and return with the same id', async() => {
        response = await container.post('/person').send({name:'John',age:25,hobbies:['tennis', 'swimming']})
        let person = response.body
        let putByid = await container.put(`/person/${person.id}`).send({name:'Alex',age:33,hobbies:['colleting coins','pc gaming']})
        expect(putByid.statusCode).toBe(200)
        expect(putByid.body.id).toBe(person.id)
        expect(putByid.body.name).toBe('Alex')
        expect(putByid.body.age).toBe(33)
        expect(putByid.body.hobbies).toEqual(['colleting coins','pc gaming'])

    })
    
    test('should delete the created person and confirm the deletion', async() => {
        response = await container.post('/person').send({name:'John',age:25,hobbies:['tennis', 'swimming']})
        let person = response.body
        let deleteByid = await container.delete(`/person/${person.id}`)
        let getById = await container.get(`/person/${person.id}`)
        expect(deleteByid.statusCode).toBe(204)
        expect(deleteByid.body).toBe('');
        expect(getById.statusCode).toBe(404);
        expect(getById.statusCode).toBe(404);
        expect(getById.body.message).toBe('User is not found!');
    })
    
    test('should return message non existing person  404', async() => {
        //non exiting id
        let id = 'f27d8c91-4193-4f8d-8383-4df173fab5f8'
        let getById = await container.get(`/person/${id}`)
        expect(getById.statusCode).toBe(404)
        expect(getById.body.message).toBe('User is not found!')
    })
    
    
})





