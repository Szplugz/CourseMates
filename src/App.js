import './App.css';
import Card from './Components/Card';

function App() {
  var concs = []
  const items = concs.map( (c) => {
    <li key={c.id}>
      {c.username}
    </li>
    console.log(c.username)
  });
  return (
    <div className="App">
      
      <header className="App-header" id="fade-in">
        <p className="web-logo" >berry </p>
        <p className='home-header'>
        <strong>finding classes and mutuals <br/> has never been easier. </strong>
        <br/>
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
