import {initializeApp} from "firebase/app"
import {getDatabase, ref, push, get, child, onValue} from "firebase/database"

import { useState } from "react";
import shoppingBasket from "./assets/shoppingBasket.jpg"

const appSettings ={
    databaseURL: "https://groceries-app-a7ad5-default-rtdb.firebaseio.com/"
  }

  const app = initializeApp(appSettings);
  const db = getDatabase(app);
  const groceriesInDB = ref(db, "Groceries");

  


function InputCard(){

    const [input, setInput] = useState("");
    


    let groceryList = [];
    let groceryItems = [];
    

    onValue(groceriesInDB, function(snapshot){
        groceryList = Object.values(snapshot.val());
        groceryItems = groceryList.map(item =>
                                            <button value={item} className="itemButtons" onClick={removeItemHandler}>
                                                {item}
                                            </button>
            )
      });
   
    
    function removeItemHandler(event){
        window.alert(`Are you sure you want to delete ${event.target.value} ?`);
        
    }

    function addToCartHandler(){
        push(groceriesInDB, input);
        
        setInput("");
    }

    function inputHandler(event){
        setInput(event.target.value);
    }

    function enterKeyHandler(event){
        if(event.key === 'Enter'){
            addToCartHandler();
        }
    }

    return(
        <>
        <div className="inputCard">
            <img id="shoppingBasket" src={shoppingBasket} alt="shoppingBasket" />
            <input value={input} type="text" id="inputField" placeholder="Bread" onChange={inputHandler} onKeyDown={enterKeyHandler}/>
            <button id="addToCart" onClick={addToCartHandler}>Add to cart</button>

            <div className="listSection">
                <ul className="list">{groceryItems}</ul>
            </div>
        </div>
        
        </>
    );
}
export default InputCard;