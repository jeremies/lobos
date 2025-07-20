import { useState } from "react";
import reactLogo from "./assets/react.svg";
import appLogo from "/favicon.svg";
import PWABadge from "./PWABadge.jsx";
import { BrowserRouter } from "react-router";
import "./App.css";
import PaperMain from "./Paper.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <PaperMain />
      </BrowserRouter>
      <PWABadge />
    </>
  );
}

export default App;
