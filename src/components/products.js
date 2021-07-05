
import React from 'react';
import { useEffect, useState, useContext } from 'react'
import productService from '../services/product-service'
import { LoginContext } from '../context/login-context'
/* import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close'; */

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
    const [open, setOpen] = useState(false);

    const { userLogin } = useContext(LoginContext)

    useEffect( async () => { // aca estoy creando una funcion anonima que se llama a si misma dado que el useEffect no permite funciones asyncronas, por lo que hay que comvertirlo a sincrono con then
        setProductsState({ loading: true })
        /* productService.getProducts()
        .then((response) => response.json())
        .then(async (data) => {
            //await sleep(2000).then(() => { console.log("World!"); });
            setProductsState({ loading: false, products: data });
            //console.log(data);
        })
        return ()=>{
            console.log('el ciclo de vida del component finalizo')
        } */

        const productList = await productService.getProducts();
        console.log(productList)
        setProductsState({loading: false, products: productList})

    }, [])

    const setParameter = (e) => {
        setProduct({
            ...product,
            [e.target.name]: e.target.value
        })
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
    };

    const saveProduct = async (e) => {
        e.preventDefault();
        const {saved, newProduct} = await productService.saveProduct(product, userLogin.token)
        if(saved) {
            console.log('nuevo Product ',newProduct)
            setProductsState({ products: [...productsState.products, newProduct ]})
            setProduct(productInitial)
            //setOpen(true)
        }
        else{
            console.log('error, aqui se deberia mostart el mensaje de error')
        }

    }

    const deleteProduct = async(id) => {
       
        const {deleted} = await productService.deleteProduct(id, userLogin.token)
        console.log('este es el id que se elimino ', id)
        if(deleted){
            const productList = productsState.products.filter((val) => val._id !== id)
            setProductsState({ products: productList}) 
        }
        

    }

    const retriveProduct = async (id) => {
    
        const {retrived, retrivedProduct} = await productService.retriveProduct(id, userLogin.token)
        console.log('este es el producto recuperado ', retrivedProduct)
        if(retrived) {
            setProduct(retrivedProduct)
        }

    }

    return (
        <>
            <div className='container'>
                <form onSubmit={saveProduct} className='formulario'>
                    <label >Name : </label>
                    <input type='text' name='name' onChange={setParameter} value={product.name}/>
                    <br/>
                    <br/>

                    <label>Category : </label>               
                    <input type='text' name='category' onChange={setParameter} value = {product.category}/>
                    <br/>
                    <br/>
                    <label>Price : </label>
                    <input type='text' name='price' onChange={setParameter} value = {product.price}/>
                    <br/>
                    <br/>
                    <label>Image URL : </label>
                    <input type='text' name = 'imgURL' onChange = {setParameter} value = {product.imgURL}/>
                    <br/>
                    <br/>

                    <input type='submit' text='Agregar'/>
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

                                    <td><button onClick={deleteProduct.bind(this, product._id)}>eliminar</button></td>
                                    <td><button onClick={retriveProduct.bind(this, product._id)}>editar</button></td>
                                </tr>
                            ))
                        }
                    
                    </tbody>
                </table>

                
            </div>


            {/* <Snackbar
                    anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                    }}
                    open={open}
                    autoHideDuration={6000}
                    onClose={handleClose}
                    message="Note archived"
                    action={
                    <React.Fragment>
                        <Button color="secondary" size="small" onClick={handleClose}>
                        UNDO
                        </Button>
                        <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                        <CloseIcon fontSize="small" />
                        </IconButton>
                    </React.Fragment>
                    }
                /> */}
        </>
    )
}

export default Products