import { useCustomersAuth } from '@kickzone-workspace/customers-auth-context';
import { useCartItemCount } from '@kickzone-workspace/customer-cart-store';
import {
  useI18nContext,
  useThemeContext,
} from '@kickzone-workspace/shared-i18n';
import { CUSTOMER_ROUTES } from '@kickzone-workspace/customers-routes';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LanguageIcon from '@mui/icons-material/Language';
import AppBar from '@mui/material/AppBar';
import Badge from '@mui/material/Badge';
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
  const { user, logout } = useCustomersAuth();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();
  const totalItems = useCartItemCount();
  const { LL } = useI18nContext();
  const { direction } = useThemeContext();

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
            {LL.appNames.kickzone()}
          </Typography>
          <Button
            color="inherit"
            component={RouterLink}
            to={CUSTOMER_ROUTES.PRODUCTS}
          >
            {LL.navigation.home()}
          </Button>
          <IconButton
            color="inherit"
            component={RouterLink}
            to={CUSTOMER_ROUTES.CART}
            sx={{ ml: 1 }}
          >
            <Badge badgeContent={user ? totalItems : 0} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
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
              to={CUSTOMER_ROUTES.LOGIN}
            >
              {LL.button.login()}
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <StyledDrawer
        anchor={direction === 'rtl' ? 'right' : 'left'}
        open={drawerOpen}
        onClose={handleDrawerToggle}
      >
        <List>
          <ListItemButton
            to={CUSTOMER_ROUTES.PRODUCTS}
            component={RouterLink}
            selected={location.pathname === CUSTOMER_ROUTES.PRODUCTS}
          >
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <CustomListItemText primary={LL.navigation.home()} />
          </ListItemButton>

          <ListItemButton
            to={CUSTOMER_ROUTES.CART}
            component={RouterLink}
            selected={location.pathname === CUSTOMER_ROUTES.CART}
          >
            <ListItemIcon>
              <Badge badgeContent={user ? totalItems : 0} color="error">
                <ShoppingCartIcon />
              </Badge>
            </ListItemIcon>
            <CustomListItemText primary={LL.navigation.shoppingCart()} />
          </ListItemButton>

          <ListItemButton
            to={CUSTOMER_ROUTES.CONTACT}
            component={RouterLink}
            selected={location.pathname === CUSTOMER_ROUTES.CONTACT}
          >
            <ListItemIcon>
              <ContactMailIcon />
            </ListItemIcon>
            <CustomListItemText primary={LL.navigation.contact()} />
          </ListItemButton>

          <ListItemButton
            to={CUSTOMER_ROUTES.LANGUAGE_SETTINGS}
            component={RouterLink}
            selected={location.pathname === CUSTOMER_ROUTES.LANGUAGE_SETTINGS}
          >
            <ListItemIcon>
              <LanguageIcon />
            </ListItemIcon>
            <CustomListItemText primary={LL.navigation.languageSettings()} />
          </ListItemButton>
        </List>
      </StyledDrawer>
    </>
  );
}

export default Headerbar;
