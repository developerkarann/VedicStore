import React from 'react'
import ErrorIcon from "@material-ui/icons/ErrorOutline";
import { Typography } from "@material-ui/core";
import './productNotFound.css'
import { Link } from "react-router-dom";

export default function ProductNotFound() {
    return (
        <>
            <div className="ProductNotFound">
                <ErrorIcon />
                {/* <h1>Product Not Found!</h1> */}

                <Typography>Product Not Found !</Typography>
                <Link to="/products">All Products</Link>
            </div>
        </>
    )
}
