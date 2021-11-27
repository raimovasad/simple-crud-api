
require('dotenv').config()
const App = require('./app')
const app = new App() 
const userRouter = require('./userRouter') 
const parsing = require('./middleware/parsing')
const urlparse = require('./middleware/urlparse')


app.addRouter(userRouter)
app.use(parsing)
app.use(urlparse(`http://localhost:${process.env.PORT || 5000}`))

console.log(process.env.PORT);
const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`Server is running on PORT ${PORT}`);
})  

module.exports = app