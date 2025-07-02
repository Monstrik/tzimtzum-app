import React from 'react';
import './StartScreen.css';

const StartScreen = ({ onStart }) => {
    return (
        <div className="start-screen">
            <h2 className="title">TzimTzum</h2>
            <p className="description">
                A unique Jewish journey of self-realization, <br/>
                adapted from the ancient Hindu game Leela-Karma.<br/><br/>
                Roll a six to begin your spiritual ascent <br/>
                toward Level 68 — Ein Sof.
            </p>
            <ul className="rules">
                <li> 🎲  Roll a six to enter the journey</li>
                <li> 🐍  Snakes = spiritual setbacks</li>
                <li> 🕊️  Arrows = divine boosts</li>
                <li> ✨  Reach Level 68 to attain unity with Ein Sof</li>
            </ul>
            <button className="start-button" onClick={onStart}>Start</button>
        </div>
    );
};

export default StartScreen;
