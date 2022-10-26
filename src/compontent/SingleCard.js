import React from "react";
import "./SingleCard.css";

function SingleCard({code , handleChoice , flipped, dispaly}){
    //handle chack
    const handleClick = () => {
        if(!dispaly){
            handleChoice(code);
        }
    }

    return(
        <div className="cards" >
            <div className={flipped ? "flip" : ""}>
                <img src={code.src} className = "front card" alt="front "/>
                <img 
                src = "/img/cover.png" 
                onClick={handleClick}
                className="back card" 
                alt="back "
                />
            </div>
        </div>
    )
}

export default SingleCard;