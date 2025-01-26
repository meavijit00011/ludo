import { useContext } from 'react'
import classes from './GameQuitModal.module.css'
import { useNavigate } from 'react-router-dom'
import { GameContext } from '../context/GameContext';
const GameQuitModal = () => {
    const navigate = useNavigate();
    const { changeGameState } = useContext(GameContext)
    const handleGameQuit = () => {
        changeGameState({ actionType: 'quit', payload: { type: 'confirm' } })
        navigate('/');
    }
    const handleCancelClick = () => {
        changeGameState({ actionType: 'quit', payload: { type: 'cancel' } })
    }
    return (
        <div className={classes.game_quit_modal_container}>
            <div className={classes.game_quit_modal}>
                <h3>Are You Sure ??</h3>
                <div><button onClick={handleGameQuit}>Yes</button><button onClick={handleCancelClick}>Cancel</button></div>
            </div>
        </div>
    )
}

export default GameQuitModal