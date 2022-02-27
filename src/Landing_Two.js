import './Landing_Two.css';

function Landing_Two() {
  var concs = []
  const items = concs.map( (c) => {
    <li key={c.id}>
      {c.username}
    </li>
    console.log(c.username)
  });
  return (
    <div className="Landing_Two">
      
      <header className="App-header" id="fade-in">
        <p className="web-logo" >berry </p>
        <p className='home-header'>
        <strong>You have selected <br/> The University of Illinois at Urbana Champaign </strong>
        <br/>
        </p>
        <p className='small-home-header'>
          <strong>Just one more step!</strong>
        </p>
        <button href="">
            <img src="" alt=""/>
            Connect with Twitter
        </button>
      </header>
    </div>
  );
}


export default Landing_Two;
