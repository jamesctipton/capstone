import React, { useState } from "react";
import { 
    Button, 
    Divider, 
} from "@mui/material";

import DestinationSearch from "../../components/DestinationSearch";

const Search = ({ isLoggedIn }) => {

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
                    sx={{ backgroundColor: (initCriteria === 'poi') ? 'rgba(207, 125, 43, .31)' : 'rgba(0,0,0,0)', marginLeft: 2, marginRight: 2 }}
                    onClick={() => setInitCriteria("poi")}
                    fullWidth
                >Points of Interest</Button>
            </div>
            <Divider orientation="horizontal" variant="fullwidth" flexItem sx={{ background: '#CF7D30'}}></Divider>
            {initCriteria === "destination" ? 
                <DestinationSearch isLoggedIn={isLoggedIn} user={user} />:<></>}
        </div>
    )
}

export default Search;