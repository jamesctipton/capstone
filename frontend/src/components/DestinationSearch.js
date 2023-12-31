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
import { useNavigate } from "react-router-dom";


const search_url = 'http://127.0.0.1:5000/search-'
const create_poll_url = 'http://127.0.0.1:5000/create-poll'

const DestinationSearch = ({ type, setDestination }) => {

    //error handling 
    const [errorValue, setError] = useState({
        message: "",
        result: false
    })

    //variables that will change based on user input
    const [input, setInput] = useState("")
    const [rows, setRows] = useState([])
    const [selectedDestinations, setSelectedDestinations] = useState([])
    const [persistentDest, setPersistentDest] = useState([])
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
        }
    ]
    if(type == 'poi') {
        columns.push({
            field: 'searchCityButton',
            headerName: '',
            minWidth: 150,
            flex: 0.2,
            renderCell: (params) => {
                const onClick = (e) => {
                    setDestination({
                        name: params.row['name'],
                        country: params.row['countryCode'],
                        latitude: params.row['latitude'],
                        longitude: params.row['longitude'],
                        radius: 15,
                        state: ""
                    })
                }
                return (
                    <Grid container justifyContent="flex-end">
                        <Button sx={{ fontSize: 12 }} onClick={() => onClick()}>{type == 'hotel' ? 'Search Hotels' : 'Search Landmarks'}</Button>
                    </Grid>

                )
            }

        })
    }

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
                // setError({ message: error, result: true })
            })
        }
    }

    const createPoll = (group, pollName, destinations) => {
        console.log(user.name, group, pollName, destinations)
        axios.post(create_poll_url, {
            pollname: pollName,
            user: user.name,
            groupid: group,
            pollOptions: destinations,
            category: "destination"
        }).then((response) => {
            console.log(response)
        }).catch((error) => {
            setError({ message: error, result: true })
        })
    }

    return (
        <div style={{ width: '90%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{width: '80%', marginTop: '2%', marginBottom: '2%'}}>
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
                                searchDestination(input)
                            }
                            }}
                        endAdornment={
                        <IconButton aria-label='search' onClick={() => searchDestination(input)} onMouseDown={() => {}} edge="end">
                            <SearchOutlinedIcon fontSize="large" color="primary"/>
                        </IconButton>}>
                    </OutlinedInput>
                </FormControl>
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
                            // setSelectedDestinations([])
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
                        disabled={(!(user || persistentDest.length > 5) && (persistentDest.length === 1 || persistentDest.length === 0)) || (groupValue === "" || pollNameValue === "")}
                        sx={{ border: '2px solid orange', borderRadius: 1, padding: 1, whiteSpace: 'no-wrap', minWidth: 'max-content' }} 
                        onClick={() => createPoll(groupValue, pollNameValue, persistentDest)}
                    >
                        Add Poll
                    </Button>
                </div>
            </div>
            {rows.length > 0 ?
                <Box sx={{ height: 1152, width: '100%', marginTop: '2%'}}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={20}
                        rowsPerPageOptions={[20]}
                        checkboxSelection={type != 'hotel' && type != 'poi'}
                        isRowSelectable={(p) => (persistentDest.length) < 5 || !(selectedDestinations.indexOf(p.row) === -1)}
                        onSelectionModelChange={(ids) => {
                            let temp = ids.map((id) => rows.find((row) => row.id === id))                            
                            let t2 = selectedDestinations
                            setSelectedDestinations(temp)
                            console.log(selectedDestinations)
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
            : 
            <></>}
        </div>
    )
}

export default DestinationSearch