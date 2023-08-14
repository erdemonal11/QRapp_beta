import React, { useEffect, useState, useRef } from "react";
import "../App.css";
import { Html5QrcodeScanner } from "html5-qrcode";

function Scanner() {
  const [scanResult, setScanResult] = useState(null);
  const [scannerContent, setScannerContent] = useState(null);
  const scannerRef = useRef(null);

  useEffect(() => {
    const scanner = new Html5QrcodeScanner("reader", {
      qrbox: {
        width: 250,
        height: 250,
      },
      fps: 5,
    });

    scannerRef.current = scanner;

    scanner.render(success, error);

    function success(result) {
      scanner.clear();
      setScanResult(result);
      setScannerContent(scanner.getHtml());
    }

    function error(err) {
      console.warn(err);
    }

    return () => {
      scanner.clear();
    };
  }, []);

  function handleGoBack() {
    setScanResult(null);
    setScannerContent(null);
    alert("Please reflesh the page.")
     
  }

  useEffect(() => {
    if (scannerContent) {
      scannerRef.current.render(success, error, scannerContent);
    }
  }, [scannerContent]);

  return (
    <div className="App2">
      <h1 className="head">QR Scan</h1>
      {scanResult ? (
        <div>
          Success:{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={"" + scanResult}
          >
            {scanResult}
          </a>
          <br /> <br />
          <button onClick={handleGoBack}>Go Back</button>
        </div>
      ) : (
        <div id="reader"></div>
      )}
    </div>
  );
}

export default Scanner;
