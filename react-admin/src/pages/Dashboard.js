import { useEffect,useState } from "react";
import axios from 'axios'
import { localhost } from '../globalVariables'
import Navbar from "../components/Navbar";
const Dashboard = () => {

    //using highcharts to display histogram
    var Highcharts = require('highcharts');
    require('highcharts/modules/exporting')(Highcharts); 

    const [stats,setStats] = useState('')

    //track the user numbers in each city to display in histogram
    const [userNumber,setUserNumbers] = useState([])

    useEffect(() => {

        axios({
            headers:{'Authorization':'Bearer '+localStorage.getItem('token')},
            method:'GET',
            url:'http://'+localhost+':8000/api/admin/stats'
        }).then(res => {
            setStats(res.data)
            console.log('STATS', res.data)

            // let temp = []
            Object.values(res.data.cities).forEach(array => {
                // temp.push(array.length)
                setUserNumbers(prevArray => ([...prevArray,array.length]))
            })
        })
        .catch(err => console.log(err))
        
    },[])

    useEffect(() => {
        if(stats != '' && userNumber != []){ 
            //display histogram when data is successfully fetched
            Highcharts.chart('chart-container',{
                chart:{type:'column'},
                title:{text:''},
                subtitle: {text: ''},
                xAxis:{
                    categories:Object.keys(stats.cities),
                    crosshair:true
                },
                yAxis: {
                    min:0,
                    title:{text:''}
                },
                plotOptions: {
                    column: {
                    pointPadding: 0,
                    borderWidth: 0,
                    groupPadding: 0,
                    shadow: false
                    }
                },
                series:[{
                    name:'Number of users in each city',
                    data:userNumber
                }]
            })

            //display line chart for number of users per month

            const usersPerMonth = []
            stats.users_per_month.forEach(element => {
                usersPerMonth[element.month - 1] = element.number_of_users
            })

            for (let i=0;i<12;i++) {
                if(usersPerMonth[i] == null) {usersPerMonth[i] = 0}
            }

            Highcharts.chart('line-chart-users', {
                chart: {
                    type: 'line'
                },
                title: {
                    text: 'Monthly Users'
                },
                subtitle: {
                    text: ''
                },
                xAxis: {
                    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
                },
                yAxis: {
                    title: {
                        text: 'Number of users'
                    }
                },
                plotOptions: {
                    line: {
                        dataLabels: {
                            enabled: true
                        },
                        enableMouseTracking: false
                    }
                },
                series: [{
                    name: 'Users',
                    data: usersPerMonth
                }]
            });
        }
    },[stats])
    
    return (

        <>
            <Navbar />
            {
                stats.length == 0?
                <></>:
                <div className="section-container">
                    <h1 className="page-title">Dashboard</h1>

                    <div id="stats-container">
                        
                        <div className="stat-container">
                            <p>Total users</p>
                            <span>{stats.user_count}</span>
                        </div>

                        <div className="stat-container">
                            <p>Total job offers</p>
                            <span>{stats.offer_count}</span>
                        </div>

                        <div className="stat-container">
                            <p>Total logins</p>
                            <span>{stats.login_count}</span>
                        </div>

                        <div className="stat-container">
                            <p>Total signups</p>
                            <span>{stats.signup_count}</span>
                        </div>

                    </div>

                    <div id="top-cities-container">

                        <h2 className="secondary-title">Cities</h2>
                        <div id="cities-container">
                            {
                                Object.keys(stats.cities).map(city => (
                                    <div key={city} className='city-container'>
                                        <p className="city">-{city}</p>
                                        <span className="city-users-count">{stats.cities[city].length}</span>
                                    </div>
                                ))
                            }
                        </div>
                    </div>

                    {
                        stats?
                        <div>
                            <div id="chart-container"></div>
                            <div id="line-chart-users"></div>
                        </div>
                        :<></>
                    }

                </div>
            }
        </>
    );
}
 
export default Dashboard;