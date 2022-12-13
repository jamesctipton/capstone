import axios from "axios";
import React, { useState } from "react";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import {
    FormControl,
    OutlinedInput,
    IconButton,
    Button,
    TextField,
    Grid,
    Typography,
    InputLabel,
    Select,
    MenuItem,
    Divider,
} from '@mui/material';
import { Box } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { useNavigate } from "react-router-dom";


const search_url = 'http://127.0.0.1:5000/search-'
const create_poll_url = 'http://127.0.0.1:5000/create-poll'

const HotelSearch = () => {

    const navigate = useNavigate()
    const navigateToCreateGroup = () => {
        navigate('/join-create')
    }
     
    //error handling
    const [errorValue, setError] = useState({
        message: "",
        result: false
    })

    //variables that will change based on user input
    const [input, setInput] = useState("")
    const [cityRows, setCityRows] = useState([])
    const [hotelRows, setHotelRows] = useState([])
    const [selectedHotels, setSelectedHotels] = useState([])
    const [persistentHotels, setPersistentHotels] = useState([])
    const [arrivalDate, setArrivalDate] = useState("")
    const [returnDate, setReturnDate] = useState("")

    const [pollNameValue, setPollName] = useState("")
    const [groupValue, setGroupValue] = useState("")

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

    if(document.querySelector('.MuiDataGrid-root .MuiDataGrid-columnHeaderCheckbox .MuiDataGrid-columnHeaderTitleContainer') != null) {
        if(selectedHotels.length === 0) {
            document.querySelector('.MuiDataGrid-root .MuiDataGrid-columnHeaderCheckbox .MuiDataGrid-columnHeaderTitleContainer').style.display = 'none';
        }
        else {
            document.querySelector('.MuiDataGrid-root .MuiDataGrid-columnHeaderCheckbox .MuiDataGrid-columnHeaderTitleContainer').style = {display: 'hidden'};
        }
    }

    const searchCities = (dest) => {
        setHotelRows([])
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
            const results = response['data']['hotels']
            let temp_array = []
            for(let i = 0; i < results.length; i++) {
                results[i].id = results[i].name + i.toString()
                temp_array.push(results[i])
            }
            setHotelRows(temp_array)
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
            console.log = console.warn = console.error = () => {};
        })
    }

    const createPoll = (group, name, options) => {
        console.log(group, name, options)
        console.log()
        axios.post(create_poll_url, {
            user: user.name,
            groupid: group,
            pollname: name,
            pollOptions: options,
            category: "hotel"
        }).then((response) => {
            console.log(response)
        }).catch((error) => {
            setError({ message: error, result: true })
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
                            onKeyPress={event => {
                                if (event.key === 'Enter') {
                                    searchCities(input)
                                }
                                }}
                            endAdornment={
                                <IconButton aria-label='search' onClick={() => searchCities(input)} onMouseDown={() => {}} edge="end">
                                    <SearchOutlinedIcon fontSize="large" color="primary"/>
                                </IconButton>}>
                        </OutlinedInput>
                    </FormControl>
                </div>
                {/* { errorValue.result ? 
                    <Box sx={{ border: '3px solid red', background: 'rgba(255, 0, 0, 0.1)', color: 'red', padding: 2 }}>
                        <Typography>{errorValue.message}</Typography>
                    </Box> 
                : <></> } */}
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
                {persistentHotels.length > 0 ?
                    <div styled={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: 10, marginTop: '3%', marginBottom: '2%' }}>
                            {persistentHotels.map((dest, i) => {
                                return (
                                    <Box key={i} sx={{ border: '2px solid orange', borderRadius: 5, background: 'rgba(207, 125, 48, 0.21)', padding: 1 }}>
                                        <Button
                                            color='primary'
                                            onClick={() => {
                                                let temp = persistentHotels.splice(i,1)
                                                setPersistentHotels(persistentHotels.filter(n => !temp.includes(n)))
                                            }}
                                        >x {dest['name']}</Button>
                                    </Box>
                                )
                            })}
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', width: '100%', justifyContent: 'center' }}>
                            <div style={{ display: 'flex', gap: 10, minWidth: 'max-content'}}>
                                {user != undefined ?
                                <FormControl fullWidth>
                                <InputLabel id="select-label">Group</InputLabel>
                                <Select
                                    id="group"
                                    labelId="select-group"
                                    value={groupValue}
                                    label="Group"
                                    onChange={(e) => {
                                        setGroupValue(e.target.value)
                                    }}
                                    variant="outlined"
                                    sx={{ minWidth: '100px' }}
                                    autoWidth
                                >
                                {(user.groups.length > 0) ? 
                                    user.groups.map((g, i) => {
                                        return(
                                            <MenuItem key={i} value={g.groupCode}>{g.groupname}</MenuItem>
                                        )
                                    }): <MenuItem>No groups available</MenuItem>}
                                    <Divider orientation="horizontal"  variant="middle" flexItem sx={{ background: 'rgba(162, 162, 162, 0.86)', width: '80%'}}></Divider>
                                    <Button sx={{ marginLeft: '8%' }} onClick={() => navigateToCreateGroup()}>Create Group</Button>
                                </Select>
                            </FormControl>
                            : <></>}
                                <TextField id='poll_name' label="Poll Name" variant="outlined" onChange={(e) => setPollName(e.target.value)} value={pollNameValue} sx={{ minWidth: 'max-content'}}></TextField>
                                <Button 
                                    disabled={(!(user || persistentHotels.length > 5) && (persistentHotels.length === 1 || persistentHotels.length === 0)) || (groupValue === "" || pollNameValue === "")}
                                    sx={{ border: '2px solid orange', borderRadius: 1, padding: 1, whiteSpace: 'no-wrap', minWidth: 'max-content' }} 
                                    onClick={() => createPoll(groupValue, pollNameValue, persistentHotels)}
                                >
                                    Add Poll
                                </Button>
                            </div>
                        </div>
                    </div>
                :<></>}
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