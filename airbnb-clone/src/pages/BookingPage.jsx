/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
export default function BookingPage(){
    const {id} = useParams();
    const [booking , setBooking] = useState()
    useEffect(() => {
        if(id){
        axios.get('/bookings' ).then(response => {
           const foundBooking = response.data.find(({_id}) => _id === id);
    
        });
        if(foundBooking){
            setBooking(foundBooking);
        }
        }
    }, [id] )
    if(!booking){
        return '';
    }
    return(
     <div>
        Hi
     </div>
    );
}