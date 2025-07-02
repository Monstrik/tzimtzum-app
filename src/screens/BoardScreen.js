import React from 'react';
import './BoardScreen.css';
import Modal from '../components/Modal';
import { useEffect, useState } from 'react';

const BoardScreen = ({currentLevel, onRoll, feedback, arrows, snakes, levelMeanings, diceResult}) => {
    const columns = 8;
    const rows = 9;
    const arrowOrigins = Object.keys(arrows).map(Number);
    const snakeOrigins = Object.keys(snakes).map(Number);

    const [showModal, setShowModal] = useState(false);


    // useEffect(() => {
    //     setShowModal(true);
    // }, [currentLevel, levelMeanings]);

    useEffect(() => {
        setShowModal(true);
    }, [currentLevel, levelMeanings, diceResult, feedback]);

    const renderCells = () => {
        const cells = [];

        for (let row = rows - 1; row >= 0; row--) {
            for (let col = 0; col < columns; col++) {
                const level = row * columns + col + 1;

                const isArrow = arrowOrigins.includes(level);
                const isSnake = snakeOrigins.includes(level);

                cells.push(
                    <div
                        key={level}
                        className={`cell ${isArrow ? 'arrow' : ''} ${isSnake ? 'snake' : ''} ${level === currentLevel ? 'highlight' : ''}`}
                    >
                        {isArrow && <span className="symbol">🕊️</span>}
                        {isSnake && <span className="symbol">🐍</span>}
                        {!isArrow && !isSnake && level}
                    </div>
                );
            }
        }
        return cells;
    };

    return (
        <div className="board-screen">
            <h4>Ascend the Path to Ein Sof</h4>
            <div className="board-grid">
                {renderCells()}
            </div>
            <button className="roll-again-button" onClick={onRoll}>Roll Again</button>


            <Modal isOpen={showModal} onClose={() => setShowModal(false)}>

                {diceResult && (
                    <p className="dice-result">🎲 You rolled a {diceResult}</p>
                )}

                <h3
                    className={`feedback-message ${
                        feedback.type === 'snake' ? 'shake' :
                            feedback.type === 'arrow' ? 'glow' : ''
                    }`}
                    key={feedback.message}
                >
                    {feedback.message}
                    {/*<p>{levelMeanings[currentLevel] || 'This level holds subtle mysteries yet to be revealed.'}</p>*/}
                </h3>

                {!diceResult && levelMeanings[currentLevel] && (
                    <p className="level-meaning">
                        📜  &nbsp;{levelMeanings[currentLevel]}
                    </p>
                )}

            </Modal>
        </div>
    );
};

export default BoardScreen;
