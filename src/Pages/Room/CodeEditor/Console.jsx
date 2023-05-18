import React, { useState } from "react";
import { Button } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import "./CodeEditor.css";

const Console = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="console">
            <div className="action-items">
                <Button
                    variant="text"
                    sx={{
                        backgroundColor: "transparent",
                        color: "unset",
                        "&:hover": {
                            backgroundColor: "unset",
                            border: "unset",
                        },
                        textTransform: "none",
                    }}
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    Console
                    {isExpanded ? (
                        <KeyboardArrowUpIcon />
                    ) : (
                        <KeyboardArrowDownIcon />
                    )}
                </Button>
                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: "#23964A",
                        "&:hover": {
                            backgroundColor: "#1E7E3C",
                        },
                        textTransform: "none",
                    }}
                >
                    Compile and Run
                    <PlayArrowIcon />
                </Button>
            </div>
        </div>
    );
};

export default Console;
