import './App.css';
import getConnections from './instagram';
import Card from './Components/Card';

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
        <p className='small-home-header'>
          <strong>Choose your campus</strong>
        </p>
      <Card
      />
        <p className='footer-text'>
         Created for HackIllinois 2022
        <br/> With love, from Aditya Gomatam, Estrella Popoca, and Neel Khare
         </p>
        
      </header>

    </div>
  );
}

export default App;
