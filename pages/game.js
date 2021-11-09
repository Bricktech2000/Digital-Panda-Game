import Button from "../components/Button";
import { useState } from "react";
import styles from '../styles/index.module.css';

var clickMult = 1

const Game = () => {
  const [count, setCount] = useState(0);
  const [grandmaCount, setGrandmaCount] = useState(0);
  const [grandmaPrice, setGrandmaPrice] = useState(0);
  

  const grandmaUpdate = () => {
    clickMult += 0.1
    setGrandmaCount(grandmaCount + 1)
    setGrandmaPrice(grandmaPrice + 1)
    console.log(clickMult)
  }

  return (
    <div className={styles.Index}>
      <Button onClick={() => {setCount((count + 1*clickMult))}}>{Math.floor(count)}</Button>
      <h1 >Current Grandma Count: {grandmaCount}</h1>
      <Button onClick = {grandmaUpdate}>Buy Grandma</Button>
    </div>
    
    );
};

export default Game;