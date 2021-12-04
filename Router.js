
class Router{

    constructor(){
        this.endpoints = {}
    }

    request(method="GET",url,callback){
        if(!this.endpoints[url]){
            this.endpoints[url]={}
        }
        const endpoint = this.endpoints[url]
        if(endpoint[method]){
            throw new Error(`${method} with url ${url} already exists!`)
        }
        endpoint[method] = callback
        
    }

    get(url,callback){
        this.request('GET',url,callback) 
    }
    post(url,callback){
        this.request('POST',url,callback) 
    }
    delete(url,callback){
        this.request('DELETE',url,callback) 
    }
    put(url,callback){
        this.request('PUT',url,callback) 
    }
}

export default Router