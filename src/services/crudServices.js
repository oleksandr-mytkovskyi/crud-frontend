export default class CrudService {
    constructor() {
        // this._apiBase = 'http://localhost:8080/api/tutorials/';
        this._apiBase = 'http://node-env.eba-s8t9eksn.us-east-2.elasticbeanstalk.com/api/tutorials/';
    }
     getResource = async (url) => {
        const res = await fetch(`${this._apiBase}${url}`);
        
        if(!res.ok) {
            throw new Error('Error');
        }

        return await res.json();
    
    }
    
     getAllItem = async () => {
        const result =  await this.getResource('/');
        return  result;
    }

    createItem = async (data) => {

        const res = await fetch(`${this._apiBase}` , {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: data
        })          
        return res;
    }

    deleteItem = async (id) => {

        const res = await fetch(`${this._apiBase}${id}` , {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
        })          
        return res;
    }

    updataItem = async (id, data) => {

        const res = await fetch(`${this._apiBase}${id}` , {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: data
        })          
        return res;
    }
}
