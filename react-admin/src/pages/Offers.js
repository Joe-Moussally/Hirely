import axios from "axios";
import { useState } from "react";
import Navbar from "../components/Navbar";
import OfferCard from "../components/offers/OfferCard";
import { localhost } from "../globalVariables";

const Offers = () => {

    const [offers,setOffers] = useState([])

    // axios({
    //     method:'GET',
    //     url:'http://'+localhost+':8000/api/admin/stats'
    // })

    //function to handle search
    const handleSearch = (e) => {
        if (e.target.value == '') {
            setOffers([])
            return
        }

        axios({
            headers:{'Authorization':'Bearer '+localStorage.getItem('token')},
            method:'GET',
            url:'http://'+localhost+':8000/api/admin/offers/'+e.target.value,
        }).then(res => {
            setOffers(res.data.offers)
            console.log('OOFFERSS',offers)
            //fixing search bug still apearing results
            if (e.target.value == '') {
                setOffers([])
                return
            }
        })
    }

    return (
        <>
            <Navbar />
            <div className="section-container">
                <h1 className="page-title">Offers</h1>

                <h2 className="secondary-title">Total Offers <span className="number">29</span></h2>

                <div id="stats-container">
                    <input type='text' className="search-input" placeholder="Search a job offer..." onChange={handleSearch}/>

                    <div id="user-cards-container">
                        {
                            offers.map(offer => (
                                <OfferCard offer={offer}/>
                            ))
                        }
                    </div>

                </div>

            </div>
        </>
    );
}
 
export default Offers;