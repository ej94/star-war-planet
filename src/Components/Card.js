import React from 'react';

const Card = ({name,diameter,rotation_period}) =>{
	return(
       <div className="bg-light-green dib br3 pa3 ma2 grow bw2 shadow-5">
            <div>
           	    <h2>{name}</h2>
           	    <p>diameter:{diameter}</p>
                <p>rotation_period:{rotation_period}</p>
           </div>
       </div>
	);
}

export default Card;