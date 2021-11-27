const Router = require('./Router');
const {v4:uuid} = require('uuid')
const router = new Router()

const users = [];

router.get('/person',(req,res)=>{
    res.statusCode = 200;
    res.send(users);
})

router.get('/person/:id',(req,res)=>{
    const valid = req.params.id.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i)
    if(!valid){
    res.statusCode = 400;
   return res.send({message:'User id is not valid!'})
    }
    const user = users.find(chel =>chel.id == req.params.id.toString())
    if(!user){
    res.statusCode = 404;
    return res.send({message:'User is not found!'})
    }
    else{
        res.statusCode = 201
        res.send(user);
    }
   
})

router.post('/person',(req,res)=>{
    const {name,age,hobbies} = req.body
    if(!name || !age || !hobbies){
        res.statusCode = 400
       return res.send({message:'Please send required fields!'})
    }
    else{
        const user = {
            id: uuid(),
            name,
            age,
            hobbies 
        }
        users.push(user)
        res.statusCode = 201
        res.send(user);
    }
})
router.delete('/person/:id',(req,res)=>{
    const valid = req.params.id.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i)
    if(!valid){
     res.statusCode = 400;
     return res.send({message:'User id is not valid!'})
    }
    const user = users.find(chel =>chel.id == req.params.id.toString())
    if(!user){
        res.statusCode = 404
        res.send({message:'User is not found!'});
    }
    else{
        const index = users.findIndex(chel => chel.id === req.params.id.toString())
        users.splice(index,1)
        res.statusCode = 204
       return res.send();
    }
})

router.put('/person/:id',(req,res)=>{
    const valid = req.params.id.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i)
    if(!valid){
     res.statusCode = 400;
     return res.send({message:'User id is not valid!'})
    }
   
    const user = users.find(chel =>chel.id == req.params.id.toString())
    if(!user){
        res.statusCode = 404
      return res.send({message:'User is not found!'});
    }
    const {name,age,hobbies} = req.body
    if(!name || !age || !hobbies){
        res.statusCode = 400
       return res.send({message:'Please send required fields!'})
    }
    else{
      const index = users.findIndex(chel =>chel.id === req.params.id.toString())
      const user = {
          id:users[index].id,
          name,
          age,
          hobbies
      }
      users[index] = user
        res.statusCode = 200
        res.send(users);
    }
})

module.exports = router