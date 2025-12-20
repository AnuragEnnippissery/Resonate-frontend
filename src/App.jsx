import './App.css'

function App() {
  return (
    <div className="page">
      <h1 className="title">Resonate</h1>

      <div className="main">
        <label>
          Insert your file <br />
          <input type="file" accept="application/pdf" />
        </label>
      </div>

      <p className="footer">Developed by Anurag Ennippissery</p>
    </div>
  );
}

export default App;
