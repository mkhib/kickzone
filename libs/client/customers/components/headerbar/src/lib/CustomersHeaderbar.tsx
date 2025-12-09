import { useCustomersAuth } from '@kickzone-workspace/customers-auth-context';
import { useCartItemCount } from '@kickzone-workspace/customer-cart-store';
import { useI18nContext } from '@kickzone-workspace/shared-i18n';
import { CUSTOMER_ROUTES } from '@kickzone-workspace/customers-routes';
import {
  StyledDrawer,
  CustomListItemText,
} from '@kickzone-workspace/styled-drawer';
import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LanguageIcon from '@mui/icons-material/Language';
import ReceiptIcon from '@mui/icons-material/Receipt';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AppBar from '@mui/material/AppBar';
import Badge from '@mui/material/Badge';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useState, useEffect } from 'react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';

export function Headerbar() {
  const { user, logout } = useCustomersAuth();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const totalItems = useCartItemCount();
  const { LL } = useI18nContext();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
      <AppBar
        position="fixed"
        sx={{
          background: isScrolled
            ? 'rgba(255, 255, 255, 0.95)'
            : 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          borderBottom: isScrolled
            ? '1px solid rgba(0, 0, 0, 0.1)'
            : '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: isScrolled
            ? '0 2px 8px rgba(0, 0, 0, 0.1)'
            : '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
          zIndex: (theme) => theme.zIndex.appBar + 1,
          color: '#000',
          transition: 'all 0.3s ease-in-out',
        }}
      >
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
            {LL.appNames.siteName()}
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
      <StyledDrawer open={drawerOpen} onClose={handleDrawerToggle}>
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
      </StyledDrawer>
    </>
  );
}

export default Headerbar;
