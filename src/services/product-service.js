import { URL, HEADERS } from '../global'

export default class ProductService{
    
    constructor(){
        //URL = 'http://192.168.100.59:3000/product'  
    }

    getProductos = async () => {
        return fetch(URL) 
    }

    getProduct = async (id) => {
        return fetch(`${URL}/${id}`, {method : 'POST', headers: HEADERS})
    }

    saveProduct = async(product) =>{
        return fetch(URL)
    }
}