const http = require('http');
const Event = require('events');



class App{
    constructor(){
        this.emitter = new Event();
        this.server = this._createServer();
        this.middlewares = []
    }
    

    _createServer(){
        return http.createServer((req,res)=>{
            let body = ''
            req.on('data',(chunk)=>{
                body += chunk;
            })
            try{
                req.on('end',()=>{
                    if(body){
                        try{
                            req.body = JSON.parse(body)
                        }
                        catch(e){
                            res.statusCode=400;
                          return  res.end(`${e.message}`)
                        }
                       
                    }
                    this.middlewares.forEach(midd => midd(req,res))
                    const emitted = this.emitter.emit(this._getMask(req.path,req.method),req,res)
                    if(!emitted){
                        res.statusCode=404
                      return  res.end('Non existing page!')
                    }
                })
            }
            catch(e){
                console.log('Asad');

              
            }
         
           
        })
    }
    listen(port,callback){
        this.server.listen(port,callback)
    };
    use(midd){
        this.middlewares.push(midd)
    }

    addRouter(router){
        Object.keys(router.endpoints).forEach(url => {
            const endpoint= router.endpoints[url];
            Object.keys(endpoint).forEach(method=>{
                this.emitter.on(`[${url}]:[${method}]`,(req,res)=>{
                const callback = endpoint[method];
                    callback(req,res)
                })
            }) 
        })
    };
    _getMask(path,method){
        return `[${path}]:[${method}]`;
    }
}

module.exports = App