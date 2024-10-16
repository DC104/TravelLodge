import { Link } from "react-router-dom";
import AccountNav from "../AccountNav";
import { useEffect, useState } from "react";
import axios from "axios";

export default function PlacesPage() {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    axios.get('/places')
      .then(({ data }) => {
        setPlaces(data);
      })
      .catch(error => console.error('Error fetching places:', error));
  }, []);

  return (
    <div>
      <AccountNav />
      <div className="text-center">
        <br />
        <Link className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full" to={'/account/places/new'}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path fillRule="evenodd" d="M12 4a.75.75 0 01.75.75v6.5h6.5a.75.75 0 110 1.5h-6.5v6.5a.75.75 0 01-1.5 0v-6.5h-6.5a.75.75 0 110-1.5h6.5v-6.5A.75.75 0 0112 4z" clipRule="evenodd" />
          </svg>
          Add new place
        </Link>
      </div>

      <div className="mt-4">
        {places.length > 0 ? (
          places.map(place => (
            <Link to={`/account/places/${place._id}`} key={place._id} className="flex cursor-pointer bg-gray-200 p-4 rounded-2xl mt-2">
              <div className="w-32 h-32 bg-gray-300 flex-shrink-0">
                {place.photos.length > 0 && (
                  <img src={ 'http://localhost:5000/'+ place.photos[0]} alt={place.title} className="w-full h-full object-cover" />
                )}
              </div>
              <div className="ml-4 flex-grow">
                <h2 className="text-xl font-bold">{place.title}</h2>
                <p className="text-sm mt-2">{place.description}</p>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-center text-gray-500">No places found.</p>
        )}
      </div>
    </div>
  );
}
