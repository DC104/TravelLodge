/* eslint-disable react/jsx-key */
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
export default function IndexPage() {
  const[places,setPlaces] = useState([]);
  useEffect(()=>{
     axios.get('/places').then(response => {
      setPlaces(response.data);
     })
  }, []);
  return (
    <div className="mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg-grid-cols-1 ">
     {places.length > 0 && places.map(place => (
      <Link to={'/place/'+place._id}>
         <div className="bg-gray-500 mb-2 rounded-2xl flex">
         {place.photos?.[0] &&(
         
         <img className="rounded-2xl object-cover aspect-square" src={'https://travellodge-3q9e.onrender.com/' + place.photos?.[0]} alt=""/>
        )}
            </div>   
            <h3 className="font-bold">{place.address}</h3>          
        <h2 className="text-sm truncate leading-4">{place.title}</h2>
        <div className="mt-1">
         <span className="font-bold"> ${place.price} per night </span>
        </div>
        </Link>
     ))}
    </div>
  );
}
