const supertest = require('supertest')
const host_url = 'http://localhost:5000/';
const getAll_url = '/person'


describe('Testing simple crud api', () => {
    let container;
    let response;
    beforeEach(async()=>{
         container = supertest('http://localhost:3000');
         clearDatabase = await container.get('/clearperson')
    })

    test('should return all persons with status code 200 (get)',async() => {
        response = await container.get('/person');
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    })
    

    test('should create a new person with status code 201 (post)', async() => {
        response = await container.post('/person').send({name:'Asadbek',age:34,hobbies:['wrestling', 'boxing']})
        expect(response.statusCode).toBe(201)
        expect(response.body).toBeInstanceOf(Object) 
        expect(response.body.name).toBe('Asadbek') 
        expect(response.body.age).toBe(34) 
        expect(response.body.hobbies).toEqual(['wrestling','boxing'])
    })

    test('should return the created person with status code 200 (get id)', async() => {
        response = await container.post('/person').send({name:'John',age:25,hobbies:['tennis', 'swimming']})
        let person = response.body
        let getById = await container.get(`/person/${person.id}`)
        expect(getById.body).toEqual(person)
        expect(getById.statusCode).toBe(200)
    })
    

    test('should edit the person and return with the same id (put)', async() => {
        response = await container.post('/person').send({name:'John',age:25,hobbies:['tennis', 'swimming']})
        let person = response.body
        let putByid = await container.put(`/person/${person.id}`).send({name:'Alex',age:33,hobbies:['colleting coins','pc gaming']})
        expect(putByid.statusCode).toBe(200)
        expect(putByid.body.id).toBe(person.id)
        expect(putByid.body.name).toBe('Alex')
        expect(putByid.body.age).toBe(33)
        expect(putByid.body.hobbies).toEqual(['colleting coins','pc gaming'])

    })
    
    test('should delete the created person and confirm the deletion (delete)', async() => {
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
    
    test('should return message non existing person  404 (get id)', async() => {
        //non exiting id
        let id = 'f27d8c91-4193-4f8d-8383-4df173fab5f8'
        let getById = await container.get(`/person/${id}`)
        expect(getById.statusCode).toBe(404)
        expect(getById.body.message).toBe('User is not found!')
    })

    test('should return message non existing person  404 (put)', async() => {
        //non exiting id
        let id = 'f27d8c91-4193-4f8d-8383-4df173fab5f8'
        let putByid = await container.put(`/person/${id}`).send({name:'Alex',age:33,hobbies:['colleting coins','pc gaming']})
        expect(putByid.statusCode).toBe(404)
        expect(putByid.body.message).toBe('User is not found!')
    })

    test('should return message invalid id  404 (put)', async() => {
       //invalid id
        let id = 'asdas334bb3434645g'
        let putByid = await container.put(`/person/${id}`).send({name:'Alex',age:33,hobbies:['colleting coins','pc gaming']})
        expect(putByid.statusCode).toBe(400)
        expect(putByid.body.message).toBe('User id is not valid!')
    })

    test('should return message non existing person  404 (delete)', async() => {
        //non exiting id
        let id = 'f27d8c91-4193-4f8d-8383-4df173fab5f8'
        let deleteByid = await container.delete(`/person/${id}`)
        expect(deleteByid.statusCode).toBe(404)
        expect(deleteByid.body.message).toBe('User is not found!')
    })
    
    test('should return message invalid id (delete)', async() => {
        //invalid id
        let id = 'asdas334bb3434645g'
        let getById = await container.get(`/person/${id}`)
        expect(getById.statusCode).toBe(400)
        expect(getById.body.message).toBe('User id is not valid!')
    })
    
    test('should return message invalid id (delete)', async() => {
        //invalid id
        let id = 'asdas334bb3434645g'
        let deleteByid = await container.delete(`/person/${id}`)
        expect(deleteByid.statusCode).toBe(400)
        expect(deleteByid.body.message).toBe('User id is not valid!')
    })
    
    test('should return non existing path 404', async() => {
        let randomUrl = await container.get('/nonexisting/path');
        expect(randomUrl.statusCode).toBe(404)
        expect(randomUrl.text).toBe('Non existing page!')
    })

    test('should return bad request validation (put) 400', async() => {
        response = await container.post('/person').send({name:'John',age:25,hobbies:['tennis', 'swimming']})
        let person = response.body
        response = await container.put(`/person/${person.id}`).send({name:'Asadbek',age:34,hobbies:'wrestling'})
        expect(response.statusCode).toBe(400)
        expect(response.body.message).toBe('Hobbies should be array!')
    })

    test('should return bad request validation (put) 400 ', async() => {
        response = await container.post('/person').send({name:'John',age:25,hobbies:['tennis', 'swimming']})
        let person = response.body
        response = await container.put(`/person/${person.id}`).send({name:{obj:'Asadbek'},age:34,hobbies:['wrestling']}) 
        expect(response.statusCode).toBe(400)
        expect(response.body.message).toBe('Name should be string!')
    })

    test('should return bad request validation (put) 400 ', async() => {
        response = await container.post('/person').send({name:'John',age:25,hobbies:['tennis', 'swimming']})
        let person = response.body
        response = await container.put(`/person/${person.id}`).send({name:'Asadbek',age:'34',hobbies:['wrestling']}) 
        expect(response.statusCode).toBe(400)
        expect(response.body.message).toBe('Age should be number!')
    })
    test('should return bad request validation (post) 400 ', async() => {
        response = await container.post('/person').send({name:['John'],age:25,hobbies:['tennis', 'swimming']})
        expect(response.statusCode).toBe(400)
        expect(response.body.message).toBe('Name should be string!')
    })
    test('should return bad request validation (post) 400 ', async() => {
        response = await container.post('/person').send({name:'John',age:{25:'res'},hobbies:['tennis', 'swimming']})
        expect(response.statusCode).toBe(400)
        expect(response.body.message).toBe('Age should be number!')
    })
    test('should return bad request validation (post) 400 ', async() => {
        response = await container.post('/person').send({name:'John',age:23,hobbies:{'tennis':'swimming'}})
        expect(response.statusCode).toBe(400)
        expect(response.body.message).toBe('Hobbies should be array!')
    })
    
   
    
    
    
    
})





