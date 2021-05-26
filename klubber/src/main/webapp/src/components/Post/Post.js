import React, {useEffect, useState} from "react";
import Button from "@material-ui/core/Button";
import axios from "axios";
import AuthService from "../../service/auth/AuthService";


export default function Post() {

    const sendPostHandler = () => {
        axios.post("/createpost", {
            content: "this is my first post!!",
            username: AuthService.getCurrentUser().username,
            subClubName: "Football"
        }).then((response) => {
              console.log(response.data)
        })
    }

    return (
        <div>
            <Button
                onClick={sendPostHandler}
                variant="contained"
                color="primary"
            >
                Post
            </Button>
        </div>
    )
}