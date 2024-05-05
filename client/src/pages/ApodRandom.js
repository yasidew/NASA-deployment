import React, { useState } from 'react'
import { fetchRandomApodData } from '../nasaAPI/api';
import { Link } from "react-router-dom";


const FetchApodRandom = () => {

  const getRandomCount = () => {
    return Math.floor(Math.random() * (10 - 1 + 1)) + 1;
  };

  const [apodData, setApodData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [randomCount, setRandomCount] = useState(getRandomCount());

  const handleFetchRandomData = async () => {
    setLoading(true);

    try {
      const response = await fetchRandomApodData(randomCount);
      setApodData(response);
    } catch (error) {
      console.error('Error fetching data:', error);
    }

    setLoading(false);
  };

  
  return (
    <div className="text-center">
      <h1 className='text-white'>Fetch Random Images</h1>
      <h2 className='text-white'>{randomCount}</h2>
      <div style={{marginBottom:"10px", display: "flex", justifyContent: "center"}}>
        <button onClick={() => { setRandomCount(getRandomCount()); }} className='btn btn-blue' style={{marginRight:"10px", color: "white"}}>Generate Random Number</button>
        <button onClick={handleFetchRandomData} disabled={loading} className='btn btn-blue' style={{color: "white"}}>
          {loading ? 'Wait...' : 'Fetch Images'}
        </button>
      </div>
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

export default FetchApodRandom
