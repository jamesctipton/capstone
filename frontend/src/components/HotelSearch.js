import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DestinationSearch from "./DestinationSearch";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import {
    FormControl,
    OutlinedInput,
    IconButton,
    Typography,
    InputLabel,
    Select,
    MenuItem,
    Divider,
    Button,
    TextField,
    Grid
} from '@mui/material';
import { Box } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

const search_url = 'http://127.0.0.1:5000/search-'
const create_poll_url = 'http://127.0.0.1:5000/create-poll'

const HotelSearch = () => {
     
    //error handling
    const [errorValue, setError] = useState({
        message: "",
        result: false
    })

    //variables that will change based on user input
    const [selectedCity, setSelectedCity] = useState({
        name: "",
        country: "",
        latitude: 0,
        longitude: 0
    })
    const [input, setInput] = useState("")

    const [cityRows, setCityRows] = useState([])
    const [hotelRows, setHotelRows] = useState([])

    const [selectedHotels, setSelectedHotels] = useState([])
    const [persistentHotels, setPersistentHotels] = useState([])
    const [pollNameValue, setPollName] = useState("")
    const [groupValue, setGroupValue] = useState("")
    const [arrivalDate, setArrivalDate] = useState("")
    const [returnDate, setReturnDate] = useState("")

    //constant variables for component
    const navigate = useNavigate()
    const navigateToCreateGroup = () => {
        navigate('/join-create')
    }
    const user = JSON.parse(localStorage.getItem('user'))

    const cityColumns = [
        {
            field: 'name',
            headerName: 'Name',
            minWidth: 260,
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
        {
            field: 'latitude',
            headerName: 'Latitude',
            type: 'number',
            minWidth: 120,
            flex: 0.2
        },
        {
            field: 'longitude',
            headerName: 'Longitude',
            type: 'number',
            minWidth: 120,
            flex: 0.2
        },
        {
            field: 'searchCityButton',
            headerName: '',
            minWidth: 150,
            flex: 0.2,
            renderCell: (params) => {
                const onClick = (e) => {
                    let stateCode
                    if(params.row['stateCode'] === undefined) {
                        stateCode = ""
                    } else {
                        stateCode = params.row['stateCode']
                    }
                    searchHotels(params.row['name'], params.row['countryCode'], stateCode, params.row['latitude'], params.row['longitude'], 15, arrivalDate.toString(), returnDate.toString())
                }
                return (
                    <Grid container justifyContent="flex-end">
                        <Button sx={{ fontSize: 12 }} onClick={() => onClick()}>Search Hotels</Button>
                    </Grid>

                )
            }
        }
    ]

    const hotelColumns = [
        {
            field: 'name',
            headerName: 'Name',
            minWidth: 260,
            flex: 0.4
        },
        {
            field: 'URL',
            headerName: 'Website',
            renderCell: (params) =>
                <a href={params.row.URL + '~hotel'} target="blank">{params.row.URL}</a>,
            minWidth: 200,
            flex: 0.4
        },
        {
            field: 'distance.value',
            headerName: 'Distance from City',
            type: 'number',
            minWidth: 120,
            flex: 0.2
        },
        {
            field: 'price',
            headerName: 'Price per Night',
            type: 'number',
            minWidth: 150,
            flex: 0.2
        }
    ]

    const searchCities = (dest) => {
        if(dest.length < 3) {
            setError({ message: "Please enter more than 3 characters to search for a city", result: true })
        } else {
            setError({ message: "", result: false })
            axios.post(search_url+'destinations', {
                keyword: dest
            }).then((response) => {
                const results = response['data']['destinations']
                if(results.length === 0){
                    setError({ message: "No results found.", result: true })
                }

                let temp_array = []
                for(let i = 0; i < results.length; i++){
                    results[i].id = results[i].name + i.toString()
                    temp_array.push(results[i])
                }
                setCityRows(temp_array)
            }).catch((error) => {
                setError({ message: error, result: true })
            })
        }
    }

    const searchHotels = (name, country, state, latitude, longitude, radius, start, end) => {
        console.log(name, country, state, latitude, longitude, radius, start, end)
        setSelectedHotels([])
        setError({ message: "", result: false})
        axios.post(search_url+'hotels', {
            city: name,
            country: country,
            state: state,
            latitude: latitude,
            longitude: longitude,
            radius: radius,
            startDate: start,
            endDate: end
        }).then((response) => {
            console.log(response)
            const results = response['data']['hotels']
            let temp_array = []
            for(let i = 0; i < results.length; i++) {
                results[i].id = results[i].name + i.toString()
                temp_array.push(results[i])
            }
            setHotelRows(temp_array)
        }).catch((error) => {
            console.log(error)
        })
    }

    const createHotelPoll = (name, country, state) => {
        axios.post(create_poll_url, {
            test: name
        }).then((response) => {
            console.log(response)
        }).catch((error) => {
            console.log(error)
        })
    }

    return (
            //search cities first
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '90%', marginTop: '2%' }}>
                <div style={{ display: 'flex', justifyContent: 'center', width: '80%' }}>
                    <FormControl fullWidth>
                        <OutlinedInput 
                            placeholder="Search Destination"
                            variant="outlined" 
                            sx={{borderWidth: 3, borderRadius: 30, whiteSpace: 'nowrap', minWidth: 334}} 
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            fullWidth
                            endAdornment={
                                <IconButton aria-label='search' onClick={() => searchCities(input)} onMouseDown={() => {}} edge="end">
                                    <SearchOutlinedIcon fontSize="large" color="primary"/>
                                </IconButton>}>
                        </OutlinedInput>
                    </FormControl>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '2%', width: '80%'}}>
                    <DesktopDatePicker 
                        label="Arrival Date"
                        inputFormat="MM/DD/YYYY"
                        value={arrivalDate}
                        onChange={setArrivalDate}
                        renderInput={(params) =>
                            <TextField {...params}
                                error={false}
                                sx={{
                                    input: { color: '#CF7D30'}, 
                                    svg: { color: '#CF7D30'}, 
                                    label: { color: '#CF7D30'},
                                    width: '40%',
                                }}
                        />}
                    />
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
                                    width: '40%',
                                }}
                        />}
                    />
                </div>
                {hotelRows.length === 0 ? 
                    <Box width='100%' height={1000} marginTop='2%'>
                        {cityRows.length > 0 ?
                            <DataGrid
                                rows={cityRows}
                                columns={cityColumns}
                                pageSize={20}
                                rowsPerPageOptions={[20]}
                            />
                        : <></>}
                        
                    </Box>
                    : 
                    <Box width='100%' height={1000} marginTop='2%'>
                        {hotelRows.length > 0 ?
                            <DataGrid 
                                rows={hotelRows}
                                columns={hotelColumns}
                                pageSize={20}
                                rowsPerPageOptions={[20]}
                                checkboxSelection
                                isRowSelectable={(p) => (persistentHotels.length) < 5 || !(selectedHotels.indexOf(p.row) === -1)}
                                onSelectionModelChange={(ids) => {
                                    let temp = ids.map((id) => hotelRows.find((row) => row.id === id))
                                    let t2 = selectedHotels
                                    setSelectedHotels(temp)
                                    if(persistentHotels.length === 0) {
                                        setPersistentHotels(temp)
                                    }
                                    let current = persistentHotels
                                    let x = temp.filter(n => !selectedHotels.includes(n))
                                    if(x[0] != undefined) {
                                        current.push(x[0])
                                    }
                                    // for deletions
                                    if((temp.length < t2.length) && temp.length > 0) {
                                        let remove = t2[t2.length - 1]
                                        let j = current.findIndex((y) => y === remove)
                                        current.splice(j, 1)
                                    }
                                    if(temp.length === 0 && t2.length === 1) {
                                        if(current.length === 1)
                                            current = []
                                        else {
                                            current.pop()
                                        }
                                    }
                                    setPersistentHotels(current)
                                }}
                            />
                        :<></>}
                        
                    </Box>               
                }
            </div>
    )
}
export default HotelSearch