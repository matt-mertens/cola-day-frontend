import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Card, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        paddingTop: theme.spacing(0),
        padding: theme.spacing(5),
        position: 'relative',
    },
    title: {
        color: '#d3ffff',
    },
    card: {
        padding:  theme.spacing(3),
    }
}));

export default function Index() {
    const classes = useStyles();

    return (
        <div>
            <div className={classes.root}>
                <div style={{display:'flex', justifyContent:'space-between'}}>
                    <div>
                        <Typography  className={classes.title} variant='h4' gutterBottom>
                            About
                        </Typography>
                    </div>
                </div>
                <Card className={classes.card}>
                <p>
                    Its that time of year! The annual Cola day is here and this year things are a little different. 
                </p>
                <p>
                    This year Coke and Pepsi are teaming up to host Cola Day and meet with their most loyal customers and business partners. Coke and Pepsi have allocated 20 rooms (10 for each company) to be reserved to meet and discuss Cola day activities. We are excited to discuss all the interesting projects we have been working on this year, including a new COLA token that can be used to buy Cola and runs on the Ethereum blockchain.
                </p>
                </Card>
           </div>
        </div>
    )
}
