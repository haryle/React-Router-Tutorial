import * as React from "react";
import * as ReactDom from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import Root, { loader as rootLoader, action as rootAction } from "./routes/root";
import ErrorPage from "./error-page";
import Contact, { loader as contactLoader, action as contactAction } from "./routes/contact";
import EditContact, { action as editAction } from "./routes/edit";
import { action as deleteAction } from "./routes/destroy";
import Index from "./routes";


const router = createBrowserRouter([
  {
    "path": "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    children: [
      {
        "path": "/contacts/:contactId",
        element: <Contact />,
        loader: contactLoader,
        action: contactAction
      },
      {
        "path": "/contacts/:contactId/edit",
        element: <EditContact />,
        loader: contactLoader,
        action: editAction,
      },
      {
        "path": "/contacts/:contactId/destroy",
        action: deleteAction,
      },
      { index: true, element: <Index /> }
    ]
  },
]);

ReactDom.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
