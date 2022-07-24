import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Navbar from '../components/Navbar'
import axios from 'axios'
import { localhost } from '../globalVariables'

const Offer = () => {

    const nav = useNavigate()

    const location = useLocation()
    const [offer,setOffer] = useState(location.state.offer)
    const [requirements,setRequirements] = useState([])

    useEffect(() => {
        console.log(location.state.offer)

        //get the offer's requirements
        axios({
            method:'GET',
            url:'http://'+localhost+':8000/api/offers/'+location.state.offer.id,
        }).then(res => {
            setRequirements(res.data.requirements)
        })
    
    },[])

    //function to call API to delete the offer
    const removeOffer = () => {
        axios({
            method:'POST',
            url:'http://'+localhost+':8000/api/offers/delete/'+location.state.offer.id,
        }).then(res => {
            nav('/offers')
        })
    }

    return (
        <>
            <Navbar />
            <div className="section-container">
                <h1 className="page-title">{offer.position}</h1>

                <div id="posted-by-container">
                    <span id="posted-by">Posted by</span>
                    <img src={offer.user.picture_base64?
                        'data:image/jpeg;base64,'+offer.user.picture_base64:
                        require('../assets/default_picture.jpg')
                        }
                        className='user-card-picture'
                        id="posted-by-picture"
                    />
                    <span id="posted-by-name">{offer.user.name}</span>
                </div>

                {
                    offer.description?
                    <>
                        <h2 className="secondary-title">Description</h2>
                        <p>{offer.description}</p>
                    </>
                    :
                    <></>
                }

                {
                    offer.salary?
                    <>
                        <h2 className="secondary-title">Salary</h2>
                        <p>{offer.salary} $/{offer.salary_period}</p>
                    </>
                    :
                    <></>
                }
                
                {
                    requirements != []?
                    <ul>
                        <h2 className="secondary-title">Requirements</h2>
                        {
                            requirements.map(req => (
                                <li>{req.requirement}</li>
                            ))
                        }
                    </ul>
                    :
                    <></>
                }
                
                <div id="remove-btn-container" onClick={removeOffer}>
                    <button>Remove Offer</button>
                </div>

            </div>
        </>
    );
}
 
export default Offer;