import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import GameStart from "./pages/GameStart";
import GameLevelSelect from "./pages/GameLevelSelect";
import GameWinnig from "./pages/GameWinnig";
import GameOver from "./pages/GameOver";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { index: true, path: "/", element: <Home /> },
      { path: "/game/select", element: <GameLevelSelect /> },
      { path: "/game/start", element: <GameStart /> },
      { path: "/game/win", element: <GameWinnig /> },
      { path: "/game/over", element: <GameOver /> },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();
