import './App.css'
import { useState, useEffect } from "react";
import { sendPdfApi } from './utils/apidata';

function App() {
  const [file, setFile] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const transform = async () => {
    if (!file) {
      alert("Please select a PDF file");
      return;
    }

    try {
      setLoading(true);

      const audioBlob = await sendPdfApi(file);
      const url = URL.createObjectURL(audioBlob);

      setAudioUrl(url);
    } catch (err) {
      console.error(err);
      alert("Conversion failed");
    } finally {
      setLoading(false);
    }
  };

  // cleanup blob URL
  useEffect(() => {
    return () => {
      if (audioUrl) URL.revokeObjectURL(audioUrl);
    };
  }, [audioUrl]);

  const downloadAudio = () => {
    const link = document.createElement("a");
    link.href = audioUrl;
    link.download = "result.mp3";
    link.click();
  };

  return (
    <div className="page">
      <h1 className="title">Resonate</h1>

      <div className="main">
        <label>
          Insert your file <br />
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </label>

        <button onClick={transform} disabled={loading}>
          {loading ? "Processing..." : "Transform"}
        </button>

        {audioUrl && (
          <>
            <audio src={audioUrl} controls />
            <br />
            <button onClick={downloadAudio}>Download MP3</button>
          </>
        )}
      </div>

      <p className="footer">Developed by Anurag Ennippissery</p>
    </div>
  );
}

export default App;
