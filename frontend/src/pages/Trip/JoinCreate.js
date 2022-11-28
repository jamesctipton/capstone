import React, { useState } from 'react';
import Switch from '@mui/material/Switch';
import { 
    InputAdornment,
    Button,
    Typography,
} from '@mui/material';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import { useNavigate } from "react-router-dom";
import { 
    FormControlLabel, 
    FormGroup, 
    IconButton 
} from '@mui/material';
import axios from 'axios';


const join_url = 'http://127.0.0.1:5000/join-group'
const create_url = 'http://127.0.0.1:5000/create-group'

const JoinCreate = () => {

    const user = JSON.parse(localStorage.getItem('user'));
    
    const navigate = useNavigate()
    const navigateGroupHome = (groupCode) => {
        navigate('/trip/' + groupCode)
    }

    const [groupCode, setGroupCode] = useState("")
    const [createdGroupValues, setValues] = useState({
        image: "",
        name: "",
        private: false,
    })
    const [errorValue, setError] = useState({
        message: "",
        result: false
    })

    const [file, setFile] = useState(null);

    const updateUser = (response) => {
        var temp = user
        user.groups.push({
            groupname: response['data']['name'],
            groupimage: response['data']['destination'],
            groupCode: response['data']['groupCode'],
            destination: response['data']['description'],
            summary: response['data']['imgPath']
        });
        localStorage.setItem('user', JSON.stringify(temp))
    }

    const verifyGroup = (event) => {
        axios.post(join_url, {
            groupCode: groupCode,
            username: user.name
        }).then((response) => {
            if(response['data']['resultStatus'] === 'SUCCESS') {
                console.log(response)
                navigateGroupHome(groupCode)
                updateUser(response)
            } else {
                console.log(response)
                setError({message: response['data']['message'], result: true})
            }
        }).catch((error) => {
            console.log(error)
        })
    }

    const submitNewGroup = (event) => {
        
        axios.post(create_url, {
            groupname: createdGroupValues.name,
            destination: "",
            groupimage: (file == null) ? "" : file,
            summary: "",
            groupstate: createdGroupValues.private,
            username: user.name
        }).then((response) => {
            if(response['data']['resultStatus'] === 'SUCCESS'){
                console.log(response)
                navigateGroupHome(response['data']['groupCode'])
                updateUser(response)
            }
        }).catch((error) => {
            console.log(error)
        })
    }

    const handleFileChange = (event) => {
        var reader = new FileReader();
        reader.onloadend = function() {
            setFile(reader.result)
        }
        reader.readAsDataURL(event.target.files[0]); 
    }

    return (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 3px 1fr', marginTop: '10%' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant='h3' sx={{ color: '#CF7D30', marginBottom: '13%' }}>Join Group</Typography>
                <Typography variant='h6' sx={{ marginBottom: '6%', alignItems: 'center' }}>Please enter the group's 4 digit code</Typography>
                <TextField
                    variant='outlined'
                    placeholder='Code'
                    value={groupCode}
                    onChange={(e) => setGroupCode(e.target.value)}
                    sx={{ width: '65%', paddingBottom: 5 }}
                    InputProps={{
                        startAdornment: <InputAdornment position="start" sx={{ marginLeft: '42%' }}></InputAdornment>
                    }}
                    required
                    error={errorValue.result}
                    helperText={(errorValue.result) ? errorValue.message : ""}
                ></TextField>
                <Button 
                    disabled={(groupCode.length !== 4)}
                    type='submit'
                    variant="outlined"
                    sx={{ m: 1, borderWidth: 3, borderRadius: 30, background: 'rgba(207, 125, 48, 0.31)', fontWeight: 600, whiteSpace: 'nowrap', minWidth: 'maxContent', width: '50%', height: 50, fontSize: 15, marginTop: '10%' }}
                    size="large"
                    onClick={() => verifyGroup(groupCode)}
                    //component={Link} to={"/trip/" + groupCode}
                >Submit</Button>
                    
            </div>
                <Divider orientation='vertical' variant='middle' flexItem sx={{ background: '#CF7D30' }}></Divider>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant='h3' sx={{ color: '#CF7D30' }}>Create Group</Typography>
                {(file === null) ?
                <IconButton component="label" >
                    <input hidden accept="image/*" type="file" onChange={(e) => {handleFileChange(e)}} />
                    <PersonPinIcon color='primary' sx={{ width: 90, height: 90 }} />
                </IconButton>
                :
                <div component="label" style={{ display: 'flex', flexDirection: 'column'}}>
                    <img src={`${file}`} alt="group" style={{ width: 90, height: 90, overflow: 'hidden', borderRadius: 100 }} />
                    <Button size='small' component="label">Change
                        <input hidden accept="image/*" type="file" onChange={(e) => {handleFileChange(e)}} />
                    </Button>
                </div>
            }
                <Typography variant="p" sx={{ marginBottom: 1, color: "#666666", fontSize: 14 }} >Upload Group Photo</Typography>
                <TextField
                    variant='outlined'
                    sx={{ width: '65%' }}
                    placeholder='Group Name'
                    helperText="*Please enter a name for your group"
                    value={createdGroupValues.name}
                    onChange={(e) => setValues({...createdGroupValues, name: e.target.value})}
                    FormHelperTextProps={{
                        style: {
                            color: 'black',
                            fontWeight: 400
                        }
                    }}
                    required
                ></TextField>
                <FormGroup style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', gap: 100, paddingLeft: 25, paddingBottom: 5 }}>
                    <Typography variant='h7' >Private Group</Typography>
                    <FormControlLabel control={<Switch color='warning' size='medium' value={createdGroupValues.private} onChange={(e) => setValues({...createdGroupValues, private: e.target.checked})} />} />
                </FormGroup>
                <Typography variant='p' style={{ textAlign: 'center', fontSize: 'small', paddingLeft: 10, paddingRight: 10 }}>Public means everyone in the group can invite others, Private means only selected persons can</Typography>
                <Button 
                    type='submit'
                    variant="outlined"
                    sx={{ m: 1, borderWidth: 3, borderRadius: 30, background: 'rgba(207, 125, 48, 0.31)', fontWeight: 600, whiteSpace: 'nowrap', minWidth: 'maxContent', width: '50%', height: 50, fontSize: 15 }}
                    size="large"
                    onClick={() => submitNewGroup()}
                >Create Group</Button>
            </div>
        </div>
  )};
  
  export default JoinCreate;