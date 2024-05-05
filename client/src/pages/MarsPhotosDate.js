import React, { useState } from 'react';
import { fetchRoverPhotosByEarthDate } from '../nasaAPI/api';
import { Link } from "react-router-dom";

const FetchMarsRoverPhotosDate = () => {
    const [rover, setRover] = useState('curiosity');
    const [earthDate, setEarthDate] = useState('');
    const [camera, setCamera] = useState('all');
    const [photos, setPhotos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [pages, setPages] = useState(1);

    const handleFetchPhotos = async () => {
        try {
            setLoading(true);
            const data = await fetchRoverPhotosByEarthDate(rover, earthDate, camera || null, pages);
            setPhotos(data.photos);
        } catch (error) {
            console.error('Error fetching photos:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="text-center">
            <h1 className='text-white'>Fetch Rover Photos by Earth Date</h1>
            <label className='text-white' style={{ marginRight: "24px" }}>
                Rover:
                <select value={rover} onChange={(e) => setRover(e.target.value)} className="form-control">
                    <option value="curiosity">Curiosity</option>
                    <option value="opportunity">Opportunity</option>
                    <option value="spirit">Spirit</option>
                </select>
            </label>
            <label className='text-white' style={{ marginRight: "24px" }}>
                Earth Date:
                <input type="date" value={earthDate} onChange={(e) => setEarthDate(e.target.value)} className="form-control" />
            </label>
            <label className='text-white' style={{ marginRight: "24px" }}>
                Camera:
                <input type="text" value={camera} onChange={(e) => setCamera(e.target.value)} className="form-control" />
            </label>
            <label className='text-white' style={{ marginRight: "24px" }}>
                Pages:
                <input type="number" value={pages} min="1" onChange={(e) => setPages(e.target.value)} className="form-control" />
            </label>
            <button onClick={handleFetchPhotos} disabled={!earthDate || loading} className="btn btn-blue">
                {loading ? 'Wait...' : 'Fetch Photos'}
            </button>
            <br /><br />
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                {photos.map((photo) => (
                    <img
                        key={photo.id}
                        src={photo.img_src}
                        alt="Mars Rover"
                        style={{ width: '300px', height: '300px', margin: '10px', objectFit: 'cover' }} // Adjusted width and height
                    />
                ))}
            </div>
        </div>
    );
}

export default FetchMarsRoverPhotosDate;
