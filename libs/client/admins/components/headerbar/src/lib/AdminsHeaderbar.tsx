import { useAdminsAuthContext } from '@kickzone-workspace/admins-contexts';
import { ADMIN_ROUTES } from '@kickzone-workspace/admins-routes';
import { useI18nContext } from '@kickzone-workspace/shared-i18n';
import { useUIStore } from '@kickzone-workspace/shared-ui-store';
import {
  StyledDrawer,
  CustomListItemText,
} from '@kickzone-workspace/styled-drawer';
import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LanguageIcon from '@mui/icons-material/Language';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useCallback, useState, useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import TranslateIcon from '@mui/icons-material/Translate';
import StorefrontIcon from '@mui/icons-material/Storefront';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

export function AdminsHeaderbar() {
  const { admin: user, setAdmin, logoutAdmin } = useAdminsAuthContext();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { LL } = useI18nContext();
  const themeMode = useUIStore((s) => s.theme.mode);
  const toggleTheme = useUIStore((s) => s.toggleTheme);
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

  const handleOnLogoutClick = useCallback(() => {
    handleUserMenuClose();
    logoutAdmin();
    setAdmin(null);
  }, [setAdmin, logoutAdmin]);

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
        <Toolbar
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            px: { xs: 1, sm: 2 },
            position: 'relative',
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
            to={ADMIN_ROUTES.HOME}
            sx={{
              display: { xs: 'block', sm: 'none' },
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
              textAlign: 'center',
              textDecoration: 'none',
              color: 'inherit',
              fontWeight: 600,
              letterSpacing: '0.12em',
              pointerEvents: 'auto',
            }}
          >
            {LL.appNames.siteName()}
          </Typography>
          <Typography
            variant={isMobile ? 'subtitle1' : 'h6'}
            sx={{
              display: { xs: 'none', sm: 'block' },
              fontWeight: 600,
              letterSpacing: '0.08em',
              userSelect: 'none',
              color: theme.palette.text.primary,
              flexGrow: 1,
            }}
          >
            {LL.appNames.siteName()} {LL.navigation.adminPanel()}
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          {user && (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                flexShrink: 0,
              }}
            >
              <Button
                color="inherit"
                component={RouterLink}
                to={ADMIN_ROUTES.PRODUCTS_NEW}
                startIcon={<HomeIcon />}
                sx={{ display: { xs: 'none', sm: 'inline-flex' } }}
              >
                {LL.button.addNewProduct()}
              </Button>
              <Button
                color="inherit"
                component={RouterLink}
                to={ADMIN_ROUTES.PRODUCTS}
                startIcon={<ShoppingCartIcon />}
                sx={{ display: { xs: 'none', sm: 'inline-flex' } }}
              >
                {LL.navigation.products()}
              </Button>
            </Box>
          )}
          {user ? (
            <>
              <Button
                color="inherit"
                onClick={handleUserMenuOpen}
                startIcon={<AccountCircleIcon />}
                sx={{
                  display: { xs: 'none', sm: 'inline-flex' },
                  textTransform: 'none',
                  ml: 2,
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
                <MenuItem onClick={handleOnLogoutClick}>
                  {LL.button.logout()}
                </MenuItem>
              </Menu>
            </>
          ) : (
            <Button
              color="inherit"
              component={RouterLink}
              to={ADMIN_ROUTES.LOGIN}
              sx={{
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
      <StyledDrawer
        open={drawerOpen}
        onClose={handleDrawerToggle}
        variant={isMobile ? 'temporary' : 'persistent'}
        keepMounted={true}
      >
        {user && (
          <>
            <ListItemButton
              to={ADMIN_ROUTES.PRODUCTS_NEW}
              component={RouterLink}
              selected={location.pathname === ADMIN_ROUTES.PRODUCTS_NEW}
            >
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <CustomListItemText primary={LL.button.addNewProduct()} />
            </ListItemButton>

            <ListItemButton
              to={ADMIN_ROUTES.PRODUCTS}
              component={RouterLink}
              selected={location.pathname === ADMIN_ROUTES.PRODUCTS}
            >
              <ListItemIcon>
                <ShoppingCartIcon />
              </ListItemIcon>
              <CustomListItemText primary={LL.navigation.products()} />
            </ListItemButton>

            <ListItemButton
              to={ADMIN_ROUTES.ORDERS}
              component={RouterLink}
              selected={location.pathname === ADMIN_ROUTES.ORDERS}
            >
              <ListItemIcon>
                <ShoppingCartIcon />
              </ListItemIcon>
              <CustomListItemText primary={LL.orders.allSellerOrders()} />
            </ListItemButton>

            <ListItemButton
              to={ADMIN_ROUTES.SELLERS}
              component={RouterLink}
              selected={location.pathname === ADMIN_ROUTES.SELLERS}
            >
              <ListItemIcon>
                <StorefrontIcon />
              </ListItemIcon>
              <CustomListItemText primary={LL.navigation.sellers()} />
            </ListItemButton>

            <ListItemButton
              to={ADMIN_ROUTES.CURRENCY}
              component={RouterLink}
              selected={location.pathname === ADMIN_ROUTES.CURRENCY}
            >
              <ListItemIcon>
                <AttachMoneyIcon />
              </ListItemIcon>
              <CustomListItemText primary={LL.currency.title()} />
            </ListItemButton>

            <ListItemButton
              to={ADMIN_ROUTES.TRANSLATIONS}
              component={RouterLink}
              selected={location.pathname === ADMIN_ROUTES.TRANSLATIONS}
            >
              <ListItemIcon>
                <TranslateIcon />
              </ListItemIcon>
              <CustomListItemText primary={LL.navigation.translations()} />
            </ListItemButton>

            <ListItemButton
              to={ADMIN_ROUTES.LANGUAGE_SETTINGS}
              component={RouterLink}
              selected={location.pathname === ADMIN_ROUTES.LANGUAGE_SETTINGS}
            >
              <ListItemIcon>
                <LanguageIcon />
              </ListItemIcon>
              <CustomListItemText primary={LL.navigation.languageSettings()} />
            </ListItemButton>
          </>
        )}
        {user ? (
          <ListItemButton onClick={handleOnLogoutClick}>
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <CustomListItemText primary={LL.button.logout()} />
          </ListItemButton>
        ) : (
          <ListItemButton
            to={ADMIN_ROUTES.LOGIN}
            component={RouterLink}
            selected={location.pathname === ADMIN_ROUTES.LOGIN}
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

export default AdminsHeaderbar;
