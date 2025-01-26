import classes from './Home.module.css'
import { useNavigate } from 'react-router-dom'
const Home = () => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/gameplay')
    }
    return (
        <div className={classes.home}>
            <button onClick={handleClick}>Start</button>
        </div>
    )
}

export default Home