import React, {useEffect, useState} from "react";
import axios from "axios";
import {makeStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import CCForm from "./CCForm";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

const useStyles = makeStyles((theme) => ({
    Club:{
        backgroundColor:"#dadbce",
        position:"fixed",
        width:"93%",
        zIndex:"1",
        top:"4.6em",
        left:"8em",
        paddingTop:"2px",
        paddingLeft:"10px",
        paddingRight:"10px",
        borderRadius:"25px",
        height:"90%",
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 140,
    }
}));

export default function SubClubCreate(){
    const [clubName, setClubName] = React.useState('');
    const [clubs, setClubs] = useState([]);
    const [deleted, setDeleted] = useState(false);

    const handleChange = (event) => {
        setClubName(event.target.value);
    };

    useEffect(() => {
        axios.get("/listclub")
            .then(response => {
                console.log(response.data);
                setClubs(response.data);
            })
    },[deleted])



    return(
        <div className={useStyles().Club}>
            <h1>
                Sub Club Create Page
            </h1>

            <FormControl className={useStyles().formControl}>
                <InputLabel id="demo-simple-select-label">Club</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={clubName}
                    onChange={handleChange}
                >
                    {clubs.map((club) =>{
                        return(
                            <MenuItem value={club.name}>{club.name}</MenuItem>
                        )
                    })}
                </Select>
            </FormControl>

        </div>

    )
}