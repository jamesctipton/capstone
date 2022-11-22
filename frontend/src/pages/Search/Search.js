import React, { useState } from "react";
import { Button, Divider, FormControl, OutlinedInput, IconButton } from "@mui/material";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';



const Search = () => {

    const [isActive, setActive] = useState({
        places: true,
        hotels: false,
        flights: false,
        poi: false
    })
    console.log(isActive.places)


    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '5%' }}>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', width: '100%', marginBottom: '1%'}}>
                <Button sx={{ color: isActive.places ? '#CF7D30' : '#00FF00'}}>Places</Button>
                <Divider orientation="vertical" variant="middle" flexItem sx={{ background: '#CF7D30', width: 1.5}}></Divider>
                <Button>Hotels</Button>
                <Divider orientation="vertical" variant="middle" flexItem sx={{ background: '#CF7D30', width: 1.5}}></Divider>
                <Button>Flights</Button>
                <Divider orientation="vertical" variant="middle" flexItem sx={{ background: '#CF7D30', width: 1.5}}></Divider>
                <Button>Points of Interest</Button>
            </div>
            <Divider orientation="horizontal" variant="fullwidth" flexItem sx={{ background: '#CF7D30'}}></Divider>
            <div style={{width: '80%', marginTop: '2%'}}>
                <FormControl fullWidth>
                    <OutlinedInput placeholder="Search Locations, Hotels, or Flights" variant="outlined" sx={{borderWidth: 3, borderRadius: 30, whiteSpace: 'nowrap', minWidth: 334}} fullWidth
                        endAdornment={
                        <IconButton aria-label='search' onClick={() => {}} onMouseDown={() => {}} edge="end">
                            <SearchOutlinedIcon fontSize="large" color="primary"/>
                        </IconButton>}>

                    </OutlinedInput>
                </FormControl>
            </div>
        </div>
    )
}

export default Search