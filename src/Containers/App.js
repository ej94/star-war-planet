import React,{Component} from 'react';
import {connect} from 'react-redux';
import CardList from '../Components/CardList';
import SearchBox from '../Components/SearchBox';
import Scroll from '../Components/Scroll';
import './App.css';
import {setSearchField} from '../action'

 const mapStateToProps=state=>{
      return{
          searchField:state.searchField
      }
  }

 const mapDispatchToProps=(dispatch)=>{
     return {
        onSearchChange:(event)=>dispatch(setSearchField(event.target.value))
     }
  }




class App extends Component{
	constructor(){
		super()
		this.state={
			planets:[],
		}
	}
     componentDidMount() {
		const urls = [
			'https://swapi.co/api/planets/',
			'https://swapi.co/api/planets/?page=2', 
			'https://swapi.co/api/planets/?page=3',
			'https://swapi.co/api/planets/?page=4',
			'https://swapi.co/api/planets/?page=5',
			'https://swapi.co/api/planets/?page=6',
			'https://swapi.co/api/planets/?page=7'
		]
		
		Promise.all(urls.map(async url => {
			const response = await fetch(url);
			const morePlanets = await response.json();
			var combinedArrayOfPlanets = this.state.planets;
			combinedArrayOfPlanets.push(morePlanets.results);
			
			var sortedArrayOfPlanets = combinedArrayOfPlanets
				.flat()
				.sort((a, b) => a.name.localeCompare(b.name));
			
			this.setState({planets: sortedArrayOfPlanets})
		}))
		.catch(error => 
			console.log('Error during fetching of planets:', error)
		);
	}

	render(){
		const {planets} = this.state;
		const {searchField,onSearchChange}=this.props;
		 if (!planets.length) {
		    return <div className='tc'><h1>Loading</h1></div>;
         }
		const filteredPlanets = planets.filter(planet=>{
			return planet.name.toLowerCase().includes(
				searchField.toLowerCase())
				||
				planet.diameter.toLowerCase().includes(
					searchField.toLowerCase())
				||
				planet.rotation_period.toLowerCase().includes(
					searchField.toLowerCase())
		})
		return (
        <div className='tc'>
            <h1 className='f2'>StarWarPlanet</h1>
            <SearchBox searchChange={onSearchChange}/>
            <Scroll>
                <CardList planets = {filteredPlanets}/>
            </Scroll>
	    </div>
	    );
   }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);


