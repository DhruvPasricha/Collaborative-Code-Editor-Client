import React, { useState } from "react";
import toast from "react-hot-toast";
import { Resizable } from "re-resizable";
import { Button } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import "../CodeEditor.css";
import { languages } from "../Constants";

const CustomTextArea = ({ heading, textAreaProps }) => {
    return (
        <div className="custom-textarea">
            <span className="custom-textarea-heading">{heading}</span>
            <textarea {...textAreaProps} />
        </div>
    );
};

const InputOutputContainer = ({ inputText, setInputText, outputText }) => {
    return (
        <Resizable
            className="input-output-container"
            defaultSize={{ height: "30vh" }}
            bounds="parent"
            enable={{ top: true }}
        >
            <CustomTextArea
                heading="Input"
                textAreaProps={{
                    value: inputText,
                    onChange: (event) => setInputText(event.target.value),
                    autoFocus: true,
                }}
            />
            <CustomTextArea
                heading="Output"
                textAreaProps={{
                    value: outputText,
                    readOnly: true,
                }}
            />
        </Resizable>
    );
};

const Console = ({ language, body }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [inputText, setInputText] = useState("");
    const [outputText, setOutputText] = useState("");
    const [status, setStatus] = useState("completed");

    const handleCodeExecution = async () => {
        const baseUrl = "http://api.paiza.io";

        const getDetails = async (executionId) => {
            try {
                const response = await fetch(
                    `${baseUrl}/runners/get_details?id=${executionId}&api_key=guest`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            "Access-Control-Allow-Origin": "*",
                        },
                        mode: "cors",
                    }
                );
                const result = await response.json();
                if (result.status === "completed") {
                    return result;
                }
                await new Promise((resolve) => setTimeout(resolve, 2000));
                return await getDetails(executionId);
            } catch (error) {
                toast.error(error.message);
                throw error;
            }
        };

        const createRunner = async () => {
            try {
                const response = await fetch(`${baseUrl}/runners/create`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*",
                    },
                    body: JSON.stringify({
                        source_code: body,
                        input: inputText,
                        language: languages[language].compilerName,
                        api_key: "guest",
                    }),
                    mode: "cors",
                });
                const result = await response.json();
                return result.id;
            } catch (error) {
                toast.error(error.message);
                throw error;
            }
        };

        try {
            const runnerId = await createRunner();
            setStatus("running");
            setOutputText("Running....");
            if (runnerId) {
                const executionDetails = await getDetails(runnerId);
                if (executionDetails.result === "success") {
                    toast.success("Successfully Executed", {
                        position: "top-right",
                    });
                    setOutputText(executionDetails.stdout);
                } else {
                    toast.error("Something went wrong", {
                        position: "top-right",
                    });
                    setOutputText(
                        executionDetails.stderr || executionDetails.build_stderr
                    );
                }
            } else {
                setOutputText("");
                toast.error("Something went wrong", {
                    position: "top-right",
                });
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong", {
                position: "top-right",
            });
            setOutputText("");
        } finally {
            setStatus("completed");
        }
    };

    return (
        <div className="console">
            {isExpanded && (
                <InputOutputContainer
                    inputText={inputText}
                    setInputText={setInputText}
                    outputText={outputText}
                />
            )}
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
                    Console{" "}
                    {isExpanded ? (
                        <KeyboardArrowDownIcon />
                    ) : (
                        <KeyboardArrowUpIcon />
                    )}
                </Button>
                <Button
                    variant={status === "running" ? "disabled" : "contained"}
                    sx={{
                        backgroundColor: "#23964A",
                        "&:hover": {
                            backgroundColor: "#1E7E3C",
                        },
                        textTransform: "none",
                    }}
                    onClick={async () => {
                        setOutputText("Running....");
                        setIsExpanded(true);
                        await handleCodeExecution();
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
