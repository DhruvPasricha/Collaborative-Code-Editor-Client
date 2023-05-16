import React from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/theme-dracula";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/snippets/c_cpp";

const CodeEditor = ({ handleBodyChange, value }) => {
    return (
        <div className="code-editor">
            <AceEditor
                mode="c_cpp"
                theme="dracula"
                onLoad={(editor) => {
                    editor.focus();
                }}
                onChange={(newValue) => handleBodyChange(newValue)}
                value={value}
                setOptions={{
                    enableBasicAutocompletion: true,
                    enableLiveAutocompletion: true,
                    enableSnippets: true,
                    showLineNumbers: true,
                    tabSize: 4,
                    highlightActiveLine: false,
                    hScrollBarAlwaysVisible: false,
                }}
                fontSize={14}
                showPrintMargin={false}
                showGutter={true}
                highlightActiveLine={false}
                height="100vh"
                width="100%"
            />
        </div>
    );
};

export default CodeEditor;
