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

  // monaco settings
  // const monacoHook = useMonaco();
  // useEffect(() => {
  //   monacoHook?.languages.json.jsonDefaults.setDiagnosticsOptions({
  //     ...monacoHook.languages.json.jsonDefaults.diagnosticsOptions,
  //     validate: false,
  //     // trailingCommas: "error", // this will show a validation error as desired
  //     // comments: "error", // this disables comments in JSON
  //   });
  // }, [monacoHook]);

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
    console.log(monaco);
  }

  function handleEditorChange(value: string | undefined) {
    // console.log("here is the current model value:", value);
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
