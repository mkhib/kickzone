import { useSellersAuthContext } from '@kickzone-workspace/sellers-auth-context';
import { SELLER_ROUTES } from '@kickzone-workspace/sellers-routes';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { styled } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';

const drawerWidth = 300;

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: drawerWidth,
    boxSizing: 'border-box',
  },
}));

const CustomListItemText = styled(ListItemText)(({ theme }) => ({
  color: '#000000',
}));

export function Headerbar() {
  const { user, logout } = useSellersAuthContext();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: '#333333' }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Kickzone
          </Typography>
          <Button
            color="inherit"
            component={RouterLink}
            to={SELLER_ROUTES.PRODUCTS}
          >
            Products
          </Button>
          {user ? (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="body1" sx={{ mr: 2 }}>
                {user.name}
              </Typography>
              <Button color="inherit" onClick={logout}>
                Logout
              </Button>
            </Box>
          ) : (
            <Button
              color="inherit"
              component={RouterLink}
              to={SELLER_ROUTES.LOGIN}
            >
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <StyledDrawer
        anchor="left"
        open={drawerOpen}
        onClose={handleDrawerToggle}
      >
        <List>
          <ListItemButton
            to={SELLER_ROUTES.HOME}
            component={RouterLink}
            selected={location.pathname === SELLER_ROUTES.HOME}
          >
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <CustomListItemText primary="Home" />
          </ListItemButton>

          <ListItemButton
            to={SELLER_ROUTES.PRODUCTS}
            component={RouterLink}
            selected={location.pathname === SELLER_ROUTES.PRODUCTS}
          >
            <ListItemIcon>
              <ShoppingCartIcon />
            </ListItemIcon>
            <CustomListItemText primary="Products" />
          </ListItemButton>

          <ListItemButton
            to={SELLER_ROUTES.CONTACT}
            component={RouterLink}
            selected={location.pathname === SELLER_ROUTES.CONTACT}
          >
            <ListItemIcon>
              <ContactMailIcon />
            </ListItemIcon>
            <CustomListItemText primary="Contact" />
          </ListItemButton>
        </List>
      </StyledDrawer>
    </>
  );
}

export default Headerbar;
