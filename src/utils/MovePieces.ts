import { FinishedPosition, PlayerPiecesDefaultPos, StarTiles, StartingTilesForEachPlayer } from "../constants";
import { PiecesPosType, PlayerPosType, PlayersType } from "../types";

const checkIfHasRemovedAnotherPiece = (piecesPosOfPlayers: PlayerPosType, activePlayerId: PlayersType, tileId: number) => {
    const tempPiecesPosOfPlayers = piecesPosOfPlayers;
    let hasRemovedAnotherPiece = false;
    const startingTileOfPlayers = Object.values(StartingTilesForEachPlayer);
    for (let i = 1; i <= 4; i++) {
        const playerId = `player${i}` as PlayersType;
        const piecesPosOfCurrPlayer = piecesPosOfPlayers[playerId];
        for (let j = 1; j <= 4; j++) {
            const pieceId = `p${j}` as keyof PiecesPosType;
            const piecePos = piecesPosOfCurrPlayer[pieceId];
            // check if this piece exist on this tile and the tile is not a startile and the tile is not a starting tile.
            if (piecePos == tileId && playerId != activePlayerId && startingTileOfPlayers.indexOf(tileId) == -1 && StarTiles.indexOf(tileId) == -1) {
                tempPiecesPosOfPlayers[playerId][pieceId] = PlayerPiecesDefaultPos[playerId][pieceId]
                hasRemovedAnotherPiece = true;
                break;
            }
        }
    }
    return {
        hasRemovedAnotherPiece,
        tempPiecesPosOfPlayers
    }
}

// 1.find which piece exist on that tile of curr player.
export const MovePieces = (playerId: PlayersType, playerPiecesPos: PlayerPosType, tileId: number, canMove: PiecesPosType) => {
    let tempPlayerPiecesPos = playerPiecesPos;
    const currPlayerPiecesPos = tempPlayerPiecesPos[playerId];
    let nextTileId = null;
    let hasPieceFinished = false;
    let hasMoved = false;
    for (let i = 1; i <= 4; i++) {
        const pieceId = `p${i}` as keyof PiecesPosType;
        const piecePos = currPlayerPiecesPos[pieceId];
        const nextPos = canMove[pieceId];
        // if that piece exist on that tile then move it...
        if (tileId == piecePos && nextPos != -1) {
            tempPlayerPiecesPos[playerId][pieceId] = nextPos;
            nextTileId = nextPos;
            hasMoved = true;
            // check if piece is finished 
            if (nextPos == FinishedPosition[playerId]) {
                hasPieceFinished = true;
            }
            break;
        }
    }
    const updatePostions = nextTileId ? { ...checkIfHasRemovedAnotherPiece(tempPlayerPiecesPos, playerId, nextTileId), hasPieceFinished, hasMoved } : { hasRemovedAnotherPiece: false, tempPiecesPosOfPlayers: tempPlayerPiecesPos, hasPieceFinished, hasMoved };
    return updatePostions;
}