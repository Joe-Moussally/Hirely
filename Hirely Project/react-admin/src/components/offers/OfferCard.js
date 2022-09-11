import { useNavigate } from 'react-router-dom';

const OfferCard = ({offer}) => {

    const nav = useNavigate()
    
    return (
        <div className="user-card">
            <img src={offer.user.picture_base64?
                'data:image/jpeg;base64,'+offer.user.picture_base64:
                require('../../assets/default_picture.jpg')
                }
                className='user-card-picture'
            />

            <div className='offer-info-container' onClick={() => nav('/offer',{state:{offer:offer}})}>
                <h1>{offer.position}</h1>
                <p>{offer.user.name}</p>
                {
                    offer.salary?
                    <div className='card-details-container'>
                        <img className='job-card-icon' src={require('../../assets/job-card/dollar-symbol.png')}/>
                        <span>{offer.salary} $/{offer.salary_period}</span>
                    </div>:<></>
                }
                <div className='card-details-container'>
                    <img className='job-card-icon' src={require('../../assets/job-card/placeholder.png')}/>
                    <span>{offer.user.city}</span>
                </div>
            </div>

            
        </div>
    );
}
 
export default OfferCard;