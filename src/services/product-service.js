import { URL, HEADERS } from '../global'

const URL_PRODUCT = `${URL}/products` 
class ProductService{
    
    constructor(){
        //URL = 'http://192.168.100.59:3000/product'  
    }

    getProducts = async () => {
        return fetch(URL_PRODUCT) 
    }

    getProduct = async (id) => {
        return fetch(`${URL}/${id}`, {method : 'POST', headers: HEADERS})
    }

    saveProduct = async(product) =>{
        return fetch(URL)
    }
}

const productService = new ProductService()

export default productService