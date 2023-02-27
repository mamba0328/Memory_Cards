import React, { useState, useEffect } from 'react';
import Card from './Card';
import uniqid from 'uniqid';
import { doc } from 'prettier';
import loader from '../assets/img/loader.png'

export function Board(props) {

    const setGameOver = props.setGameOver;
    const [level, setLevel] = props.level;
    const [score, setScore] = props.score;

    const [data, setData] = useState(props.data);
    const [isLoading, setIsLoading] = useState(true);
    const [deck, setDeck] = useState(null);

    const getDeck = () => {
        if (data === null) {
            setIsLoading(true);
            return
        }

        const quantity = level * 4;
        const newDeck = [];
        for (let i = 0; i < quantity; i++) {
            const card = {
                name: data[i].name,
                img: data[i].thumbnail.path + '/standard_xlarge.jpg',
                clicked: 0,
                id: uniqid(),
            };
            newDeck.push(card)
        }
        setDeck(newDeck)
        setIsLoading(true)
    }

    const shuffleDeck = () => {
        if (deck === null) return;

        const newDeck = deck;
        newDeck.sort(() => {
            return Math.ceil(Math.random() * 2) - 2;
        })

        setDeck(newDeck);
    }

    const createCards = () => {
        if (deck === null) return;

        let cards = [];
        for (let i = 0; i < deck.length; i++) {
            cards.push(<Card name={deck[i].name} img={deck[i].img} clicked={deck[i].clicked} clickCard={clickCard} id={deck[i].id} key={deck[i].id} setGameOver={setGameOver} shuffleDeck={shuffleDeck} />);
        }
        return cards;
    }

    const checkLevelUp = () => {
        let allClicked = true;
        for (let i = 0; i < deck.length; i++) {
            if (deck[i].clicked === 0) allClicked = false;
        }

        if (allClicked) setLevel(level + 1);
    }

    const toggleCards = () => {
        const allCards = document.getElementsByClassName('card');
        const arrAllCards = Array.from(allCards);
        for (let card of arrAllCards) {
            card.classList.add('hide');
            setTimeout(() => {
                card.classList.remove('hide');
            }, 500)
        }
    }

    const clickCard = (id) => {
        const newDeck = deck.slice();
        for (let i = 0; i < newDeck.length; i++) {
            if (newDeck[i].id === id) {
                newDeck[i].clicked++;
            }
        }
        setDeck(newDeck);
        setScore(score + 1);
        checkLevelUp();
        toggleCards();
    }

    const turnLoader = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false)
        }, 2000)
    }

    useEffect(() => {
        setData(props.data);
        return setIsLoading(false);
    }, [props.data]);

    useEffect(() => {
        getDeck();
    }, [data]);

    useEffect(() => {
        getDeck();
        turnLoader();
    }, [level]);

    useEffect(() => {
        shuffleDeck();
    }, [deck])

    return (
        <div className='board'>
            {isLoading ?
                <div className='loader'>
                    <img src={loader} alt='loader' className='loader__img' />
                </div>
                :
                createCards()
            }
        </div>
    )
}

