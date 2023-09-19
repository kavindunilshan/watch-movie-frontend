import 'font-awesome/css/font-awesome.min.css'
import "../Styles/theaterCard.css"

export function TheaterCard({id, name, description, district, city, label, dimension, ratings, image, onClick}) {

    return(
        <div className='tmc-list'>
            <div key={id} className='tmc'>
                <img src={image} alt='theaterMovie-image' className='tmc-image'></img>

                <div className='tmc-content'>
                    <h3 className='tmc-name'>{name}</h3>

                    <div className='tmc-1'>
                        <div className='tmc-description'>{description}</div>
                    </div>
                    <div className='tmc-2'>
                        <div className='tmc-district'>District: {district}</div>
                        <div className='tmc-city'>City: {city}</div>
                    </div>
                    <div className='tmc-3'>
                        <div className='tmc-location'>Dimention: {dimension}</div>
                        <div className='tmc-ratings'>Ratings: {ratings}</div>
                    </div>
                    <div className='tmc-4'>
                        <button className="tmc-btn" onClick={() => onClick(id)}>{label}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TheaterCard;