import { Step, StepLabel, Stepper, Typography } from '@material-ui/core'
import React from 'react'
import LocalShippingIcon from '@material-ui/icons/LocalShipping'
import LibraryAddCheckIcon from '@material-ui/icons/LibraryAddCheck'
import AccountBalanceIcon from '@material-ui/icons/AccountBalance'
import './css/checkOutSteps.css'

export default function CheckoutSteps({ activeSteps }) {

    const steps = [
        {
            label: <Typography>Shipping Details</Typography>,
            icon: <LocalShippingIcon />,
        },
        {
            label: <Typography>Confirm Order</Typography>,
            icon: <LibraryAddCheckIcon />
        },
        {
            label: <Typography>Payment</Typography>,
            icon: <AccountBalanceIcon />
        }
    ];

    const stepsStyle = {
        boxSizing: 'border-box',
    };
    return (
        <>
            <Stepper alternativeLabel activeStep={activeSteps} style={stepsStyle}>
                {steps.map((item, index) => (
                    <Step
                        key={index}
                        active={activeSteps === index ? true : false}
                        completed={activeSteps >= index ? true : false}
                    >
                        <StepLabel icon={item.icon}
                            style={{ color: activeSteps >= index ? 'tomato' : 'rgba(0,0,0,0.649)' }}
                        > {item.label}</StepLabel>
                    </Step>
                ))}
            </Stepper>

        </>
    )
}
