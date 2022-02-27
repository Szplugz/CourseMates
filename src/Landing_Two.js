import './Landing_Two.css';
import twtlogo from './utils/twt3.png'
import { useState } from 'react';

function Landing_Two(props) {
  const [tempname, setTemp] = useState("")
  const [tempclasses, setTempC] = useState("")

  return (
    <div className="Landing_Two">
      <header className="Landing_Two-header" id="fade-in">
        <p className="web-logo" onClick={event =>  window.location.href='/home'}>berry </p>
        <p className='home-header'>
        <strong>Welcome to <br/> The University of Illinois at Urbana Champaign </strong>
        <br/>
        </p>
        <div className='small-home-header'>
          <strong>Just two more steps! Enter your Twitter handle below</strong>
          <br></br>
          <form className="twt-button">
            <img className="twt-logo" src={twtlogo} alt="twitter logo"/>
            <input 
              type="text" 
              value={tempname}
              onChange={(e) => {
                e.preventDefault();
                setTemp(e.target.value)
              }}
            />
            <button type="button" className="submit-button" onClick={event =>  {
                event.preventDefault()
                props.setUsername(tempname)
                //window.location.href = "/Landing_Three"
            }}>Submit</button>
          </form>
        </div>
        <br />
        {
          props.username ? 
          <div className="Landing_Three">
            <header className="Landing_Two-header-2" id="fade-in">
              <p className='home-header'>
                <strong>The username you entered is: {props.username}</strong><br/>
                <strong>Enter your classes separated by commas:<br/> </strong>
              </p>
              <div className="small-home-header">
                <form className='x-button'>
                  <input 
                    type="text" 
                    value={tempclasses}
                    onChange={(e) => {
                      e.preventDefault();
                      setTempC(e.target.value)
                    }}
                  />
                  <button type="button" className="x-submit-button" onClick={event =>  {
                      event.preventDefault()
                      props.setClasses(tempclasses.replaceAll(", ", ",").split(","))
                      //window.location.href = "/Landing_Three"
                  }}>Submit</button>
                </form>
              </div>
            </header>
          </div>
          : null
        }
        { (props.classes && props.userData.followers) ?
          <div className="Landing_Three">
            <header className="Landing_Two-header" id="fade-in">
              <p className='home-header'>
                The classes you're taking are:
                <ul>
                    {props.classes.map( (x) => <li className="flist">{x}</li> )}
                  </ul>
                  <strong>Here are your followers who take the same classes as you:</strong><br/>
                  <ul>
                    {props.getUsernames(props.userData.followers)}
                  </ul>
                  <strong>Here are the people who follow you who take the same classes as you:<br/> </strong>
                  <ul>
                    {props.getUsernames(props.userData.following)}
                  </ul>
              </p>
            </header>
          </div> : null
        } 
      </header>
    </div>
  );
}
export default Landing_Two;
