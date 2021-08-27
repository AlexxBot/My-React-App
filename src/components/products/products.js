
import React from 'react';
import { useEffect, useState, useContext } from 'react'
import productService from '../../services/product-service'
import { LoginContext } from '../../context/login-context'
/* import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close'; */

import './products.css'

import { Table, OverlayTrigger, Tooltip , Form as Form2, Button} from 'react-bootstrap'

import Selector from './selector'

import { Formik, Field, Form } from 'formik';




function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const productInitial = {
    _id: '',
    name: '',
    category: '',
    price: '',
    imgURL: ''
}

const categories = [
    { value:'laptop', label:'laptop'},
    { value:'impresora', label:'impresora'}
]



const Products = () => {

    const [productsState, setProductsState] = useState({ loading: false, products: [] })
    const [product, setProduct] = useState(productInitial)
    const [open, setOpen] = useState(false);

    const { userLogin } = useContext(LoginContext)

    useEffect(async () => { // aca estoy creando una funcion anonima que se llama a si misma dado que el useEffect no permite funciones asyncronas, por lo que hay que comvertirlo a sincrono con then
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
        setProductsState({ loading: false, products: productList })

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
        if (product._id === '') {
            const { saved, newProduct } = await productService.saveProduct(product, userLogin.token)
            if (saved) {
                //console.log('nuevo Product ',newProduct)
                setProductsState({ products: [...productsState.products, newProduct] })
                reset()
                //setOpen(true)
            }
            else {
                console.log('error, aqui se deberia mostart el mensaje de error')
            }
        }
        else {
            const { updated, updatedProduct } = await productService.updateProduct(product, userLogin.token)
            if (updated) {
                //console.log('updated Product ',updatedProduct)
                const updatedList = productsState.products.map((prod) => prod._id === updatedProduct._id ? updatedProduct : prod)
                setProductsState({ products: updatedList })
                reset()
                //setOpen(true)
            }
            else {
                console.log('error, aqui se deberia mostart el mensaje de error')
            }
        }



    }

    //const updateProduct = async(e) => {}

    const deleteProduct = async (id) => {

        const { deleted } = await productService.deleteProduct(id, userLogin.token)

        if (deleted) {
            console.log('este es el id que se elimino ', id)
            const productList = productsState.products.filter((val) => val._id !== id)
            setProductsState({ products: productList })
        }


    }

    const retrieveProduct = async (id) => {

        const { retrieved, retrievedProduct } = await productService.retrieveProduct(id, userLogin.token)
        console.log('este es el producto recuperado ', retrievedProduct)
        if (retrieved) {
            setProduct(retrievedProduct)
        }

    }

    const reset = () => {
        setProduct(productInitial)
    }

    return (
        <>
            <div className='container'>
                {/* <form onSubmit={saveProduct} className='formulario'>

                    <label>ID : </label>

                    <input type='text' name='id' value={product._id} readOnly={true}/>
                    <br/>
                    <br/>
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

                    <input type='submit' value='Guardar'/>
                    <span>  </span>
                    <button type='button' onClick={reset}>Limpiar</button>
                    <br/>
                </form> */}

                {/* <Formik 
                
                    initialValues={{
                        name: '',
                        category: '',
                        price: '',
                        imgURL: ''
                    }}
                    validate = {
                        values => {
                            const errors = {}
                            if(!values.name){
                                errors.name = 'Requerido'
                            }

                            return errors
                        }
                    }

                    onSubmit = {(values, { setSubmitting }) => {
                        setTimeout(() => {
                            alert(JSON.stringify(values, null, 2));
                            setSubmitting(false);
                        }, 20);
                        }
                    }
                    >

                    {({
                            values,
                            errors,
                            touched,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            isSubmitting,
                            
                        }) => (
                

                    <Form>                     
                        <Field name = 'name'/>
                        {errors.name}       
                        

                        <Field name="category">
                            {({
                            field, // { name, value, onChange, onBlur }
                            form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                            meta,
                            }) => (
                                <Selector categorias ={categories} titulo ="categorias" {...field}/>  
                            )}
                        </Field>   
                        

                               
                        <Field name = 'price'/> 
                        <Field name = 'imgURL'/>    
                        <button type="submit">
                            Submit
                        </button>
                        </Form>        
                        )}

                </Formik> */}

                <Form2 onSubmit={saveProduct} className='formularioProduct'>
                    
                    <Form2.Group controlId="formId">
                        <Form2.Label>ID</Form2.Label>
                        <Form2.Control type="text" placeholder="ID" value = {product._id} name = 'id' onChange={setParameter}/>
                    </Form2.Group>

                    <Form2.Group controlId="formName">
                        <Form2.Label>Name</Form2.Label>
                        <Form2.Control type="text" placeholder="Name" value = {product.name} name = 'name' onChange={setParameter} />
                    </Form2.Group>
                    

                    <Form2.Group controlId="formCategory">
                        <Form2.Label>Category</Form2.Label>
                        <Form2.Control type='text' placeholder="Category" value= {product.category} name = 'category' onChange={setParameter}/>
                    </Form2.Group>

                    <Form2.Group controlId="formPrice">
                        <Form2.Label>Price</Form2.Label>
                        <Form2.Control type = 'text' placeholder="Price" value={product.price} name = 'price' onChange={setParameter}/>
                    </Form2.Group>

                    <Form2.Group controlId="formImgUrl">
                        <Form2.Label>Image URL</Form2.Label>
                        <Form2.Control type = 'text' placeholder="Image URL" value={product.imgURL} name = 'imgURL' onChange={setParameter}/>
                    </Form2.Group>

                   <Form2.Row>
                        <Button variant="primary" type="submit">
                            Guardar
                        </Button>
                        <span>   </span>
                        <Button variant="secondary" type="button" onClick={reset}>
                            limpiar
                        </Button>
                   </Form2.Row>
                    
                </Form2>

                {/* <table className="table">
                    
                    <thead className ="header">
                        <tr >
                            <td>ID</td>
                            <td>Name</td>
                            <td>Category</td>
                            <td>Price</td>
                            <td>Actions</td>
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

                                    <td><button onClick={deleteProduct.bind(this, product._id)}>eliminar</button><span> </span><button onClick={retrieveProduct.bind(this, product._id)}>editar</button></td>
                                </tr>
                            ))
                        }
                    
                    </tbody>
                </table> */}

                <Table striped bordered hover className="tabla">
                    <thead >
                        <tr >
                            <th>ID</th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody >
                        {
                            !productsState.loading && productsState.products.map((product) => (
                                <tr key={product._id}>
                                    <td>{product._id}</td>
                                    <td>{product.name}</td>
                                    <td>{product.category}</td>
                                    <td>{product.price}</td>



                                    <td>{/* {<button onClick={deleteProduct.bind(this, product._id)}>eliminar</button><span> </span><button onClick={retrieveProduct.bind(this, product._id)}>editar</button>} */}
                                        <OverlayTrigger
                                            overlay={
                                                <Tooltip id={`tooltip-top`}>
                                                    Edit
                                                </Tooltip>
                                            }>
                                            <button onClick={retrieveProduct.bind(this, product._id)} className="btn text-warning btn-act" data-toggle="modal"><i className="material-icons">&#xE254;</i></button>
                                        </OverlayTrigger>
                                        <OverlayTrigger
                                            overlay={
                                                <Tooltip id={`tooltip-top`}>
                                                    Delete
                                                </Tooltip>
                                            }>
                                            <button onClick={deleteProduct.bind(this, product._id)} className="btn text-danger btn-act" data-toggle="modal"><i className="material-icons">&#xE872;</i></button>
                                        </OverlayTrigger>
                                    </td>
                                </tr>
                            ))
                        }

                    </tbody>
                </Table>


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