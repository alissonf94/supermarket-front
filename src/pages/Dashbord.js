import { useState } from 'react';
import { styled, } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import PersonIcon from '@mui/icons-material/Person';
import { Avatar, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { BrowserRouter as Router, Routes, Route,} from 'react-router-dom'
import SignIn from './Signin';
import SignUp from './SignUp';
import { mainListItems, secondaryListItems, thirdListItems } from '../components/ListemItems';
import Products from './Products';
import { ShoppingList } from './ShoppingList';
import SettingUser from './SettingUser';
import { HistoryBuy } from './HistoryBuy';
import Promotion from './Promotion';
import ProductEmployee from "./ProductEmployee"
import LogoutIcon from '@mui/icons-material/Logout';
import Home from './Home';

const drawerWidth = 200;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                },
            }),
        },
    }),
);

const isAuthenticated = () => {
    const token = localStorage.getItem("token");
    const type = localStorage.getItem("type");
    return {token , type};
};

export default function Dashboard() {    
    
    const Logout = () =>{
        localStorage.removeItem("token")
        localStorage.removeItem("type")
        window.location.reload()
    }
    const [authenticated, setAuthenticated] = useState(isAuthenticated);

    const handleLogin = () => {
        setAuthenticated(true);
        window.location.reload()
    };

    const [open, setOpen] = useState(false);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar position="absolute" open={open}>
                    <Toolbar
                        sx={{
                            pr: '24px',
                            bgcolor: 'third.main',
                        }}
                    >
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={toggleDrawer}
                            sx={{
                                marginRight: '30px',
                                ...(open && { display: 'none' }),
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            component="h1"
                            variant="h6"
                            color="inherit"
                            noWrap
                            sx={{ flexGrow: 1 }}
                        >
                            Market
                        </Typography>
                        <Link href={authenticated.token ? '/' : "/signin"} >
                            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                <PersonIcon />
                            </Avatar>
                        </Link>
                    </Toolbar>
                </AppBar>
                <Drawer variant="permanent" open={open}>
                    <Toolbar
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            px: [1],
                        }}
                    >
                        <IconButton onClick={toggleDrawer}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </Toolbar>
                    <Divider />
                    <List component="nav">
                        {mainListItems}
                        <Divider sx={{ my: 2 }} />
                        {authenticated.token ? (authenticated.type === "client" ? secondaryListItems : thirdListItems) : ''}
                        {authenticated.token ? <Divider /> : ''}
                        {authenticated.token ? <ListItemButton onClick={Logout}>
                            <ListItemIcon>
                                <LogoutIcon />
                            </ListItemIcon>
                            <ListItemText primary="Logout" />
                        </ListItemButton> : ''}

                    </List>
                </Drawer>
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        height: '100vh',
                        overflow: 'auto',
                        padding: '15px',
                        backgroundColor: "dark"
                    }}
                >
                    <Toolbar />
                    <Router >
                        <Routes>
                            <Route exact path="/"  element={<Home/>} />
                            <Route path='/signin' element={<SignIn onSignIn={handleLogin} />} />
                            <Route path='/signup' element={<SignUp />} />
                            <Route path='/products' element={< Products />} />
                            {authenticated.token && (
                                <>
                                    <Route path='/historyBuy' element={<HistoryBuy />} />
                                    <Route path='/carrinho' element={<ShoppingList />} />
                                    <Route path='/settingUser' element={<SettingUser />} />
                                    <Route path='/promotion' element={<Promotion />} />
                                    <Route path='/productEmployee' element={<ProductEmployee/>}></Route>
                                </>
                            )}
                        </Routes>
                    </Router>
                </Box>
            </Box>
        </>
    );
}
