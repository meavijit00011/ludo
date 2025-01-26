import { TiStarburst } from "react-icons/ti";
const Pieces = ({ size, color, style, classes }: { size: number, color: string, style: {}, classes: string }) => {

    return (
        <div className={classes} style={style}>
            {<TiStarburst size={size} color={color} />}
        </div>
    )
}

export default Pieces