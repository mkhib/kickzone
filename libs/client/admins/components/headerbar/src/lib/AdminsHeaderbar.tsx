import { useAdminsAuthContext } from '@kickzone-workspace/admins-contexts';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CloseIcon from '@mui/icons-material/Close';
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
import { useCallback, useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { useTheme, useMediaQuery } from '@mui/material';
import StorefrontIcon from '@mui/icons-material/Storefront';

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

export function AdminsHeaderbar() {
  const { admin: user, setAdmin, logoutAdmin } = useAdminsAuthContext();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleOnLogoutClick = useCallback(() => {
    logoutAdmin();
    setAdmin(null);
  }, [setAdmin, logoutAdmin]);

  return (
    <>
      <AppBar
        position="static"
        sx={{
          background: 'linear-gradient(90deg, #333 60%, #1976d2 100%)',
          boxShadow: 3,
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
              color: '#fff',
              userSelect: 'none',
            }}
            noWrap
          >
            Kickzone Admin Panel
          </Typography>
          {user && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Button
                color="inherit"
                component={RouterLink}
                to="/products/new"
                startIcon={<HomeIcon />}
                sx={{ display: { xs: 'none', sm: 'inline-flex' } }}
              >
                Add New Product
              </Button>
              <Button
                color="inherit"
                component={RouterLink}
                to="/products"
                startIcon={<ShoppingCartIcon />}
                sx={{ display: { xs: 'none', sm: 'inline-flex' } }}
              >
                Products
              </Button>
            </Box>
          )}
          {user ? (
            <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
              <Typography
                variant="body2"
                sx={{
                  mr: 2,
                  color: '#fff',
                  fontWeight: 500,
                  display: { xs: 'none', sm: 'block' },
                }}
              >
                {user.name}
              </Typography>
              <Button
                color="inherit"
                onClick={handleOnLogoutClick}
                sx={{ fontWeight: 600 }}
              >
                Logout
              </Button>
            </Box>
          ) : (
            <Button color="inherit" component={RouterLink} to="/login">
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
      {user && (
        <StyledDrawer
          anchor="left"
          open={drawerOpen}
          onClose={handleDrawerToggle}
          variant={isMobile ? 'temporary' : 'persistent'}
          ModalProps={{ keepMounted: true }}
          sx={{
            '& .MuiDrawer-paper': {
              background: 'linear-gradient(180deg, #fff 80%, #e3eafc 100%)',
              boxShadow: 4,
            },
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
            <IconButton onClick={handleDrawerToggle}>
              <CloseIcon />
            </IconButton>
          </Box>
          <List>
            <ListItemButton
              to="/products/new"
              component={RouterLink}
              selected={location.pathname === '/products/new'}
            >
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <CustomListItemText primary="Add New Product" />
            </ListItemButton>

            <ListItemButton
              to="/products"
              component={RouterLink}
              selected={location.pathname === '/products'}
            >
              <ListItemIcon>
                <ShoppingCartIcon />
              </ListItemIcon>
              <CustomListItemText primary="Products" />
            </ListItemButton>

            <ListItemButton
              to="/contact"
              component={RouterLink}
              selected={location.pathname === '/contact'}
            >
              <ListItemIcon>
                <ContactMailIcon />
              </ListItemIcon>
              <CustomListItemText primary="Contact" />
            </ListItemButton>
            <ListItemButton
              to="/sellers"
              component={RouterLink}
              selected={location.pathname === '/sellers'}
            >
              <ListItemIcon>
                <StorefrontIcon />
              </ListItemIcon>
              <CustomListItemText primary="Sellers" />
            </ListItemButton>
          </List>
        </StyledDrawer>
      )}
    </>
  );
}

export default AdminsHeaderbar;
