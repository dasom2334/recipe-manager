import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import styles from '@/styles/Profile.module.css';


function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();

export function View({recipe}) {
    
    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <Box
                    sx={{
                        marginTop: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}>
                    <Avatar
                        sx={{
                            m: 1,
                            bgcolor: 'secondary.main'
                        }}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                    User View Card
                    </Typography>
                    <Box
                        component="form"
                        noValidate="noValidate"
                        sx={{
                            mt: 1
                        }}
                       >
                        <h2
                            style={{
                                textAlign: "center"
                            }}> </h2>

                        <div className="styles.card">
                            <h1>
                            </h1>
                            <p></p>
                            <p></p>
                            <p>{JSON.stringify(recipe)}</p>
                        </div>
                    </Box>
                </Box>
                <Copyright
                    sx={{
                        mt: 8,
                        mb: 4
                    }}/>
            </Container>
        </ThemeProvider>
    );
}