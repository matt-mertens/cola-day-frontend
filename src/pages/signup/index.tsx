import React, { useState } from 'react';
import { Link, useHistory } from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';
import { TextField, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton, Card, Container, Typography, Button, CircularProgress } from '@material-ui/core/';
import { Visibility, VisibilityOff } from '@material-ui/icons/';
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

    const handleSubmit = () => {
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
                </form>
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
            </Card>}
            <Typography className={classes.subtitle} variant="subtitle2">
            Already have an account? <Link to='/login'>Login</Link>
            </Typography>
        </Container>
    )
}
