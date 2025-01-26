import { ReactNode } from "react"
import { ChangeGameStateType, PiecesPosType, PlayerPosType, PlayersType, TileMapArrType } from "../types"
import Tile from "../components/Tile";
const rowStyle = {
    display: 'flex'
};
let centerStyle = {
    height: 0,
    width: 0,
    borderLeft: '50px solid red',
    borderRight: '50px solid yellow',
    borderTop: '50px solid green',
    borderBottom: '50px solid blue',
}
let centerContainerStyle = {
    height:'101px',
    width:'101px',
    position:'absolute' as 'absolute',
    overflow:'hidden',
    top:'276px',
    zIndex:'100',
    left:'199.98px'
}
export const PrintBoard = (tileHeight: number, tileWidth: number, tileMap: TileMapArrType, piecesPos: PlayerPosType, canMove: PiecesPosType, activePlayer: PlayersType, rotateAnimateClass: string, changeAction: ChangeGameStateType, animationTilesForActivePlayer: number[], tileAnimationClass: string): ReactNode => {
    return <div>
        <div style={centerContainerStyle}><div style={centerStyle}></div></div>
        {tileMap.map((row) => {
            return <div key={Math.random()} style={rowStyle}>{row.map((tile) => <Tile key={Math.random()} height={tileHeight} width={tileWidth} id={tile.id} border={tile.border} bg={tile.color} piecesPos={piecesPos} canMove={canMove} activePlayer={activePlayer} rotateAnimateClass={rotateAnimateClass} changeAction={changeAction} animationTilesForActivePlayer={animationTilesForActivePlayer} tileAnimationClass={tileAnimationClass}></Tile>)}</div>
        })}
    </div>
}