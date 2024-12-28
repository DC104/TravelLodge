import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import BookingWidget from "./BookingWidget";
import Placegallery from "../PlaceGallery";

    export default function PlacePage() {
        const { id } = useParams(); 
        const [place, setPlace] = useState(null);
    
        useEffect(() => {
            if (!id) return; 
            axios.get(`/places/${id}`).then(response => {
                setPlace(response.data);
            });
        }, [id]);
    
        if (!place) return null;
    
    
        return (
            <div className="mt-4 bg-white shadow-md rounded-lg p-8">
                <h1 className="text-4xl font-bold mb-4 text-gray-800">{place.title}</h1>
                <a 
                    className="text-blue-600 hover:text-blue-800 font-semibold underline mb-6 inline-block" 
                    target="_blank" 
                    href={'https://maps.google.com/?q=' + place.address}
                    rel="noopener noreferrer"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 inline-block mr-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                    </svg>
                    {place.address}
                </a>
    
                <Placegallery place={place}/>
    
                <div className="my-4">
                    <h2 className="font-semibold text-2xl">Description</h2>
                    <p className="text-gray-700 leading-relaxed">{place.description}</p>
                </div>
    
                <div className="grid gap-4 grid-cols-1 md:grid-cols-[2fr_1fr]">
                    <div>
                        <h3 className="font-semibold text-lg">Check-in:</h3> {place.checkIn}<br/>
                        <h3 className="font-semibold text-lg">Check-out:</h3> {place.checkOut}<br/>
                        <h3 className="font-semibold text-lg">Max number of guests:</h3> {place.maxGuests}
                    </div>
                    <div>
                        <BookingWidget place={place} />
                    </div>
                </div>
    
                <div className="mt-8 bg-gray-50 border-t pt-6">
                    <h2 className="font-semibold text-2xl">Extra info</h2>
                    <p className="mb-2 mt-1 text-sm text-gray-700 leading-5">{place.extraInfo}</p>
                </div>
            </div>
        );
    }
