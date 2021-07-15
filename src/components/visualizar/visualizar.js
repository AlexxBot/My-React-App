import { useState, useRef, useEffect, useContext } from 'react'
import Peer from 'simple-peer'
import io from 'socket.io-client' 
import { LoginContext } from '../../context/login-context'

import { URL_SOCKET } from '../../global'

import Mensaje from './mensaje'


const socket = io.connect(URL_SOCKET)

const Visualizar = () => {

    const { userLogin } = useContext(LoginContext)
    const [socketId, setSocketId] = useState('')
    //const [stream, setStream] = useState()
    const [audio, setAudio] = useState(true)
    const [video, setVideo] = useState(true)

    const [ receivingStreaming, setReceivingStreaming] = useState(false)
    const [ streamer, setStreamer] = useState('')

    const [ streamerSignal, setStreamerSignal] = useState()

    const [room , setRoom] = useState('')

    //const myVideo = useRef()
    const userVideo = useRef()
    const connectionRef = useRef()

    const [mensaje, setMensaje] = useState('')
    const [mensajes, setMensajes] = useState([])

    const [lista, setLista] = useState([])

    useEffect(() => {
        
        /* navigator.mediaDevices.getUserMedia({video: video, audio: audio}).then((stream) => {
            setStream(stream)
            myVideo.current.srcObject = stream
        }) */

        socket.on('sendId', (id) => {
            console.log('this is my socket id', id)
            setSocketId(id)
        })

        socket.on('streaming', (data) => {
            setReceivingStreaming(true)
            setStreamer(data.email)
            //console.log('se esta recibiendo stream de ', data.from)
            setStreamerSignal(data.signal)
        })

        socket.on('receiveMessage', (m) => {
            
            //console.log(lista)
            //const newList = [...lista, m]
            setLista((prev) => [...prev, m])

            
        })

        

    

    }, [])

    const ConfigurarAudio = () => {
        setAudio(!audio)
    }

    const ConfigurarVideo = () => {
        setVideo(!video)
    }

    const ConfigurarRoom = (e) => {
        console.log('room', e.target.value)
        setRoom(e.target.value)
    }

    const VerTransmision = () => {

        const peer = new Peer({
            initiator: false,
            trickle: false
        })

        peer.on("signal", (data) => {
            socket.emit("recibido", {
                socketId: socketId,
                signal: data,
            })
        })

        peer.on("stream", (stream) => {
            userVideo.current.srcObject = stream
        })

        //aca deberia iniciarse el socket peer para recibir el stream de la llamada
        //esto tambien podria ser para ver el numero de vistas cuantando los usuarios qe se conectan
        peer.signal(streamerSignal)
        connectionRef.current = peer

    }

    const fillMensaje = (e) => {

        //console.log('aqui se esta llenado el mensaje ', mensaje)
        setMensaje(e.target.value)
    }

    const enviarMensaje = (e) => {
        //e.preventValue()
        socket.emit('sendMensaje',{from: socketId, payload: mensaje})
        setMensaje('')
    }

    return (
        <>
            <h1 style={{ textAlign: "center", color: '#fff' }}>Streaming</h1>
            <div className = 'container-stream'>
                <div className = 'video-container'>
                    <h2>Video</h2>
                    <div className='video'>
                        {receivingStreaming? <video playsInline muted ref={userVideo} autoPlay style = {{width:"600px", height:"400px"}}/>: null}
                    </div>

                    <div className = 'settings'>
                        {/* <label>Room</label>
                        <input type='text' onChange = {ConfigurarRoom} value = {room}/>
                        <button onClick = {ConfigurarAudio}>{audio?'Deshabilitar Audio': 'Habilitar Audio'}</button>
                        <button onClick = {ConfigurarVideo}>{video?'Deshabilitar Video': 'Habilitar Video'}</button> */}

                        <button onClick = {VerTransmision}>Ver Transmision</button>
                    </div>
                </div>
                <div className = 'chat-container'>
                    <h2>Chat</h2>
                    {
                        lista.map((message) => 
                            <Mensaje key={message.id} from ={message.from}  mensaje = {message.mensaje}/>
                        )

                        
                    }
                    <div>
                    <input type='text' value={mensaje} onChange={fillMensaje}/>
                    <button onClick = {enviarMensaje}>Enviar</button>
                    </div>
                    
                </div>
                
            </div>
            
        </>
    )
}

export default Visualizar