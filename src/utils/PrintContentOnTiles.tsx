import { ReactNode } from "react"
import { ArrowTiles, PlayerColors, PlayerPiecesDefaultPos, StarTiles } from "../constants"
import { CiStar } from "react-icons/ci";
import { FaLongArrowAltUp } from "react-icons/fa";
import { FaLongArrowAltDown } from "react-icons/fa";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { FaLongArrowAltRight } from "react-icons/fa";

import { PiecesPosType, PlayerPosType, PlayersType } from "../types";
import Pieces from "../components/Pieces";
const arrows = [<FaLongArrowAltUp color={PlayerColors.player1.defaultColor} />,
<FaLongArrowAltRight color={PlayerColors.player2.defaultColor} />, <FaLongArrowAltDown color={PlayerColors.player3.defaultColor} />, <FaLongArrowAltLeft color={PlayerColors.player4.defaultColor} />]
const startStyle = {
    position: 'absolute' as 'absolute',
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
};
let defaultPosStyle = {
    height: '100%',
    width: '100%',
    backgroundColor: '#f5eef8',
    borderRadius: '50%',
    position: 'absolute' as 'absolute',
    top: '',
    zIndex: 1,
    left: '',
};
const defaultPosStyleCalc = (defaultInd: number) => {
    let calcStyle = defaultPosStyle;
    if (defaultInd == 0 || defaultInd == 1) {
        calcStyle = {
            ...calcStyle,
            top: '-3px'
        }
    }
    else {
        calcStyle = {
            ...calcStyle,
            top: '3px'
        }
    }
    if (defaultInd == 0 || defaultInd == 2) {
        calcStyle = {
            ...calcStyle,
            left: '-3px'
        }
    }
    else {
        calcStyle = {
            ...calcStyle,
            left: '3px'
        }
    };
    return calcStyle;
}
const checkIfThisIsDefaultPos = (tileId: number): number | null => {
    if (Object.values(PlayerPiecesDefaultPos.player1).indexOf(tileId) != -1) {
        return Object.values(PlayerPiecesDefaultPos.player1).indexOf(tileId);
    };
    if (Object.values(PlayerPiecesDefaultPos.player2).indexOf(tileId) != -1) {
        return Object.values(PlayerPiecesDefaultPos.player2).indexOf(tileId);
    };
    if (Object.values(PlayerPiecesDefaultPos.player3).indexOf(tileId) != -1) {
        return Object.values(PlayerPiecesDefaultPos.player3).indexOf(tileId);
    };
    if (Object.values(PlayerPiecesDefaultPos.player4).indexOf(tileId) != -1) {
        return Object.values(PlayerPiecesDefaultPos.player4).indexOf(tileId);
    }
    return null;
};
const checkForRotation = (tileId: number) => {
    let deg = 0;
    if ((tileId > 89 && tileId < 135 && tileId != 127 && tileId != 97)) {
        deg = 90;
    };
    return deg;
}
export const PrintContentOnTile = (tileId: number, piecesPos: PlayerPosType, tileWidth: number, canMove: PiecesPosType, activePlayer: PlayersType, rotateAnimateClass: string): ReactNode => {
    let div = <div></div>
    // 1.check if star can be printed on the tile.
    for (let i = 0; i < 4; i++) {
        if (StarTiles[i] == tileId) {
            div = <div style={startStyle}><CiStar size={30} color='#cacfd2' /></div>
        }
    }
    // 2. check if arrow can be printed on that tile.
    for (let i = 0; i < 4; i++) {
        if (ArrowTiles[i] == tileId) {
            div = <div style={startStyle}>{arrows[i]}</div>
        }
    }
    // 3. print background for default position.
    let defaultInd = checkIfThisIsDefaultPos(tileId);
    if (defaultInd != null) {
        const defaultPosStyles = defaultPosStyleCalc(defaultInd);
        div = div = <div style={defaultPosStyles}></div>
    }

    // 4. print pieces....
    let tempPiecesArr: { piecePosType: string, playerId: PlayersType, pieceInd: number, thisPieceCanMove: boolean }[] = [];
    for (let i = 1; i <= 4; i++) {
        const currPlayer = `player${i}` as PlayersType;
        const currPlayerPos = piecesPos[currPlayer];
        for (let j = 1; j <= 4; j++) {
            const pieceId = `p${j}` as keyof PiecesPosType;
            const piecePos = currPlayerPos[pieceId];
            let ifDefaultPos = checkIfThisIsDefaultPos(piecePos);
            if (ifDefaultPos != null && piecePos == tileId) {
                if (currPlayer == activePlayer && canMove[pieceId] != -1) {
                    tempPiecesArr.push({ piecePosType: 'default', playerId: currPlayer, pieceInd: j, thisPieceCanMove: true })
                }
                else {
                    tempPiecesArr.push({ piecePosType: 'default', playerId: currPlayer, pieceInd: j, thisPieceCanMove: false })
                }

            }
            else if (piecePos == tileId) {
                if (currPlayer == activePlayer && canMove[pieceId] != -1) {
                    tempPiecesArr.push({ piecePosType: 'normal', playerId: currPlayer, pieceInd: j, thisPieceCanMove: true })
                }
                else {
                    tempPiecesArr.push({ piecePosType: 'normal', playerId: currPlayer, pieceInd: j, thisPieceCanMove: false })
                }
            }
        }
    };
    div = <div style={{ height: '100%', width: '100%' }}>
        {div}
        {<div style={{ zIndex: 1000, position: 'relative', height: '100%', width: '100%', transform: `rotate(${checkForRotation(tileId)}deg)` }}>{tempPiecesArr.map((piece, ind) => {
            const size = piece.piecePosType == "default" ? 33.33 : 10;
            const color = PlayerColors[piece.playerId].pieceColor;
            let style = {};
            const spaceLeft = (tileWidth - ((tempPiecesArr.length - 1) * 4) - 10) / 2;
            const spaceFromTop = (tileWidth - 10) / 2 - 1;
            if (piece.piecePosType == 'default') {
                style = defaultPosStyleCalc(piece.pieceInd - 1)
            }
            else {
                style = {
                    height: '10px',
                    width: '10px',
                    position: 'absolute' as 'absolute',
                    left: `${(spaceLeft + ind * 4) - .5}px`,
                    top: `${spaceFromTop}px`,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    border: piece.thisPieceCanMove ? '1px solid cyan' : '1px solid transparent',
                    borderRadius: '50%'
                }
            }
            return <Pieces classes={piece.thisPieceCanMove ? rotateAnimateClass : ''} style={style} color={color} size={size} key={Math.random()}></Pieces>
        })}</div>}

    </div>
    return div;
}