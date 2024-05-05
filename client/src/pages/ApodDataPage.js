import React, { useEffect, useState } from 'react'
import { fetchApodData } from '../nasaAPI/api';

const FetchApodDataPage = () => {
    const [apodData, setApodData] = useState(null);
    const date = '2024-04-1';

    // const fetchAPODData = async () => {
    //     try {
    //         // if (date) {
    //         //     const data = await fetchApodData(date);
    //         //     setApodData(data);
    //         // } else {

    //             const today = new Date();
    //             const year = today.getFullYear();
    //             const month = (today.getMonth() + 1).toString().padStart(2, '0');
    //             const day = today.getDate().toString().padStart(2, '0');
    //             const formattedDate = `${year}-${month}-${day - 2}`;
    //             const data = await fetchApodData(formattedDate);
    //             setApodData(data);
    //         // }
    //     } catch (error) {
    //         console.log('Error fetching data: ', error);
    //     }
    // }

    // useEffect(() => {
    //     fetchAPODData();
    //   }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const today = new Date();
                const year = today.getFullYear();
                const month = (today.getMonth() + 1).toString().padStart(2, '0');
                const day = today.getDate().toString().padStart(2, '0');
                const formattedDate = `${year}-${month}-${day}`;
                // const data = await fetchApodData(formattedDate);

                const data = await fetchApodData(formattedDate);
                setApodData(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const DataRender = () => {
        if (apodData.media_type === 'video') {
            return (
                <div>
                    <h2>{apodData.title}</h2>
                    <iframe
                        title={apodData.title}
                        width="560"
                        height="315"
                        src={apodData.url}
                        allowFullScreen
                    ></iframe>
                    <p>{apodData.explanation}</p>
                </div>
            );
        } else if (!apodData) {
            return null;
        } else {
            return (
                <div className='container grid grid--2-cols gap background'>
                    <div>
                        <h2>{apodData.title}</h2>
                        <img src={apodData.url} alt={apodData.title} style={{ maxWidth: '100%' }} />
                    </div>
                    <div className='text-container'>
                        <p>{apodData.explanation}</p>
                        <p>Date: {apodData.date}</p>
                        <p>Media Type: {apodData.media_type}</p>
                        {apodData.hdurl && <a href={apodData.hdurl} target="_blank" rel="noopener noreferrer">View HD Image</a>}
                    </div>
                </div>
            )
        }
    }


    return (
        <div>
            {/* <div> */}

            {/* <button type="button" class="btn btn-dark">Dark</button> */}
            {/* </div> */}
            <h1 className='text-white'>Astronomy Picture of the Day</h1>
            {apodData ? DataRender() : <p>Loading...</p>}
        </div>
    )
}

export default FetchApodDataPage