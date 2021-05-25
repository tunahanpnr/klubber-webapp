import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import {Typography} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(4)
    },
    container: {
        marginTop: "80px",
        marginLeft: "130px",
        marginRight: "30px",
        backgroundColor:"#eeead1",
    },
    title: {
        backgroundColor:"#eeaaaa"
    }


}));

export default function Questionnaire() {
    const classes = useStyles();
    const[ifChecked,setIfChecked] = useState({q1:0,q2:0,q3:0,q4:0,q5:0})

    const handleToggle = (question,value) => () => {
        if(question==="q1"){
            setIfChecked( {...ifChecked,q1:value} );
        }else if(question==="q2"){
            setIfChecked( {...ifChecked,q2:value} );
        }else if(question==="q3"){
            setIfChecked( {...ifChecked,q3:value} );
        }else if(question==="q4"){
            setIfChecked( {...ifChecked,q4:value} );
        }else if(question==="q5"){
            setIfChecked( {...ifChecked,q5:value} );
        }
    };

    return(
        <div>
            <Typography>
                This is Question 1
            </Typography>
            <List>
                {[0, 1, 2, 3].map(value => (
                    <ListItem
                        key={value}
                        role={undefined}
                        button
                        onClick={handleToggle("q1",value)}
                    >
                        <Radio
                            checked={ifChecked.q1 === value}
                            tabIndex={-1}
                            disableRipple
                        />
                        <ListItemText
                            primary={`This a a multiline answers, please work please please`}
                        />
                    </ListItem>
                ))}
            </List>

            <Typography>
                This is Question 2
            </Typography>
            <List>
                {[0, 1, 2, 3].map(value => (
                    <ListItem
                        key={value}
                        role={undefined}
                        button
                        onClick={handleToggle("q2",value)}
                    >
                        <Radio
                            checked={ifChecked.q2 === value}
                            tabIndex={-1}
                            disableRipple
                        />
                        <ListItemText
                            primary={`This a a multiline answers, please work please please`}
                        />
                    </ListItem>
                ))}
            </List>

            <Typography>
                This is Question 3
            </Typography>
            <List>
                {[0, 1, 2, 3].map(value => (
                    <ListItem
                        key={value}
                        role={undefined}
                        button
                        onClick={handleToggle("q3",value)}
                    >
                        <Radio
                            checked={ifChecked.q3 === value}
                            tabIndex={-1}
                            disableRipple
                        />
                        <ListItemText
                            primary={`This a a multiline answers, please work please please`}
                        />
                    </ListItem>
                ))}
            </List>

            <Typography>
                This is Question 4
            </Typography>
            <List>
                {[0, 1, 2, 3].map(value => (
                    <ListItem
                        key={value}
                        role={undefined}
                        button
                        onClick={handleToggle("q4",value)}
                    >
                        <Radio
                            checked={ifChecked.q4 === value}
                            tabIndex={-1}
                            disableRipple
                        />
                        <ListItemText
                            primary={`This a a multiline answers, please work please please`}
                        />
                    </ListItem>
                ))}
            </List>

            <Typography>
                This is Question 5
            </Typography>
            <List>
                {[0, 1, 2, 3].map(value => (
                    <ListItem
                        key={value}
                        role={undefined}
                        button
                        onClick={handleToggle("q5",value)}
                    >
                        <Radio
                            checked={ifChecked.q5 === value}
                            tabIndex={-1}
                            disableRipple
                        />
                        <ListItemText
                            primary={`This a a multiline answers, please work please please`}
                        />
                    </ListItem>
                ))}
            </List>

        </div>
    )
}