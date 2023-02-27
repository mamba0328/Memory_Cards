import './css/App.css';
import React, { useState, useEffect } from 'react'
import { keys } from './http/keys';
import MD5 from "crypto-js/md5";
import { Board } from './components/Board';
import Scoreboard from './components/Scoreboard';
import heroes from './components/_heroes';

function App() {
  const [data, setData] = useState(null);

  const [level, setLevel] = useState(1);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highestScore, setHighestScore] = useState(0);
  const [lastScore, setLastScore] = useState(0);
  const [offset, setOffset] = useState(Math.ceil(Math.random() * 81)); //changes pull of the heroes 
  const [win, setWin] = useState(false);

  const getFetchData = () => {
    const ts = Math.round(Math.random() * 1000);
    const hash = MD5(ts + keys.private + keys.public).toString();
    fetch(`http://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${keys.public}&hash=${hash}&events=238,330&offset=${offset}`)
      .then((res) => {
        if (res.ok) {
          return res.json()
        }
        throw new Error('No response from server')
      })
      .then((res) => {
        setData(res.data.results);
        console.log(res.data)
      })
      .catch(() => {
        console.log('Can\'t acces url, using backup data');
        setData(heroes);
      });
  }

  const changeOffSet = () => {
    const newOffset = Math.ceil(Math.random() * 81);
    setOffset(newOffset);
  }

  const replay = () => {
    changeOffSet();
    getFetchData();
    setGameOver(false);
  }

  useEffect(() => {
    if (level > 4) return setWin(true);
    changeOffSet();
    getFetchData();
  }, [level]);

  useEffect(() => {
    if (score >= highestScore) {
      setHighestScore(score);
    }
  }, [score]);

  useEffect(() => {
    if (gameOver || win && score !== 0) {
      setLastScore(score);
    }
    setScore(0);
    setLevel(1);
  }, [gameOver, win])

  return (
    <div className="App">
      <main className='main'>
        <Scoreboard score={score} highestScore={highestScore} gameOver={gameOver} />
        {gameOver ?
          <div className='replay'>
            <button onClick={replay} className='replay__button'>Replay</button>
            <h2 className='replay__title'>The game has ended with the score: {lastScore}</h2>
          </div>
          : win ?
            <div className='congrats'>
              <p> congats, dont' waste your time here anymore </p>
              <h2 className='replay__title'>The game has ended with the score: {lastScore}</h2>
            </div>
            :
            <Board data={data} level={[level, setLevel]} setGameOver={setGameOver} score={[score, setScore]} />}
      </main>
    </div>
  );
}

export default App;
