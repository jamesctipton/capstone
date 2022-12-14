import axios from "axios";
import React, { useState } from "react";
import { 
    Typography,
    FormControl,
    TextField,
    Button,
    OutlinedInput,
    IconButton,
    Box
} from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { useNavigate } from "react-router-dom";
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

const search_url = 'http://127.0.0.1:5000/search-'
const create_poll_url = 'http://127.0.0.1:5000/create-poll'

const FlightSearch = () => {

    //error handling 
    const [errorValue, setError] = useState({
        message: "",
        result: false
    })

    //variables that will change based on user input
    const [to, setTo] = useState("")
    const [from, setFrom] = useState("")
    const [fromRows, setFromRows] = useState([])
    const [destRows, setDestRows] = useState([])
    const [flightRows, setFlightRows] = useState([])
    const [selectedDeparture, setSelectedDeparture] = useState([])
    const [selectedArrival, setSelectedArrival] = useState([])   
    const [pollNameValue, setPollName] = useState("")
    const [groupValue, setGroupValue] = useState("")
    const [departDate, setDepartDate] = useState("")
    const [returnDate, setReturnDate] = useState("")


    //constant variables for component
    const navigate = useNavigate()
    const navigateToCreateGroup = () => {
        navigate('/join-create')
    }
    const user = JSON.parse(localStorage.getItem('user'))
    const columns = [
        {
            field: 'name',
            headerName: 'Name',
            minWidth: 220,
            flex: 0.4
        },
        {
            field: 'countryCode',
            headerName: 'Country',
            minWidth: 100,
            flex: 0.10
        },
        {
            field: 'stateCode',
            headerName: 'State',
            minWidth: 100,
            flex: 0.10
        },

    ]
    const flightColumns = [
        {
            field: 'price',
            headerName: 'Price',
            minWidth: 100,
            flex: 0.1,
            valueFormatter: ({ value }) => `$${value}`
        },
        {
            field: 'departingAP',
            headerName: 'Departing Airport',
            minWidth: 200,
            flex: 0.1
        },
        {
            field: 'departingLength',
            headerName: 'Departing Flight Time',
            minWidth: 100,
            flex: 0.2
        },
        {
            field: 'departingLO',
            headerName: 'Departing Layovers',
            minWidth: 150,
            flex: 0.1
        },
        {
            field: 'arrivingAP',
            headerName: 'Arrival Airport',
            minWidth: 200,
            flex: 0.1,
        },
        {
            field: 'returningLength',
            headerName: 'Return Flight Time',
            minWidth: 100,
            flex: 0.2
        },
        
        {
            field: 'arrivingLO',
            headerName: 'Returning Layovers',
            minWidth: 150,
            flex: 0.1
        }
    ]

    setTimeout(() => {
        if(document.querySelectorAll('.MuiDataGrid-root .MuiDataGrid-columnHeaderCheckbox .MuiDataGrid-columnHeaderTitleContainer')[1] != null) {
            if(selectedDeparture.length === 0 || selectedArrival.length === 0) {
                document.querySelectorAll('.MuiDataGrid-root .MuiDataGrid-columnHeaderCheckbox .MuiDataGrid-columnHeaderTitleContainer')[0].style.display = 'none';
                document.querySelectorAll('.MuiDataGrid-root .MuiDataGrid-columnHeaderCheckbox .MuiDataGrid-columnHeaderTitleContainer')[1].style.display = 'none';
            }
            else {
                document.querySelectorAll('.MuiDataGrid-root .MuiDataGrid-columnHeaderCheckbox .MuiDataGrid-columnHeaderTitleContainer')[0].style = {display: 'hidden'};
                document.querySelectorAll('.MuiDataGrid-root .MuiDataGrid-columnHeaderCheckbox .MuiDataGrid-columnHeaderTitleContainer')[1].style = {display: 'hidden'};
            }
        }
    }, [100]);

    const searchDestination = (dest, from) => {
        if(dest === "") {
            setError({ message: "Please enter a destination", result: true })
        } else {
            setError({ message: "", result: false })
            axios.post(search_url+'destinations', {
                keyword: dest
            }).then((response) => {
                const results = response['data']['destinations']
                let temp_array = []
                for(let i = 0; i < results.length; i++) {
                    results[i].id = results[i].name + i.toString()
                    temp_array.push(results[i])
                }
                if(from) {
                    setFromRows(temp_array)
                } else {
                    setDestRows(temp_array)
                }
                if(results.length === 0) {
                    setError({message: "No results found.", result: true})
                }
            }).catch((error) => {
                setError({ message: error, result: true })
            })
        }
    }

    const createPoll = (group, pollName, destinations) => {
        console.log(group, pollName, destinations)
        axios.post(create_poll_url, {
            pollname: pollName,
            user: user.name,
            groupid: group,
            options: destinations,
            category: 'flight'
        }).then((response) => {
            console.log(response)
        }).catch((error) => {
            setError({ message: error, result: true })
        })
    }

    const searchFlights = (startDate, endDate, srcLat, srcLong, destLat, destLong) => {
        setFlightRows([])
        console.log(startDate, endDate, srcLat, srcLong, destLat, destLong)
        axios.post(search_url+'flights', {
            src_latitude: srcLat,
            src_longitude: srcLong,
            dst_latitude: destLat,
            dst_longitude: destLong,
            begin_date: startDate,
            end_date: endDate
        }).then((response) => {
            const results = response['data']['flights']
            let temp_array = []
            let temp_itinerary = {
                id: "",
                price: 0,
                departingAP: "",
                arrivingAP: "",
                departingLO: 0,
                arrivingLO: 0,
                departingLength: "",
                returningLength: ""
            }
            for(let i=0; i < results.length; i++) {
                results[i].id = results[i].price + i.toString()
                temp_itinerary = {
                    id: results[i].price + i.toString(),
                    price: results[i].price,
                    departingAP: results[i].itineraries[0].segments[0].departure.iataCode,
                    arrivingAP: results[i].itineraries[1].segments[0].departure.iataCode,
                    departingLO: results[i].itineraries[0].segments.length - 1,
                    arrivingLO: results[i].itineraries[1].segments.length - 1,
                    departingLength: results[i].itineraries[0].duration.slice(2),
                    returningLength: results[i].itineraries[1].duration.slice(2)
                }
                temp_array.push(temp_itinerary)
            }
            setFlightRows(temp_array)
        }).catch((error) => {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                // console.log(error.response.data);
                // console.log(error.response.status);
                // console.log(error.response.headers);
                alert("Request to server failed.");
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the 
                // browser and an instance of
                // http.ClientRequest in node.js
                alert("Server time out.");
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
            }
            // console.log = console.warn = console.error = () => {};
        })
    }

    return (
        <div id='outer-container' style={{ width: '90%'}}>
            <div id='search-container' style={{ width: '100%', display: 'flex', marginTop: '2%', marginBottom: '2%', justifyContent: 'center' }}>
                <div id='start-search' flex={0.5} style={{ display: 'flex', justifyContent: 'flex-start', flexDirection: 'column', width: '80%' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
                        <Typography color="primary" sx={{ marginBottom: 1, textAlign: 'center' }}>Departure Location</Typography>
                        <FormControl fullWidth sx={{ marginBottom: 2 }}>
                            <OutlinedInput 
                                placeholder="Where from?"
                                variant="outlined" 
                                sx={{borderWidth: 3, borderRadius: 30, whiteSpace: 'nowrap', minWidth: 334}} 
                                value={from}
                                onChange={(e) => setFrom(e.target.value)}
                                fullWidth
                                onKeyPress={event => {
                                    if (event.key === 'Enter') {
                                        searchDestination(from, true)
                                    }
                                    }}
                                endAdornment={
                                <IconButton aria-label='search' onClick={() => searchDestination(from, true)} onMouseDown={() => {}} edge="end">
                                    <SearchOutlinedIcon fontSize="large" color="primary"/>
                                </IconButton>}>
                            </OutlinedInput>
                        </FormControl>
                    </div>
                    <DesktopDatePicker
                        label="Departure Date"
                        inputFormat="MM/DD/YYYY"
                        value={departDate}
                        onChange={setDepartDate}
                        renderInput={(params) => 
                            <TextField {...params}
                                error={false} 
                                sx={{ 
                                    input: { color: '#CF7D30'}, 
                                    svg: { color: '#CF7D30'}, 
                                    label: { color: '#CF7D30'},
                                    width: '80%',
                                }} 
                            />}
                        disablePast
                    />
                </div>
                <div flex={0.1}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="93" viewBox="0 0 275 93" fill="none">
                        <g filter="url(#filter0_d_462_291)">
                        <path d="M206.832 68.135L212.463 73.3822L233.159 62.0905L240.304 66.3881C241.832 67.3099 243.588 67.893 245.447 68.0956C247.306 68.2983 249.221 68.1157 251.058 67.5606C252.189 67.2202 253.186 66.5322 253.874 65.6165C254.561 64.7009 254.897 63.6155 254.822 62.5492C254.703 60.8181 254.168 59.1618 253.257 57.6983C252.345 56.2348 251.078 55.0001 249.547 54.082L242.402 49.7845L246.27 28.3718L238.714 25.6875L229.391 42.0196L220.797 37.9302L222.948 29.1516L216.364 25.1916L197.878 49.8036L204.462 53.7637L212.734 48.6658L220.211 54.2428L206.832 68.135ZM204.685 49.4316L203.355 48.6313L217.219 30.1723L218.55 30.9725L216.337 40.0032L227.711 45.4152L230.712 47.2201L240.394 30.2588L241.908 30.7967L238.135 51.6841L247.237 57.1585C248.303 57.7979 249.185 58.6579 249.82 59.6772C250.455 60.6965 250.827 61.8501 250.91 63.0557C250.926 63.2839 250.854 63.5162 250.707 63.7121C250.56 63.9081 250.347 64.0553 250.105 64.1281C248.826 64.5146 247.491 64.6419 246.197 64.5007C244.902 64.3596 243.679 63.9536 242.615 63.3116L233.513 57.8371L213.324 68.8519L212.196 67.8005L226.091 53.3731L223.09 51.5682L213.194 44.1876L204.685 49.4316Z" fill="#747474"/>
                        <line y1="-4" x2="32.7442" y2="-4" transform="matrix(0.883757 0.467947 -0.551573 0.834127 174.18 21.0146)" stroke="#747474" strokeWidth="8"/>
                        <line y1="-4" x2="33.453" y2="-4" transform="matrix(0.979139 0.203191 -0.250872 0.96802 130.318 8.23584)" stroke="#747474" strokeWidth="8"/>
                        <line y1="-4" x2="33.4738" y2="-4" transform="matrix(0.981712 -0.19037 0.235367 0.971907 82.9688 14.3726)" stroke="#747474" strokeWidth="8"/>
                        <line y1="-4" x2="32.4327" y2="-4" transform="matrix(0.836207 -0.548414 0.633633 0.773634 42.6582 37.0273)" stroke="#747474" strokeWidth="8"/>
                        <line y1="-4" x2="31.8118" y2="-4" transform="matrix(0.727317 -0.686302 0.762467 0.647027 11 67.7954)" stroke="#747474" strokeWidth="8"/>
                        </g>
                        <defs>
                        <filter id="filter0_d_462_291" x="0.900391" y="0.225098" width="257.932" height="81.1572" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                        <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                        <feOffset dy="4"/>
                        <feGaussianBlur stdDeviation="2"/>
                        <feComposite in2="hardAlpha" operator="out"/>
                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_462_291"/>
                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_462_291" result="shape"/>
                        </filter>
                        </defs>
                    </svg>
                </div>
                <div id='dest-search' flex={0.5} style={{ display: 'flex', justifyContent: 'flex-end', flexDirection: 'column', width: '80%' }}>
                    <div style={{ display: 'flex', justifyContent: 'flex-start', flexDirection: 'column', width: '100%' }}>
                        <Typography color="primary" sx={{ marginBottom: 1, textAlign: 'center' }}>Arrival Location</Typography>
                        <FormControl fullWidth sx={{ marginBottom: 2 }}>
                            <OutlinedInput 
                                placeholder="Where to?"
                                variant="outlined" 
                                sx={{borderWidth: 3, borderRadius: 30, whiteSpace: 'nowrap', minWidth: 334}} 
                                value={to}
                                onChange={(e) => setTo(e.target.value)}
                                fullWidth
                                onKeyPress={event => {
                                    if (event.key === 'Enter') {
                                        searchDestination(to, false)
                                    }
                                    }}
                                endAdornment={
                                <IconButton aria-label='search' onClick={() => searchDestination(to, false)} onMouseDown={() => {}} edge="end">
                                    <SearchOutlinedIcon fontSize="large" color="primary"/>
                                </IconButton>}>
                            </OutlinedInput>
                        </FormControl>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'flex-end'}}>
                        <DesktopDatePicker
                            label="Return Date"
                            inputFormat="MM/DD/YYYY"
                            value={returnDate}
                            onChange={setReturnDate}
                            renderInput={(params) => 
                                <TextField {...params}
                                    error={false} 
                                    sx={{ 
                                        input: { color: '#CF7D30'}, 
                                        svg: { color: '#CF7D30'}, 
                                        label: { color: '#CF7D30'},
                                        width: '80%',
                                    }} 
                                />}
                            disablePast
                        />
                    </div>
                </div>
            </div>
            { errorValue.result ? 
                        <Box sx={{ border: '3px solid red', background: 'rgba(255, 0, 0, 0.1)', color: 'red', padding: 2 }}>
                            <Typography>{errorValue.message}</Typography>
            </Box> : <></> }
            {flightRows.length === 0 ? 
            <div id='results-container' style={{ width: '100%', display: 'flex', marginTop: '2%', marginBottom: '2%', justifyContent: 'space-between' }}>               
                <div id='start-flight-results' style={{ width: '48%', display: 'flex', justifyContent: 'flex-start', flexDirection: 'column', height: 475 }}>
                    {fromRows.length > 0 ?
                        <DataGrid
                            rows={fromRows}
                            columns={columns}
                            pageSize={7}
                            rowsPerPageOptions={[7]}
                            checkboxSelection
                            isRowSelectable={(p) => (selectedDeparture < 2 || !(selectedDeparture.indexOf(p.row) === -1))}
                            onSelectionModelChange={(ids) => {
                                let temp = ids.map((id) => fromRows.find((row) => row.id === id))
                                setSelectedDeparture(temp)
                            }}
                        />
                    :<></>}
                    
                </div>
                <div id='end-flight-results' style={{ width: '48%', display: 'flex', justifyContent: 'flex-end', flexDirection: 'column', height: 475 }}>
                    {destRows.length > 0 ?
                        <DataGrid
                            rows={destRows}
                            columns={columns}
                            pageSize={7}
                            rowsPerPageOptions={[7]}
                            checkboxSelection
                            isRowSelectable={(p) => (selectedArrival < 2) || !(selectedArrival.indexOf(p.row) === -1)}
                            onSelectionModelChange={(ids) => {
                                let temp = ids.map((id) => destRows.find((row) => row.id === id))
                                setSelectedArrival(temp)
                            }}
                        />
                    :<></>}
                    
                </div>
            </div>
            : 
                <div style={{ width: '100%', display: 'flex', marginTop: '2%', marginBottom: '2%', justifyContent: 'space-between', height: 475 }}>
                    <DataGrid
                        rows={flightRows}
                        columns={flightColumns}
                        pageSize={7}
                        rowsPerPageOptions={[7]}
                        checkboxSelection
                    />
                </div>
            }
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Button 
                type='button'
                variant="outlined"
                sx={{ m: 1, borderWidth: 3, borderRadius: 30, borderColor: 'primary', whiteSpace: 'nowrap', minWidth: 'maxcontent', '&:hover': { borderWidth: 3 }, width: 200, height: 50, fontSize: 20 }}
                disabled={(from === "" || to === "" || departDate === "" || returnDate === "" || selectedDeparture.lenght === 0 || selectedArrival.length === 0 )}
                onClick={() => searchFlights(departDate.toString(), returnDate.toString(), selectedDeparture[0].latitude, selectedDeparture[0].longitude, selectedArrival[0].latitude, selectedArrival[0].longitude)}
            >Search Flights</Button>
            </div>
        </div>
    )
}

export default FlightSearch