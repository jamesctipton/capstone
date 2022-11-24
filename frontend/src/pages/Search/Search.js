import React, { useState } from "react";
import { Button, Divider, FormControl, OutlinedInput, IconButton, createTheme, Box, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import axios from "axios";

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

const destination_url = 'http://127.0.0.1:5000/search-destinations'

const Search = ({ isLoggedIn }) => {

    const [isActive, setActive] = useState({
        destination: true,
        hotels: false,
        flights: false,
        poi: false
    })
    const [initCriteria, setInitCriteria] = useState("destination")
    const [destInput, setDestInput] = useState("")
    const [errorValue, setError] = useState({
        message: "",
        result: false
    })

    const setdestinationActive = () => {
        isActive.destination = true
        isActive.hotels = false
        isActive.flights = false
        isActive.poi = false
        setActive({...isActive, destination: true})
        setActive({...isActive, hotels: false})
        setActive({...isActive, flights: false})
        setActive({...isActive, poi: false})

        setInitCriteria("destination")
    }

    const setHotelsActive = () => {
        isActive.destination = false
        isActive.hotels = true
        isActive.flights = false
        isActive.poi = false
        setActive({...isActive, destination: false})
        setActive({...isActive, hotels: true})
        setActive({...isActive, flights: false})
        setActive({...isActive, poi: false})

        setInitCriteria("hotels")
    }

    const setFlightsActive = () => {
        isActive.destination = false
        isActive.hotels = false
        isActive.flights = true
        isActive.poi = false
        setActive({...isActive, destination: false})
        setActive({...isActive, hotels: false})
        setActive({...isActive, flights: true})
        setActive({...isActive, poi: false})

        setInitCriteria("flights")
    }

    const setPOIActive = () => {
        isActive.destination = false
        isActive.hotels = false
        isActive.flights = false
        isActive.poi = true
        setActive({...isActive, destination: false})
        setActive({...isActive, hotels: false})
        setActive({...isActive, flights: false})
        setActive({...isActive, poi: true})

        setInitCriteria("poi")
    }

    const destinationColumns = [
        {id: 'name', label: 'Name', align: 'left'},
        {id: 'countryCode', label: 'Country', align: 'center'},
        {id: 'stateCode', label: 'State', align: 'center'},
        {id: 'latitude', label: 'Latitude', align: 'center'},
        {id: 'longitude', label: 'Longitude', align: 'center'}
    ]
    const [destinationRows, setDestinationRows] = useState([])

    const searchdestination = (dest) => {
        if(dest === "") {
            setError({message: "Please enter a destination", result: true})
        } else {
            setError({message: "", result: false})
            //setDestinationRows([])
            axios.post(destination_url, {
                keyword: dest
            }).then((response) => {
                const results = response['data']['keyword']
                let temp = []
                for(let i = 0; i < results.length; i++) {
                    temp.push(results[i])
                }
                console.log(temp)
                setDestinationRows(temp)
            }).catch((error) => {
                console.log(error)
            })
        }  
    }

    

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '5%' }}>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', width: '100%', marginBottom: '1%'}}>
                <Button  
                    sx={{ backgroundColor: isActive.destination ? 'rgba(207, 125, 43, .31)' : 'rgba(0,0,0,0)', marginLeft: 2, marginRight: 2 }} 
                    onClick={() => setdestinationActive()}
                    fullWidth
                >destination</Button>
                <Divider orientation="vertical" variant="middle" flexItem sx={{ background: '#CF7D30', width: 1.5}}></Divider>
                <Button  
                    sx={{ backgroundColor: isActive.hotels ? 'rgba(207, 125, 43, .31)' : 'rgba(0,0,0,0)', marginLeft: 2, marginRight: 2 }} 
                    onClick={() => setHotelsActive()}
                    fullWidth
                >Hotels</Button>
                <Divider orientation="vertical" variant="middle" flexItem sx={{ background: '#CF7D30', width: 1.5}}></Divider>
                <Button  
                    sx={{ backgroundColor: isActive.flights ? 'rgba(207, 125, 43, .31)' : 'rgba(0,0,0,0)', marginLeft: 2, marginRight: 2 }}
                    onClick={() => setFlightsActive()}
                    fullWidth
                >Flights</Button>
                <Divider orientation="vertical" variant="middle" flexItem sx={{ background: '#CF7D30', width: 1.5}}></Divider>
                <Button  
                    sx={{ backgroundColor: isActive.poi ? 'rgba(207, 125, 43, .31)' : 'rgba(0,0,0,0)', marginLeft: 2, marginRight: 2 }}
                    onClick={() => setPOIActive()}
                    fullWidth
                >Points of Interest</Button>
            </div>
            <Divider orientation="horizontal" variant="fullwidth" flexItem sx={{ background: '#CF7D30'}}></Divider>
            {initCriteria === 'destination' 
                ? <div style={{width: '80%', marginTop: '2%', marginBottom: '2%'}}>
                    <FormControl fullWidth>
                        <OutlinedInput 
                            placeholder="Search Countries, Cities or Specific Locations" 
                            variant="outlined" 
                            sx={{borderWidth: 3, borderRadius: 30, whiteSpace: 'nowrap', minWidth: 334}} 
                            value={destInput}
                            onChange={(e) => setDestInput(e.target.value)}
                            fullWidth
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
                             </div> : <></> }
                {errorValue.result ? 
                    <Box sx={{ border: '3px solid red', borderRadius: 3, background: 'rgba(255, 0, 0, 0.1)', borderColor: 'rgba(255, 0, 0, 0.86)', color: 'red', padding: 2 }}>
                        <Typography>{errorValue.message}</Typography>
                    </Box>
                : <></> }
                <TableContainer style={{ width: '90%', marginLeft: isLoggedIn ? '5%' : 0 }}>
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow>
                                {destinationColumns.map((column) => (
                                    <TableCell key={column.id} sx={{ color: '#CF7D30'}} align={column.align}>
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {destinationRows.map((row, index1) => {
                                return(
                                    <TableRow key={index1} sx={{ width: '100%' }} hover>
                                        {destinationColumns.map((column, index2) => {
                                            const value = row[column.id]
                                            return (
                                                <TableCell key={index1 + index2} align={column.align}>
                                                    {value}
                                                </TableCell>
                                            )
                                        })}
                                        {isLoggedIn ? 
                                            <Button sx={{ marginTop: 1, borderRadius: 30, background: 'rgba(207, 125, 48, 0.31)', border: '3px solid orange' }}>
                                                Add To Poll
                                            </Button> : <></>}
                                        
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
        </div>
    )
}

export default Search