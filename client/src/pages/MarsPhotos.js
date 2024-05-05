import React, { useState } from 'react';
import { fetchRoverPhotosBySol } from '../nasaAPI/api';
import { Link } from "react-router-dom";

const FetchMarsRoverPhotos = () => {
  const [rover, setRover] = useState('curiosity');
  const [sol, setSol] = useState();
  const [camera, setCamera] = useState('');
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pages, setPages] = useState(1);

  const handleFetchPhotos = async () => {
    try {
      setLoading(true);
      const data = await fetchRoverPhotosBySol(rover, sol, camera || null, pages); // Pass the selected number of pages
      console.log(data.photos)
      setPhotos(data.photos);
    } catch (error) {
      console.error('Error fetching photos:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-center">
      <h2 className='text-white'>Fetch Photos by Sol</h2>
      <label className='text-white' style={{ marginRight: "24px" }}>
        Rover:
        <div className="select-wrapper">
          <select value={rover} onChange={(e) => setRover(e.target.value)} className="form-control">
            <option value="curiosity">Curiosity</option>
            <option value="opportunity">Opportunity</option>
            <option value="spirit">Spirit</option>
          </select>
          <div className="select-arrow">&#9660;</div>
        </div>
      </label>
      <label className='text-white' style={{ marginRight: "24px" }}>
        Sol:
        <input type="number" value={sol} onChange={(e) => setSol(e.target.value)} className="form-control" placeholder='sol' />
      </label>
      <label className='text-white' style={{ marginRight: "24px" }}>
        Camera:
        <input type="text" value={camera} onChange={(e) => setCamera(e.target.value)} className="form-control" />
      </label>
      <label className='text-white' style={{ marginRight: "24px" }}>
        Pages:
        <input type="number" value={pages} min="1" onChange={(e) => setPages(e.target.value)} className="form-control" />
      </label>
      <button onClick={handleFetchPhotos} className="btn btn-blue" style={{color: "white"}}>
        {loading ? 'Wait...' : 'Fetch Photos'}
      </button>
      <br /><br />
      <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: "20px", justifyContent: "center" }}>
        {photos.map((photo) => (
          <img
            key={photo.id}
            src={photo.img_src}
            alt="Mars Rover"
            style={{ width: '100px', height: '100px', margin: '5px' }}
            // onClick={() => handleImageClick(photo)}
          />
        ))}
      </div>
    </div>
  );
}

export default FetchMarsRoverPhotos;
