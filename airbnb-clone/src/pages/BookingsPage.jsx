import { useEffect, useState } from 'react';
import AccountNav from '../AccountNav';
import axios from 'axios';
import { differenceInCalendarDays, format } from 'date-fns';
import PlaceImg from '../PlaceImg';
import { Link } from 'react-router-dom';

export default function BookingsPage() {
    const [bookings, setBookings] = useState([]);
    const [places, setPlaces] = useState({});

    useEffect(() => {
        axios.get('/bookings')
            .then(response => {
                const bookingsData = response.data;
                setBookings(bookingsData);

                const placeIds = bookingsData.map(booking => booking.place);
                return Promise.all(placeIds.map(placeId => 
                    axios.get(`/places/${placeId}`).then(res => ({
                        id: placeId,
                        ...res.data
                    }))
                ));
            })
            .then(placeDetails => {
                const placesMap = placeDetails.reduce((acc, place) => {
                    acc[place.id] = place;
                    return acc;
                }, {});
                setPlaces(placesMap);
            })
            .catch(error => {
                console.error("Error fetching bookings or places:", error);
            });
    }, []);

    return (
        <div className="max-w-4xl mx-auto p-4">
            <AccountNav />
            <div className="booking-list space-y-6">
                {bookings.length > 0 ? (
                    bookings.map(booking => {
                        const place = places[booking.place];
                        return (
                            <Link 
                                to={`/account/booking/${booking._id}`} 
                                key={booking._id} 
                                className="block booking-card flex items-start gap-6 p-6 bg-white border rounded-lg shadow-lg"
                            >
            
                                {place?.photos?.length > 0 ? (
                                    <PlaceImg place={place} index={0} className="rounded-xl w-48 h-48 object-cover" />
                                ) : (
                                    <p className="text-gray-500">No image available</p>
                                )}
                                <div className="flex-1">
                                    <h3 className="text-2xl font-bold mb-2">{place?.title || 'Unknown Place'}</h3>
                                    <p className="text-gray-600 mb-2">
                                        <span className="flex items-center gap-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                                            </svg>
                                            {format(new Date(booking.checkIn), 'MMM dd, yyyy')}
                                        </span>
                                        <span className="mx-2">→</span>
                                        <span className="flex items-center gap-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                                            </svg>
                                            {format(new Date(booking.checkOut), 'MMM dd, yyyy')}
                                        </span>
                                    </p>
                                    <p className="text-gray-700 mt-1">Guests: {booking.numberOfGuests}</p>
                                    <div className="text-gray-800 mt-3 flex items-center gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                                        </svg>
                                        {differenceInCalendarDays(new Date(booking.checkOut), new Date(booking.checkIn))} nights
                                    </div>
                                    <div className="text-xl font-semibold mt-4 flex items-center gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 19.5a.75.75 0 0 1 0 1.5H3a.75.75 0 0 1 0-1.5h18ZM3 4.5a.75.75 0 0 1 0-1.5h18a.75.75 0 0 1 0 1.5H3ZM4.5 18.75A.75.75 0 0 1 3 18a9.75 9.75 0 0 1 9-9.75v2.4a7.35 7.35 0 1 0 0 14.7v2.4a9.75 9.75 0 0 1-9-9.75Z" />
                                        </svg>
                                        Total: ₹{booking.price}
                                    </div>
                                </div>
                            </Link>
                        );
                    })
                ) : (
                    <p className="text-center text-gray-500">No bookings found</p>
                )}
            </div>
        </div>
    );
}
