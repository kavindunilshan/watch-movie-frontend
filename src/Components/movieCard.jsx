import 'font-awesome/css/font-awesome.min.css'
import "../Styles/movieCard.css"

export function MovieCard(props) {
    const handleClick = () => {}

    return(
        <div className='mc-list'>
            <div key={props.id} className='mc'>
                <img src={props.image} alt='movie-image' className='mc-image'></img>

                <div className='mc-content'>
                    <h1 className='mc-title'>{props.name}</h1>
                    <div className='mc-2'>
                        <div className='mc-district'>Dimension: {props.dimension}</div>
                        <div className='mc-city'>Status: {props.status}</div>
                    </div>
                    <div className='mc-3'>
                        <div className='mc-location'>Genre: {props.genre}</div>
                        <div className='mc-ratings'>Lang: {props.language}</div>
                    </div>
                    <div className='mc-4'>
                        <button className="mc-btn" onClick={() => props.onClick(props.id)}>{props.label}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}