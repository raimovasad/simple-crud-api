module.exports=(localUrl)=>(req,res)=>{
    const parseurl = new URL(req.url,localUrl);
    const params ={}
    const id = parseurl.pathname.split('/').reverse()[0]
    params.id = id
    parseurl.searchParams.forEach((val,key)=> params[key] = val)
    let uri = parseurl.pathname.split('/')
    const userIndex = uri.filter(elem => elem !== '')
    
    if(userIndex.length>1){
        req.path = parseurl.pathname.replace(`${id}`,':id')
    }
    else{
        let arr = parseurl.pathname.split('')
        if(arr[arr.length-1] == '/'){
            arr.pop()
            req.path = arr.join('')
        }
        else{
        req.path = parseurl.pathname
        }

    }
    req.params = params
}