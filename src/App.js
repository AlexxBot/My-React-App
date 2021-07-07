import './App.css';
import socketIOClient from "socket.io-client";
import {useEffect} from 'react';

import Routes  from './routes'

import { LoginProvider } from './context/login-context'
import { URL_SOCKET } from './global'

const ENDPOINT = 'http://192.168.100.59:4000';

/* function App() {
  const [response, setResponse] = useState("")

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on("sendContador", data => {
      console.log(data)
      setResponse(data);
    })
  }, []);

  return (
    <p>
      Este viene del socket {response}
    </p>
  )
} */


function App() {
  /* useEffect(() => {
    const socket = socketIOClient(URL_SOCKET);
    socket.on('sendId', id => console.log('este es mi socket id', id))
    
  }, []); */

  
  //aqui podria estar el login u setLogin en usestate pero como no es buena practica se usa el providr logn


  return (
    <LoginProvider>
      <Routes/>
    </LoginProvider>  
  )
  
}

/* class App extends Component{
  
  constructor(props){
    super(props)
    this.state = {
      form : initialForm
    }
  }

  login(e){
    e.preventDefault();
    //console.log(`the user ${this.state.form.user} want to be logged`)

    fetch('https://localhost:3000/auth/signin', {
      method: 'Post',
      headers: {
        'Content-Type': 'aplication/json'
      },
      body: JSON.stringify({
        email: "alex.hotmail.com",
        password: "password"
      })
    }).then((response) => {
      console.log(response)
    })
  }

  fillForm(e){
    this.setState({form : {...this.state.form, [e.target.name]: e.target.value}})
  }

  render() {
    return(
    <div className='form'>
      <form onSubmit={this.login}>
        <input type='text' name='user' placeholder="user" value={this.state.form.user} onChange={this.fillForm}/>
        <br/>
        <input type='text' name='password' placeholder="password" value={this.state.form.password} onChange={this.fillForm}/>
        <br/>
        <input type='submit' id='submitForm'/>
      </form>
    </div>
    )
  }
} */

export default App;
