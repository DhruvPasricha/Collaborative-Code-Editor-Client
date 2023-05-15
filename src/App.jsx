import React, { useState } from "react";
import "./App.css";

const App = () => {
    const [roomId, setRoomId] = useState("");
    const [username, setUsername] = useState("");

    const handleJoinRoom = (event) => {
        event.preventDefault();
    };

    const handleCreateRoom = () => {
        if (roomId) {
            return;
        }
        setRoomId("random-room-id");
    };

    return (
        <div className="join-room-container">
            <div className="header">
                <h1>Join a Room</h1>
            </div>
            <form onSubmit={handleJoinRoom}>
                <div className="form-field">
                    <label htmlFor="roomId">Room ID:</label>
                    <input
                        type="text"
                        id="roomId"
                        value={roomId}
                        onChange={(event) => setRoomId(event.target.value)}
                        className="input-field"
                        required
                    />
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
                    />
                </div>
                <button type="submit" className="join-button">
                    Join Room
                </button>
                <p>
                    Don't have a Room ID?{" "}
                    <span onClick={handleCreateRoom}>Create one now</span>
                </p>
            </form>
        </div>
    );
};

export default App;
