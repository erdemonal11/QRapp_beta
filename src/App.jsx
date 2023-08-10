import React, { useState } from "react";
import QRCode from "react-qr-code";
import html2canvas from 'html2canvas';
import Scan from "./components/Scanner"

import "./App.css";

function App() {
  const [text, setText] = useState("");
  

  function handleChange(e) {
    setText(e.target.value);
  }

  

  async function handleDownload() {
    if (!text) {
      alert("Input is empty. Please enter a value.");
      return;
    }
    
    try {
      const qrCodeElement = document.querySelector(".qrcode");
      
      const canvas = await html2canvas(qrCodeElement, { scale: 2 });  
      
      const link = document.createElement('a');
      link.download = 'qrcode.png';
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch (error) {
      console.error("Error generating QR code image:", error);
    }
  }

  return (
    <>
    <div className="sect">
    <div className="App1">
      <h1 className="head">QR Code Generator </h1>
      <div className="qrcode">
        <QRCode value={text} />
      </div>
      <div>
        <p>Enter your URL here</p>
        <input
          type="text"
          className="input"
          value={text}
          onChange={(e) => {
            handleChange(e);
          }}
        />
        <br /><br />
        <button onClick={handleDownload}>Download QR Code</button>
      </div>
    </div>
        <br />
        <Scan/>
        </div>
        <br />
        <div><div className="erdemlabel"><a href="https://github.com/erdemonal11" target="_blank" className="erdemlabel">erdemapps.</a></div> <br /><br /> Beta Version 10/08/2023 Contact me via my GitHub for issues </div>
    </>
  );
}

export default App;
