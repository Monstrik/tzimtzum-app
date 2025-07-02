import {useState} from 'react';
import Frame from './components/Frame';
import StartScreen from './screens/StartScreen';
import DiceRollScreen from './screens/DiceRollScreen';
import BoardScreen from './screens/BoardScreen';

function App() {
    const [stage, setStage] = useState('start');
    const [playerLevel, setPlayerLevel] = useState(0);
    const [feedback, setFeedback] = useState({});
    const [diceResult, setDiceResult] = useState(null);
    const snakes = {
        22: 8,
        39: 17,
        58: 42,
    };
    const arrows = {
        3: 11,
        14: 28,
        27: 36,
    };
    const levelMeanings = {
        1: 'Birth — The beginning of your spiritual journey.',
        2: 'Curiosity — A spark of wonder stirs within.',
        3: 'Intuition — Trust the inner voice.',
        4: 'Disruption — Old patterns begin to crumble.',
        5: 'Seeking — The quest for meaning intensifies.',
        6: 'Resistance — Ego pushes back against change.',
        7: 'Surrender — Letting go opens new doors.',
        8: 'Attachment — Beware of clinging to illusions.',
        9: 'Reflection — Truth begins to echo inward.',
        10: 'Trial — A test of faith and resilience.',
        11: 'Awakening — A glimpse of higher truth.',
        12: 'Integration — Lessons begin to take root.',
        13: 'Compassion — Seeing others as mirrors of self.',
        14: 'Expansion — Consciousness stretches beyond the known.',
        15: 'Shadow — Facing the hidden parts of the soul.',
        16: 'Alignment — Values and actions begin to harmonize.',
        17: 'Clarity — The fog lifts, revealing purpose.',
        18: 'Devotion — A deeper connection to the divine.',
        19: 'Stillness — Peace found in presence.',
        20: 'Wisdom — Knowledge tempered by experience.',
        21: 'Unity — Separation dissolves into oneness.',
        22: 'Purification — Shedding what no longer serves.',
        23: 'Faith — Trusting the unseen path.',
        24: 'Courage — Stepping forward despite fear.',
        25: 'Healing — Mending wounds of the heart and spirit.',
        26: 'Truth — Speaking and living with integrity.',
        27: 'Grace — Receiving without resistance.',
        28: 'Connection — Feeling the web of all things.',
        29: 'Intention — Energy flows where focus goes.',
        30: 'Transformation — The caterpillar becomes the butterfly.',
        31: 'Presence — The power of now.',
        32: 'Forgiveness — Releasing the past to free the soul.',
        33: 'Illumination — Light floods the inner temple.',
        34: 'Balance — Walking the middle path.',
        35: 'Service — Giving from the overflow.',
        36: 'Trust — Letting go of control.',
        37: 'Creativity — Channeling divine inspiration.',
        38: 'Humility — Bowing to something greater.',
        39: 'Discernment — Knowing what is true.',
        40: 'Flow — Moving with the rhythm of life.',
        41: 'Rebirth — Emerging anew from the ashes.',
        42: 'Equanimity — Calm in the face of chaos.',
        43: 'Sacrifice — Offering ego for soul.',
        44: 'Vision — Seeing beyond the veil.',
        45: 'Connection — Union with higher realms.',
        46: 'Simplicity — Returning to what matters.',
        47: 'Faithfulness — Staying true to the path.',
        48: 'Joy — The soul’s natural state.',
        49: 'Transcendence — Rising above duality.',
        50: 'Mystery — Embracing the unknown.',
        51: 'Revelation — Hidden truths come to light.',
        52: 'Acceptance — Welcoming what is.',
        53: 'Empowerment — Owning your divine spark.',
        54: 'Gratitude — Honoring every step.',
        55: 'Peace — The still lake within.',
        56: 'Radiance — Shining from the soul outward.',
        57: 'Faith — Anchored in the unseen.',
        58: 'Release — Letting go with love.',
        59: 'Harmony — Resonating with the cosmos.',
        60: 'Sacredness — Seeing the divine in all.',
        61: 'Wisdom — Living what you’ve learned.',
        62: 'Compassion — Loving without condition.',
        63: 'Presence — Being fully here.',
        64: 'Truth — The final unveiling.',
        65: 'Union — Merging with the divine.',
        66: 'Light — Becoming the flame.',
        67: 'Stillness — The breath between breaths.',
        68: 'Knowing — Beyond thought or belief.',
        69: 'Completion — The circle closes.',
        70: 'Return — Coming home to self.',
        71: 'Oneness — All is one, and one is all.',
        72: 'Ein Sof — The infinite light beyond form.'
    };

    const handleRoll = () => {
        const result = Math.ceil(Math.random() * 6);
        setFeedback({ message: ``, type: '' });
        setDiceResult(result); // Show result immediately

        setTimeout(() => {
            let nextLevel = Math.min(playerLevel + result, 72);

            if (snakes[nextLevel]) {
                setFeedback({ message: '🐍 You hit a setback! Falling down...', type: 'snake' });
                nextLevel = snakes[nextLevel];
            } else if (arrows[nextLevel]) {
                setFeedback({ message: '🕊️ Divine boost! You rise higher...', type: 'arrow' });
                nextLevel = arrows[nextLevel];
            } else {
                setFeedback({ message: `🎲 You moved to level ${nextLevel}`, type: 'neutral' });
            }

            setPlayerLevel(nextLevel);
            setDiceResult(null); // Clear result after move
        }, 2000); // Delay by 1 second
    };


    return (
        <Frame>
            {stage === 'start' && <StartScreen onStart={() => setStage('dice')}/>}
            {stage === 'dice' && (
                <DiceRollScreen
                    onEnter={(roll) => {
                        // setPlayerLevel((prev) => Math.min(prev + roll, 72));
                        setPlayerLevel(1);
                        setStage('board');
                    }}
                />
            )}
            {stage === 'board' && (
                <BoardScreen
                    currentLevel={playerLevel}
                    onRoll={handleRoll}
                    feedback={feedback}
                    arrows={arrows}
                    snakes={snakes}
                    levelMeanings={levelMeanings}
                    diceResult={diceResult}
                />
            )}

        </Frame>
    );


}

export default App;
