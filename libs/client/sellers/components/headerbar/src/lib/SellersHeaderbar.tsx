import { useSellersAuthContext } from '@kickzone-workspace/sellers-auth-context';
import { SELLER_ROUTES } from '@kickzone-workspace/sellers-routes';
import { useI18nContext } from '@kickzone-workspace/shared-i18n';
import {
  StyledDrawer,
  CustomListItemText,
} from '@kickzone-workspace/styled-drawer';
import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ReceiptIcon from '@mui/icons-material/Receipt';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LanguageIcon from '@mui/icons-material/Language';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import { useState, useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import Typography from '@mui/material/Typography';

export function Headerbar() {
  const { user, logout } = useSellersAuthContext();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
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
        <Toolbar sx={{ position: 'relative' }}>
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
            to={SELLER_ROUTES.PRODUCTS}
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

          <Typography
            variant="h6"
            component={RouterLink}
            to={SELLER_ROUTES.PRODUCTS}
            sx={{
              display: { xs: 'none', sm: 'block' },
              textDecoration: 'none',
              color: 'inherit',
              '&:hover': {
                opacity: 0.8,
              },
              flexGrow: 1,
            }}
          >
            {LL.appNames.siteName()} - {LL.navigation.sellersPortal()}
          </Typography>

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
                <MenuItem onClick={handleLogout}>{LL.button.logout()}</MenuItem>
              </Menu>
            </>
          ) : (
            <Button
              color="inherit"
              component={RouterLink}
              to={SELLER_ROUTES.LOGIN}
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

      <StyledDrawer open={drawerOpen} onClose={handleDrawerToggle}>
        <ListItemButton
          to={SELLER_ROUTES.HOME}
          component={RouterLink}
          selected={location.pathname === SELLER_ROUTES.HOME}
          onClick={handleDrawerToggle}
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
          onClick={handleDrawerToggle}
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
          onClick={handleDrawerToggle}
        >
          <ListItemIcon>
            <ReceiptIcon />
          </ListItemIcon>
          <CustomListItemText primary={LL.navigation.orders()} />
        </ListItemButton>

        <ListItemButton
          to={SELLER_ROUTES.LANGUAGE_SETTINGS}
          component={RouterLink}
          selected={location.pathname === SELLER_ROUTES.LANGUAGE_SETTINGS}
          onClick={handleDrawerToggle}
        >
          <ListItemIcon>
            <LanguageIcon />
          </ListItemIcon>
          <CustomListItemText primary={LL.navigation.languageSettings()} />
        </ListItemButton>

        {user ? (
          <ListItemButton onClick={handleLogout}>
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <CustomListItemText primary={LL.button.logout()} />
          </ListItemButton>
        ) : (
          <ListItemButton
            to={SELLER_ROUTES.LOGIN}
            component={RouterLink}
            selected={location.pathname === SELLER_ROUTES.LOGIN}
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
