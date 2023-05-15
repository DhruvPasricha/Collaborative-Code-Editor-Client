import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";
import { FiCopy } from "react-icons/fi";
import "./App.css";

const App = () => {
    const [roomId, setRoomId] = useState();
    const [username, setUsername] = useState();
    const [generatedRoomId, setGeneratedRoomId] = useState();

    const userHasGeneratedRoomId = roomId === generatedRoomId;

    const handleJoinRoom = (event) => {
        event.preventDefault();
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(roomId);
        toast.success("Copied to Clipboard");
    };

    const handleCreateRoom = () => {
        toast.success("Room Created Successfully");
        setRoomId(generatedRoomId);
    };

    useEffect(() => {
        if (!generatedRoomId) {
            setGeneratedRoomId(uuidv4());
        }
    }, [generatedRoomId]);

    return (
        <div className="join-room-container">
            <div className="header">
                <h1>Join a Room</h1>
            </div>
            <form onSubmit={handleJoinRoom}>
                <div className="form-field" st>
                    <label htmlFor="roomId">Room ID:</label>
                    {userHasGeneratedRoomId ? (
                        <div className="input-field-disabled">
                            {roomId}
                            <FiCopy onClick={handleCopy} cursor="pointer" />
                        </div>
                    ) : (
                        <input
                            type="text"
                            id="roomId"
                            value={roomId}
                            onChange={(event) => setRoomId(event.target.value)}
                            className="input-field"
                            required
                            autoComplete="off"
                        ></input>
                    )}
                </div>
                <div className="form-field">
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                        className="input-field"
                        required
                        autoComplete="off"
                    />
                </div>
                <button type="submit" className="join-button">
                    Join Room
                </button>
                {!userHasGeneratedRoomId && (
                    <p>
                        Don't have a Room ID?{" "}
                        <span onClick={handleCreateRoom}>Create one now</span>
                    </p>
                )}
                <Toaster position="top-right" />
            </form>
        </div>
    );
};

export default App;
