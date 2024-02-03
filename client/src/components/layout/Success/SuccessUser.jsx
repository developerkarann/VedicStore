import React from 'react'
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

export default function SuccessUser() {
    return (
        <>
            <div className="PageNotFound">
                <CheckCircleIcon />

                <Typography>Account Created Successfully </Typography>
                <a href="/">Home</a>
            </div>
        </>
    )
}
