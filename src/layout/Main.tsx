import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom";

import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';

import NavBar from './NavBar';
import { authApi } from '../services/auth';
import { CircularProgress, Container } from '@material-ui/core';
import Web3 from 'web3';
import RoomBooking from '../abis/RoomBooking.json'

declare global {
  interface Window {
      ethereum: any;
      web3: any;
  }
}

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

    const [account, setAccount] = useState(null);
    const [network, setNetwork] = useState(null);
    const [bookingContract, setBookingContract] = useState(null);

    const loadWeb3 = async () =>  {
      if(typeof window.ethereum !== 'undefined') {
        window.web3 = new Web3(window.ethereum)
        await window.ethereum.enable()
        window.ethereum.on('chainChanged', (_chainId: number) => window.location.reload());
      } else {
        console.log('Non ethereum supported browser detected. Consider installing metamask')
      }
  
    }

    const loadBlockChainData = async () => {
      const web3 = window.web3
      const accounts = await web3.eth.getAccounts()
      setAccount(accounts[0])
  
      const networkId = await web3.eth.net.getId()
  
      let chainData = await (await fetch('https://chainid.network/chains.json')).json()
  
      let network = 'unknown';
      network = chainData.find(chain => chain.networkId === networkId)
  
      if (networkId === 1) {
        network = 'mainNet';
      } else if (networkId === 3) {
        network = 'ropsten';
      } else if (networkId === 4) {
        network = 'rinkeby';
      } else if (networkId === 42) {
        network = 'kovan';
      } else if (networkId === 5) {
        network = 'goerli';
      }
      setNetwork(network)
  
      const roomBooking = new web3.eth.Contract(RoomBooking.abi, '0xd9145CCE52D386f254917e481eB44e9943F39138')
      setBookingContract(roomBooking)
  
      if(bookingContract) {
        const reservationsCount = await bookingContract.methods.reservationCount().call()
        console.log(reservationsCount)
      } else {   
        console.log('Booking contract contract has not been deployed to the detected network')
      }
  
      //    // Load images
      //    for (var i = 1; i <= imagesCount; i++) {
      //     const image = await decentragram.methods.images(i).call()
      //     this.setState({
      //       images: [...this.state.images, image]
      //     })
      //   }
      //   // Sort images. Show highest tipped images first
      //   this.setState({
      //     images: this.state.images.sort((a,b) => b.tipAmount - a.tipAmount )
      //   })
      // this.setState({loading: false})
    }

    const [isLoadingAuthentication, setLoadingAuthentication] = useState<boolean>(false);
    const [authenticatedUser, setAuthenticatedUser] = useState(null);

    useEffect(() => {
      let accessToken = localStorage.getItem('accessToken')

      loadWeb3()
      loadBlockChainData()

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