import { URL, HEADERS } from '../global'
import axios from 'axios'


//const URL_AUTH = `${URL}/auth` 

class AuthService {

    constructor() {
        this.URL_AUTH = `${URL}/auth`
    }

    login = async (form) => {

        return axios.post(`${this.URL_AUTH}/signin`, form).then((response) => {
            if(response.status === 200){
                console.log('status 200')
                return { email: form.email, isLogged: true, token: response.data.token }
            }
            else {
                console.log('there is an error trying to get the token')
                return {email: '', isLogged: false, token: ''}
            }
            
        }).catch((e) => console.log(e))
        /* return await fetch(`${this.URL_AUTH}/signin`, {
            method: 'Post', 
            headers: HEADERS, 
            body: JSON.stringify(form)
        }) */

        /* try {
            const response = await fetch('http://localhost:3000/auth/signin', {
                method: 'Post',
                //mode: 'no-cors',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: "alex.hotmail.com",//this raw text
                    password: "password"
                })

            })          
            console.log(response.status)
            const data = await response.json()
            console.log(data)
        }
        catch (e) {
            console.log('error', e)
        } */
    }

}

const authService = new AuthService()

export default authService