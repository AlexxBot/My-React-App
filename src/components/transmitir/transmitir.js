import { useState, useRef, useEffect, useContext } from 'react'
import Peer from 'simple-peer'
import io from 'socket.io-client'
import { LoginContext } from '../../context/login-context'

import { URL_SOCKET } from '../../global'


var connectionOptions = {
    "force new connection": true,
    "reconnectionAttempts": "Infinity",
    "timeout": 10000,
    "transports": ["websocket"]
};

const socket = io.connect(URL_SOCKET, connectionOptions)

const peerConfig =
{

    'iceServers': [
        { urls: 'stun:stun01.sipphone.com' },
        { urls: 'stun:stun.ekiga.net' },
        { urls: 'stun:stun.fwdnet.net' },
        { urls: 'stun:stun.ideasip.com' },
        { urls: 'stun:stun.iptel.org' },
        { urls: 'stun:stun.rixtelecom.se' },
        { urls: 'stun:stun.schlund.de' },
        { urls: 'stun:stun.l.google.com:19302' },
        { urls: 'stun:stun1.l.google.com:19302' },
        { urls: 'stun:stun2.l.google.com:19302' },
        { urls: 'stun:stun3.l.google.com:19302' },
        { urls: 'stun:stun4.l.google.com:19302' },
        { urls: 'stun:stunserver.org' },
        { urls: 'stun:stun.softjoys.com' },
        { urls: 'stun:stun.voiparound.com' },
        { urls: 'stun:stun.voipbuster.com' },
        { urls: 'stun:stun.voipstunt.com' },
        { urls: 'stun:stun.voxgratia.org' },
        { urls: 'stun:stun.xten.com' },
        {
            urls: 'turn:numb.viagenie.ca',
            credential: 'muazkh',
            username: 'webrtc@live.com'
        },
        {
            'urls': 'turn:192.158.29.39:3478?transport=udp',
            'credential': 'JZEOEt2V3Qb0y27GRntt2u2PAYA=',
            'username': '28224511:1379330808'
        },
        {
            'urls': 'turn:192.158.29.39:3478?transport=tcp',
            'credential': 'JZEOEt2V3Qb0y27GRntt2u2PAYA=',
            'username': '28224511:1379330808'
        }
    ]

    /* 'iceServers': [
        { urls: 'stun:stun01.sipphone.com' },
        { urls: 'stun:stun.ekiga.net' },
        { urls: 'stun:stun.fwdnet.net' },
        { urls: 'stun:stun.ideasip.com' },
        { urls: 'stun:stun.iptel.org' },
        { urls: 'stun:stun.rixtelecom.se' },
        { urls: 'stun:stun.schlund.de' },
        { urls: 'stun:stun.l.google.com:19302' },
        { urls: 'stun:stun1.l.google.com:19302' },
        { urls: 'stun:stun2.l.google.com:19302' },
        { urls: 'stun:stun3.l.google.com:19302' },
        { urls: 'stun:stun4.l.google.com:19302' },
        { urls: 'stun:stunserver.org' },
        { urls: 'stun:stun.softjoys.com' },
        { urls: 'stun:stun.voiparound.com' },
        { urls: 'stun:stun.voipbuster.com' },
        { urls: 'stun:stun.voipstunt.com' },
        { urls: 'stun:stun.voxgratia.org' },
        { urls: 'stun:stun.xten.com' },
        {
            urls: 'turn:numb.viagenie.ca',
            credential: 'muazkh',
            username: 'webrtc@live.com'
        },
        {
            urls: 'turn:192.158.29.39:3478?transport=udp',
            credential: 'JZEOEt2V3Qb0y27GRntt2u2PAYA=',
            username: '28224511:1379330808'
        },
        {
            urls: 'turn:192.158.29.39:3478?transport=tcp',
            credential: 'JZEOEt2V3Qb0y27GRntt2u2PAYA=',
            username: '28224511:1379330808'
        }
    ] */
}


const Transmitir = () => {

    const { userLogin } = useContext(LoginContext)
    const [socketId, setSocketId] = useState('')
    const [stream, setStream] = useState()
    const [audio, setAudio] = useState(true)
    const [video, setVideo] = useState(true)

    const [mensajes, setMensajes] = useState([])




    const [room, setRoom] = useState('')

    const myVideo = useRef()
    //const userVideo = useRef()
    const connectionRef = useRef()

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video: video, audio: audio }).then((stream) => {
            setStream(stream)
            myVideo.current.srcObject = stream
        })

        socket.on('sendId', (id) => {
            console.log('this is my socket id', id)
            setSocketId(id)
        })

        socket.on('receiveMessage', (mensaje) => {
            const nuevosMensajes = [...mensajes, { from: mensaje.from, mensaje: mensaje.payload }]

            setMensajes(nuevosMensajes)
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

    const IniciarTransmision = () => {

        const peer = new Peer({
            initiator: true,
            trickle: false,
            config: peerConfig,
            stream: stream
        })

        peer.on("signal", (data) => {
            socket.emit("transmitir", {
                room: room,
                signalData: data,
                from: socketId,
                email: userLogin.email
            })
        })

        //aca deberia iniciarse el socket peer para recibir el stream de la llamada
        //esto tambien podria ser para ver el numero de vistas cuantando los usuarios qe se conectan
        socket.on("addViewer", (signal) => {
            console.log("te uniste a la transmision")
            peer.signal(signal)
        })
        connectionRef.current = peer

    }

    return (
        <>
            <h1 style={{ textAlign: "center", color: '#fff' }}>Streaming</h1>
            <div className='container-stream'>
                <div className='video-container'>
                    <h2>Video</h2>
                    <div className='video'>
                        {stream && <video playsInline muted ref={myVideo} autoPlay style={{ width: "600px", height: "400px" }} />}
                    </div>

                    <div className='settings'>
                        <label>Room</label>
                        <input type='text' onChange={ConfigurarRoom} value={room} />
                        <button onClick={ConfigurarAudio}>{audio ? 'Deshabilitar Audio' : 'Habilitar Audio'}</button>
                        <button onClick={ConfigurarVideo}>{video ? 'Deshabilitar Video' : 'Habilitar Video'}</button>

                        <button onClick={IniciarTransmision}> Transmitir</button>
                    </div>
                </div>
                <div className='chat-container'>
                    <h2>Chat</h2>

                    {
                        mensajes.map((mensaje) => {
                            <div>
                                <label>{mensaje.from} :</label>
                                <label>{mensaje.mensaje}</label>
                            </div>
                        })
                    }

                </div>

            </div>

        </>
    )
}

export default Transmitir