import React, { useState } from "react";
import { Button, Divider, FormControl, OutlinedInput, IconButton, createTheme } from "@mui/material";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

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

const Search = () => {

    const [isActive, setActive] = useState({
        desination: true,
        hotels: false,
        flights: false,
        poi: false
    })

    const [initCriteria, setInitCriteria] = useState("desination")

    const setDesinationActive = () => {
        isActive.desination = true
        isActive.hotels = false
        isActive.flights = false
        isActive.poi = false
        setActive({...isActive, desination: true})
        setActive({...isActive, hotels: false})
        setActive({...isActive, flights: false})
        setActive({...isActive, poi: false})

        setInitCriteria("desination")
    }

    const setHotelsActive = () => {
        isActive.desination = false
        isActive.hotels = true
        isActive.flights = false
        isActive.poi = false
        setActive({...isActive, desination: false})
        setActive({...isActive, hotels: true})
        setActive({...isActive, flights: false})
        setActive({...isActive, poi: false})

        setInitCriteria("hotels")
    }

    const setFlightsActive = () => {
        isActive.desination = false
        isActive.hotels = false
        isActive.flights = true
        isActive.poi = false
        setActive({...isActive, desination: false})
        setActive({...isActive, hotels: false})
        setActive({...isActive, flights: true})
        setActive({...isActive, poi: false})

        setInitCriteria("flights")
    }

    const setPOIActive = () => {
        isActive.desination = false
        isActive.hotels = false
        isActive.flights = false
        isActive.poi = true
        setActive({...isActive, desination: false})
        setActive({...isActive, hotels: false})
        setActive({...isActive, flights: false})
        setActive({...isActive, poi: true})

        setInitCriteria("poi")
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '5%' }}>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', width: '100%', marginBottom: '1%'}}>
                <Button  
                    sx={{ backgroundColor: isActive.desination ? 'rgba(207, 125, 43, .31)' : 'rgba(0,0,0,0)', marginLeft: 2, marginRight: 2 }} 
                    onClick={() => setDesinationActive()}
                    fullWidth
                >Desination</Button>
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
            {initCriteria === 'desination' 
                ? <div style={{width: '80%', marginTop: '2%'}}>
                    <FormControl fullWidth>
                        <OutlinedInput placeholder="Search Countries, Cities or Specific Locations" variant="outlined" sx={{borderWidth: 3, borderRadius: 30, whiteSpace: 'nowrap', minWidth: 334}} fullWidth
                            endAdornment={
                            <IconButton aria-label='search' onClick={() => {}} onMouseDown={() => {}} edge="end">
                                <SearchOutlinedIcon fontSize="large" color="primary"/>
                            </IconButton>}>

                        </OutlinedInput>
                    </FormControl>
                </div> 
                : (initCriteria === 'hotels')
                    ? <div style={{width: '80%', marginTop: '2%'}}>
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
                        ? <div style={{width: '80%', marginTop: '2%'}}>
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
                            ? <div style={{width: '80%', marginTop: '2%'}}>
                                <FormControl fullWidth>
                                    <OutlinedInput placeholder="Search Points of Interest" variant="outlined" sx={{borderWidth: 3, borderRadius: 30, whiteSpace: 'nowrap', minWidth: 334}} fullWidth
                                        endAdornment={
                                        <IconButton aria-label='search' onClick={() => {}} onMouseDown={() => {}} edge="end">
                                            <SearchOutlinedIcon fontSize="large" color="primary"/>
                                        </IconButton>}>
            
                                    </OutlinedInput>
                                </FormControl>
                             </div> : <></> }
            
        </div>
    )
}

export default Search