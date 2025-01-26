import { PrintBoard } from '../utils/PrintBoard'
import { useContext } from 'react'
import { BoardContext } from '../context/BoardContext'
import classes from './LudoBoard.module.css';
import { GameContext } from '../context/GameContext';
import Dice from './Dice';
import { PlayerActiveAnimatingTiles } from '../constants';
import GameFinishedModal from './GameFinishedModal';
import GameQuitModal from './GameQuitModal';
let centerStyle = {
    height: 0,
    width: 0,
    borderLeft: '50px solid red',
    borderRight: '50px solid yellow',
    borderTop: '50px solid green',
    borderBottom: '50px solid blue',
    position: 'absolute' as 'absolute',
    top: 0,
    left: 0
}
const tileAnimationClass = classes.tile_animate;
const LudoBoard = () => {
    const { tileHeight, tileWidth, tileMap, playerColors } = useContext(BoardContext);
    const ctx = useContext(GameContext);
    const { piecesPosOfPlayers, canMove, activePlayer, gameFinished, playerFinishedOrder, quitGame } = ctx.gameState;
    const changeGameState = ctx.changeGameState;
    centerStyle = { ...centerStyle };
    centerStyle.top = tileHeight * 6 + 76;
    centerStyle.left = tileWidth * 6;
    centerStyle.borderLeft = `50px solid ${playerColors.player2.defaultColor}`;
    centerStyle.borderBottom = `50px solid ${playerColors.player1.defaultColor}`;
    centerStyle.borderTop = `50px solid ${playerColors.player3.defaultColor}`;
    centerStyle.borderRight = `50px solid ${playerColors.player4.defaultColor}`;
    const animationTilesForActivePlayer = PlayerActiveAnimatingTiles[activePlayer];
    const handleBackClick = () => {
        changeGameState({ actionType: 'quit', payload: { type: 'quit' } })
    }
    return (
        <div className={classes.board_container}>
            {quitGame && <GameQuitModal></GameQuitModal>}
            {gameFinished && <GameFinishedModal winner={playerFinishedOrder[0]} runnerUp={playerFinishedOrder[1]}></GameFinishedModal>}
            <div className={classes.actions}><button onClick={handleBackClick}>Back</button></div>
            {<div className={classes.dice_container}>{<Dice id={2}></Dice>}{<Dice id={3}></Dice>}</div>}
            {PrintBoard(tileHeight, tileWidth, tileMap, piecesPosOfPlayers, canMove, activePlayer, classes.animate_rotate, changeGameState, animationTilesForActivePlayer, tileAnimationClass)}
            {<div className={classes.dice_container}>{<Dice id={1}></Dice>}{<Dice id={4}></Dice>}</div>}
        </div>
    )
}

export default LudoBoard