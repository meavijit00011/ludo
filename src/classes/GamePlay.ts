import { CanMove, DiceNums, PlayerPiecesDefaultPos } from "../constants";
import { DiceNumsType, PiecesPosType, PlayerPosType, PlayersType } from "../types";

export class GamePlay {
    piecesPosOfPlayers: PlayerPosType;
    diceNums: DiceNumsType;
    activePlayer: PlayersType;
    canMove: PiecesPosType;
    allowedToMove: boolean;
    gameFinished: boolean;
    playerFinishedOrder: PlayersType[];
    quitGame: boolean;
    constructor(piecesPosOfPlayers?: PlayerPosType, diceNums?: DiceNumsType, activePlayer?: PlayersType, canMove?: PiecesPosType, allowedToMove?: boolean, gameFinished?: boolean, playerFinishedOrder?: PlayersType[], quitGame?: boolean) {
        this.piecesPosOfPlayers = piecesPosOfPlayers || PlayerPiecesDefaultPos;
        this.diceNums = diceNums || DiceNums;
        this.activePlayer = activePlayer || 'player1';
        this.canMove = canMove || CanMove;
        this.allowedToMove = allowedToMove || false;
        this.gameFinished = gameFinished || false;
        this.playerFinishedOrder = playerFinishedOrder || [];
        this.quitGame = quitGame || false;
    }
}