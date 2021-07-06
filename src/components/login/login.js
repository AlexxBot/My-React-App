import { useContext, useState } from 'react'
import { Redirect } from 'react-router-dom'
import { LoginContext } from '../../context/login-context'
import authService from '../../services/auth-service'


//const authService = new AuthService()
const initialForm = {
    email: 'alex.hotmail.com',
    password: 'alex'
}


const Login = () => {

    const [form, setForm] = useState(initialForm)
    const [redirect, setRedirect] = useState(false)

    const { setUserLogin } = useContext(LoginContext)

    const login = async (e) => {

        e.preventDefault();
        var {email, isLogged, token} = await authService.login(form)
        console.log({email, isLogged, token});       
        setUserLogin({email: email, isLogged: isLogged, token: token})
        setRedirect(isLogged)
            
        

        /* try {
            console.log(`the user ${form.user} want to be logged`)
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
    const fillForm = (e) => {
        setForm(
            {
                ...form,
                [e.target.name]: e.target.value
            }
        )
    }

    return (
        <>
            {
                redirect === true ? <Redirect to='products' /> :
                    <div className='form'>
                        <form onSubmit={login}>
                            <input type='text' name='email' placeholder="email" value={form.email} onChange={fillForm} />
                            <br />
                            <input type='text' name='password' placeholder="password" value={form.password} onChange={fillForm} />
                            <br />
                            <input type='submit' id='submitForm' />
                        </form>
                    </div>
            }
        </>
    )
}

export default Login