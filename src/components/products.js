
import { useEffect, useState } from 'react'
import productService from '../services/product-service'

import './product.css'

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const productInitial = {
    name: '',
    category:'',
    price : '',
    imgURL:''
}

const Products = () => {

    const [productsState, setProductsState] = useState({ loading: false, products: [] })
    const [product, setProduct] = useState(productInitial)

    useEffect( async () => { // aca estoy creando una funcion anonima que se llama a si misma dado que el useEffect no permite funciones asyncronas, por lo que hay que comvertirlo a sincrono con then
        setProductsState({ loading: true })
        /* const response = await productService.getProducts();
        console.log(response.status)
        const data = await response.json()
        console.dir(data) */
        productService.getProducts()
        .then((response) => response.json())
        .then(async (data) => {
            //await sleep(2000).then(() => { console.log("World!"); });
            setProductsState({ loading: false, products: data });
            //console.log(data);
        })
        return ()=>{
            console.log('el ciclo de vida del component finalizo')
        }
    }, [])

    const setParameter = (e) => {
        setProduct({
            ...product,
            [e.target.name]: e.target.value
        })
    }

    const saveProduct = () => {

    }

    return (
        <>
        <div className='container'>
            <form onSubmit={saveProduct} className='form'>
                <label >Name : </label>
                <input type='text' name='name' onChange={setParameter}/>
                <br/>
                <br/>

                <label>Category : </label>               
                <input type='text' name='category' onChange={setParameter}/>
                <br/>
                <br/>
                <label>Price : </label>
                <input type='text' name='price' onChange={setParameter}/>
                <br/>
                <br/>
                <label>Image URL : </label>
                <input type='text' name = 'imgURL' onChange = {setParameter}/>
                <br/>
                <br/>
            </form>

            <table className="table">
                <thead className ="header">
                    <tr >
                        <td>ID</td>
                        <td>Name</td>
                        <td>Category</td>
                        <td>Price</td>
                    </tr>
                </thead>
                <tbody className = "body">
                    {
                        !productsState.loading && productsState.products.map((product) => (
                            <tr key={product._id}>
                                <td>{product._id}</td>
                                <td>{product.name}</td>
                                <td>{product.category}</td>
                                <td>{product.price}</td>
                            </tr>
                        ))
                    }
                
                </tbody>
            </table>
        </div>
        </>
    )
}

export default Products