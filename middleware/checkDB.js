import {db} from '../utils/db.js'
export default (req,res) =>{
    if(db == undefined || null){
        res.send = ()=>{
            res.statusCode = 500;
          return  res.end('Internal server error!')
        }
    }
   
}