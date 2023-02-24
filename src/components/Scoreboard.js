import React, { useEffect, useState } from "react";
import logo from '../assets/img/logo.png';

function Scoreboard(props) {
    const [minutes, setMinutes] = useState('00');
    const [seconds, setSeconds] = useState('00');

    useEffect(() => {
        const timer = setTimeout(() => {
            if (props.gameOver) {
                clearTimeout(timer);
                setMinutes('00');
                setSeconds('00');
                return
            }
            if (seconds === 59) {
                setMinutes(+minutes + 1);
                setSeconds('00');
                return
            }
            if (seconds < 9) {
                setSeconds('0' + (+seconds + 1))
            } else {
                setSeconds(+seconds + 1)
            }
        }, 1000)
    }, [seconds, props.gameOver])

    return (
        <aside className='aside'>
            <div className='logo'>
                <img src={logo} width='200' />
            </div>

            <ul className="score">
                <li className="score__elem"><h2>Score : {props.score}</h2></li>
                <li className="score__elem"><h2>Highest Score : {props.highestScore}</h2></li>
                <li className="score__elem"><h2>Time: {minutes}:{seconds}</h2></li>
            </ul>

            <div className="instruction">
                <h2 className="instruction__title">How to play: </h2>
                <ul className="instruction__list">
                    <li className="instruction__elem">Each level try not to click at the same card twice;</li>
                    <li className="instruction__elem">Game ends after 4th round.</li>
                </ul>
            </div>

            <ul className="credentials">
                <li className="credentials__elem">
                    <p className="text">Game was made as a part of the <a href="https://www.theodinproject.com/lessons/node-path-javascript-memory-card" className="link">The Odin Project</a> course.</p></li>
                <li className="credentials__elem">
                    <p className="text">The project uses <a className="link" href="https://developer.marvel.com/">Marvel API</a> to get heroes.</p>
                </li>
                <li className="credentials__elem">
                    <p>Check the code:</p>
                    <a className="link">code</a></li>
                <li className="credentials__elem ">
                    <p>Check the creator:</p>
                    <a href="https://github.com/mamba0328" className="link">@vamba</a>
                </li>
            </ul>

        </aside>
    )
}

export default Scoreboard