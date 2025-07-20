import React from "react";
import { Routes, Route } from "react-router";
import "./App.css";
import { Box, Paper, Toolbar } from "@mui/material";
import AppBar from "./AppBar";
import Lobos from "./Lobos";

function PaperMain() {
  return (
    <>
      <Paper
        sx={{
          minHeight: "100vh",
          minWidth: "100vw",
        }}
      >
        <AppBar />
        <Box sx={{ padding: 2 }}>
          <Toolbar />
          <Routes>
            <Route path="/" element={<Lobos />} />
            <Route path="/help" element={<div>help</div>} />
          </Routes>
        </Box>
      </Paper>
    </>
  );
}

export default PaperMain;
