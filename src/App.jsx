import React, { useState, createContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import JoinRoom from "./Pages/JoinRoom/JoinRoom";
import Room from "./Pages/Room/Room";
import createSocket from "./Util/Socket";

const socket = createSocket();
const UserContext = createContext({});

const App = () => {
    const [username, setUsername] = useState("");
    return (
        <UserContext.Provider value={{ username, setUsername }}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<JoinRoom />} />
                    <Route path="/:roomId" element={username ? <Room /> : <JoinRoom />} />
                </Routes>
            </BrowserRouter>
        </UserContext.Provider>
    );
};

export default App;
export { socket, UserContext };
