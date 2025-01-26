import { FinishedPosition } from "../constants";
import { PiecesPosType, PlayerPosType, PlayersType } from "../types";

export const checkHasPlayerFinished = (piecesPos: PiecesPosType, playerId: PlayersType) => {
    if (piecesPos.p1 == FinishedPosition[playerId] && piecesPos.p2 == FinishedPosition[playerId] && piecesPos.p3 == FinishedPosition[playerId] && piecesPos.p4 == FinishedPosition[playerId]) {
        return true;
    }
    return false;
}

export const ChangeActivePlayer = (currPlayer: PlayersType, playerPiecesPos: PlayerPosType) => {
    let tempPlayer = currPlayer;
    while (true) {
        if (tempPlayer == 'player1' && tempPlayer != currPlayer && !checkHasPlayerFinished(playerPiecesPos[tempPlayer], 'player1')) {
            return 'player1';
        }
        else if (tempPlayer == 'player1') {
            tempPlayer = 'player2';
        }
        if (tempPlayer == 'player2' && tempPlayer != currPlayer && !checkHasPlayerFinished(playerPiecesPos[tempPlayer], 'player2')) {
            return 'player2';
        }
        else if (tempPlayer == 'player2') {
            tempPlayer = 'player3';
        }
        if (tempPlayer == 'player3' && tempPlayer != currPlayer && !checkHasPlayerFinished(playerPiecesPos[tempPlayer], 'player3')) {
            return 'player3';
        }
        else if (tempPlayer == 'player3') {
            tempPlayer = 'player4';
        }
        if (tempPlayer == 'player4' && tempPlayer != currPlayer && !checkHasPlayerFinished(playerPiecesPos[tempPlayer], 'player4')) {
            return 'player4';
        }
        else if (tempPlayer == 'player4') {
            tempPlayer = 'player1';
        }
    }
}