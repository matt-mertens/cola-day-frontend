import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom";

import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';

import NavBar from './NavBar';
import { authApi } from '../services/auth';
import { createNull } from 'typescript';
import { CircularProgress, Container } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    toolbar: theme.mixins.toolbar,
    content: {
      // marginTop: '64px',
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
      // padding: theme.spacing(3),
      paddingBottom:'65px',
    },
    logo: {
      height: '20px',
      marginRight: '7px',
    }
  }),
);


const Main = (props: any) => {
    const classes = useStyles();
    let history = useHistory();

    const [isLoadingAuthentication, setLoadingAuthentication] = useState<boolean>(false);
    const [authenticatedUser, setAuthenticatedUser] = useState(null);

    useEffect(() => {
      let accessToken = localStorage.getItem('accessToken')

      if (accessToken) {
        setLoadingAuthentication(true)
        authApi.user.getAuthenticatedUser()
        .then(res => {
          let user = res.data;
          setAuthenticatedUser(user)
        })
        .catch(error => {
          console.log(error)
          history.push('/login')
        })
        .finally(() => {
          setLoadingAuthentication(false)
        })
      } else {
        history.push('/login')
      }

    }, [])

    let childrenInjectedWithProps = React.cloneElement(props.children, { authenticatedUser })

    return (
        <div>
            <NavBar authenticatedUser={authenticatedUser} />
            <main className={classes.content}>
              {isLoadingAuthentication ? 
                <Container style={{textAlign:'center', padding:'50px'}}>
                    <CircularProgress />
                </Container>
              :
                childrenInjectedWithProps
              }
            </main>
        </div>
    )
}

export default Main;