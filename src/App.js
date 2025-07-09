import {useState} from 'react';
import Frame from './components/Frame';
import StartScreen from './screens/StartScreen';
import DiceRollScreen from './screens/DiceRollScreen';
import BoardScreen from './screens/BoardScreen';

function App() {
    const [stage, setStage] = useState('start');
    const [playerLevel, setPlayerLevel] = useState(1);
    const [feedback, setFeedback] = useState({});
    const [diceResult, setDiceResult] = useState(null);
    const snakes = {
        11: 4,
        18: 2,
        20: 8,
        25: 7,
        33: 5,
        35: 9,
        40: 3,
        47: 1,
        53: 12,
        58: 8,
        63: 6,
        72: 50,
    };
    const arrows = {
        13: 23,
        15: 41,
        17: 32,
        21: 44,
        27: 52,
        34: 62,
        37: 50,
        39: 66,
        54: 68,
        57: 67,
        60: 65,
    };
    const levelMeanings = {
        1: 'TOHU VA VOHU – Chaos and Order.',
        2: 'SHAMAYIM - Heaven Above And Below.',
        3: 'ETZIM – Plants.',
        4: 'KOHAVIM – Stars.',
        5: 'HAYOT – Animals.',
        6: 'ADAM – Man is created.',
        7: 'HAVA – Woman is created.',
        8: 'AVODA – Guarding the Garden.',
        9: 'ETZ HAYIM – Tree of Knowledge.',
        10: 'ABEL – Serving God.',
        11: 'CAIN – Envy.',
        12: 'MIDBAR – Desert.',
        13: 'KAPARAH – Repentance.',
        14: 'SINAI – Desert.',
        15: 'HODAOT – Gratitude.',
        16: 'TAHORA – Kosher sex.',
        17: 'BITAHON – Relying on God.',
        18: 'TLUNOT – Ingratitude.',
        19: 'LASHON TOV – Speaking good of others.',
        20: 'LOT – Bad company.',
        21: 'ANAVA – Humility.',
        22: 'HUTZPA – Audacity.',
        23: 'MALHUT – King David.',
        24: 'TFILA – Prayer.',
        25: 'LASHON HA-RA – Gossip and condemnation.',
        26: 'HITNADVUT – Selfless service.',
        27: 'AKEDAT ITZHAK – Self-sacrifice.',
        28: 'ISHMAEL – Treating brothers.',
        29: 'TZEDEK – Justice.',
        30: 'IPUK – Containing anger.',
        31: 'KVOD LE HORIM - Respecting parents.',
        32: 'YESOD – Yosef.',
        33: 'KAAS – Anger.',
        34: 'GMILOT HESED – Acts of kindness.',
        35: 'KOFER – Disbelief.',
        36: 'HESHBON NEFESH – Accounting of the soul.',
        37: 'SLIHA – Forgiveness.',
        38: 'HOD – Aharon.',
        39: 'TORAH – The Law.',
        40: 'BITUL TORAH – Ignoring the Law.',
        41: 'BEIT HA-MIKDASH – Jerusalem Temple.',
        42: 'KEHILA – Helping others and asking for help.',
        43: 'HINUH – Educating yourself and others.',
        44: 'NETZAH – Moshe.',
        45: 'YESHUA BIN NUN – Loyalty and courage.',
        46: 'AHAVAT ISRAEL – Love to Israel.',
        47: 'GEEVA – Pride.',
        48: 'BRAHOT – Blessing God.',
        49: 'SHABBAT – Purpose of creation.',
        50: 'TIFERET – Yakov.',
        51: 'SAVLANUT – Patience.',
        52: 'HITBODEDUT – Solitude with God.',
        53: 'KORAH – Rebellion.',
        54: 'BITUL– Self-nullification.',
        55: 'TZNIUT – Modesty.',
        56: 'GVURAH – Itzhak.',
        57: 'HA-KOL LE TOVA – All for the good.',
        58: 'SINAT HINAM – Baseless hatred.',
        59: 'MASCHIAH – Become the Savior.',
        60: 'AHAVA MODAAT – Conscious love.',
        61: 'AHDUT ENOSHUT– Love to humanity.',
        62: 'HESED – Abraham.',
        63: 'NOAH – Righteous for himself.',
        64: 'DAAT – Knowledge.',
        65: 'BINA – Insight.',
        66: 'HOHMA – Insight.',
        67: 'KETER – Conscious love.',
        68: 'EIN SOF – The Infinite.',
        69: 'DEVEKUT – Clinging to God.',
        70: 'GEULA – Redemption.',
        71: 'GAN EDEN – Heaven.',
        72: 'NAHASH – Serpent.',
    };

    const handleRoll = () => {
        const result = Math.ceil(Math.random() * 6);
        setDiceResult(result);
        let nextLevel = Math.min(playerLevel + result, 72);
        let feedback;
        if (snakes[nextLevel]) {
            nextLevel = snakes[nextLevel];
            feedback = {message: `🐍 You hit a setback! Falling down... to ${nextLevel}`, type: 'snake'};
            setFeedback();
        } else if (arrows[nextLevel]) {
            nextLevel = arrows[nextLevel];
            feedback = {message: `🕊️ Divine boost! You rise higher... to ${nextLevel}`, type: 'arrow'};
        } else {
            feedback = {message: `Level ${nextLevel}`, type: 'neutral'};
        }
        setFeedback(feedback);

        setTimeout(() => {
            setPlayerLevel(nextLevel);
            setDiceResult(null); // Clear result after move
        }, 1000);
    };

    const handleInfo = (level) => {
        setFeedback({message: levelMeanings[level], type: 'info'});
    };


    return (
        <Frame>
            <div className="screen">
                {stage === 'start' && <StartScreen onStart={() => setStage('dice')}/>}
                {stage === 'dice' && (
                    <DiceRollScreen
                        onEnter={(roll) => {
                            // setPlayerLevel((prev) => Math.min(prev + roll, 72));
                            // setPlayerLevel(1);
                            setStage('board');
                        }}
                    />
                )}
                {stage === 'board' && (
                    <BoardScreen
                        currentLevel={playerLevel}
                        onRoll={handleRoll}
                        onInfo={handleInfo}
                        feedback={feedback}
                        arrows={arrows}
                        snakes={snakes}
                        levelMeanings={levelMeanings}
                        diceResult={diceResult}
                    />
                )}
            </div>
        </Frame>
    );


}

export default App;
