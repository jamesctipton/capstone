import React, { useState } from "react";
import { Button, Divider, FormControl, OutlinedInput, IconButton, createTheme, Box, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
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

const Search = ({ isLoggedIn }) => {

    const [initCriteria, setInitCriteria] = useState("destination")
    const [input, setInput] = useState("")
    const [errorValue, setError] = useState({
        message: "",
        result: false
    })
    const [selectedDestinations, setSelectedDestinations] = useState([])

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
                console.log(response)
                const results = response['data']['destinations']
                let temp = []
                for(let i = 0; i < results.length; i++) {
                    results[i].id = i
                    temp.push(results[i])
                }
                console.log(temp)
                setRows(temp)
            }).catch((error) => {
                console.log(error)
            })
        }  
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
          minWidth: 120,
          flex: 0.15
        },
        {
          field: 'stateCode',
          headerName: 'State',
          minWidth: 120,
          flex: 0.15
        },
        {
          field: 'latitude',
          headerName: 'Latitude',
          type: 'number',
          minWidth: 120,
          flex: 0.15
        },
        {
          field: 'longitude',
          headerName: 'Longitude',
          type: 'number',
        //   description: 'This column has a value getter and is not sortable.',
          minWidth: 120,
          flex: 0.15
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
                    {selectedDestinations.map((dest) => {
                        return (
                            <Box sx={{ border: '2px solid orange', borderRadius: 5, background: 'rgba(207, 125, 48, 0.21)', padding: 1 }}>
                                <Typography color='primary'>{dest['name'] + ',' + dest['countryCode']}</Typography>
                            </Box>
                        )
                    })}
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end'}}>
                    <Button disabled={(isLoggedIn && selectedDestinations.length > 1) ? false : true} sx={{ border: '2px solid orange', borderRadius: 1, padding: 1, marginBottom: 2 }}>
                        Add Poll
                    </Button>
                </div>
            </div>
            <Box sx={{ height: 1152, width: '100%', marginTop: selectedDestinations.length ? '2%' : 0 }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={20}
                    rowsPerPageOptions={[20]}
                    checkboxSelection
                    isRowSelectable={(p) => selectedDestinations.length < 5 || !(selectedDestinations.indexOf(p.row) === -1)}
                    experimentalFeatures={{ newEditingApi: true }}
                    onSelectionModelChange={(ids) => {
                        setSelectedDestinations(ids.map((id) => rows.find((row) => row.id === id)))
                        console.log(selectedDestinations);
                    }}
                />
            </Box>
    </div>
    )
}

export default Search