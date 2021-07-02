
import { useEffect, useState } from 'react'
import productService from '../services/product-service'


import './product.css'
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

const Products = () => {

    const [productsState, setProductsState] = useState({ loading: false, products: [] })

    useEffect(async () => {
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

    return (
        <>
        <div>
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