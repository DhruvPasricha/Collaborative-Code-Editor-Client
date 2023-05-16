import React from "react";
import toast from "react-hot-toast";
import { FiCopy } from "react-icons/fi";

const CopyToClipBoard = (props) => {
    const { value, toastPosition } = props;
    const handleCopy = () => {
        navigator.clipboard.writeText(value);
        toast.success("Copied to Clipboard", {
            position: toastPosition,
        });
    };

    return <FiCopy onClick={handleCopy} cursor="pointer" />;
};

export default CopyToClipBoard;
