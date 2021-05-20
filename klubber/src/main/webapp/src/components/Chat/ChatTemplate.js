import React from "react";
import './ChatTemplate.css'


export default function ChatTemplate(props) {

    let bubble = props.mine ? <div className="msg right-msg">
            <div className="msg-img"/>
            <div className="msg-bubble">
                <div className="msg-info">
                    <div className="msg-info-name">{props.message.sender}</div>
                    <div className="msg-info-time">{props.message.sendDate}</div>
                </div>
                <div className="msg-text">
                    {props.message.message}
                </div>
            </div>
        </div>
        : <div className="msg left-msg">
            <div className="msg-img"/>
            <div className="msg-bubble">
                <div className="msg-info">
                    <div className="msg-info-name">{props.message.sender}</div>
                    <div className="msg-info-time">{props.message.sendDate}</div>
                </div>

                <div className="msg-text">
                    {props.message.message}
                </div>
            </div>
        </div>;


    return (
        bubble
    )
}