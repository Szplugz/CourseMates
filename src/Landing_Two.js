import './Landing_Two.css';
import twtlogo from './utils/twt3.png'

function Landing_Two() {
  return (
    <div className="Landing_Two">
      
      <header className="Landing_Two-header" id="fade-in">
        <p className="web-logo" onClick={event =>  window.location.href='/home'}>berry </p>
        <p className='home-header'>
        <strong>Welcome to <br/> The University of Illinois at Urbana Champaign </strong>
        <br/>
        </p>
        <div className='small-home-header'>
          <strong>Just one more step!</strong>
          <br></br>
          <button className="twt-button" href="">
            <div className="twt-align">
              <img className="twt-logo" src={twtlogo} alt="twitter logo"/>
              <p className="button-text">
                <strong>Connect with Twitter</strong>
              </p>
            </div>
              
          </button>
        </div>
      </header>
    </div>
  );
}


export default Landing_Two;
