import React,{useEffect,useState} from 'react';
import Recipe from './Recipe';
import './App.css';


const App = () => {

const   App_ID = 'c8929f5c';
const   App_KEY = 'b898f119b07b00bdf9841beec7e6f06b';


const [recipes,setRecipes] = useState([]);

const [search,setSearch] = useState('');

const[query, setQuery] = useState('chicken');

useEffect( () => {

  getRecipes();
  
  }, [query]);

  const getRecipes = async () => {
  const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${App_ID}&app_key=${App_KEY}`);
  const data = await response.json();
  setRecipes(data.hits);  
};



const updateSearch = e => {
  setSearch(e.target.value); 
};



const getSearch = e =>
{
  e.preventDefault();
  setQuery(search);
  setSearch('');
} 



  return(
    <div className="App">
      <form onSubmit={getSearch} className='search-form'>
        <input className='search-bar' type='text' value={search} onChange={updateSearch}/>
        <button className='search-button' type='submit'>search</button>
      </form>

      <div className="recipes">
      {recipes.map(recipe=>(

        <Recipe title={recipe.recipe.label} 
        calories = {recipe.recipe.calories }
        image = {recipe.recipe.image}
        ingredients = {recipe.recipe.ingredients}
        
        />

      ))};
      </div>
    </div>
          
  );

}

export default App;
