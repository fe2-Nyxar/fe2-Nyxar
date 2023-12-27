import React, { useState, useEffect} from 'react';
import styles from "./List.module.css";
import axios from 'axios';

function List() {
  const [initialFruits, setinitialFruits] = useState([]);
  const [attributSLBI, SetAttributSLBI]= useState({sortType:"by-alphabet",value:10}); // SLBI is short for the function sortListByInput, and this hook is used as an attribut holder
  const [filteredFruits, setFilteredFruits] = useState(initialFruits);
  const [selectedFruit, setselectedFruit] = useState(null);
  const [listingMethod,setListingMethod] = useState(false);

  
  useEffect(()=>{
    axios.get(`https://www.fruityvice.com/api/fruit/all`)
    .then(response => {setinitialFruits(response.data)})
    .catch(console.log("couldn't find the data"));

  },[])



  useEffect(()=>{
    sortListBySelect();
    console.log("rendered!")
},[])




  const sortListBySelect = (method= "by-alphabet") => {
    console.log("I'm inside the sortListBySelect function")
    let OutputFruitList;
    if(!listingMethod){
      switch (method) {
        case "by-calories":
          OutputFruitList = Object.values(initialFruits).sort((a, b) => a.nutritions.calories - b.nutritions.calories).reverse();
            break;
          case 'by-id':   
          OutputFruitList = Object.values(initialFruits).sort((a, b) => a.id - b.id);
            break;
          case 'by-alphabet':
            OutputFruitList = Object.values(initialFruits).sort((a, b) => a.name.localeCompare(b.name));
            console.log(OutputFruitList)
            break;
          default:
            break;
      }
    };
    setFilteredFruits(OutputFruitList);
  };


  const sortListByInput=(method,value)=>{
    let OutputFruitList;
    if(listingMethod){
      if(method === "by-calories" && value !== ""){
          const calorieLimit = parseFloat(value);
          OutputFruitList = Object.values(initialFruits).filter((a) =>a.nutritions.calories <= calorieLimit);
        }else if(method === "by-alphabet" && value !==""){
          OutputFruitList =  Object.values(initialFruits).filter((fruit)=> fruit.name.toLowerCase().trim() === value.toLowerCase().trim())
        }
        else OutputFruitList =[...initialFruits]
    }
    setFilteredFruits(OutputFruitList)
  }

  return (
    <>
<button onClick={(e)=>{setListingMethod((prevValue)=>!prevValue)}}>switch listing Method</button>
<br/><br/>
    {listingMethod && (<div>  
    <select onChange={(e) => SetAttributSLBI({...attributSLBI,sortType:e.target.value})}>
        <option value={"by-alphabet"}>alphabet</option>
        <option value={"by-calories"}>calorie</option>
      </select>
    <input type='text' placeholder='Enter your fruit' onChange={(e)=>SetAttributSLBI({...attributSLBI, value:e.target.value})}/><br/><br/>
      <button onClick={()=>sortListByInput(attributSLBI.sortType, attributSLBI.value)}>show</button>
    </div>)
    }

      {!listingMethod && (<span> <h3>order by:</h3>
        <select onChange={(e) => sortListBySelect(e.target.value)}>
        <option value={"by-alphabet"}>alphabet</option>
        <option value={"by-id"}>Id</option>
        <option value={"by-calories"}>Calories</option>
      </select>
      </span>)
      
      }

      <br/><ul>
      {filteredFruits && filteredFruits.map((fruit) => (
  <li className={styles.Fruitsbracket} key={fruit.id} onClick={() => setselectedFruit(fruit)}>
    {fruit.name}
  </li>
  
))}

        <br />
        {selectedFruit && (
          <div className={styles.FruitSelectedDetails}>
            <p>selected Fruit: {selectedFruit.name}</p>
            <p>Calories: {selectedFruit.nutritions.calories}</p>
          </div>
      )}

      </ul>      
      </>
  );
}

export default List;
