import { useAdminsAuthContext } from '@kickzone-workspace/admins-contexts';
import { ADMIN_ROUTES } from '@kickzone-workspace/admins-routes';
import { useI18nContext } from '@kickzone-workspace/shared-i18n';
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
        <Toolbar
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            px: { xs: 1, sm: 2 },
          }}
        >
          {user && (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography
            variant={isMobile ? 'subtitle1' : 'h6'}
            sx={{
              flexGrow: 1,
              fontWeight: 700,
              letterSpacing: 1,
              userSelect: 'none',
              color: '#000',
            }}
          >
            {LL.appNames.siteName()} {LL.navigation.adminPanel()}
          </Typography>
          {user && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
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
                  textTransform: 'none',
                  ml: 2,
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
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                },
              }}
            >
              {LL.button.login()}
            </Button>
          )}
        </Toolbar>
      </AppBar>
      {user && (
        <StyledDrawer
          open={drawerOpen}
          onClose={handleDrawerToggle}
          variant={isMobile ? 'temporary' : 'persistent'}
          keepMounted={true}
        >
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
        </StyledDrawer>
      )}
    </>
  );
}

export default AdminsHeaderbar;
