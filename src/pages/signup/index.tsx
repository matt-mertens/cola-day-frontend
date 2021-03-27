import React, { useState } from 'react';
import { Link, useHistory } from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';
import { TextField, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton, Card, Container, Typography, Button, CircularProgress, Snackbar } from '@material-ui/core/';
import { Visibility, VisibilityOff, Close } from '@material-ui/icons/';
import { authApi } from '../../services/auth';

const useStyles = makeStyles((theme) => ({
    card: {
      padding: theme.spacing(2),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    title: {
        margin: theme.spacing(1), 
        color: '#8898aa',
    },
    subtitle: {
        margin: theme.spacing(2), 
        color: '#8898aa',
    },
    form: {
      width: '100%',
      marginTop: theme.spacing(1),
    },
    submitButton: {
        marginTop: theme.spacing(1),
        background: 'linear-gradient(87deg,#f5365c 0,#f56036 100%)!important'
    },
}));

export default function Index() {
    const classes = useStyles();
    let history = useHistory();

    const [isAuthLoading, setAuthLoading] = useState<boolean>(false)
    const [email, setEmail] = useState<string | null>('')
    const [password, setPassword] = useState<string | null>('')
    const [passwordVisible, togglePasswordVisibility] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)

    const handleClose = (e: React.SyntheticEvent | React.MouseEvent, reason?: string) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setErrorMessage(null);
    };

    const handleSubmit = (e: React.SyntheticEvent | React.MouseEvent) => {
        e.preventDefault();

        if (email && password) {
            setAuthLoading(true)
            authApi.auth.signUp(email, password)
            .then(res => {
                const { accessToken } = res.data;
                localStorage.setItem('accessToken', accessToken)
                history.push('/')
            })
            .catch(error => {
                console.log(error)
                if (error.response) {
                    // client received an error response (5xx, 4xx)
                    const { data } = error.response;
                    if (data.statusCode === 409) {
                        setErrorMessage(data.message)
                    }
                } else if (error.request) {
                // client never received a response, or request never left
                console.log(error.request)

                } else {
                // anything else
                }
            })
            .finally(() => {
                setAuthLoading(false)
            })
        }
    }

    return (
        <Container component="div" maxWidth="xs">
            {isAuthLoading ?
                <Container style={{textAlign:'center', padding:'50px'}}>
                    <CircularProgress />
                </Container>
            :
            <Card className={classes.card}>
                <Snackbar
                    anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                    }}
                    open={errorMessage ? true : false}
                    autoHideDuration={6000}
                    onClose={handleClose}
                    message={errorMessage}
                    action={
                    <React.Fragment>
                        <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                        <Close fontSize="small" />
                        </IconButton>
                    </React.Fragment>
                    }
                />
                <Typography className={classes.title} component="h2" variant="h5">
                Signup
                </Typography>
                <form className={classes.form}>
                    <TextField 
                    fullWidth 
                    required  
                    id="email" 
                    label="Email" 
                    value={email} 
                    variant="outlined" 
                    margin="normal"
                    onChange={(e) => setEmail(e.target.value)}
                    />
                    <FormControl 
                    fullWidth 
                    required 
                    variant="outlined"
                    margin="normal"
                    >
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
                        type={passwordVisible ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => togglePasswordVisibility(!passwordVisible)}
                            edge="end"
                            >
                            {passwordVisible ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                        }
                        labelWidth={70}
                        />
                    </FormControl>
                    <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submitButton}
                    onClick={handleSubmit}
                    size='large'
                    >
                        Signup
                    </Button>
                </form>
            </Card>}
            <Typography className={classes.subtitle} variant="subtitle2">
            Already have an account? <Link to='/login'>Login</Link>
            </Typography>
        </Container>
    )
}
