import React, { useState } from 'react'
import { fetchApodDataRange } from '../nasaAPI/api';
import { Link } from "react-router-dom";


const FetchApodSpecificDateRange = () => {

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [apodData, setApodData] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleFetchData = async () => {
        if (!startDate || !endDate) {
            alert('Please select both start date and end date.');
            return;
        }

        setLoading(true);

        try {
            const response = await fetchApodDataRange(startDate, endDate);
            setApodData(response);
        } catch (error) {
            console.error('Error fetching data:', error);
        }

        setLoading(false);
    };


    return (
        <div className="text-center">
            
            <h1 className='text-white'>Date Range Selection</h1>
            <label className='text-white' style={{ marginRight: "12px" }}>
                Start Date:
                <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="form-control" />
            </label>
            <label className='text-white' style={{ marginRight: "12px" }}>
                End Date:
                <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="form-control" />
            </label>
            <button onClick={handleFetchData} disabled={loading} className="btn btn-blue" style={{color: "white"}}>
                {loading ? 'Wait...' : 'Fetch Data'}
            </button>
            <br /><br />
            {apodData && (
                <div>
                {apodData.map((item, index) => (
                  <div key={index} className="card mb-3" style={{ maxWidth: "1400px" }}>
                    <div className="row g-0">
                      {item.media_type === 'image' ? (
                        <div className="col-md-4">
                          <img src={item.url} alt={item.title} className="img-fluid rounded-start" />
                        </div>
                      ) : (
                        <iframe
                          title={item.title}
                          width="560"
                          height="315"
                          src={item.url}
                          allowFullScreen
                          className="card-img-top"
                        ></iframe>
                      )}
                      <div className="col-md-8">
                        <h3 className="card-title"><b>{item.title}</b></h3>
                        <p className="card-text">{item.explanation}</p>
                      </div>
                    </div>
                  </div>
                ))}
      
              </div>
            )}
        </div>
    )
}

export default FetchApodSpecificDateRange
