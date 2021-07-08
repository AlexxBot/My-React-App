import { useState, useEffect} from 'react'
import { useParams } from "react-router-dom";
import axios from 'axios'
import {URL} from '../../global'

const FORM_ID = 'payment-form';

const Comprar = () => {
    const { id } = useParams(); // id de producto
    const [preferenceId, setPreferenceId] = useState(null);

    useEffect(() => {
        // luego de montarse el componente, le pedimos al backend el preferenceId
        axios.post(`${URL}/api/order`, {userId:"alex", productId: id, name:'laptop', price: 10, quantity: 1}).then((order) => {
            console.log(order.data.preferenceId)
            setPreferenceId(order.data.preferenceId);
        });
    }, [id]);

    useEffect(() => {
        if (preferenceId) {
            console.log('renderizar')
            // con el preferenceId en mano, inyectamos el script de mercadoPago
            const script = document.createElement('script');
            script.type = 'text/javascript';
            
            script.src =
            'https://www.mercadopago.com.pe/integrations/v1/web-payment-checkout.js';
            //'https://sdk.mercadopago.com/js/v2';
            script.setAttribute('data-preference-id', preferenceId);
            
            const form = document.getElementById(FORM_ID);
            form.appendChild(script);
            const titulo = document.createElement('h3')
            titulo.innerHTML = `preferencia ${preferenceId}`
            form.appendChild(titulo);
        }
    }, [preferenceId]);

    return (
        <form id={FORM_ID} method="GET" />
    );
}

export default Comprar