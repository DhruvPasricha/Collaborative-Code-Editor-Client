import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";
import CopyToClipBoard from "./Components/CopyToClipBoard/CopyToClipBoard";
import Room from "./Pages/Room/Room";
import "./App.css";

const App = () => {
    const [roomId, setRoomId] = useState();
    const [username, setUsername] = useState();
    const [generatedRoomId, setGeneratedRoomId] = useState();
    const [showRoom, setShowRoom] = useState(false);

    const userHasGeneratedRoomId = roomId === generatedRoomId;

    const handleJoinRoom = (event) => {
        event.preventDefault();
        setShowRoom(true);
    };

    const handleCreateRoom = () => {
        toast.success("Room Created Successfully", {
            position: "top-right",
        });
        setRoomId(generatedRoomId);
    };

    useEffect(() => {
        if (!generatedRoomId) {
            setGeneratedRoomId(uuidv4());
        }
    }, [generatedRoomId]);

    if (showRoom) {
        return <Room roomId={roomId} user={username}/>;
    }

    return (
        <div className="join-room-container">
            <div className="header">
                <h1>Join a Room</h1>
            </div>
            <form onSubmit={handleJoinRoom}>
                <div className="form-field" st>
                    <label htmlFor="roomId">Room ID:</label>
                    {userHasGeneratedRoomId ? (
                        <div className="room-id-copy-container">
                            {roomId}
                            <CopyToClipBoard
                                value={roomId}
                                toastPosition="top-right"
                            />
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
                        <span
                            className="create-room"
                            onClick={handleCreateRoom}
                        >
                            Create one now
                        </span>
                    </p>
                )}
            </form>
        </div>
    );
};

export default App;
