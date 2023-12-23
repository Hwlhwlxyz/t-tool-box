import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CCodeEditor from "./component/ceditor";
import CJsonViewer from "./component/cjsonviewer";
import JsonViewer from "./page/json";
import { ChakraProvider } from "@chakra-ui/react";
import SidenavItems from "./component/SidenavItems";
import Root from "./page/root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { path: "/", element: <App /> },
      {
        path: "tool/json",
        element: <JsonViewer />,
      },
    ],
  },
  {
    path: "/component/editor",
    element: (
      <CCodeEditor
        defaultValue={""}
        onChange={(v) => console.log(v)}
        value={undefined}
      />
    ),
  },
  {
    path: "/component/json",
    element: <CJsonViewer defaultValue={""} onChange={(v) => console.log(v)} />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>
);
