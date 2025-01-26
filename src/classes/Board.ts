import { BoardHeight, BoardWidth, PlayerColors, TileMap } from "../constants";
import { PlayerColorsType, TileMapArrType } from "../types";

export class Board {
    tileHeight: number;
    tileWidth: number;
    boardHeight: number;
    boardWidth: number;
    tileMap:TileMapArrType;
    playerColors:PlayerColorsType
    constructor(boardHeight?: number, boardWidth?: number) {
        this.boardHeight = boardHeight || BoardHeight;
        this.boardWidth = boardWidth || BoardWidth;
        this.tileHeight = (() => this.boardHeight / 15)();
        this.tileWidth = (() => this.boardWidth / 15)();
        this.tileMap = TileMap;
        this.playerColors = PlayerColors
    }
}