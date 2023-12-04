import { forwardRef, useImperativeHandle, useState } from "react";
import JsonView from "react18-json-view";
import "react18-json-view/src/style.css";
// If dark mode is needed, import `dark.css`.
// import 'react18-json-view/src/dark.css'

function CInnerJsonViewer(
  props: {
    defaultValue: any;
    onChange: (arg0: any) => void;
  },
  ref: React.Ref<unknown>
) {
  const [data, setdata] = useState(props.defaultValue);

  useImperativeHandle(ref, () => ({
    setContent: (value: string) => {
      setdata(value);
    },
  }));

  function handleChange(value: {
    indexOrName: string | number;
    depth: number;
    src: any;
    parentType: "object" | "array";
    type: "add" | "edit" | "delete";
  }) {
    setdata(value.src);
    if (props.onChange) {
      props.onChange(value.src);
    }
  }
  return <JsonView src={data} onChange={handleChange} editable />;
}

const CJsonViewer = forwardRef(CInnerJsonViewer);
export default CJsonViewer;
