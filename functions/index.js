import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { AuthProvider } from './context/AuthProvider';

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

const express = require("express");
const app = express("express");
const cors = require("cors");
const functions = require("firebase-functions");
const { register, login } = require("./src/user-account/users");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.options("*", cors());

app.get("/", async (req, res) => {
  res.send("POPPPPPPPPPPPPPPPPPPPPPPP");
});

app.post("/register", register);
app.post("/login", login);

exports.api = functions.runWith({ memory: "1GB" }).https.onRequest(app);
app.listen(6969, () => console.log("YOW ITS WORKIGN IN 69 position"));
