import logo from './logo.svg';
import './App.css';
import getConnections from './instagram';

function App() {
  var concs = ['a']
  /*
  try {
    concs = getConnections("spectraldoy", "Iliketrains9")
  } catch (error) {
    console.log(error)
    concs = ['a']
  }
  */
  const items = concs.map( (c) => {
    <li key={c.id}>
      {c.username}
    </li>
    console.log(c.username)
  });
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          {items}
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
