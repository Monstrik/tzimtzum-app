import React, {useState} from 'react';
import './DiceRollScreen.css';

const DiceRollScreen = ({onEnter}) => {
    const [roll, setRoll] = useState(null);
    const [message, setMessage] = useState('');

    const handleRoll = () => {
        const result = Math.ceil(Math.random() * 6);
        setRoll(result);
        setMessage(result === 6 ? '✨ You rolled a six! The path opens.' : `Roll again...`);

        if (result === 6) setTimeout(() => onEnter(result), 2000);
    };

    return (
        <div className="dice-roll-screen">
            {roll !== 6 &&
                <>
                    <h3>Roll the Dice</h3>
                    <div className="dice-box" onClick={handleRoll}>
                        {roll ? <span>{roll}</span> : <span>🎲</span>}
                    </div>
                </>
            }
            <p className="message">{message}</p>
        </div>
    );
};

export default DiceRollScreen;
