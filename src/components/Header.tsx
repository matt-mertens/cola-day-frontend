import React from 'react'

import { Button, Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    header: {
      padding: theme.spacing(15),
      position: 'absolute',
      background: 'linear-gradient(87deg,#1171ef,#11cdef)!important',
      width: '100%'
    },
    root: {
        flexGrow: 1,
        paddingTop: theme.spacing(11),
        paddingBottom: theme.spacing(5),
        padding: theme.spacing(5),
        position: 'relative',
        height: '50px',
        marginBottom: '20px'
    },
    nav: {
        color: '#d3ffff',
        textTransform: 'capitalize',
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
    },
    link: {
        textDecoration:'none',
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    navItemActive: {
        background: '#14a8ea'
    }
}));

export default function Header() {
    const classes = useStyles();

    return (
        <div>
            <div className={classes.header} />
            <div className={classes.root}>
                <Link to='/' className={classes.link}>
                    <Button className={window.location.pathname === '/' ? classes.navItemActive : ''}>
                        <Typography  className={classes.nav}>
                            Home
                        </Typography>
                    </Button>
                </Link>

                <Link to='/rooms' className={classes.link}>
                    <Button className={window.location.pathname === '/rooms' ? classes.navItemActive : ''}>
                        <Typography className={classes.nav}>
                            Rooms
                        </Typography>
                    </Button>
                </Link>

                <Link to='/reservations' className={classes.link}>
                    <Button className={window.location.pathname === '/reservations' ? classes.navItemActive : ''}>
                        <Typography  className={classes.nav}>
                            Reservations
                        </Typography>
                    </Button>
                </Link>
            </div>
        </div>
    )
}
