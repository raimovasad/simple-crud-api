module.exports = (req,res) =>{
    res.send=(data) =>{
        res.setHeader('Content-type','application/json')
        res.end(JSON.stringify(data))
    }
}