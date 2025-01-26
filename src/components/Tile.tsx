import { PrintContentOnTile } from '../utils/PrintContentOnTiles'
import { ChangeGameStateType, PiecesPosType, PlayerPosType, PlayersType } from '../types'
const Tile = ({ height, width, id, border, bg, piecesPos, canMove, activePlayer, rotateAnimateClass, changeAction, animationTilesForActivePlayer, tileAnimationClass }: { height: number, width: number, id: number, border: boolean, bg: string, piecesPos: PlayerPosType, canMove: PiecesPosType, activePlayer: PlayersType, rotateAnimateClass: string, changeAction: ChangeGameStateType, animationTilesForActivePlayer: number[], tileAnimationClass: string }) => {
    const style = {
        height: `${height}px`,
        width: `${width}px`,
        border: border ? '1px solid grey' : '',
        backgroundColor: bg,
        position: 'relative' as 'relative'
    }
    const handleClick = () => {
        changeAction({ actionType: 'move_piece', payload: { tileId: id } });
    }
    let classList = animationTilesForActivePlayer.indexOf(id) != -1 ? tileAnimationClass : ''
    return (
        <div className={classList} onClick={handleClick} style={style}>{PrintContentOnTile(id, piecesPos, width, canMove, activePlayer, rotateAnimateClass)}</div>
    )
}

export default Tile