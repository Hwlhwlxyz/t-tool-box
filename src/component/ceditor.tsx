import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";

function CInnerCodeEditor(
  props: {
    onChange: (arg0: string | undefined) => void;
    defaultValue: string | undefined;
    value: string | undefined;
  },
  ref: React.Ref<unknown>
) {
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const [content, setContent] = useState("");

  useImperativeHandle(ref, () => ({
    setContent: (value: string) => {
      console.log("value to set", value);
      setContent(value);
    },
  }));

  function handleEditorDidMount(
    editor: monaco.editor.IStandaloneCodeEditor,
    monaco: object
  ) {
    editorRef.current = editor;
  }

  function handleEditorChange(value: string | undefined, event: object) {
    console.log("here is the current model value:", value);
    console.log(typeof event, event);
    if (props.onChange) {
      props.onChange(value);
    }
  }

  return (
    <Editor
      height="90vh"
      defaultLanguage="json"
      defaultValue={props.defaultValue}
      value={content}
      onMount={handleEditorDidMount}
      onChange={handleEditorChange}
    />
  );
}

const CCodeEditor = forwardRef(CInnerCodeEditor);
export default CCodeEditor;
