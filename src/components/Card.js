import React, { useState, useEffect } from 'react'

function Card(props) {
    const placeholder = 'https://www.wired.com/wp-content/uploads/archive/news/images/full/cc1_f.jpg';
    const setGameOver = props.setGameOver;
    const shuffleDeck = props.shuffleDeck;
    const clickCard = props.clickCard;

    const [imgPath, setImgPath] = useState(placeholder);
    const [cardName, setCardName] = useState('Card Name');
    const [clicked, setClicked] = useState(0);
    const [id, setId] = useState(null)

    function getCardProps() {
        if (props === null) return console.log('response is null')
        setImgPath(props.img)
        setCardName(props.name);
        setClicked(props.clicked);
        setId(props.id)
    }

    function handleClick() {
        clicked === 0 ? clickCard(id) : setGameOver(true);
        shuffleDeck();
    }

    useEffect(() => {
        getCardProps();
    }, [props]);

    return (
        <div className='card' onClick={handleClick}>
            <img className='card__img' src={imgPath} alt='im not displaying' />
            <h2 className='card__title'>{cardName}</h2>
        </div>
    )
}

export default Card