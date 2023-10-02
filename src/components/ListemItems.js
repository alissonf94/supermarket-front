import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Badge } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import HistoryIcon from '@mui/icons-material/History';

export const mainListItems = (
    <React.Fragment>
        <ListItemButton href='/'>
            <ListItemIcon>
                <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Main"/>
        </ListItemButton>
        <ListItemButton href='/products'>
            <ListItemIcon>
                <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Products" />
        </ListItemButton>
        
    </React.Fragment>
);

export const secondaryListItems = (
    <React.Fragment>
        <ListSubheader component="div" inset >
            User
        </ListSubheader>
        <ListItemButton href='/carrinho'>
            <ListItemIcon>
                <Badge badgeContent={1} color="error">
                <ShoppingCartIcon />
            </Badge>
            </ListItemIcon>
            <ListItemText primary="Carrinho" />
        </ListItemButton>
        <ListItemButton href='/settingUser'>
            <ListItemIcon>
                <SettingsIcon/>
            </ListItemIcon>
            <ListItemText primary="Setting" />
        </ListItemButton>
        <ListItemButton href='/historyBuy'>
            <ListItemIcon>
                <HistoryIcon/>
            </ListItemIcon>
            <ListItemText primary="History" />
        </ListItemButton>
    </React.Fragment>
);
export const thirdListItems = (
    <React.Fragment>
        <ListSubheader component="div" inset >
           Employeer
        </ListSubheader>
        <ListItemButton href='/promotion'>
            <ListItemIcon>
                <Badge badgeContent={1} color="error">
                <ShoppingCartIcon />
            </Badge>
            </ListItemIcon>
            <ListItemText primary="Promotion" />
        </ListItemButton>
        <ListItemButton href='/settingUser'>
            <ListItemIcon>
                <SettingsIcon/>
            </ListItemIcon>
            <ListItemText primary="Setting" />
        </ListItemButton>
        <ListItemButton href='/historyBuy'>
            <ListItemIcon>
                <HistoryIcon/>
            </ListItemIcon>
            <ListItemText primary="History" />
        </ListItemButton>
    </React.Fragment>
);