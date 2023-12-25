import React, { useState, useEffect} from 'react';
import styles from "./List.module.css";

function List() {
  const initialFruits = [{ id: 1, name: "pineapple", calories: 37 },
  { id:3, name: "Banana", calories: 105 },
  { id: 4, name: "apple", calories: 95 },
  { id: 2, name: "orange", calories: 45 },
  { id: 5, name: "coconut", calories: 159 }];

  
  const [filteredFruits, setFilteredFruits] = useState(initialFruits);
  const [selectedFruit, setselectedFruit] = useState(null);
  const [listingMethod,setListingMethod] = useState(false);

useEffect(()=>{
  sortList();
},[listingMethod])
  const sortList = (method= "by-alphabet") => {
    let OutputFruitList;
    if(!listingMethod){
      switch (method) {
        case "by-calories":
          OutputFruitList =[...initialFruits].sort((a, b) => a.calories - b.calories);
          break;
        case 'by-id':
          OutputFruitList = [...initialFruits].sort((a, b) => a.id - b.id);
          break;
        case 'by-alphabet':
          OutputFruitList = [...initialFruits].sort((a, b) => a.name.localeCompare(b.name));
          break;
        default:
          break;
      }
    }else{
      if(method !== ""){
        const calorieLimit = parseFloat(method);
        OutputFruitList = [...initialFruits].filter((a) => a.calories >= calorieLimit);
      }else OutputFruitList =[...initialFruits]
    }
    setFilteredFruits(OutputFruitList);
  };

  return (
    <>
    
    {listingMethod && <div><input type='text' placeholder='Enter calorie limit' onChange={(e)=>sortList(e.target.value)}/><br/><br/></div>}
      {!listingMethod && <span> <h3>order by:</h3>
        <select onChange={(e) => sortList(e.target.value)}>
        <option value={"by-alphabet"}>alphabet</option>
        <option value={"by-id"}>Id</option>
        <option value={"by-calories"}>Calories</option>
      </select>
      </span> 
      }

      <br/><ul>
      {filteredFruits.map(fruit => (
        <li className={styles.Fruitsbracket} key={fruit.id} onClick={()=>setselectedFruit(fruit)}>
          {fruit.name}</li>))}
        <br />
      </ul>      
      
      
      {selectedFruit && !listingMethod && (
        <div>
          <p>selected Fruit: {selectedFruit.name}</p>
          <p>Calories: {selectedFruit.calories}</p>
        </div>
      )}
      <button onClick={(e)=>{setListingMethod((prevValue)=>!prevValue)}}>switch listing Method</button>
      </>
  );
}

export default List;
