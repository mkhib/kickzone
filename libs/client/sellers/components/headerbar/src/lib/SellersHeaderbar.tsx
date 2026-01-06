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
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useUIStore } from '@kickzone-workspace/shared-ui-store';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

export function Headerbar() {
  const { user, logout } = useSellersAuthContext();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { LL } = useI18nContext();
  const themeMode = useUIStore((s) => s.theme.mode);
  const toggleTheme = useUIStore((s) => s.toggleTheme);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isDark = theme.palette.mode === 'dark';

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
          backgroundColor: isScrolled
            ? isDark
              ? 'rgba(12, 12, 16, 0.92)'
              : 'rgba(255, 255, 255, 0.9)'
            : isDark
            ? 'rgba(14, 14, 18, 0.7)'
            : 'rgba(255, 255, 255, 0.1)',
          color: theme.palette.text.primary,
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          borderBottom: isScrolled
            ? isDark
              ? '1px solid rgba(255, 255, 255, 0.08)'
              : '1px solid rgba(0, 0, 0, 0.08)'
            : isDark
            ? '1px solid rgba(255, 255, 255, 0.06)'
            : '1px solid rgba(0, 0, 0, 0.08)',
          borderLeft: 'none',
          boxShadow: 'none',
          zIndex: (themeArg) => themeArg.zIndex.appBar + 1,
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
          <IconButton
            color="inherit"
            aria-label="toggle theme"
            onClick={toggleTheme}
            sx={{ ml: 0.5 }}
          >
            {themeMode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
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
            variant={isMobile ? 'subtitle1' : 'h6'}
            component={RouterLink}
            to={SELLER_ROUTES.PRODUCTS}
            sx={{
              display: { xs: 'none', sm: 'block' },
              textDecoration: 'none',
              color: theme.palette.text.primary,
              '&:hover': {
                opacity: 0.8,
              },
              flexGrow: 1,
              fontWeight: 700,
              letterSpacing: 1,
            }}
          >
            {LL.appNames.siteName()} - {LL.navigation.sellersPortal()}
          </Typography>
          <Box sx={{ flexGrow: 1 }} />

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
                    backgroundColor: isDark
                      ? 'rgba(255, 255, 255, 0.08)'
                      : 'rgba(0, 0, 0, 0.04)',
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
                  backgroundColor: isDark
                    ? 'rgba(255, 255, 255, 0.08)'
                    : 'rgba(0, 0, 0, 0.04)',
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
