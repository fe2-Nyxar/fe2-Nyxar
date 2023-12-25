import React, { useState, useEffect} from 'react';
import styles from "./List.module.css";
import axios from 'axios';

function List() {
  const [initialFruits, setinitialFruits] = useState([]);

  useEffect(()=>{
    axios.get(`https://www.fruityvice.com/api/fruit/all`)
    .then(response =>  setinitialFruits(response.data)  )
    .catch(error => console.log(error));
  },[])

  const [filteredFruits, setFilteredFruits] = useState(initialFruits);
  const [selectedFruit, setselectedFruit] = useState(null);
  const [listingMethod,setListingMethod] = useState(false);

  useEffect(()=>{
  sortListBySelect();
  // sortListByInput();
},[])




  const sortListBySelect = (method= "by-alphabet") => {
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
          break;
        default:
          break;
      }
    };
    setFilteredFruits(OutputFruitList);
  };


  const [attributSLBI, SetAttributSLBI]= useState({sortType:"by-calories",value:10}); // SLBI is short for the function sortListByInput, and this hook is used as an attribut holder
  const sortListByInput=(method,value)=>{
    let OutputFruitList;
    if(listingMethod){
      if(method === "by-calories" && value !== ""){
          const calorieLimit = parseFloat(value);
          OutputFruitList = Object.values(initialFruits).filter((a) => a.calories >= calorieLimit);
        }else if(method === "by-alphabet" && value !==""){
          OutputFruitList =  Object.values(initialFruits).filter((fruit)=> fruit.name.toLowerCase() === value.toLowerCase())
        }
        else OutputFruitList =[...initialFruits]
    }
    setFilteredFruits(OutputFruitList)
  }

  return (
    <>
    {listingMethod && (<div>  
    <select onChange={(e) => SetAttributSLBI({...attributSLBI,sortType:e.target.value})}>
        <option value={"by-calories"}>calorie</option>
        <option value={"by-alphabet"}>alphabet</option>
      </select>
    <input type='text' placeholder='Enter your fruit' onChange={(e)=>SetAttributSLBI({...attributSLBI, value:e.target.value})}/><br/><br/>
      <button onClick={()=>sortListByInput(attributSLBI.sortType, attributSLBI.value)}>Sort</button>
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
      {filteredFruits && filteredFruits.map((fruit, index) => (
  <li className={styles.Fruitsbracket} key={fruit.id} onClick={() => setselectedFruit(fruit)}>
    {fruit.name}
  </li>
))}

        <br />
      </ul>      
      
      
      {selectedFruit && !listingMethod && (
        <div>
          <p>selected Fruit: {selectedFruit.name}</p>
          <p>Calories: {selectedFruit.nutritions.calories}</p>
        </div>
      )}
      <button onClick={(e)=>{setListingMethod((prevValue)=>!prevValue)}}>switch listing Method</button>
      </>
  );
}

export default List;
