import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DestinationSearch from "./DestinationSearch";

const search_url = 'http://127.0.0.1:5000/search-'
const create_poll_url = 'http://127.0.0.1:5000/create-poll'

const HotelSearch = () => {
     
    //error handling
    const [errorValue, setError] = useState({
        message: "",
        result: false
    })

    //variables that will change based on user input
    const [input, setInput] = useState("")
    const [rows, setRows] = useState([])
    const [selectedHotels, setSelectedHotels] = useState([])
    const [pollNameValue, setPollName] = useState("")
    const [groupValue, setGroupValue] = useState("")

    const navigate = useNavigate()
    const navigateToCreateGroup = () => {
        navigate('/join-create')
    }
    const user = JSON.parse(localStorage.getItem('user'))
    //hotel name, latitude, longitude, distance (mi) from city searched
    

    const searchHotels = (city) => {
        if(city === "") {
            setError({ message: "Please enter a destination city", result: true})
        } else {
            setError({ message: "", result: false})
            axios.post(search_url+'hotels', {
                //test
            })
        }
    }

    return (
            <DestinationSearch hotelSearch={true} />
    )
}
export default HotelSearch