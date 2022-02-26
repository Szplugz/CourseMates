import React from "react";
import uiuc from '../utils/uiuc.png';
import ucla from '../utils/ucla.png';
import "./Card.css";

function Card() {
    return (
        <div className="container">
            <div className="card-container-1" onClick={event =>  window.location.href='/Landing_Two'}> 
                <div className="image-container" >
                <img src={uiuc} className="uiuc-logo" alt="uiuc" />
                    </div>
            </div>

            <div className="card-container-2" onClick={event =>  window.location.href='/Landing_Two'}>
                <div className="image-container">
                <img src={ucla} className="uiuc-logo" alt="uiuc" />
                    </div>
            </div>

        </div>
        
        
    )
}

export default Card;