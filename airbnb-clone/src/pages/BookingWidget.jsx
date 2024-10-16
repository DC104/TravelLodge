/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import { differenceInCalendarDays } from 'date-fns';
import axios from "axios";
import { Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";
export default function BookingWidget({ place }) {
    const [checkIn , setCheckIn] = useState('');
    const [checkOut , setCheckOut] = useState('');
    const [numberOfGuests , setNumberOfGuests] = useState(1);
    const [name , setName] = useState('');
    const [phone , setPhone] = useState('');
     const [redirect , setRedirect] = useState('');
    const {user} = useContext(UserContext);

    useEffect (() => {
        if(user){
        setName(user.name);    
        }
    } , [user]);

    let numberOfNights = 0;
    if(checkIn && checkOut){
       numberOfNights = differenceInCalendarDays(new Date (checkOut) , new Date(checkIn));
    }

   async function bookThisPlace(){
 const response =    await  axios.post('/booking' , {
       checkIn , checkOut , numberOfGuests, name, phone,
            place: place._id,
            price: numberOfNights*place.price,
        
        });
       const bookingId = response.data._id;
       setRedirect (`/account/booking/${bookingId}`);
    }
    
   if(redirect){
    return <Navigate to={redirect}/>
   }

    return (
        <div className="bg-gray-100 shadow-lg p-6 rounded-xl">
            <div className="text-2xl text-center mb-4">
                Price: ${place.price} / Per night
            </div>
            <div className="border rounded-xl p-4 bg-white">
                <div className="flex gap-4">
                    <div className="flex-1">
                        <label className="block text-sm font-semibold mb-1">Check-in:</label>
                        <input  
                        value={checkIn} onChange={ev =>setCheckIn(ev.target.value)}
                            type="date"
                            className="w-full border rounded-md p-2"
                        />
                    </div>
                    <div className="flex-1">
                        <label className="block text-sm font-semibold mb-1">Check-out:</label>
                        <input 
                        value={checkOut} onChange={ev =>setCheckOut(ev.target.value)}
                            type="date"
                            className="w-full border rounded-md p-2"
                        />
                    </div>
                </div>
            </div>
            <div className="mt-4">
                <label className="block text-sm font-semibold mb-1">Number of Guests:</label>
                <input
                    type="number" 
                    value={numberOfGuests} onChange={ev=>setNumberOfGuests(ev.target.value)}
                    min="1"
                    defaultValue="1"
                    className="w-full border rounded-md p-2"
                />
            </div>
            {numberOfNights > 0 && (
                <div className="py-3 px-4 border-t">
                    <label>Your Full Name:</label>
                   <input type="text"
                    value={name} onChange={ev=>setName(ev.target.value)}
                    placeholder="John Doe"></input>

                    <label>Phone Number: </label>
                   <input type="telePhone"
                    value={phone} onChange={ev=>setPhone(ev.target.value)}
                    placeholder="Phone"></input>
                </div>
            )}
            <button onClick={bookThisPlace} className="w-full mt-6 bg-primary text-white py-3 rounded-xl shadow-md hover:bg-primary transition duration-200">
                Book This Place
               { numberOfNights >  0 && (
                  <>
                  <span>
                    ${numberOfNights + place.price}
                  </span>
                  </>
               )}
            </button>
        </div>
    );
}