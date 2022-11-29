import axios from "axios";
import React, { useState } from "react";
import { Form, useNavigate } from "react-router-dom";
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
} from '@mui/material';
import { Box } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";

const search_url = 'http://127.0.0.1:5000/search-'
const create_poll_url = 'http://127.0.0.1:5000/create-poll'

const HotelSearch = () => {
     
    //error handling
    const [errorValue, setError] = useState({
        message: "",
        result: false
    })

    //variables that will change based on user input
    const [selectedCity, setSetSelectedCity] = useState({
        name: "",
        country: "",
        latitude: 0,
        longitude: 0
    })
    const [rows, setRows] = useState([])
    const [selectedHotels, setSelectedHotels] = useState([])
    const [persistentHotels, setPersistentHotels] = useState([])
    const [pollNameValue, setPollName] = useState("")
    const [groupValue, setGroupValue] = useState("")

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
            minWidth: 260,
            flex: 0.4
        },
        {
            field: 'URL',
            headerName: 'Website',
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
        }
    ]

    const searchHotels = () => {
        setError({ message: "", result: false})
        axios.post(search_url+'hotels', {
            latitude: selectedCity.latitude,
            longitude: selectedCity.longitude,
            radius: 15,
            city: selectedCity.name,
            state: "",
            country: selectedCity.country
        }).then((response) => {
            console.log(response)
            const results = response['data']['hotels']
            let temp_array = []
            for(let i = 0; i < results.length; i++) {
                results[i].id = results[i].name + i.toString()
                temp_array.push(results[i])
            }
            setRows(temp_array)
        }).catch((error) => {
            console.log(error)
        })
    }

    const initializeTable = (city_params) => {
        console.log(city_params)
        setSetSelectedCity(city_params)
        searchHotels()
    }

    return (
            //if dont have city, destination search
            <>
                {!selectedCity.name ? 
                    <DestinationSearch hotelSearch={true} setDestination={initializeTable} />
                    : 
                    <div style={{ width: '90%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <div style={{width: '80%', marginTop: '2%', marginBottom: '2%'}}>
                            <FormControl fullWidth>
                                <OutlinedInput 
                                    placeholder="Search Destination"
                                    variant="outlined" 
                                    sx={{borderWidth: 3, borderRadius: 30, whiteSpace: 'nowrap', minWidth: 334}} 
                                    //value={input}
                                    //onChange={(e) => setInput(e.target.value)}
                                    fullWidth
                                    endAdornment={
                                        <IconButton aria-label='search' onClick={() => {}} onMouseDown={() => {}} edge="end">
                                            <SearchOutlinedIcon fontSize="large" color="primary"/>
                                        </IconButton>}>
                                </OutlinedInput>
                            </FormControl>
                        </div> 
                        { errorValue.result ? 
                            <Box sx={{ border: '3px solid red', background: 'rgba(255, 0, 0, 0.1)', color: 'red', padding: 2 }}>
                                <Typography>{errorValue.message}</Typography>
                            </Box> : <></>}
                        <div style={{ display: 'flex', justifyContent: 'flex-start', gap: 10, marginBottom: 8}}>
                            {persistentHotels.map((hotel, i) => {
                                return (
                                    <Box key={i} sx={{ border: '2px solid orange', borderRadius: 5, background: 'rgba(207, 125, 48, 0.21)', padding: 1 }}>
                                        <Typography color='primary'>{hotel['name']}</Typography>
                                    </Box>
                                )
                            })}
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', width: '85%', justifyContent: 'space-between' }}>
                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, minWidth: 'max-content'}}>
                                <FormControl fullWidth>
                                    <InputLabel id="select-label">Group</InputLabel>
                                    <Select
                                        id="group"
                                        labelId="select-group"
                                        //value={}
                                        label="Group"
                                        onChange={(e) => {}}
                                        variant="outlined"
                                        sx={{ minWidth: '100px' }}
                                        autoWidth
                                    >
                                        {user.groups.length > 0 ?
                                            user.groups.map((g) => {
                                                return (
                                                    <MenuItem value={g.group_id}>{g.name}</MenuItem>
                                                )
                                            }) : <MenuItem>No groups available</MenuItem>}
                                        <Divider orientation="horizontal"  variant="middle" flexItem sx={{ background: 'rgba(162, 162, 162, 0.86)', width: '80%'}}></Divider>
                                        <Button sx={{ marginLeft: '12%' }} onClick={() => {}}>Create Group</Button>
                                    </Select>
                                </FormControl>
                                <TextField id='poll_name' label='Poll Name' variant="outlined" onChange={() => {}} sx={{ minWidth: 'max-content'}}></TextField>
                                <Button 
                                    disabled={(!(user || selectedHotels.length > 5) && (selectedHotels.length === 1 || selectedHotels.length === 0)) /*|| (groupValue === "" || pollNameValue === "")*/}
                                    sx={{ border: '2px solid orange', borderRadius: 1, padding: 1, whiteSpace: 'no-wrap', minWidth: 'max-content' }} 
                                    onClick={() => searchHotels()}
                                >
                                    Add Poll
                                </Button>
                            </div>
                        </div>
                        <Box sx={{ height: 1152, width: '100%', marginTop: '2%' }}>
                            <DataGrid 
                                rows={rows}
                                columns={columns}
                                pageSize={20}
                                rowsPerPageOptions={[20]}
                                checkboxSelection
                                isRowSelectable={(p) => (persistentHotels.length) < 5 || !(selectedHotels.indexOf(p.row) === -1)}

                            />
                        </Box>
                    </div>
                }
            </>
            
    )
}
export default HotelSearch