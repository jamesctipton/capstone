import axios from "axios";
import React, { useState } from "react";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import {
    FormControl,
    OutlinedInput,
    IconButton,
    Button,
    TextField,
    Grid,
    Typography,
    InputLabel,
    Select,
    MenuItem,
    Divider,

} from '@mui/material';
import { Box } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { useNavigate } from "react-router-dom";


const search_url = 'http://127.0.0.1:5000/search-'
const create_poll_url = 'http://127.0.0.1:5000/create-poll'

const HotelSearch = () => {

    const navigate = useNavigate()
    const navigateToCreateGroup = () => {
        navigate('/join-create')
    }
     
    //error handling
    const [errorValue, setError] = useState({
        message: "",
        result: false
    })

    //variables that will change based on user input
    const [input, setInput] = useState("")
    const [cityRows, setCityRows] = useState([])
    const [poiRows, setpoiRows] = useState([])
    const [selectedPOIs, setselectedPOIs] = useState([])
    const [persistentPOIs, setpersistentPOIs] = useState([])
    const [arrivalDate, setArrivalDate] = useState("")
    const [returnDate, setReturnDate] = useState("")

    const [pollNameValue, setPollName] = useState("")
    const [groupValue, setGroupValue] = useState("")

    const user = JSON.parse(localStorage.getItem('user'))

    const cityColumns = [
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
        },
        {
            field: 'searchCityButton',
            headerName: '',
            minWidth: 150,
            flex: 0.2,
            renderCell: (params) => {
                const onClick = (e) => {
                    let stateCode
                    if(params.row['stateCode'] === undefined) {
                        stateCode = ""
                    } else {
                        stateCode = params.row['stateCode']
                    }
                    searchPOIs(params.row['name'], params.row['countryCode'], stateCode, params.row['latitude'], params.row['longitude'], 15)
                }
                return (
                    <Grid container justifyContent="flex-end">
                        <Button sx={{ fontSize: 12 }} onClick={() => onClick()}>Search Landmarks</Button>
                    </Grid>

                )
            }
        }
    ]

    const poiColumns = [
        {
            field: 'name',
            headerName: 'Name',
            minWidth: 240,
            flex: 0.4
        },
        {
            field: 'URL',
            headerName: 'Website',
            renderCell: (params) =>
                <a href={params.row.URL + '~hotel'} target="blank">{params.row.URL}</a>,
            minWidth: 200,
            flex: 0.4
        },
        {
            field: 'category',
            headerName: 'Category',
            minWidth: 140,
            flex: 0.2,
            align: 'right',
            headerAlign: 'right'
        }
    ]

    if(document.querySelector('.MuiDataGrid-root .MuiDataGrid-columnHeaderCheckbox .MuiDataGrid-columnHeaderTitleContainer') != null) {
        if(selectedPOIs.length === 0) {
            document.querySelector('.MuiDataGrid-root .MuiDataGrid-columnHeaderCheckbox .MuiDataGrid-columnHeaderTitleContainer').style.display = 'none';
        }
        else {
            document.querySelector('.MuiDataGrid-root .MuiDataGrid-columnHeaderCheckbox .MuiDataGrid-columnHeaderTitleContainer').style = {display: 'hidden'};
        }
    }

    const searchCities = (dest) => {
        setpoiRows([])
        if(dest.length < 3) {
            setError({ message: "Please enter more than 3 characters to search for a city", result: true })
        } else {
            setError({ message: "", result: false })
            axios.post(search_url+'destinations', {
                keyword: dest
            }).then((response) => {
                const results = response['data']['destinations']
                if(results.length === 0){
                    setError({ message: "No results found.", result: true })
                }

                let temp_array = []
                for(let i = 0; i < results.length; i++){
                    results[i].id = results[i].name + i.toString()
                    temp_array.push(results[i])
                }
                setCityRows(temp_array)
            }).catch((error) => {
                setError({ message: error, result: true })
            })
        }
    }

    const searchPOIs = (name, country, state, latitude, longitude, radius) => {
        setselectedPOIs([])
        setError({ message: "", result: false})
        axios.post(search_url+'pois', {
            city: name,
            country: country,
            state: state,
            latitude: latitude,
            longitude: longitude,
            radius: radius,
        }).then((response) => {
            const results = response['data']['pois']
            console.log(results)
            let temp_array = []
            for(let i = 0; i < results.length; i++) {
                results[i].id = results[i].name + i.toString()
                temp_array.push(results[i])
            }
            setpoiRows(temp_array)
        }).catch((error) => {
            console.log(error)
        })
    }

    const createPoll = (group, name, options) => {
        console.log(group, name, options)
        axios.post(create_poll_url, {
            user: user.name,
            groupid: group,
            pollname: name,
            pollOptions: options,
            category: "poi"
        }).then((response) => {
            console.log(response)
        }).catch((error) => {
            setError({ message: error, result: true })
        })
    }

    return (
            //search cities first
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '90%', marginTop: '2%' }}>
                <div style={{ display: 'flex', justifyContent: 'center', width: '80%' }}>
                    <FormControl fullWidth>
                        <OutlinedInput 
                            placeholder="Search Destination"
                            variant="outlined" 
                            sx={{borderWidth: 3, borderRadius: 30, whiteSpace: 'nowrap', minWidth: 334}} 
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            fullWidth
                            endAdornment={
                                <IconButton aria-label='search' onClick={() => searchCities(input)} onMouseDown={() => {}} edge="end">
                                    <SearchOutlinedIcon fontSize="large" color="primary"/>
                                </IconButton>}>
                        </OutlinedInput>
                    </FormControl>
                </div>
                {/* { errorValue.result ? 
                    <Box sx={{ border: '3px solid red', background: 'rgba(255, 0, 0, 0.1)', color: 'red', padding: 2 }}>
                        <Typography>{errorValue.message}</Typography>
                    </Box> 
                : <></> } */}
                {persistentPOIs.length > 0 ?
                    <div styled={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: 10, marginTop: '3%', marginBottom: '2%' }}>
                            {persistentPOIs.map((dest, i) => {
                                return (
                                    <Box key={i} sx={{ border: '2px solid orange', borderRadius: 5, background: 'rgba(207, 125, 48, 0.21)', padding: 1 }}>
                                        <Button
                                            color='primary'
                                            onClick={() => {
                                                let temp = persistentPOIs.splice(i,1)
                                                setpersistentPOIs(persistentPOIs.filter(n => !temp.includes(n)))
                                            }}
                                        >x {dest['name']}</Button>
                                    </Box>
                                )
                            })}
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', width: '100%', justifyContent: 'center' }}>
                            <div style={{ display: 'flex', gap: 10, minWidth: 'max-content', marginTop: '2%'}}>
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
                                    disabled={(!(user || persistentPOIs.length > 5) && (persistentPOIs.length === 1 || persistentPOIs.length === 0)) || (groupValue === "" || pollNameValue === "")}
                                    sx={{ border: '2px solid orange', borderRadius: 1, padding: 1, whiteSpace: 'no-wrap', minWidth: 'max-content' }} 
                                    onClick={() => createPoll(groupValue, pollNameValue, persistentPOIs)}
                                >
                                    Add Poll
                                </Button>
                            </div>
                        </div>
                    </div>
                :<></>}
                {poiRows.length === 0 ? 
                    <Box width='100%' height={1000} marginTop='2%'>
                        {cityRows.length > 0 ?
                            <DataGrid
                                rows={cityRows}
                                columns={cityColumns}
                                pageSize={20}
                                rowsPerPageOptions={[20]}
                            />
                        : <></>}
                        
                    </Box>
                    : 
                    <Box width='100%' height={1000} marginTop='2%'>
                        {poiRows.length > 0 ?
                            <DataGrid 
                                rows={poiRows}
                                columns={poiColumns}
                                pageSize={20}
                                rowsPerPageOptions={[20]}
                                checkboxSelection
                                isRowSelectable={(p) => (persistentPOIs.length) < 5 || !(selectedPOIs.indexOf(p.row) === -1)}
                                onSelectionModelChange={(ids) => {
                                    let temp = ids.map((id) => poiRows.find((row) => row.id === id))
                                    let t2 = selectedPOIs
                                    setselectedPOIs(temp)
                                    if(persistentPOIs.length === 0) {
                                        setpersistentPOIs(temp)
                                    }
                                    let current = persistentPOIs
                                    let x = temp.filter(n => !selectedPOIs.includes(n))
                                    if(x[0] != undefined) {
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
                                    setpersistentPOIs(current)
                                }}
                            />
                        :<></>}
                    </Box>
                }
            </div>
    )
}
export default HotelSearch