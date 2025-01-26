import { GamePlay } from "./classes/GamePlay";

export interface TileType {
    color: string,
    border: boolean,
}

interface TileMapType extends TileType {
    id: number
}

export type TileMapArrType = TileMapType[][];

export type PlayerColorsType = {
    player1: {
        defaultColor: string,
        pieceColor: string,
    },
    player2: {
        defaultColor: string,
        pieceColor: string,
    },
    player3: {
        defaultColor: string,
        pieceColor: string,
    },
    player4: {
        defaultColor: string,
        pieceColor: string,
    }
}

export type StartingTilesForEachPlayerType = {
    player1: number,
    player2: number,
    player3: number,
    player4: number
}

export type PiecesPosType = {
    p1: number, p2: number, p3: number, p4: number
}

export type PlayerPosType = {
    player1: PiecesPosType,
    player2: PiecesPosType,
    player3: PiecesPosType,
    player4: PiecesPosType
};

export type PlayersType = 'player1' | 'player2' | 'player3' | 'player4';

export type CanMoveType = boolean[];

export type DiceNumsType = {
    player1: number,
    player2: number,
    player3: number,
    player4: number
}

export type ChangeGameStateType = ({ actionType, payload }: { actionType: string, payload: {} }) => void

export type GamePlayContextType = {
    gameState: GamePlay,
    changeGameState: ChangeGameStateType
}

export type AnimatingTilesType = {
    player1: number[],
    player2: number[],
    player3: number[],
    player4: number[]
}
