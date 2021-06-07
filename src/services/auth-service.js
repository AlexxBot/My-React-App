import { URL , HEADERS } from '../global'


const URL_AUTH = `${URL}/auth` 
class AuthService{
    
    constructor(){  
             
    }

    login = async (form) => {
        //console.log(form)
        //console.log('request to ', `${URL_AUTH}/signin`)
        return await fetch(`${URL_AUTH}/signin`, {
            method: 'Post', 
            headers: HEADERS, 
            body: JSON.stringify(form)
        })
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