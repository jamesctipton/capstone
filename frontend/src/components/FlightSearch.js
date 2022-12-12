import axios from "axios";
import React, { useState } from "react";
import { 
    Box, 
    Typography,
    FormControl,
    MenuItem,
    TextField,
    Select,
    InputLabel,
    Button,
    OutlinedInput,
    IconButton,
    Divider,
    Grid
} from "@mui/material";
import { DataGrid, gridDensityRowHeightSelector } from '@mui/x-data-grid';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { Form, useNavigate } from "react-router-dom";
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
    const [selectedDestinations, setSelectedDestinations] = useState([])
    const [persistentDest, setPersistentDest] = useState([])
    const [pollNameValue, setPollName] = useState("")
    const [groupValue, setGroupValue] = useState("")
    const [depart, setDepart] = useState("")
    const [arrive, setArrive] = useState("")

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

    if(document.querySelector('.MuiDataGrid-root .MuiDataGrid-columnHeaderCheckbox .MuiDataGrid-columnHeaderTitleContainer') != null) {
        if(selectedDestinations.length === 0) {
            document.querySelector('.MuiDataGrid-root .MuiDataGrid-columnHeaderCheckbox .MuiDataGrid-columnHeaderTitleContainer').style.display = 'none';
        }
        else {
            document.querySelector('.MuiDataGrid-root .MuiDataGrid-columnHeaderCheckbox .MuiDataGrid-columnHeaderTitleContainer').style = {display: 'hidden'};
        }
    }

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
            options: destinations
        }).then((response) => {
            console.log(response)
        }).catch((error) => {
            setError({ message: error, result: true })
        })
    }

    return (
        <div id='outer-container' style={{ width: '90%'}}>
            <div id='search-container' style={{ width: '100%', display: 'flex', marginTop: '2%', marginBottom: '2%', justifyContent: 'space-between' }}>
                <div id='start-search' style={{ width: '40%', display: 'flex', justifyContent: 'flex-start', flexDirection: 'column' }}>
                    <Typography color="primary" sx={{ marginBottom: 1, textAlign: 'center' }}>Departure Location</Typography>
                    <FormControl fullWidth flex={0.5} sx={{ marginBottom: 2 }}>
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
                    <DesktopDatePicker
                        label="Departure Date"
                        inputFormat="MM/DD/YYYY"
                        value={depart}
                        onChange={setDepart}
                        renderInput={(params) => 
                            <TextField {...params}
                                error={false} 
                                sx={{ 
                                    input: { color: '#CF7D30'}, 
                                    svg: { color: '#CF7D30'}, 
                                    label: { color: '#CF7D30'},
                                    width: '80%',
                                    marginLeft: 6 
                                }} 
                            />}
                    />
                </div>
                <div id='dest-search' style={{ width: '40%', display: 'flex', justifyContent: 'flex-end', flexDirection: 'column' }}>
                    <Typography color="primary" sx={{ marginBottom: 1, textAlign: 'center' }}>Destination Location</Typography>
                    <FormControl fullWidth flex={0.5} sx={{ marginBottom: 2 }}>
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
                    <DesktopDatePicker
                        label="Arrival Date"
                        inputFormat="MM/DD/YYYY"
                        value={arrive}
                        onChange={setArrive}
                        renderInput={(params) => 
                            <TextField {...params}
                                error={false} 
                                sx={{ 
                                    input: { color: '#CF7D30'}, 
                                    svg: { color: '#CF7D30'}, 
                                    label: { color: '#CF7D30'},
                                    width: '80%',
                                    marginLeft: 6 
                                }} 
                            />}
                    />
                </div>
            </div>
            <div id='results-container' style={{ width: '100%', display: 'flex', marginTop: '2%', marginBottom: '2%', justifyContent: 'space-between' }}>                
                <div id='start-flight-results' style={{ width: '48%', display: 'flex', justifyContent: 'flex-start', flexDirection: 'column', height: 475 }}>
                    <DataGrid
                        rows={fromRows}
                        columns={columns}
                        pageSize={7}
                        rowsPerPageOptions={[7]}
                        isRowSelectable={(p) => (persistentDest.length) < 5 || !(selectedDestinations.indexOf(p.row) === -1)}
                        onSelectionModelChange={(ids) => {
                            let temp = ids.map((id) => fromRows.find((row) => row.id === id))
                            let t2 = selectedDestinations
                            setSelectedDestinations(temp)
                            if(persistentDest.length === 0) {
                                setPersistentDest(temp)
                            }
                            let current = persistentDest
                            let x = temp.filter(n => !selectedDestinations.includes(n))
                            if(x[0] !== undefined) {
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
                            setPersistentDest(current)
                        }}
                    />
                </div>
                <div id='end-flight-results' style={{ width: '48%', display: 'flex', justifyContent: 'flex-end', flexDirection: 'column', height: 475 }}>
                    <DataGrid
                        rows={destRows}
                        columns={columns}
                        pageSize={7}
                        rowsPerPageOptions={[7]}
                        isRowSelectable={(p) => (persistentDest.length) < 5 || !(selectedDestinations.indexOf(p.row) === -1)}
                        onSelectionModelChange={(ids) => {
                            let temp = ids.map((id) => destRows.find((row) => row.id === id))
                            let t2 = selectedDestinations
                            setSelectedDestinations(temp)
                            if(persistentDest.length === 0) {
                                setPersistentDest(temp)
                            }
                            let current = persistentDest
                            let x = temp.filter(n => !selectedDestinations.includes(n))
                            if(x[0] !== undefined) {
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
                            setPersistentDest(current)
                        }}
                    />
                </div>
            </div>
            <Button 
                type='button'
                variant="outlined"
                sx={{m: 1, borderWidth: 3, borderRadius: 30, borderColor: 'primary', whiteSpace: 'nowrap', minWidth: 'maxcontent', '&:hover': { borderWidth: 3 }, marginLeft: '41%', width: 200, height: 50, fontSize: 20 }}
            >Search Flights</Button>
        </div>
    )
}

export default FlightSearch