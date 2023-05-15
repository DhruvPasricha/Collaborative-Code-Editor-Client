import React, { useState } from "react";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/snippets/c_cpp";

const Room = () => {
    const [value, setValue] = useState();

    return (
        <div>
            <AceEditor
                mode="c_cpp"
                theme="monokai"
                onChange={(newValue) => {
                    setValue(newValue);
                }}
                value={value}
                setOptions={{
                    enableBasicAutocompletion: true,
                    enableLiveAutocompletion: true,
                    enableSnippets: true,
                    showLineNumbers: true,
                    tabSize: 4,
                }}
                fontSize={14}
                showPrintMargin={false}
                showGutter={true}
                highlightActiveLine={false}
                width="70vw"
                height="100vh"
            />
        </div>
    );
};

export default Room;
