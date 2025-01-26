import { EntryToSafeZoneTiles, PiecesMovementOrderArr, PlayerPiecesDefaultPos, SafeZoneTiles, StartingTilesForEachPlayer } from "../constants";
import { PiecesPosType, PlayersType } from "../types";

const CheckIfEntryToSafeZoneExist = (startInd: number, endInd: number, target: number) => {
    let i = startInd;
    let j = endInd;
    while (i <= j) {
        let mid = Math.floor((i + j) / 2);
        if (mid == target) {
            return mid;
        }
        else if (target > mid) {
            i = mid + 1;
        }
        else {
            j = mid - 1;
        }
    }
    return -1;
}

// This FN checks if a piece can move and where can it move.
export const CheckPiecesMovement = (piecesPos: PiecesPosType, diceNum: number, playerId: PlayersType): PiecesPosType => {
    let tempPiecesPos = piecesPos;
    const defaultPos = PlayerPiecesDefaultPos[playerId];
    for (let i = 1; i <= 4; i++) {
        const pieceId = `p${i}` as keyof PiecesPosType;
        const currPiecePos = piecesPos[pieceId];
        const currPieceDefaultPos = defaultPos[pieceId];
        const safeZoneInd = SafeZoneTiles[playerId].indexOf(currPiecePos);
        // if this is default pos.
        if (currPieceDefaultPos == currPiecePos) {
            if (diceNum == 6) {
                tempPiecesPos[pieceId] = StartingTilesForEachPlayer[playerId];
            }
            else {
                tempPiecesPos[pieceId] = -1;
            }
        }
        // if this piece is inside the safe zone.
        else if (safeZoneInd != -1) {
            const nextInd = safeZoneInd + diceNum;
            // it means it cannot move.
            if (nextInd > 5) {
                tempPiecesPos[pieceId] = -1;
            }
            else {
                tempPiecesPos[pieceId] = SafeZoneTiles[playerId][nextInd];
            }
        }
        else {
            const currInd = PiecesMovementOrderArr.indexOf(currPiecePos);
            const nextInd = currInd + diceNum;
            // check if entry to safe zone exist in this path.
            const entryToSafeZoneInd = PiecesMovementOrderArr.indexOf(EntryToSafeZoneTiles[playerId]);
            const entryToSafeZoneExist = CheckIfEntryToSafeZoneExist(currInd, nextInd - 1, entryToSafeZoneInd);
            if (entryToSafeZoneExist != -1) {
                const dis1 = entryToSafeZoneInd - currInd;
                const remainingDis = diceNum - dis1;
                tempPiecesPos[pieceId] = SafeZoneTiles[playerId][remainingDis - 1];
            }
            else {
                if (nextInd > 51) {
                    const dis = nextInd - 51;
                    tempPiecesPos[pieceId] = PiecesMovementOrderArr[dis - 1];
                }
                else {
                    tempPiecesPos[pieceId] = PiecesMovementOrderArr[nextInd];
                }
            }
        }
    }
    return tempPiecesPos;
}