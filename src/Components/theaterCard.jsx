import 'font-awesome/css/font-awesome.min.css'
import "../Styles/theaterCard.css"

export function TheaterCard(props) {
    return(
        <div className='tmc-list'>
            <div key={props.id} className='tmc'>
                <img src={props.image} alt='theaterMovie-image' className='tmc-image'></img>

                <div className='tmc-content'>
                    <h3 className='tmc-name'>{props.name}</h3>

                    <div className='tmc-1'>
                        <div className='tmc-description'>{props.description}</div>
                    </div>
                    <hr className='tmc-divider' ></hr>
                    <div className='tmc-2'>
                        <div className='tmc-district'>District: {props.district}</div>
                        <div className='tmc-city'>City: {props.city}</div>
                    </div>
                    <div className='tmc-3'>
                        <div className='tmc-location'>location</div>
                        <div className='tmc-ratings'>Ratings: {props.ratings}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}