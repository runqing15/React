import './App.css';
import {useState} from "react";
import Crypto from "./Crypto";
import Forex from "./Forex";

function App() {
  const [tab, setTab] = useState(0);

  return (
    <div>
      <header className="App-header">
        <h1>Prices</h1>
      </header>
      <nav className="App-Nav">
        <li className={tab === 0 ? 'active' : ''} onClick={() => setTab(0)}>Crypto Currency</li>
        <li className={tab === 1 ? 'active' : ''} onClick={() => setTab(1)}>Forex Currency</li>
      </nav>
      <main className="App-Main">
        <div className={tab === 0 ? '' : 'hidden'}>
          <Crypto />
        </div>
        <div className={tab === 1 ? '' : 'hidden'}>
          <Forex />
        </div>
      </main>
    </div>
  );
}

export default App;
