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
} from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

const search_url = 'http://127.0.0.1:5000/search-'
const create_poll_url = 'http://127.0.0.1:5000/create-poll'

const DestinationSearch = ({ isLoggedIn, user }) => {

    //error handling 
    const [errorValue, setError] = useState({
        message: "",
        result: false
    })

    //variables that will change based on user input
    const [input, setInput] = useState("")
    const [rows, setRows] = useState([])
    const [selectedDestinations, setSelectedDestinations] = useState([])
    const [pollNameValue, setPollName] = useState("")
    const [groupValue, setGroupValue] = useState("")

    //constant variables for destination table
    const columns = [
        {
            field: 'name',
            headerName: 'Name',
            minWidth: 360,
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
            field: 'longitude',
            headerName: 'Longitude',
            type: 'number',
            minWidth: 120,
            flex: 0.20
        }
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
                    results[i].id = i
                    temp_array.push(results[i])
                }
                setRows(temp_array)
            }).catch((error) => {
                setError({ message: error, result: true })
            })
        }
    }

    const createPoll = (group, pollName, destinations) => {
        console.log(group, pollName, destinations)
        axios.post(create_poll_url, {
            pollName: pollName,
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
        <div style={{ width: '90%' }}>
            <div style={{width: '80%', marginTop: '2%', marginBottom: '2%'}}>
                <FormControl fullWidth>
                    <OutlinedInput 
                        placeholder="Search Desintation"
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
                <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', width: '85%', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', justifyContent: 'flex-start', gap: 10}}>
                    {selectedDestinations.map((dest, i) => {
                        return (
                            <Box key={i} sx={{ border: '2px solid orange', borderRadius: 5, background: 'rgba(207, 125, 48, 0.21)', padding: 1 }}>
                                <Typography color='primary'>{dest['name'] + ', ' + (dest['stateCode'] ? dest['stateCode'] : dest['countryCode'])}</Typography>
                            </Box>
                        )
                    })}
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, minWidth: 'max-content'}}>
                    <FormControl fullWidth>
                        <InputLabel id="select-label">Group</InputLabel>
                        <Select
                            id="group"
                            labelId="select-group"
                            value={groupValue}
                            label="Group"
                            onChange={(e) => setGroupValue(e.target.value)}
                            variant="outlined"
                            sx={{ minWidth: '100px' }}
                            autoWidth
                        >
                            {user.groups.length > 0 ? 
                                user.grousp.map((g) => {
                                    return(
                                        <MenuItem value={g.group_id}>{g.name}</MenuItem>
                                    )
                                }): <MenuItem>No groups available</MenuItem>}
                        </Select>
                    </FormControl>
                    <TextField id='poll_name' label="Poll Name" variant="outlined" onChange={(e) => setPollName(e.target.value)} value={pollNameValue} sx={{ minWidth: 'max-content'}}></TextField>
                    <Button 
                        disabled={(!(isLoggedIn || selectedDestinations.length > 5) && (selectedDestinations.length === 1 || selectedDestinations.length === 0)) || (groupValue === "" || pollNameValue === "")}
                        sx={{ border: '2px solid orange', borderRadius: 1, padding: 1, whiteSpace: 'no-wrap', minWidth: 'max-content' }} 
                        onClick={() => createPoll(groupValue, pollNameValue, selectedDestinations)}>
                        Add Poll
                    </Button>
                </div>
            </div>
            <Box sx={{ height: 1152, width: '97%', marginTop: '2%'}}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={20}
                    rowsPerPageOptions={[20]}
                    checkboxSelection
                    isRowSelectable={(p) => selectedDestinations.length < 5 || !(selectedDestinations.indexOf(p.row) === -1)}
                    onSelectionModelChange={(ids) => {
                        setSelectedDestinations(ids.map((id) => rows.find((row) => row.id === id)))
                    }}
                />
            </Box>
        </div>
    )
}

export default DestinationSearch