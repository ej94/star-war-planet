import React from 'react';
import Card from './Card';

const CardList = ({planets}) =>{
     return(
        <div>
	      { 
	      	planets.map((planet,i)=>{
     	    return  ( 
     	    <Card 
                 key={i}
     	         name={planets[i].name} 
     	         diameter={planets[i].diameter}
                rotation_period={planets[i].rotation_period}
     	     />
     	    );
          })
	     }
        </div> 
     );
}

export default CardList;