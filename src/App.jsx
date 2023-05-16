import React, { useState } from "react";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";
import CopyToClipBoard from "./Components/CopyToClipBoard/CopyToClipBoard";
import Room from "./Pages/Room/Room";
import "./App.css";
import createSocket from "./Util/Socket";

const socket = createSocket();
const generatedRoomId = uuidv4();

const App = React.memo(() => {
    const [{ roomId, username, showRoom }, setState] = useState({
        roomId: "",
        username: "",
        showRoom: false,
    });

    const userHasGeneratedRoomId = roomId === generatedRoomId;

    const handleJoinRoom = (event) => {
        event.preventDefault();
        setState((prevState) => ({ ...prevState, showRoom: true }));
    };

    const handleCreateRoom = () => {
        toast.success("Room Created Successfully", {
            position: "top-right",
        });
        setState((prevState) => ({ ...prevState, roomId: generatedRoomId }));
    };

    if (showRoom) {
        return <Room roomId={roomId} user={username} socket={socket} />;
    }

    return (
        <div className="join-room-container">
            <div className="header">
                <h1>Join a Room</h1>
            </div>
            <form onSubmit={handleJoinRoom}>
                <div className="form-field">
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
                            onChange={(event) =>
                                setState((prevState) => ({
                                    ...prevState,
                                    roomId: event.target.value,
                                }))
                            }
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
                        onChange={(event) =>
                            setState((prevState) => ({
                                ...prevState,
                                username: event.target.value,
                            }))
                        }
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
});

export default App;
