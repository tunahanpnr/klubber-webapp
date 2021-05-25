import React, {useEffect, useState} from "react";
import SockJsClient from 'react-stomp';
import './ChatTemplate.css'
import ChatTemplate from "./ChatTemplate.js";
import axios from "axios";


export default function Chat(props) {
    const [newMsg, setNewMsg] = useState("")
    const [connected, setConnected] = useState(false)
    const [clientRef, setClientRef] = useState();
    const [messages, setMessages] = useState([]);

    const showChat = () => {
        return (messages.map((message) => {
                let isMine = message.sender === props.sender.username;

                return (
                    <ChatTemplate mine={isMine} message={message}/>
                )
            }
        ))

    }

    useEffect(() => {
        console.log("rendering Chat.js")
        let url = "/getmessages/" + props.sender.username + "/" + props.receiver;
        axios.get(url)
            .then(response => {
                console.log(response.data);
                setMessages(response.data);
            })
    }, [props.receiver, props.sender]);

    let onConnected = () => {
        setConnected(true)
        console.log("Connected!!")
    }

    let disConnected = () => {
        setConnected(false)
        console.log("Disconnected!!")
    }

    const onMessageReceived = (msg, topic) => {
        setMessages(messages => [...messages, msg]);
        console.log("onMessageReceived" + messages)
    }

    const sendMessage = () => {
        let msg = {
            message: newMsg,
            sender: props.sender.username,
            receiver: props.receiver,
            sendDate: new Date()
        }
        try {

            clientRef.sendMessage("/app/chat/" + props.receiver, JSON.stringify(msg))
            msg.sendDate = msg.sendDate.toDateString()
            setMessages(messages => [...messages, msg])
            setNewMsg("");
            return true;
        } catch (e) {
            return false;
        }
    }

    return (
        <div className='container'>
            <SockJsClient url='/chat' topics={['/topic/messages/' + props.sender.username]}
                          onConnect={onConnected}
                          onDisconnect={disConnected}
                          onMessage={onMessageReceived}
                          ref={(client) => {
                              setClientRef(client)
                          }}
            />
            {connected && <div className="msger">
                <div className="msger-chat">
                    {showChat()}
                </div>

                <div className="msger-inputarea">
                    <input type="text" className="msger-input" placeholder="Enter your message..."
                           onChange={e => setNewMsg(e.target.value)}/>
                    <button className="msger-send-btn" onClick={sendMessage}>Send</button>
                </div>
            </div>}

        </div>
    )
}

