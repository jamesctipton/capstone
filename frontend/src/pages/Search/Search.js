import React, { useState, useEffect } from "react";
import { 
    Button, 
    Divider, 
    FormControl, 
    OutlinedInput, 
    IconButton, 
    createTheme, 
    Box, 
    Typography,
    TextField,
    Select,
    InputLabel,
    MenuItem
} from "@mui/material";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import axios from "axios";
import { DataGrid } from '@mui/x-data-grid';

const theme = createTheme({
    palette: {
      primary: {
        main: '#CF7D30',
        darker: '#BE6C20'
      },
      secondary: {
        main: '#FFFFFF'
      }
    }
});

const url = 'http://127.0.0.1:5000/search-'
const pollUrl = 'http://127.0.0.1:5000/create-poll'

let user;
const Search = ({ isLoggedIn }) => {

    const [initCriteria, setInitCriteria] = useState("destination")
    const [input, setInput] = useState("")
    const [errorValue, setError] = useState({
        message: "",
        result: false
    })
    const [selectedDestinations, setSelectedDestinations] = useState([])
    const [pollNameValue, setPollName] = useState("")
    const [groupValue, setGroupValue] = useState("")

    useEffect(() => {
        user = JSON.parse(localStorage.getItem('user'));
    });

    if(document.querySelector('.MuiDataGrid-root .MuiDataGrid-columnHeaderCheckbox .MuiDataGrid-columnHeaderTitleContainer') != null) {
        if(selectedDestinations.length === 0) {
            document.querySelector('.MuiDataGrid-root .MuiDataGrid-columnHeaderCheckbox .MuiDataGrid-columnHeaderTitleContainer').style.display = 'none';
        }
        else {
            document.querySelector('.MuiDataGrid-root .MuiDataGrid-columnHeaderCheckbox .MuiDataGrid-columnHeaderTitleContainer').style = {display: 'hidden'};
        }
    }

    const criteriaDict = {
        'destination': "Search Countries, Cities or Specific Locations",
        'hotels': "Search for Hotels",
        'flights': "Search Flights",
        'poi': "Search Points of Interest"
    };

    const [rows, setRows] = useState([])

    const searchdestination = (dest) => {
        if(dest === "") {
            setError({message: "Please enter a destination", result: true})
        } else {
            setError({message: "", result: false})
            axios.post(url+'destinations', {
                keyword: dest
            }).then((response) => {
                const results = response['data']['destinations']
                let temp = []
                for(let i = 0; i < results.length; i++) {
                    results[i].id = i
                    temp.push(results[i])
                }
                setRows(temp)
            }).catch((error) => {
                console.log(error)
            })
        }  
    }
    const addPoll = (group, pollName, destinations) => {
        console.log(group, pollName, destinations)
        axios.post(url, {
            pollname: pollName,
            user: user.name,
            groupid: group,
            options: destinations
        }).then((response) => {
            console.log(response)
        }).catch((error) => {
            console.log(error)
        })
    }

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
          field: 'latitude',
          headerName: 'Latitude',
          type: 'number',
          minWidth: 120,
          flex: 0.20
        },
        {
          field: 'longitude',
          headerName: 'Longitude',
          type: 'number',
        //   description: 'This column has a value getter and is not sortable.',
          minWidth: 120,
          flex: 0.20
        },
      ];
    
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '5%', width: '100%' }}>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', width: '100%', marginBottom: '1%'}}>
                <Button  
                    sx={{ backgroundColor: (initCriteria === 'destination') ? 'rgba(207, 125, 43, .31)' : 'rgba(0,0,0,0)', marginLeft: 2, marginRight: 2 }} 
                    onClick={() => setInitCriteria("destination")}
                    fullWidth
                >destination</Button>
                <Divider orientation="vertical" variant="middle" flexItem sx={{ background: '#CF7D30', width: 1.5}}></Divider>
                <Button  
                    sx={{ backgroundColor: (initCriteria === 'hotels') ? 'rgba(207, 125, 43, .31)' : 'rgba(0,0,0,0)', marginLeft: 2, marginRight: 2 }} 
                    onClick={() => setInitCriteria("hotels")}
                    fullWidth
                >Hotels</Button>
                <Divider orientation="vertical" variant="middle" flexItem sx={{ background: '#CF7D30', width: 1.5}}></Divider>
                <Button  
                    sx={{ backgroundColor: (initCriteria === 'flights') ? 'rgba(207, 125, 43, .31)' : 'rgba(0,0,0,0)', marginLeft: 2, marginRight: 2 }}
                    onClick={() => setInitCriteria("flights")}
                    fullWidth
                >Flights</Button>
                <Divider orientation="vertical" variant="middle" flexItem sx={{ background: '#CF7D30', width: 1.5}}></Divider>
                <Button  
                    sx={{ backgroundColor: (initCriteria === 'poi') ? 'rgba(207, 125, 43, .31)' : 'rgba(0,0,0,0)', marginLeft: 2, marginRight: 2 }}
                    onClick={() => setInitCriteria("poi")}
                    fullWidth
                >Points of Interest</Button>
            </div>
            <Divider orientation="horizontal" variant="fullwidth" flexItem sx={{ background: '#CF7D30'}}></Divider>
            <div style={{width: '80%', marginTop: '2%', marginBottom: '2%'}}>
                <FormControl fullWidth>
                    <OutlinedInput 
                        placeholder={criteriaDict[initCriteria]}
                        variant="outlined" 
                        sx={{borderWidth: 3, borderRadius: 30, whiteSpace: 'nowrap', minWidth: 334}} 
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        fullWidth
                        onKeyPress={event => {
                            if (event.key === 'Enter') {
                                searchdestination(input)
                            }
                            }}
                        endAdornment={
                        <IconButton aria-label='search' onClick={() => searchdestination(input)} onMouseDown={() => {}} edge="end">
                            <SearchOutlinedIcon fontSize="large" color="primary"/>
                        </IconButton>}>
                    </OutlinedInput>
                </FormControl>
            </div> 
            {/* {initCriteria === 'destination' 
                ? <div style={{width: '80%', marginTop: '2%', marginBottom: '2%'}}>
                    <FormControl fullWidth>
                        <OutlinedInput 
                            placeholder="Search Countries, Cities or Specific Locations" 
                            variant="outlined" 
                            sx={{borderWidth: 3, borderRadius: 30, whiteSpace: 'nowrap', minWidth: 334}} 
                            value={destInput}
                            onChange={(e) => setDestInput(e.target.value)}
                            fullWidth
                            onKeyPress={event => {
                                if (event.key === 'Enter') {
                                  searchdestination(destInput)
                                }
                              }}
                            endAdornment={
                            <IconButton aria-label='search' onClick={() => searchdestination(destInput)} onMouseDown={() => {}} edge="end">
                                <SearchOutlinedIcon fontSize="large" color="primary"/>
                            </IconButton>}>
                        </OutlinedInput>
                    </FormControl>
                </div> 
                : (initCriteria === 'hotels')
                    ? <div style={{width: '80%', marginTop: '2%', marginBottom: '2%'}}>
                        <FormControl fullWidth>
                            <OutlinedInput placeholder="Search for Hotels" variant="outlined" sx={{borderWidth: 3, borderRadius: 30, whiteSpace: 'nowrap', minWidth: 334}} fullWidth
                                endAdornment={
                                <IconButton aria-label='search' onClick={() => {}} onMouseDown={() => {}} edge="end">
                                    <SearchOutlinedIcon fontSize="large" color="primary"/>
                                </IconButton>}>

                            </OutlinedInput>
                        </FormControl>
                    </div>
                    : (initCriteria === 'flights')
                        ? <div style={{width: '80%', marginTop: '2%', marginBottom: '2%'}}>
                            <FormControl fullWidth>
                                <OutlinedInput placeholder="Search Flights" variant="outlined" sx={{borderWidth: 3, borderRadius: 30, whiteSpace: 'nowrap', minWidth: 334}} fullWidth
                                    endAdornment={
                                    <IconButton aria-label='search' onClick={() => {}} onMouseDown={() => {}} edge="end">
                                        <SearchOutlinedIcon fontSize="large" color="primary"/>
                                    </IconButton>}>
        
                                </OutlinedInput>
                            </FormControl>
                        </div>
                        : (initCriteria === 'poi')
                            ? <div style={{width: '80%', marginTop: '2%', marginBottom: '2%'}}>
                                <FormControl fullWidth>
                                    <OutlinedInput placeholder="Search Points of Interest" variant="outlined" sx={{borderWidth: 3, borderRadius: 30, whiteSpace: 'nowrap', minWidth: 334}} fullWidth
                                        endAdornment={
                                        <IconButton aria-label='search' onClick={() => {}} onMouseDown={() => {}} edge="end">
                                            <SearchOutlinedIcon fontSize="large" color="primary"/>
                                        </IconButton>}>
            
                                    </OutlinedInput>
                                </FormControl>
                             </div> : <></> } */}
            {errorValue.result ? 
                <Box sx={{ border: '3px solid red', borderRadius: 3, background: 'rgba(255, 0, 0, 0.1)', borderColor: 'rgba(255, 0, 0, 0.86)', color: 'red', padding: 2 }}>
                    <Typography>{errorValue.message}</Typography>
                </Box>
            : <></> }
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
                        {(user != undefined) ?
                        // conditional rendering just for testing
                        <>
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
                            <MenuItem value={1}>Group #1</MenuItem>
                            <MenuItem value={2}>Group #2</MenuItem>
                            <MenuItem value={3}>Group #3</MenuItem>
                            {user.groups.map((g) => (
                                <MenuItem value={g.group_id}>{g.name}</MenuItem>
                            ))}
                        </Select>
                        </>
                        :
                        <></>
                        }
                    </FormControl>
                    <TextField id='poll_name' label="Poll Name" variant="outlined" onChange={(e) => setPollName(e.target.value)} value={pollNameValue} sx={{ minWidth: 'max-content'}}></TextField>
                    <Button 
                        disabled={!(isLoggedIn || selectedDestinations.length > 5) && (selectedDestinations.length === 1 || selectedDestinations.length === 0) || (groupValue === "" || pollNameValue === "")}
                        sx={{ border: '2px solid orange', borderRadius: 1, padding: 1, whiteSpace: 'no-wrap', minWidth: 'max-content' }} 
                        onClick={() => addPoll(groupValue, pollNameValue, selectedDestinations)}>
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
                        let temp = selectedDestinations
                        let tempSet = new Set(ids.map((id) => rows.find((row) => row.id === id)))
                        console.log(temp)
                        console.log(tempSet)
                        setSelectedDestinations(temp)
                    }}
                    // selectionModel={selectedDestinations}
                />
            </Box>
    </div>
    )
}

export default Search;