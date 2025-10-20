import { useCustomersAuth } from '@kickzone-workspace/customers-auth-context';
import { useCartItemCount } from '@kickzone-workspace/customer-cart-store';
import {
  useI18nContext,
  useThemeContext,
} from '@kickzone-workspace/shared-i18n';
import { CUSTOMER_ROUTES } from '@kickzone-workspace/customers-routes';
import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LanguageIcon from '@mui/icons-material/Language';
import ReceiptIcon from '@mui/icons-material/Receipt';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CloseIcon from '@mui/icons-material/Close';
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
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import { styled } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';

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
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const totalItems = useCartItemCount();
  const { LL } = useI18nContext();
  const { direction } = useThemeContext();

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleUserMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleUserMenuClose();
    logout();
  };

  const handleMyOrders = () => {
    handleUserMenuClose();
    navigate(CUSTOMER_ROUTES.ORDERS);
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
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            variant="h6"
            component={RouterLink}
            to={CUSTOMER_ROUTES.PRODUCTS}
            sx={{
              flexGrow: 1,
              textDecoration: 'none',
              color: 'inherit',
              '&:hover': {
                opacity: 0.8,
              },
            }}
          >
            {LL.appNames.kickzone()}
          </Typography>

          {/* Cart Button */}
          <IconButton
            color="inherit"
            component={RouterLink}
            to={CUSTOMER_ROUTES.CART}
            sx={{
              mx: 1,
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              },
            }}
          >
            <Badge badgeContent={totalItems} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>

          {/* User Menu */}
          {user ? (
            <>
              <Button
                color="inherit"
                onClick={handleUserMenuOpen}
                startIcon={<AccountCircleIcon />}
                sx={{
                  textTransform: 'none',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  },
                }}
              >
                {user.name}
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleUserMenuClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              >
                <MenuItem onClick={handleMyOrders}>
                  <ListItemIcon>
                    <ReceiptIcon fontSize="small" />
                  </ListItemIcon>
                  {LL.orders.myOrders()}
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleLogout}>{LL.button.logout()}</MenuItem>
              </Menu>
            </>
          ) : (
            <Button
              color="inherit"
              component={RouterLink}
              to={CUSTOMER_ROUTES.LOGIN}
              sx={{
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                },
              }}
            >
              {LL.button.login()}
            </Button>
          )}
        </Toolbar>
      </AppBar>

      {/* Drawer */}
      <StyledDrawer
        anchor={direction === 'rtl' ? 'right' : 'left'}
        open={drawerOpen}
        onClose={handleDrawerToggle}
      >
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
          <IconButton onClick={handleDrawerToggle}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider />
        <List>
          <ListItemButton
            to={CUSTOMER_ROUTES.PRODUCTS}
            component={RouterLink}
            selected={location.pathname === CUSTOMER_ROUTES.PRODUCTS}
            onClick={handleDrawerToggle}
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
            onClick={handleDrawerToggle}
          >
            <ListItemIcon>
              <Badge badgeContent={totalItems} color="error">
                <ShoppingCartIcon />
              </Badge>
            </ListItemIcon>
            <CustomListItemText primary={LL.navigation.shoppingCart()} />
          </ListItemButton>

          {user && (
            <ListItemButton
              to={CUSTOMER_ROUTES.ORDERS}
              component={RouterLink}
              selected={location.pathname === CUSTOMER_ROUTES.ORDERS}
              onClick={handleDrawerToggle}
            >
              <ListItemIcon>
                <ReceiptIcon />
              </ListItemIcon>
              <CustomListItemText primary={LL.orders.myOrders()} />
            </ListItemButton>
          )}

          <ListItemButton
            to={CUSTOMER_ROUTES.LANGUAGE_SETTINGS}
            component={RouterLink}
            selected={location.pathname === CUSTOMER_ROUTES.LANGUAGE_SETTINGS}
            onClick={handleDrawerToggle}
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
