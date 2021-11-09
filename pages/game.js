import Button from "../components/Button";
import { useState } from "react";
import styles from '../styles/index.module.css';

var clickMult = 1

const Game = () => {
  const [cookieTotal, setCookieTotal] = useState(0);
  const [grandmaCount, setGrandmaCount] = useState(0);
  const [grandmaPrice, setGrandmaPrice] = useState(10);
  
  /**
   * Returns True if price is under the global value of cookieTotal
   * @param {*} price 
   * @returns bool
   */
  const checkUnderPrice = (price) => {
    return price <= cookieTotal 
  }

  const grandmaUpdate = () => {
    if (checkUnderPrice(grandmaPrice) == true) {
      clickMult += 0.1
      setGrandmaCount(grandmaCount + 1)

      setGrandmaPrice(grandmaPrice + 1)
      setCookieTotal(cookieTotal - grandmaPrice)

      console.log(clickMult)
    }
    
  }

  return (
    <div className={styles.Index}>
      <Button onClick={() => {setCookieTotal((cookieTotal + 1*clickMult))}}>{Math.floor(cookieTotal)}</Button>
      <h1 >Current Grandma Count: {grandmaCount}</h1>
      <Button onClick = {grandmaUpdate}>Buy Grandma (${grandmaPrice})</Button>
    </div>
    
    );
};

export default Game;