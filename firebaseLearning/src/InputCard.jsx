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
  const timesInDB = ref(db, "TimeStamps");

  


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
      });;
    

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
        const today = new Date();
        const yyyy = today.getFullYear();
        let mm = today.getMonth() + 1; // Months start at 0!
        let dd = today.getDate();
        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm;
        const formattedToday = mm + '/' + dd + '/' + yyyy;

        push(groceriesInDB, input);
        push(timesInDB, formattedToday);
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