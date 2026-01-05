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
import ReceiptIcon from '@mui/icons-material/Receipt';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
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
import { useUIStore } from '@kickzone-workspace/shared-ui-store';

export function Headerbar() {
  const { user, logout } = useCustomersAuth();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const totalItems = useCartItemCount();
  const { LL } = useI18nContext();
  const themeMode = useUIStore((s) => s.theme.mode);
  const toggleTheme = useUIStore((s) => s.toggleTheme);

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
          background: (theme) => {
            const isDark = theme.palette.mode === 'dark';
            return isScrolled
              ? isDark
                ? 'rgba(14, 14, 18, 0.9)'
                : 'rgba(255, 255, 255, 0.95)'
              : isDark
              ? 'rgba(14, 14, 18, 0.7)'
              : 'rgba(255, 255, 255, 0.1)';
          },
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          borderBottom: (theme) => {
            const isDark = theme.palette.mode === 'dark';
            return isDark
              ? '1px solid rgba(255,255,255,0.06)'
              : '1px solid rgba(0,0,0,0.08)';
          },
          borderLeft: 'none',
          boxShadow: 'none !important',
          zIndex: (theme) => theme.zIndex.appBar + 1,
          color: (theme) =>
            theme.palette.mode === 'dark' ? '#f5f5f5' : '#000',
          transition: 'all 0.3s ease-in-out',
        }}
      >
        <Toolbar
          sx={{
            position: 'relative',
            gap: 1.5,
            px: { xs: 2, md: 3 },
          }}
        >
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
            variant="subtitle1"
            component={RouterLink}
            to={CUSTOMER_ROUTES.PRODUCTS}
            sx={{
              display: { xs: 'block', sm: 'none' },
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
              textAlign: 'center',
              textDecoration: 'none',
              color: 'inherit',
              fontWeight: 700,
              pointerEvents: 'auto',
            }}
          >
            {LL.appNames.siteName()}
          </Typography>

          <IconButton
            color="inherit"
            aria-label="toggle theme"
            onClick={toggleTheme}
            sx={{ mr: 1, display: { xs: 'none', sm: 'inline-flex' } }}
          >
            {themeMode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>

          <Typography
            variant="h6"
            component={RouterLink}
            to={CUSTOMER_ROUTES.PRODUCTS}
            sx={{
              display: { xs: 'none', sm: 'block' },
              flexShrink: 0,
              textAlign: 'left',
              textDecoration: 'none',
              color: 'inherit',
              '&:hover': {
                opacity: 0.8,
              },
            }}
          >
            {LL.appNames.siteName()}
          </Typography>

          <Button
            color="inherit"
            component={RouterLink}
            to={CUSTOMER_ROUTES.PRODUCTS}
            startIcon={<HomeIcon />}
            sx={{
              display: { xs: 'none', sm: 'inline-flex' },
              textTransform: 'none',
              ml: 1,
              mr: 0,
              flex: '0 0 auto',
              px: 1.5,
              '&:hover': {
                backgroundColor: 'rgba(0,0,0,0.04)',
              },
            }}
          >
            {LL.navigation.home()}
          </Button>

          <Box sx={{ flexGrow: 1 }} />

          {/* Cart Button */}
          <IconButton
            color="inherit"
            component={RouterLink}
            to={CUSTOMER_ROUTES.CART}
            sx={{
              display: { xs: 'none', sm: 'inline-flex' },
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
                  display: { xs: 'none', sm: 'inline-flex' },
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
                display: { xs: 'none', sm: 'inline-flex' },
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

        {user ? (
          <ListItemButton onClick={handleLogout}>
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <CustomListItemText primary={LL.button.logout()} />
          </ListItemButton>
        ) : (
          <ListItemButton
            to={CUSTOMER_ROUTES.LOGIN}
            component={RouterLink}
            selected={location.pathname === CUSTOMER_ROUTES.LOGIN}
            onClick={handleDrawerToggle}
          >
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <CustomListItemText primary={LL.button.login()} />
          </ListItemButton>
        )}
      </StyledDrawer>
    </>
  );
}

export default Headerbar;
