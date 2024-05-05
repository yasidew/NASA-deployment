import React, { useState, useEffect } from 'react';
import { fetchMissionManifest } from '../nasaAPI/api';
import { Link } from "react-router-dom";

const FetchMissionManifestData = () => {
    const [rover, setRover] = useState('');
    const [sol, setSol] = useState('');
    const [manifestData, setManifestData] = useState(null);
    const [error, setError] = useState('');
    const fetchManifest = async () => {
        try {
            const data = await fetchMissionManifest(rover);
            setManifestData(data.photo_manifest);
        } catch (error) {
            console.error('Error fetching manifest:', error);
            setError('Failed to fetch manifest. Please make sure the rover name is correct and try again.');
        }
    };

    const handleChange = (event) => {
        setRover(event.target.value);
    };

    const handleSolChange = (event) => {
        setSol(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        fetchManifest();
    };

    return (
        <div className="text-center">
            <h1 className='text-white'>Mars Rover Manifest</h1>
            <form onSubmit={handleSubmit}>
                <label className='text-white' style={{marginRight:"24px"}}>
                    Select a rover:
                    <select value={rover} onChange={handleChange} className="form-control">
                        <option value="">Select Rover</option>
                        <option value="curiosity">Curiosity</option>
                        <option value="opportunity">Opportunity</option>
                        <option value="spirit">Spirit</option>
                    </select>
                </label>
                <label className='text-white' style={{marginRight:"24px"}}>
                    Enter a sol number:
                    <input type="text" value={sol} onChange={handleSolChange} className="form-control" />
                </label>
                <button type="submit" disabled={!rover} className="btn btn-blue">Fetch Manifest</button>
            </form>
            {error && <p>{error}</p>}
            {manifestData && (
                <div className="card card-style" style={{marginLeft:"300px",  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",  borderRadius: "8px" }}>
                    <div className="card-body">
                        <h2 className="card-title">Rover <span>{manifestData.name}</span></h2>
                        <p className="card-text"><b>Landing date on Mars : </b> <span style={{color:"#03045E"}}>{manifestData.landing_date}</span></p>
                        <p className="card-text"><b>Launch date from Earth : </b> <span style={{color:"#03045E"}}>{manifestData.launch_date}</span></p>
                        <p className="card-text"><b>Mission status : </b><span style={{color:"#03045E"}}>{manifestData.status}</span> </p>
                        <p className="card-text"><b>Most recent Martian sol from which photos exist : </b><span style={{color:"#03045E"}}>{manifestData.max_sol}</span></p>
                        <p className="card-text"><b>Most recent Earth date from which photos exist : </b><span style={{color:"#03045E"}}>{manifestData.max_date}</span> </p>
                        <p className="card-text"><b>Number of photos taken by that Rover : </b><span style={{color:"#03045E"}}>{manifestData.total_photos}</span></p>
                        {manifestData.photos && manifestData.photos.length > 0 ? (
                            <div>
                                <ul>
                                    {sol ? (
                                        manifestData.photos.filter((photo) => photo.sol === parseInt(sol, 10)).map((photo) => (
                                            <li key={photo.sol} className="card-text">
                                                Sol {photo.sol}: {photo.total_photos} photos - Cameras: {photo.cameras.join(', ')}
                                            </li>
                                        ))
                                    ) : (
                                        manifestData.photos.map((photo) => (
                                            <li key={photo.sol} className="card-text">
                                                Sol {photo.sol}: {photo.total_photos} photos - Cameras: {photo.cameras.join(', ')}
                                            </li>
                                        ))
                                    )}
                                </ul>
                            </div>
                        ) : (
                            <p>No photos available for the selected rover.</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default FetchMissionManifestData;
