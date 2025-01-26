import { createContext, ReactNode, useEffect, useState } from "react";
import { GamePlay } from "../classes/GamePlay";
import rollAudio from '../assets/rolldicesound.mp3'
import { CheckPiecesMovement } from "../utils/CheckPiecesMovement";
import { GamePlayContextType, PiecesPosType, PlayersType } from '../types'
import { MovePieces } from "../utils/MovePieces";
import { CanMove } from "../constants";
import cutAudio from '../assets/cutAudio.mp3'
import { ChangeActivePlayer, checkHasPlayerFinished } from "../utils/ChangeActivePlayer";
const initial = {
    gameState: new GamePlay(),
    changeGameState: () => { }
}

export const GameContext = createContext<GamePlayContextType>(initial);

const rollSound = new Audio(rollAudio);
const pieceCutAudio = new Audio(cutAudio);
export const GameContextProvider = ({ children }: { children: ReactNode }) => {
    const [game, setGame] = useState<GamePlay>(new GamePlay());
    const changeState = ({ actionType, payload }: { actionType: string, payload: any }) => {
        const { activePlayer, diceNums, piecesPosOfPlayers, allowedToMove, canMove, gameFinished, playerFinishedOrder } = game;
        if (actionType == 'roll_dice') {
            // 1. check if the player is allowed to roll.
            const { playerId } = payload;
            if (activePlayer == playerId && !allowedToMove) {
                // 1.set Dice number 
                const num = Math.floor((Math.random() * 6) + 1);;
                let tempDiceNums = diceNums;
                tempDiceNums[playerId as PlayersType] = num;
                // 2.Play sound.
                rollSound.play();
                // 3.check which pieces can move.
                const piecesPos = piecesPosOfPlayers[playerId as PlayersType];
                const canMove: PiecesPosType = CheckPiecesMovement(JSON.parse(JSON.stringify(piecesPos)), num, activePlayer);
                let updatedPlayer = activePlayer;
                let tempIsAllowedToMove = true;
                // if any pieces cannot move then change active player.
                if (canMove.p1 == -1 && canMove.p2 == -1 && canMove.p3 == -1 && canMove.p4 == -1) {
                    updatedPlayer = ChangeActivePlayer(activePlayer, piecesPosOfPlayers);
                    tempIsAllowedToMove = false;
                }
                const updatedGame = new GamePlay(piecesPosOfPlayers, tempDiceNums, updatedPlayer, canMove, tempIsAllowedToMove, gameFinished, playerFinishedOrder);
                setGame(updatedGame);

            }
        }
        if (actionType == 'move_piece') {
            // check if player is allowed to move.
            if (allowedToMove) {
                const playerPiecesPos = JSON.parse(JSON.stringify(piecesPosOfPlayers));
                const tileId = payload.tileId;
                const updatedPos = MovePieces(activePlayer, playerPiecesPos, tileId, canMove);
                if (updatedPos.hasRemovedAnotherPiece) {
                    pieceCutAudio.play();
                }
                let updatedPlayer = activePlayer;
                let tempPlayerFinishedOrder = playerFinishedOrder;
                if (!updatedPos.hasRemovedAnotherPiece && diceNums[activePlayer] != 6 && !updatedPos.hasPieceFinished && updatedPos.hasMoved) {
                    updatedPlayer = ChangeActivePlayer(activePlayer, updatedPos.tempPiecesPosOfPlayers);
                };
                // after updatedPos check if player is finished.
                // if finished then change active player.
                if (checkHasPlayerFinished(updatedPos.tempPiecesPosOfPlayers[activePlayer], activePlayer)) {
                    updatedPlayer = ChangeActivePlayer(activePlayer, updatedPos.tempPiecesPosOfPlayers);
                    tempPlayerFinishedOrder.push(activePlayer)
                }
                // untill the player makes a move he is allowed to move.
                const isAllowedToMove = !updatedPos.hasMoved;
                const updatedCanMove = updatedPos.hasMoved ? CanMove : canMove;
                const updatedGame = new GamePlay(updatedPos.tempPiecesPosOfPlayers, diceNums, updatedPlayer, updatedCanMove, isAllowedToMove, gameFinished, tempPlayerFinishedOrder);
                setGame(updatedGame);
            }
        }
        if (actionType == 'reset') {
            const newGame = new GamePlay();
            setGame(newGame);
        }
        if (actionType == 'quit') {
            if (payload.type == 'quit') {
                const newGame = new GamePlay(piecesPosOfPlayers, diceNums, activePlayer, canMove, allowedToMove, gameFinished, playerFinishedOrder, true);
                setGame(newGame)
            }
            else if (payload.type == 'cancel') {
                const newGame = new GamePlay(piecesPosOfPlayers, diceNums, activePlayer, canMove, allowedToMove, gameFinished, playerFinishedOrder, false);
                setGame(newGame);
            }
            else if (payload.type == 'confirm') {
                setGame(new GamePlay());
            }

        }
    }

    // check if game is finished
    useEffect(() => {
        if (game.playerFinishedOrder.length >= 3 && !game.gameFinished) {
            const updatedGame = new GamePlay(game.piecesPosOfPlayers, game.diceNums, game.activePlayer, game.canMove, game.allowedToMove, true, game.playerFinishedOrder)
            setGame(updatedGame)
        }
    }, [game])

    return <GameContext.Provider value={{ gameState: game, changeGameState: changeState }}>{children}</GameContext.Provider>
}

