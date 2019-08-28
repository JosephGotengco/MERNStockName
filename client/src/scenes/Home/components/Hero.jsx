import React, { Component } from 'react';
import { heroContainer, heroTitle, heroCaption } from '../styles.module.css'
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const theme = createMuiTheme({
    palette: {
        primary: { 500: '#00e676' },
        secondary: { 'A400': '#0277bd' }
    }
});

class Hero extends Component {
    state = {}
    render() {
        return (
            <div className='d-block w-100'>
                <div className={heroContainer}>
                    <h1 className={heroTitle}>
                        STOCK NAME
                    </h1>
                    <h4 className={heroCaption}>
                        A secure, reliable, and fast way to reach the stock market.
                    </h4>
                    <ThemeProvider theme={theme}>
                        <Button variant="contained" color="primary" className="mt-3 mr-3">
                            Sign Up
                        </Button>
                        <Button variant="outlined" color="secondary" className="mt-3">
                            Log In
                        </Button>
                    </ThemeProvider>
                </div>
            </div>
        );
    }
}

export default Hero;