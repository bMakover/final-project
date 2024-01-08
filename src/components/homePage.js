import React, { useEffect, useState } from 'react'
import { apiService } from '../services/apiService '
import ShowPost from './showPost'
import { useNavigate } from 'react-router'
import { BarChart, BarSeries, Bar, Tooltip } from '@mui/x-charts';
const HomePage = () => {
    const months = [
        'January', 'February', 'March', 'April',
        'May', 'June', 'July', 'August',
        'September', 'October', 'November', 'December',
    ];
    const [passengersByMonth, setPassengersByMonth] = useState([]);
    const [uniqueDestinations, setUniqueDestinations] = useState([]);
    const data = Array.from({ length: 12 }, (_, index) => Math.floor(Math.random() * 21));
    const { getData } = apiService()
    const [allPosts, setAllPosts] = useState()
    const nav = useNavigate()
    useEffect(() => {

        const getAllPosts = async () => {
            try {
                const postData = await getData('posts/getAllDisplay', '/', '/');
                setAllPosts(postData.data);

                // Calculate total passengers for each month
                const passengersByMonth = Array.from({ length: 12 }, () => 0);
                postData.data.forEach(post => {
                    const postMonth = new Date(post.departure.date).getMonth(); // Assuming 'departure' is an object with a 'date' property
                    passengersByMonth[postMonth] += post.passengersList.length; // Using passengersList array length
                });
                setPassengersByMonth(passengersByMonth);

                // Calculate the number of different destinations
                const uniqueDestinations = calculateUniqueDestinations(postData.data);
                setUniqueDestinations(uniqueDestinations);

                console.log('Number of different destinations:', uniqueDestinations.length);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        const calculateUniqueDestinations = (posts) => {
            const destinationsSet = new Set();
            posts.forEach(post => {
                // Add destination location to the set
                destinationsSet.add(JSON.stringify(post.destination));
            });
            // Convert set back to an array of unique destinations
            const uniqueDestinations = Array.from(destinationsSet, destinationString => JSON.parse(destinationString));
            return uniqueDestinations;
        };

        getAllPosts();
    }, [])


    return (

        <div className='container-fluid m-0 p-0  shadow'>
            <h2 className='h2 text-center mt-5'>נסיעות פתוחות:</h2>
            <div className='d-flex overflow-x-scroll text-color-dark'>
                {(
                    <div className='buttons-container d-flex'>
                        {allPosts?.map((item) => (
                            <div className=' m-4'>
                                <ShowPost key={item._id} item={item} show={true} />
                            </div>
                        ))}
                    </div>
                )}
            </div>


            <div className='container d-flex text-center mt-4 '>
                <div>
                    <h2 className='h2 text-center m-5'>כמות הנוסעים שנסעו איתנו החודש:</h2>
                    <h2 className='h5 text-center m-5'>רוצים גם להגיע בקלות ממקום למקום?</h2>
                    <h2 className='h5 text-center m-5'>חפשו נסיעה קיימת או השאירו בקשה וניצור אתכם קשר</h2>
                </div>

                {passengersByMonth.length > 0 ? (

                    <BarChart 
                        xAxis={[
                            {
                                id: 'months',
                                data: months,
                                scaleType: 'band',
                            },
                        ]}
                        series={[
                            {
                                data: passengersByMonth, // Use the aggregated passenger data
                            },
                        ]}
                        width={900}
                        height={300}
                        colors={'pink'}
                    ></BarChart>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
            <div className='container d-flex mt-5 shadow' style={{ justifyContent: "center" }}>
                <div class="card " style={{ width: "300px", height: "auto" }}>
                    <div class="card-body">
                        <p class="card-text text-center">כמות היעדים הפתוחים להצטרפות לנסיעה</p>
                        <h2 className='h1 text-center'>{uniqueDestinations.length}</h2>
                        <p class="card-text text-center">נהג? הוסף נסיעה-ואנשים יוכלו להצטרף אליך </p>

                    </div>
                </div>

            </div>
        </div>
    )
}

export default HomePage