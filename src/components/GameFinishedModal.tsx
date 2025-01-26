import { useContext } from 'react'
import classes from './GameFinishedModal.module.css';
import { GameContext } from '../context/GameContext';
import { useNavigate } from 'react-router-dom';
const GameFinishedModal = ({ winner, runnerUp }: { winner: string, runnerUp: string }) => {
    const navigate = useNavigate();
    const { changeGameState } = useContext(GameContext);
    const handleResetGameClick = () => {
        changeGameState({ actionType: 'reset', payload: {} })
    }
    const homeBtnClickHandle = () => {
        navigate('/')
    }

    return (
        <div className={classes.game_finished_modal_container}>
            <div className={classes.game_finished_modal}>
                <h3>Game Finished !!</h3>
                <div><span>Winner</span><span>{winner}</span></div>
                <div><span>Runner Up</span><span>{runnerUp}</span></div>
                <div><button onClick={handleResetGameClick}>Play Again</button><button onClick={homeBtnClickHandle}>Home</button></div>
            </div>
        </div>
    )
}

export default GameFinishedModal