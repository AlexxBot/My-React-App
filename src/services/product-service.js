import axios from 'axios'
import { URL, HEADERS } from '../global'

//const URL_PRODUCT = `${URL}/products` 
class ProductService{
    
    constructor(){
        this.URL_PRODUCT = `${URL}/products`
        //URL = 'http://192.168.100.59:3000/product'  
    }

    getProducts = async () => {
        const response = await axios.get(this.URL_PRODUCT)
        if(response.status === 200)
        {
            return response.data;
        }
        else{
            return []
        }     
    }

    getProduct = async (id) => {
        return fetch(`${URL}/${id}`, {method : 'POST', headers: HEADERS})
    }

    saveProduct = async (product, token) => {

        const config = {
            headers: {
              'x-access-token': token
            }
        }
        console.log('URL', this.URL_PRODUCT, 'form ', product, 'config ',config)
        const response = await axios.post(this.URL_PRODUCT, product, config)        
        if(response.status === 201){
            console.log('product desde el metodo save ',response.data)
            return { saved : true, newProduct: response.data}
        }
        else{
            return { saved: false, newProduct: {}}
        }
    }

    deleteProduct = async ( idProduct, token) => {
        const config = {
            headers: {
              'x-access-token': token
            }
        }
        const response = await axios.delete(`${this.URL_PRODUCT}/${idProduct}`, config)
        return {retrived : response.status === 204?true: false}
    }

    retriveProduct = async (idProduct, token) => {
        const config = {
            headers: {
                'x-access-token' : token
            }
        }
        const response = await axios.get(`${this.URL_PRODUCT}/${idProduct}`, config)
        console.log('funcion retrive ',response)
        if(response.status === 200){
            return { retrived: true, retrivedProduct: response.data}
        }
        else{
            return { retrived: false, retrivedProduct: {}}
        }
        
    }
}

const productService = new ProductService()

export default productService