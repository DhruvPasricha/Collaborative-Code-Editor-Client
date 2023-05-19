import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";
import CopyToClipBoard from "../../Components/CopyToClipBoard/CopyToClipBoard";
import { UserContext } from "../../App";
import "./JoinRoom.css";
import Logo from "../../Components/Logo/Logo";

const generatedRoomId = uuidv4();

const JoinRoom = () => {
    const params = useParams();

    const [roomId, setRoomId] = useState(params.roomId || "");
    const { username, setUsername } = useContext(UserContext);
    const navigate = useNavigate();

    const handleJoinRoom = (event) => {
        event.preventDefault();
        navigate(`/${roomId}`);
    };

    const handleCreateRoom = () => {
        toast.success("Room Created Successfully", {
            position: "top-right",
        });
        setRoomId(generatedRoomId);
    };

    const userHasGeneratedRoomId = roomId === generatedRoomId;

    useEffect(() => {
        if (params.roomId) {
            navigate("/");
        }
    });

    return (
        <div className="join-room-container">
            <div className="header">
                <Logo />
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
                        autoFocus={roomId}
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

export default JoinRoom;
