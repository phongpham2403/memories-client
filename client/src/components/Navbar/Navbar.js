import { AppBar, Avatar, Button, Toolbar, Typography } from '@material-ui/core';
import decode from 'jwt-decode';
import React, { memo, useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { authConstant } from '../../constants';
import memories from '../../images/memories.png';
import useStyles from './style';

const Navbar = props => {

    const classes = useStyles()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))

    useEffect(() => {
        // const tokenId = user?.token
        setUser(JSON.parse(localStorage.getItem('profile')))
    }, [location])

    const handleLogout = useCallback(() => {
        dispatch({
            type: authConstant.LOGOUT
        })
        navigate('/auth')
        setUser(null)
    }, [dispatch, navigate])
    
    useEffect(() => {
        const token = user?.token;

        if (token) {
            const decodedToken = decode(token);

            if (decodedToken.exp * 1000 < new Date().getTime()) handleLogout();
        }

        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [handleLogout, location, user?.token]);
    

    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
            <div className={classes.brandContainer}>
                <Typography component={Link} to="/" className={classes.heading} variant="h2" align="center">Memories</Typography>
                <img className={classes.image} src={memories} alt="icon" height="60" />
            </div>
            <Toolbar className={classes.toolbar}>
                {user?.result ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user?.result.name} src={user?.result.imageUrl}>{user?.result.name.charAt(0)}</Avatar>
                        <Typography className={classes.userName} variant="h6">{user?.result.name}</Typography>
                        <Button variant="contained" className={classes.logout} onClick={handleLogout} color="secondary">Logout</Button>
                    </div>
                ) : (
                    <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
                )}
            </Toolbar>
        </AppBar>
    )
}


export default memo(Navbar)