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
import { DataGrid } from '@mui/x-data-grid';
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
    const [rows, setRows] = useState([])
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

    const searchDestination = (dest) => {
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
                setRows(temp_array)
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
        <div style={{ width: '90%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{width: '80%', marginTop: '2%', marginBottom: '2%'}}>
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly'}}>
                    <FormControl fullWidth flex={0.5} sx={{ paddingRight: 1, flex: 0.5 }}>
                        <OutlinedInput 
                            placeholder="Where from?"
                            variant="outlined" 
                            sx={{borderWidth: 3, borderRadius: 30, whiteSpace: 'nowrap', minWidth: 334}} 
                            value={to}
                            onChange={(e) => setFrom(e.target.value)}
                            fullWidth
                            onKeyPress={event => {
                                if (event.key === 'Enter') {
                                    searchDestination(to)
                                }
                                }}
                            endAdornment={
                            <IconButton aria-label='search' onClick={() => searchDestination(to)} onMouseDown={() => {}} edge="end">
                                <SearchOutlinedIcon fontSize="large" color="primary"/>
                            </IconButton>}>
                        </OutlinedInput>
                    </FormControl>
                    <FormControl fullWidth sx={{ paddingLeft: 1, flex: 0.5 }}>
                        <OutlinedInput 
                            placeholder="Where to?"
                            variant="outlined" 
                            sx={{borderWidth: 3, borderRadius: 30, whiteSpace: 'nowrap', minWidth: 250}} 
                            value={from}
                            onChange={(e) => setTo(e.target.value)}
                            fullWidth
                            onKeyPress={event => {
                                if (event.key === 'Enter') {
                                    searchDestination(from)
                                }
                                }}
                            endAdornment={
                            <IconButton aria-label='search' onClick={() => searchDestination(from)} onMouseDown={() => {}} edge="end">
                                <SearchOutlinedIcon fontSize="large" color="primary"/>
                            </IconButton>}>
                        </OutlinedInput>
                    </FormControl>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 2}}>
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
                                    label: { color: '#CF7D30'} 
                                }} 
                            />}
                    />
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
                                    label: { color: '#CF7D30'} 
                                }} 
                            />}
                    />
                </Box>
            </div> 
            { errorValue.result ? 
                <Box sx={{ border: '3px solid red', background: 'rgba(255, 0, 0, 0.1)', color: 'red', padding: 2 }}>
                    <Typography>{errorValue.message}</Typography>
                </Box> : <></> }
            <div style={{ display: 'flex', justifyContent: 'flex-start', gap: 10, marginBottom: 8}}>
                {persistentDest.map((dest, i) => {
                    return (
                        <Box key={i} sx={{ border: '2px solid orange', borderRadius: 5, background: 'rgba(207, 125, 48, 0.21)', padding: 1 }}>
                            <Button
                                color='primary'
                                onClick={() => {
                                    let temp = persistentDest.splice(i,1)
                                    setPersistentDest(persistentDest.filter(n => !temp.includes(n)))
                                }}
                            >X {dest['name'] + ', ' + (dest['stateCode'] ? dest['stateCode'] : dest['countryCode'])}</Button>
                        </Box>
                    )
                })}
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', width: '85%', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, minWidth: 'max-content'}}>
                    {(user) ?
                    <FormControl fullWidth>
                    <InputLabel id="select-label">Group</InputLabel>
                    <Select
                        id="group"
                        labelId="select-group"
                        value={groupValue}
                        label="Group"
                        onChange={(e) => {
                            setGroupValue(e.target.value)
                            // setSelectedDestinations([])
                        }}
                        variant="outlined"
                        sx={{ minWidth: '100px' }}
                        autoWidth
                    >
                        {user.groups.length > 0 ? 
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
                        disabled={(!(user || persistentDest.length > 5) && (persistentDest.length === 1 || persistentDest.length === 0)) || (groupValue === "" || pollNameValue === "")}
                        sx={{ border: '2px solid orange', borderRadius: 1, padding: 1, whiteSpace: 'no-wrap', minWidth: 'max-content' }} 
                        onClick={() => createPoll(groupValue, pollNameValue, persistentDest)}
                    >
                        Add Poll
                    </Button>
                </div>
            </div>
            <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%', gap: 2 }}>
                <Box sx={{ height: 1152, width: '100%', marginTop: '2%'}}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={20}
                        rowsPerPageOptions={[20]}
                        isRowSelectable={(p) => (persistentDest.length) < 5 || !(selectedDestinations.indexOf(p.row) === -1)}
                        onSelectionModelChange={(ids) => {
                            let temp = ids.map((id) => rows.find((row) => row.id === id))
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
                </Box>
                <Box sx={{ height: 1152, width: '100%', marginTop: '2%'}}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={20}
                        rowsPerPageOptions={[20]}
                        isRowSelectable={(p) => (persistentDest.length) < 5 || !(selectedDestinations.indexOf(p.row) === -1)}
                        onSelectionModelChange={(ids) => {
                            let temp = ids.map((id) => rows.find((row) => row.id === id))
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
                </Box>
            </Box>
        </div>
    )
}

export default FlightSearch