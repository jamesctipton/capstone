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
} from '@mui/material';
import { Box } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";

const search_url = 'http://127.0.0.1:5000/search-'
const create_poll_url = 'http://127.0.0.1:5000/create-poll'

const POISearch = () => {
     
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
    const [rows, setRows] = useState([])
    const [selectedPOIs, setSelectedPOIs] = useState([])
    const [persistentPOIs, setPersistentPOIs] = useState([])
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
            field: 'category',
            headerName: 'Category',
            minWidth: 200,
            flex: 0.4
        },
        {
            field: 'URL',
            headerName: 'Website',
            renderCell: (params) =>
                <a href={params.row.URL} target="blank">{params.row.URL}</a>,
            minWidth: 200,
            flex: 0.4
        },
    ]

    const searchPOIS = (lat, long, cityName, country, state, radius) => {
        setError({ message: "", result: false})
        axios.post(search_url+'pois', {
            latitude: lat,
            longitude: long,
            radius: radius,
            city: cityName,
            state: state,
            country: country
        }).then((response) => {
            const results = response['data']['pois']
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
        setSelectedCity({
            name: city_params.name,
            country: city_params.country,
            latitude: city_params.latitude,
            longitude: city_params.longitude
        })
        searchPOIS(city_params.latitude, city_params.longitude, city_params.name, city_params.country, city_params.state, city_params.radius)
    }

    return (
            //if dont have city, destination search
            <>
                {!selectedCity.name ? 
                    <DestinationSearch type={'poi'} setDestination={initializeTable} />
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
                            {persistentPOIs.map((hotel, i) => {
                                return (
                                    <Box key={i} sx={{ border: '2px solid orange', borderRadius: 5, background: 'rgba(207, 125, 48, 0.21)', padding: 1 }}>
                                        <Button
                                    color='primary'
                                    onClick={() => {
                                        let temp = persistentPOIs.splice(i,1)
                                        setPersistentPOIs(persistentPOIs.filter(n => !temp.includes(n)))
                                    }}
                                >X {hotel['name']}</Button>
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
                                            user.groups.map((g, i) => {
                                                return (
                                                    <MenuItem key={i} value={g.group_id}>{g.name}</MenuItem>
                                                )
                                            }) : <MenuItem>No groups available</MenuItem>}
                                        <Divider orientation="horizontal"  variant="middle" flexItem sx={{ background: 'rgba(162, 162, 162, 0.86)', width: '80%'}}></Divider>
                                        <Button sx={{ marginLeft: '12%' }} onClick={() => {}}>Create Group</Button>
                                    </Select>
                                </FormControl>
                                <TextField id='poll_name' label='Poll Name' variant="outlined" onChange={() => {}} sx={{ minWidth: 'max-content'}}></TextField>
                                <Button 
                                    disabled={(!(user || selectedPOIs.length > 5) && (selectedPOIs.length === 1 || selectedPOIs.length === 0)) /*|| (groupValue === "" || pollNameValue === "")*/}
                                    sx={{ border: '2px solid orange', borderRadius: 1, padding: 1, whiteSpace: 'no-wrap', minWidth: 'max-content' }} 
                                    onClick={() => {}}
                                >
                                    Add Poll
                                </Button>
                            </div>
                        </div>
                        <div style={{ width: '100%', flexDirection: 'row',justifyContent: 'flex-end', marginTop: '2%' }}>
                            <Typography variant="h4" sx={{ color: '#CF7D30' }}>{selectedCity.name + ', ' + selectedCity.country}</Typography>
                        </div>
                        <Box sx={{ height: 1152, width: '100%', marginTop: '2%' }}>
                            <DataGrid 
                                rows={rows}
                                columns={columns}
                                pageSize={20}
                                rowsPerPageOptions={[20]}
                                checkboxSelection
                                isRowSelectable={(p) => (persistentPOIs.length) < 5 || !(selectedPOIs.indexOf(p.row) === -1)}
                                onSelectionModelChange={(ids) => {
                                    let temp = ids.map((id) => rows.find((row) => row.id === id))
                                    let t2 = selectedPOIs
                                    setSelectedPOIs(temp)
                                    if(persistentPOIs.length === 0) {
                                        setPersistentPOIs(temp)
                                    }
                                    let current = persistentPOIs
                                    let x = temp.filter(n => !selectedPOIs.includes(n))
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
                                    setPersistentPOIs(current)
                                }}
                            />
                        </Box>
                    </div>
                }
            </>
            
    )
}
export default POISearch