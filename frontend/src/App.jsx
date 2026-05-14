import { useState } from "react";
import axios from "axios";

function App() {

  const [url, setUrl] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const scanURL = async () => {

    if (!url) {
      alert("Please enter a URL");
      return;
    }

    try {

      setLoading(true);

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/predict-url`,
        {
          url: url
        }
      );

      setResult(response.data);

    } catch (error) {

      console.error(error);
      alert("Error connecting to backend");

    } finally {

      setLoading(false);

    }
  };

  return (

    <div style={styles.container}>

      <h1>PhishGuard AI</h1>

      <p>AI-Powered Phishing URL Detection</p>

      <input
        type="text"
        placeholder="Enter suspicious URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        style={styles.input}
      />

      <button
        onClick={scanURL}
        style={styles.button}
      >
        {loading ? "Scanning..." : "Scan URL"}
      </button>

      {result && (

        <div style={styles.resultBox}>

          <h2>Scan Result</h2>

          <p>
            <strong>URL:</strong> {result.url}
          </p>

          <p>
            <strong>Prediction:</strong>{" "}
            {result.prediction === 1
              ? "⚠️ Phishing"
              : "✅ Safe"}
          </p>

          <p>
            <strong>Confidence:</strong>{" "}
            {(result.confidence * 100).toFixed(2)}%
          </p>

        </div>
      )}

    </div>
  );
}

const styles = {

  container: {
    maxWidth: "700px",
    margin: "50px auto",
    padding: "20px",
    textAlign: "center",
    fontFamily: "Arial"
  },

  input: {
    width: "100%",
    padding: "12px",
    marginTop: "20px",
    fontSize: "16px"
  },

  button: {
    marginTop: "20px",
    padding: "12px 24px",
    fontSize: "16px",
    cursor: "pointer"
  },

  resultBox: {
    marginTop: "30px",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "10px"
  }
};

export default App;