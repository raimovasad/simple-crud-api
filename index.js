
import dotenv from 'dotenv'
dotenv.config()
import App from './app.js'
import userRouter from './userRouter.js';
import parsing from './middleware/parsing.js'
import urlparse from './middleware/urlparse.js'
import checkDB from './middleware/checkDB.js'

const app = new App() 


app.addRouter(userRouter)
app.use(parsing)
app.use(urlparse(`http://localhost:${process.env.PORT || 5000}`))
app.use(checkDB)

console.log(process.env.PORT);
const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`Server is running on PORT ${PORT}`);
})  
