import { useSellersAuthContext } from '@kickzone-workspace/sellers-auth-context';
import { SELLER_ROUTES } from '@kickzone-workspace/sellers-routes';
import { useI18nContext } from '@kickzone-workspace/shared-i18n';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ReceiptIcon from '@mui/icons-material/Receipt';
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
  const { LL } = useI18nContext();

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
            {LL.navigation.products()}
          </Button>
          <Button
            color="inherit"
            component={RouterLink}
            to={SELLER_ROUTES.ORDERS}
          >
            {LL.navigation.orders()}
          </Button>
          {user ? (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="body1" sx={{ mr: 2 }}>
                {user.name}
              </Typography>
              <Button color="inherit" onClick={logout}>
                {LL.button.logout()}
              </Button>
            </Box>
          ) : (
            <Button
              color="inherit"
              component={RouterLink}
              to={SELLER_ROUTES.LOGIN}
            >
              {LL.button.login()}
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
            <CustomListItemText primary={LL.navigation.home()} />
          </ListItemButton>

          <ListItemButton
            to={SELLER_ROUTES.PRODUCTS}
            component={RouterLink}
            selected={location.pathname === SELLER_ROUTES.PRODUCTS}
          >
            <ListItemIcon>
              <ShoppingCartIcon />
            </ListItemIcon>
            <CustomListItemText primary={LL.navigation.products()} />
          </ListItemButton>

          <ListItemButton
            to={SELLER_ROUTES.ORDERS}
            component={RouterLink}
            selected={location.pathname === SELLER_ROUTES.ORDERS}
          >
            <ListItemIcon>
              <ReceiptIcon />
            </ListItemIcon>
            <CustomListItemText primary={LL.navigation.orders()} />
          </ListItemButton>

          <ListItemButton
            to={SELLER_ROUTES.CONTACT}
            component={RouterLink}
            selected={location.pathname === SELLER_ROUTES.CONTACT}
          >
            <ListItemIcon>
              <ContactMailIcon />
            </ListItemIcon>
            <CustomListItemText primary={LL.navigation.contact()} />
          </ListItemButton>
        </List>
      </StyledDrawer>
    </>
  );
}

export default Headerbar;
