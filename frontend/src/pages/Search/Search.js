import React, { useState } from "react";
import { 
    Button, 
    Divider, 
} from "@mui/material";
<<<<<<< HEAD
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import axios from "axios";
// import { DataGrid } from '@mui/x-data-grid';
=======
>>>>>>> 476b51acf1e75ee7e5d6f15b3d275b5a7c88afb6

import DestinationSearch from "../../components/DestinationSearch";
import HotelSearch from "../../components/HotelSearch";
import POISearch from "../../components/POISearch";

const Search = () => {

    const [initCriteria, setInitCriteria] = useState("destination")
    /*const [errorValue, setError] = useState({
        message: "",
        result: false
    })*/    
    const user = JSON.parse(localStorage.getItem('user'))

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
                    sx={{ backgroundColor: (initCriteria === 'pois') ? 'rgba(207, 125, 43, .31)' : 'rgba(0,0,0,0)', marginLeft: 2, marginRight: 2 }}
                    onClick={() => setInitCriteria("pois")}
                    fullWidth
                >Points of Interest</Button>
            </div>
            <Divider orientation="horizontal" variant="fullwidth" flexItem sx={{ background: '#CF7D30'}}></Divider>
<<<<<<< HEAD
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
                        <Select
                            id="group"
                            label="Group"
                            placeholder="Select Group"
                            value={groupValue}
                            onChange={(e) => setGroupValue(e.target.value)}
                            variant="outlined"
                            
                        >
                            <MenuItem value={1}>Group #1</MenuItem>
                            <MenuItem value={2}>Group #2</MenuItem>
                            <MenuItem value={3}>Group #3</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField id='poll_name' label="Poll Name" variant="outlined" onChange={(e) => setPollName(e.target.value)} value={pollNameValue} sx={{ minWidth: 'max-content'}}></TextField>
                    <Button disabled={!(isLoggedIn || selectedDestinations.length > 5)} sx={{ border: '2px solid orange', borderRadius: 1, padding: 1, whiteSpace: 'no-wrap', minWidth: 'max-content' }} onClick={() => addPoll(groupValue, pollNameValue, selectedDestinations)}>
                        Add Poll
                    </Button>
                </div>
            </div>
            {/* <Box sx={{ height: 1152, width: '97%', marginTop: '2%'}}>
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
            </Box> */}
    </div>
=======
            {initCriteria === "destination" ? 
                <DestinationSearch hotelSearch={false} />
                : (initCriteria === "hotels" ? 
                    <HotelSearch /> : 
                    (initCriteria === "pois" ? 
                        <POISearch /> : <></>))}
        </div>
>>>>>>> 476b51acf1e75ee7e5d6f15b3d275b5a7c88afb6
    )
}

export default Search;