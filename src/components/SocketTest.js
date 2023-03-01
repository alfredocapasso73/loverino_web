import React from "react";
import {io} from "socket.io-client";

const SocketTest = () => {

    const connect = () => {
        console.log("connect");
        try{
            const sk = io('https://chat.localoverino.se:8080/', {
                path: "/socket.io",
                autoConnect: true,
                transports: ['websocket']
            });
            //sk.connect();
            console.log('fatto:',sk);
        }
        catch(exception){
            console.log('exception:',exception);
        }
    }

    return(
        <div className="row">
            <button onClick={connect}>connect</button>
        </div>
    );
}
export default SocketTest;