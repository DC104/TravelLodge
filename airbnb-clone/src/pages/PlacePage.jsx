import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import BookingWidget from "./BookingWidget";
import PlaceImg from "../PlaceImg"; // Import PlaceImg

    export default function PlacePage() {
        const { id } = useParams(); 
        const [place, setPlace] = useState(null);
        const [showAllPhotos, setShowAllPhotos] = useState(false);
    
        useEffect(() => {
            if (!id) return; 
            axios.get(`/places/${id}`).then(response => {
                setPlace(response.data);
            });
        }, [id]);
    
        if (!place) return null;
    
        if (showAllPhotos) {
            return (
                <div className="absolute inset-0 bg-white min-h-screen z-50">
                    <div className="bg-black p-8 grid gap-4">
                        <div>
                            <h2 className="text-3xl  text-white mr-48">Photos of {place.title}</h2>
                            <button 
                                onClick={() => setShowAllPhotos(false)} 
                                className="fixed right-12 top-8 flex gap-2 py-2 px-4 rounded-xl bg-black text-white shadow shadow-black"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                                Close Photos 
                            </button> 
                        </div>
                        {place.photos?.length > 0 && place.photos.map((photo, index) => (
                            <div key={index}>
                                <PlaceImg place={place} index={index} className="w-full h-auto object-cover rounded-lg" />
                            </div>
                        ))}
                    </div>
                </div>
            );
        }
    
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
    
                <div className="grid gap-4 grid-cols-1 md:grid-cols-[2fr_1fr]">
                    <div className="aspect-w-16 aspect-h-9">
                        {place.photos?.[0] && (
                            <PlaceImg 
                                place={place} 
                                index={0} 
                                className="rounded-lg object-cover w-full h-full" 
                            />
                        )}
                    </div>
    
                    <div className="grid gap-4">
                        {place.photos?.slice(1, 3).map((_, index) => (
                            <div key={index} className="aspect-w-16 aspect-h-9">
                                <PlaceImg 
                                    place={place} 
                                    index={index + 1} 
                                    className="rounded-lg object-cover w-full h-full" 
                                />
                            </div>
                        ))}
                    </div>
                </div>
    
                <div className="relative">
                    <button 
                        onClick={() => setShowAllPhotos(true)} 
                        className="flex gap-1 py-2 px-4 bg-white rounded-2xl shadow shadow-md shadow-gray-500 absolute bottom-0 right-0"
                    > 
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                        </svg>
                        Show more Photos 
                    </button>
                </div>
    
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

