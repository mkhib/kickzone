import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client/react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Tooltip from '@mui/material/Tooltip';
import { useTheme } from '@mui/material/styles';

// Icons
import Person from '@mui/icons-material/Person';
import LocationOn from '@mui/icons-material/LocationOn';
import Straighten from '@mui/icons-material/Straighten';
import Edit from '@mui/icons-material/Edit';
import ContentCopy from '@mui/icons-material/ContentCopy';
import Security from '@mui/icons-material/Security';
import ShoppingBag from '@mui/icons-material/ShoppingBag';
import VpnKey from '@mui/icons-material/VpnKey';
import MarkunreadMailbox from '@mui/icons-material/MarkunreadMailbox';
import PhoneInTalk from '@mui/icons-material/PhoneInTalk';
import Logout from '@mui/icons-material/Logout';
import ArrowForward from '@mui/icons-material/ArrowForward';
import ArrowBack from '@mui/icons-material/ArrowBack';
import BadgeIcon from '@mui/icons-material/Badge';
import AddLocationAlt from '@mui/icons-material/AddLocationAlt';
import LockReset from '@mui/icons-material/LockReset';
import Email from '@mui/icons-material/Email';
import Login from '@mui/icons-material/Login';

// Kickzone workspace imports
import { CustomersLayout } from '@kickzone-workspace/customers-layout';
import { useCustomersAuth } from '@kickzone-workspace/customers-auth-context';
import {
  useI18nContext,
  useLanguageContext,
  usePageTitle,
  farsiDisplayStack,
} from '@kickzone-workspace/shared-i18n';
import { CUSTOMER_ROUTES } from '@kickzone-workspace/customers-routes';
import {
  GET_MY_PROFILE,
  UPDATE_MY_PROFILE,
  GET_MY_ORDERS_QUERY,
} from '@kickzone-workspace/customers-graphql';
import { OrderStatusChip } from '@kickzone-workspace/order-status-chip';
import { PriceDisplay } from '@kickzone-workspace/price-display';
import { useSnackbar } from '@kickzone-workspace/snackbar-hook';
import { toEnglishDigits } from '@kickzone-workspace/shipping-validation';

export interface TailoredPreferences {
  clothingSize: string;
  shoeSize: string;
}

const DEFAULT_PREFERENCES: TailoredPreferences = {
  clothingSize: 'M / L',
  shoeSize: '42 EU (8.5 US)',
};

interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

interface OrderData {
  id: string;
  orderNumber: string;
  status: string;
  total: number;
  createdAt: string;
  items: OrderItem[];
}

export function CustomerProfile() {
  const { LL } = useI18nContext();
  usePageTitle(() => LL.customerProfile.pageTitle());
  const { currentLocale } = useLanguageContext();
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const isRtl = currentLocale === 'fa';
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();

  const { user, logout } = useCustomersAuth();
  const isLoggedIn = Boolean(user);

  // Active Navigation Tab: 0 = Profile & Address, 1 = Orders, 2 = Security
  const [activeTab, setActiveTab] = useState<number>(0);

  // Modals state
  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const [editAddressOpen, setEditAddressOpen] = useState(false);
  const [editPreferencesOpen, setEditPreferencesOpen] = useState(false);

  // Query: My Profile
  const { data: profileData, refetch: refetchProfile } = useQuery<{
    myProfile: {
      id: string;
      userId: string;
      phone?: string | null;
      address?: string | null;
      city?: string | null;
      state?: string | null;
      zipCode?: string | null;
      country?: string | null;
    };
  }>(GET_MY_PROFILE, {
    fetchPolicy: 'cache-and-network',
    skip: !isLoggedIn,
  });

  // Query: My Orders
  const { data: ordersData, loading: ordersLoading } = useQuery<{
    myOrders: OrderData[];
  }>(GET_MY_ORDERS_QUERY, {
    variables: { first: 10 },
    fetchPolicy: 'cache-and-network',
    skip: !isLoggedIn,
  });

  // Mutation: Update My Profile
  const [updateProfileMutation, { loading: updatingProfile }] =
    useMutation(UPDATE_MY_PROFILE);

  // User Preferences in Local Storage
  const userStorageKey = user?.id || 'guest';
  const preferencesKey = `kickzone_preferences_${userStorageKey}`;

  const [preferences, setPreferences] = useState<TailoredPreferences>(() => {
    try {
      const stored = localStorage.getItem(preferencesKey);
      if (stored) return JSON.parse(stored);
    } catch {
      // fallback
    }
    return DEFAULT_PREFERENCES;
  });

  const savePreferences = (newPrefs: TailoredPreferences) => {
    setPreferences(newPrefs);
    try {
      localStorage.setItem(preferencesKey, JSON.stringify(newPrefs));
    } catch {
      // ignore
    }
  };

  // Profile Form state
  const [profileForm, setProfileForm] = useState({
    name: user?.name || '',
    lastName: user?.lastName || '',
    phone: profileData?.myProfile?.phone || '',
  });

  useEffect(() => {
    if (user || profileData?.myProfile) {
      setProfileForm((prev) => {
        const nextName = user?.name || prev.name;
        const nextLastName = user?.lastName || prev.lastName;
        const nextPhone = profileData?.myProfile?.phone || prev.phone;
        if (
          prev.name === nextName &&
          prev.lastName === nextLastName &&
          prev.phone === nextPhone
        ) {
          return prev;
        }
        return {
          name: nextName,
          lastName: nextLastName,
          phone: nextPhone,
        };
      });
    }
  }, [user, profileData]);

  // Address Form state matching backend fields
  const [addressForm, setAddressForm] = useState({
    state: profileData?.myProfile?.state || '',
    city: profileData?.myProfile?.city || '',
    zipCode: profileData?.myProfile?.zipCode || '',
    address: profileData?.myProfile?.address || '',
    phone: profileData?.myProfile?.phone || '',
    country: profileData?.myProfile?.country || 'ایران',
  });

  useEffect(() => {
    if (profileData?.myProfile) {
      const p = profileData.myProfile;
      setAddressForm({
        state: p.state || '',
        city: p.city || '',
        zipCode: p.zipCode || '',
        address: p.address || '',
        phone: p.phone || '',
        country: p.country || 'ایران',
      });
    }
  }, [profileData]);

  // Preferences Form state
  const [prefForm, setPrefForm] = useState<TailoredPreferences>(preferences);

  // Address display data (placeholders when not logged in)
  const currentAddress = (isLoggedIn && profileData?.myProfile?.address) || '';
  const currentCity = (isLoggedIn && profileData?.myProfile?.city) || '';
  const currentState = (isLoggedIn && profileData?.myProfile?.state) || '';
  const currentZipCode = (isLoggedIn && profileData?.myProfile?.zipCode) || '';
  const currentCountry = (isLoggedIn && profileData?.myProfile?.country) || '';
  const currentPhone = (isLoggedIn && profileData?.myProfile?.phone) || '';
  const hasAddress = Boolean(
    isLoggedIn && (currentAddress || currentCity || currentState || currentZipCode)
  );

  // Orders count
  const myOrders = useMemo(
    () => (isLoggedIn ? ordersData?.myOrders || [] : []),
    [isLoggedIn, ordersData]
  );
  const ordersCount = myOrders.length;

  // Display user info (only placeholders if not logged in)
  const displayName = isLoggedIn && user?.name
    ? `${user.name} ${user.lastName || ''}`.trim()
    : '—';
  const displayEmail = isLoggedIn && user?.email ? user.email : '—';
  const displayPhone = isLoggedIn && currentPhone ? currentPhone : '—';
  const displayRole = isLoggedIn
    ? LL.customerProfile.customerAccount()
    : LL.customerProfile.guestAccount();
  const displayClothingSize = isLoggedIn ? preferences.clothingSize : '—';
  const displayShoeSize = isLoggedIn ? preferences.shoeSize : '—';

  // Handle Copy Email
  const handleCopyEmail = () => {
    if (isLoggedIn && displayEmail !== '—') {
      navigator.clipboard.writeText(displayEmail);
      showSnackbar(LL.customerProfile.emailCopied(), 'success');
    }
  };

  // Open Edit Address Modal
  const handleOpenEditAddress = () => {
    if (!isLoggedIn) return;
    setAddressForm({
      state: currentState,
      city: currentCity,
      zipCode: toEnglishDigits(currentZipCode),
      address: currentAddress,
      phone: toEnglishDigits(currentPhone || profileForm.phone),
      country: currentCountry || 'ایران',
    });
    setEditAddressOpen(true);
  };

  // Save Address Modal Action
  const handleSaveAddress = async () => {
    if (!isLoggedIn) return;
    const cleanZip = toEnglishDigits(addressForm.zipCode).trim();
    const cleanPhone = toEnglishDigits(addressForm.phone).trim();

    try {
      await updateProfileMutation({
        variables: {
          input: {
            address: addressForm.address,
            city: addressForm.city,
            state: addressForm.state,
            zipCode: cleanZip,
            phone: cleanPhone,
            country: addressForm.country || 'ایران',
          },
        },
      });
      refetchProfile();
      setEditAddressOpen(false);
      showSnackbar(LL.customerProfile.saveSuccess(), 'success');
    } catch (err) {
      console.error('Error updating address:', err);
      showSnackbar(LL.customerProfile.saveError(), 'error');
    }
  };

  // Save Profile Form Action
  const handleSaveProfile = async () => {
    if (!isLoggedIn) return;
    const cleanPhone = toEnglishDigits(profileForm.phone).trim();

    try {
      await updateProfileMutation({
        variables: {
          input: {
            phone: cleanPhone,
          },
        },
      });
      refetchProfile();
      setEditProfileOpen(false);
      showSnackbar(LL.customerProfile.saveSuccess(), 'success');
    } catch (err) {
      console.error('Error updating profile:', err);
      showSnackbar(LL.customerProfile.saveError(), 'error');
    }
  };

  // Save Preferences Form Action
  const handleSavePreferences = () => {
    if (!isLoggedIn) return;
    savePreferences(prefForm);
    setEditPreferencesOpen(false);
    showSnackbar(LL.customerProfile.saveSuccess(), 'success');
  };

  // Handle Logout
  const handleLogout = async () => {
    if (!isLoggedIn) return;
    try {
      await logout();
      navigate(CUSTOMER_ROUTES.HOME);
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  // Format date helper
  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleDateString(currentLocale, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch {
      return dateStr;
    }
  };

  // Design Tokens based on Light / Dark mode
  const colors = useMemo(() => {
    if (isDark) {
      return {
        bgPage: '#0f0f0e',
        bgCard: 'rgba(24, 24, 22, 0.85)',
        border: '1px solid rgba(240, 239, 235, 0.08)',
        borderSubtle: '1px solid rgba(240, 239, 235, 0.06)',
        shadow: '0 16px 40px -8px rgba(0, 0, 0, 0.5)',
        itemBg: 'rgba(32, 32, 28, 0.65)',
        itemBorder: '1px solid rgba(240, 239, 235, 0.08)',
        textPrimary: '#f0efeb',
        textSecondary: '#a8a69f',
        textMuted: '#7c766e',
        accentBrass: '#c5b89a',
        activeTabBg: '#262622',
        activeTabColor: '#f0efeb',
        activeTabBorder: '1px solid rgba(197, 184, 154, 0.35)',
        tabBarBg: 'rgba(24, 24, 22, 0.85)',
        tabBarBorder: '1px solid rgba(240, 239, 235, 0.08)',
        buttonPrimaryBg: '#c5b89a',
        buttonPrimaryColor: '#121210',
        buttonPrimaryHover: '#ddd4bf',
      };
    }
    return {
      bgPage: '#f4f3f0',
      bgCard: 'rgba(255, 255, 255, 0.85)',
      border: '1px solid rgba(26, 26, 25, 0.08)',
      borderSubtle: '1px solid rgba(26, 26, 25, 0.06)',
      shadow: '0 16px 40px -10px rgba(0, 0, 0, 0.05)',
      itemBg: 'rgba(247, 246, 243, 0.75)',
      itemBorder: '1px solid rgba(26, 26, 25, 0.06)',
      textPrimary: '#1a1a19',
      textSecondary: '#5c5b57',
      textMuted: '#8a8880',
      accentBrass: '#8f8468',
      activeTabBg: '#ffffff',
      activeTabColor: '#1a1a19',
      activeTabBorder: '1px solid rgba(26, 26, 25, 0.08)',
      tabBarBg: 'rgba(255, 255, 255, 0.65)',
      tabBarBorder: '1px solid rgba(26, 26, 25, 0.08)',
      buttonPrimaryBg: '#1a1a19',
      buttonPrimaryColor: '#faf9f7',
      buttonPrimaryHover: '#2e2e2c',
    };
  }, [isDark]);

  return (
    <CustomersLayout>
      <Box
        sx={{
          minHeight: '100vh',
          width: '100%',
          position: 'relative',
          overflowX: 'hidden',
          backgroundColor: colors.bgPage,
          color: colors.textPrimary,
          fontFamily: theme.typography.fontFamily,
          pt: { xs: 3, md: 5 },
          pb: 10,
          px: { xs: 2, sm: 3, md: 5 },
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          transition: 'background-color 0.3s ease, color 0.3s ease',
        }}
      >
        <Box sx={{ width: '100%', maxWidth: '1240px', position: 'relative', zIndex: 1 }}>
          {/* Prominent Login Prompt Banner for unauthenticated visitors */}
          {!isLoggedIn && (
            <Alert
              severity="info"
              icon={<Login sx={{ color: colors.accentBrass }} />}
              sx={{
                mb: 4,
                borderRadius: '20px',
                p: { xs: 2, md: 2.5 },
                backdropFilter: 'blur(24px)',
                backgroundColor: isDark ? 'rgba(32, 32, 28, 0.95)' : 'rgba(255, 255, 255, 0.95)',
                border: isDark ? '1px solid rgba(197, 184, 154, 0.3)' : '1px solid rgba(143, 132, 104, 0.3)',
                boxShadow: colors.shadow,
                color: colors.textPrimary,
                fontFamily: 'inherit',
                display: 'flex',
                alignItems: 'center',
                '& .MuiAlert-message': {
                  fontSize: { xs: '13px', md: '14px' },
                  fontWeight: 600,
                  lineHeight: 1.7,
                },
              }}
              action={
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => navigate(CUSTOMER_ROUTES.LOGIN)}
                  startIcon={<Login sx={{ fontSize: 16 }} />}
                  sx={{
                    fontWeight: 700,
                    textTransform: 'none',
                    borderRadius: '9999px',
                    backgroundColor: colors.buttonPrimaryBg,
                    color: colors.buttonPrimaryColor,
                    px: 3,
                    py: 1,
                    fontFamily: 'inherit',
                    boxShadow: '0 4px 14px rgba(0, 0, 0, 0.15)',
                    '&:hover': { backgroundColor: colors.buttonPrimaryHover },
                  }}
                >
                  {LL.customerProfile.loginButton()}
                </Button>
              }
            >
              {LL.customerProfile.noUserWarning()}
            </Alert>
          )}

          {/* Member Hero Identity Bar */}
          <Box
            component="header"
            sx={{
              width: '100%',
              mb: 4,
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: { xs: 'flex-start', md: 'center' },
              justifyContent: 'space-between',
              gap: 3,
            }}
          >
            {/* Identity Info */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.5 }}>
              {/* Squircle Avatar */}
              <Box
                sx={{
                  width: { xs: 68, md: 76 },
                  height: { xs: 68, md: 76 },
                  borderRadius: '24px',
                  backgroundColor: colors.bgCard,
                  border: colors.border,
                  boxShadow: colors.shadow,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: colors.accentBrass,
                  opacity: isLoggedIn ? 1 : 0.65,
                  flexShrink: 0,
                }}
              >
                <Person sx={{ fontSize: { xs: 36, md: 42 } }} />
              </Box>

              {/* Names & User Subtitle */}
              <Box sx={{ display: 'flex', flexDirection: 'column', textAlign: 'right' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap' }}>
                  <Typography
                    variant="h5"
                    component="h1"
                    sx={{
                      fontWeight: 800,
                      fontSize: { xs: '20px', md: '26px' },
                      color: colors.textPrimary,
                      fontFamily: isRtl ? farsiDisplayStack : 'inherit',
                    }}
                  >
                    {displayName}
                  </Typography>
                  <Chip
                    label={displayRole}
                    size="small"
                    sx={{
                      height: 24,
                      fontSize: '11px',
                      fontWeight: 600,
                      backgroundColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)',
                      color: colors.textSecondary,
                      fontFamily: 'inherit',
                    }}
                  />
                </Box>
                <Typography
                  sx={{
                    fontSize: '13px',
                    color: colors.textSecondary,
                    mt: 0.5,
                    fontFamily: 'inherit',
                  }}
                >
                  {displayEmail}
                </Typography>
              </Box>
            </Box>

            {/* Quick Action Button (Disabled when not logged in) */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, alignSelf: { xs: 'stretch', md: 'auto' } }}>
              <Tooltip title={!isLoggedIn ? LL.customerProfile.loginToEditTooltip() : ''}>
                <span>
                  <Button
                    variant="contained"
                    disabled={!isLoggedIn}
                    onClick={() => isLoggedIn && setEditProfileOpen(true)}
                    startIcon={<Edit sx={{ fontSize: 16 }} />}
                    sx={{
                      height: 44,
                      px: 3,
                      borderRadius: '9999px',
                      backgroundColor: colors.buttonPrimaryBg,
                      color: colors.buttonPrimaryColor,
                      fontSize: '13px',
                      fontWeight: 700,
                      textTransform: 'none',
                      fontFamily: 'inherit',
                      boxShadow: isDark
                        ? '0 6px 20px rgba(0, 0, 0, 0.4)'
                        : '0 6px 20px rgba(0, 0, 0, 0.12)',
                      '&:hover': {
                        backgroundColor: colors.buttonPrimaryHover,
                      },
                      '&.Mui-disabled': {
                        opacity: 0.45,
                        backgroundColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)',
                        color: colors.textMuted,
                      },
                    }}
                  >
                    {LL.customerProfile.editInformation()}
                  </Button>
                </span>
              </Tooltip>
            </Box>
          </Box>

          {/* Segmented Glass Tab Bar */}
          <Box
            component="nav"
            sx={{
              width: '100%',
              mb: 4,
              p: 0.75,
              borderRadius: '24px',
              backgroundColor: colors.tabBarBg,
              backdropFilter: 'blur(20px)',
              border: colors.tabBarBorder,
              boxShadow: colors.shadow,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 1,
              overflowX: 'auto',
              scrollbarWidth: 'none',
              '&::-webkit-scrollbar': { display: 'none' },
            }}
          >
            {/* Tab 0: Profile & Address */}
            <Box
              component="button"
              type="button"
              onClick={() => setActiveTab(0)}
              sx={{
                flex: 1,
                minWidth: '180px',
                height: 46,
                borderRadius: '18px',
                px: 2,
                py: 1,
                border: activeTab === 0 ? colors.activeTabBorder : 'none',
                outline: 'none',
                cursor: 'pointer',
                fontFamily: isRtl ? farsiDisplayStack : 'inherit',
                backgroundColor: activeTab === 0 ? colors.activeTabBg : 'transparent',
                color: activeTab === 0 ? colors.activeTabColor : colors.textSecondary,
                fontWeight: activeTab === 0 ? 700 : 500,
                fontSize: { xs: '12px', sm: '13px' },
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 1.25,
                boxShadow: activeTab === 0 ? colors.shadow : 'none',
                transition: 'all 0.2s ease',
                '&:hover': {
                  color: colors.textPrimary,
                  backgroundColor: activeTab === 0 ? colors.activeTabBg : isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)',
                },
              }}
            >
              <BadgeIcon sx={{ fontSize: 18, color: colors.accentBrass }} />
              <span>{LL.customerProfile.tabProfileAndAddresses()}</span>
            </Box>

            {/* Tab 1: Orders */}
            <Box
              component="button"
              type="button"
              onClick={() => setActiveTab(1)}
              sx={{
                flex: 1,
                minWidth: '180px',
                height: 46,
                borderRadius: '18px',
                px: 2,
                py: 1,
                border: activeTab === 1 ? colors.activeTabBorder : 'none',
                outline: 'none',
                cursor: 'pointer',
                fontFamily: isRtl ? farsiDisplayStack : 'inherit',
                backgroundColor: activeTab === 1 ? colors.activeTabBg : 'transparent',
                color: activeTab === 1 ? colors.activeTabColor : colors.textSecondary,
                fontWeight: activeTab === 1 ? 700 : 500,
                fontSize: { xs: '12px', sm: '13px' },
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 1.25,
                boxShadow: activeTab === 1 ? colors.shadow : 'none',
                transition: 'all 0.2s ease',
                '&:hover': {
                  color: colors.textPrimary,
                  backgroundColor: activeTab === 1 ? colors.activeTabBg : isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)',
                },
              }}
            >
              <ShoppingBag sx={{ fontSize: 18, color: colors.accentBrass }} />
              <span>{LL.customerProfile.tabMyOrders()}</span>
              {ordersCount > 0 && (
                <Box
                  sx={{
                    px: 1,
                    py: 0.2,
                    borderRadius: '9999px',
                    backgroundColor: colors.accentBrass,
                    color: isDark ? '#121210' : '#ffffff',
                    fontSize: '11px',
                    fontWeight: 700,
                    fontFamily: 'inherit',
                  }}
                >
                  {ordersCount}
                </Box>
              )}
            </Box>

            {/* Tab 2: Account Security */}
            <Box
              component="button"
              type="button"
              onClick={() => setActiveTab(2)}
              sx={{
                flex: 1,
                minWidth: '180px',
                height: 46,
                borderRadius: '18px',
                px: 2,
                py: 1,
                border: activeTab === 2 ? colors.activeTabBorder : 'none',
                outline: 'none',
                cursor: 'pointer',
                fontFamily: isRtl ? farsiDisplayStack : 'inherit',
                backgroundColor: activeTab === 2 ? colors.activeTabBg : 'transparent',
                color: activeTab === 2 ? colors.activeTabColor : colors.textSecondary,
                fontWeight: activeTab === 2 ? 700 : 500,
                fontSize: { xs: '12px', sm: '13px' },
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 1.25,
                boxShadow: activeTab === 2 ? colors.shadow : 'none',
                transition: 'all 0.2s ease',
                '&:hover': {
                  color: colors.textPrimary,
                  backgroundColor: activeTab === 2 ? colors.activeTabBg : isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)',
                },
              }}
            >
              <VpnKey sx={{ fontSize: 18, color: colors.accentBrass }} />
              <span>{LL.customerProfile.tabSettingsAndSecurity()}</span>
            </Box>
          </Box>

          {/* Conditional View by Active Tab */}

          {/* TAB 0: Profile Details & Shipping Address */}
          {activeTab === 0 && (
            <Grid container spacing={3.5} alignItems="flex-start" sx={{ width: '100%' }}>
              {/* Column 1: Identity & Preferences (5 Cols) */}
              <Grid size={{ xs: 12, lg: 5 }} sx={{ display: 'flex', flexDirection: 'column', gap: 3.5 }}>
                {/* Account Details Card */}
                <Box
                  sx={{
                    borderRadius: '28px',
                    p: { xs: 2.5, md: 3 },
                    backgroundColor: colors.bgCard,
                    backdropFilter: 'blur(24px)',
                    boxShadow: colors.shadow,
                    border: colors.border,
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      pb: 2,
                      mb: 2,
                      borderBottom: colors.borderSubtle,
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
                      <Person sx={{ fontSize: 20, color: colors.accentBrass }} />
                      <Typography
                        sx={{
                          fontSize: '15px',
                          fontWeight: 700,
                          color: colors.textPrimary,
                          fontFamily: isRtl ? farsiDisplayStack : 'inherit',
                        }}
                      >
                        {LL.customerProfile.identityCardTitle()}
                      </Typography>
                    </Box>
                    <Tooltip title={!isLoggedIn ? LL.customerProfile.loginToEditTooltip() : ''}>
                      <span>
                        <IconButton
                          size="small"
                          disabled={!isLoggedIn}
                          onClick={() => isLoggedIn && setEditProfileOpen(true)}
                          sx={{
                            color: colors.textMuted,
                            '&:hover': { color: colors.textPrimary },
                            '&.Mui-disabled': { opacity: 0.4 },
                          }}
                        >
                          <Edit sx={{ fontSize: 16 }} />
                        </IconButton>
                      </span>
                    </Tooltip>
                  </Box>

                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                    {/* Full Name */}
                    <Box
                      sx={{
                        p: 1.75,
                        borderRadius: '16px',
                        backgroundColor: colors.itemBg,
                        border: colors.itemBorder,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <Box sx={{ textAlign: 'right' }}>
                        <Typography sx={{ fontSize: '11px', color: colors.textMuted, mb: 0.25, fontFamily: 'inherit' }}>
                          {LL.customerProfile.fullName()}
                        </Typography>
                        <Typography sx={{ fontSize: '13px', fontWeight: 700, color: colors.textPrimary, fontFamily: 'inherit' }}>
                          {displayName}
                        </Typography>
                      </Box>
                    </Box>

                    {/* Phone Number */}
                    <Box
                      sx={{
                        p: 1.75,
                        borderRadius: '16px',
                        backgroundColor: colors.itemBg,
                        border: colors.itemBorder,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <Box sx={{ textAlign: 'right' }}>
                        <Typography sx={{ fontSize: '11px', color: colors.textMuted, mb: 0.25, fontFamily: 'inherit' }}>
                          {LL.customerProfile.phone()}
                        </Typography>
                        <Typography dir="ltr" sx={{ fontSize: '13px', fontWeight: 700, color: colors.textPrimary, fontFamily: 'inherit' }}>
                          {displayPhone}
                        </Typography>
                      </Box>
                    </Box>

                    {/* Email */}
                    <Box
                      sx={{
                        p: 1.75,
                        borderRadius: '16px',
                        backgroundColor: colors.itemBg,
                        border: colors.itemBorder,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <Box sx={{ textAlign: 'right' }}>
                        <Typography sx={{ fontSize: '11px', color: colors.textMuted, mb: 0.25, fontFamily: 'inherit' }}>
                          {LL.customerProfile.email()}
                        </Typography>
                        <Typography dir="ltr" sx={{ fontSize: '13px', fontWeight: 600, color: colors.textPrimary, fontFamily: 'inherit' }}>
                          {displayEmail}
                        </Typography>
                      </Box>
                      {isLoggedIn && displayEmail !== '—' && (
                        <Tooltip title={LL.customerProfile.copyEmail()}>
                          <IconButton
                            size="small"
                            onClick={handleCopyEmail}
                            sx={{ color: colors.textMuted, '&:hover': { color: colors.textPrimary } }}
                          >
                            <ContentCopy sx={{ fontSize: 16 }} />
                          </IconButton>
                        </Tooltip>
                      )}
                    </Box>
                  </Box>
                </Box>

                {/* Sizing Preferences Card */}
                <Box
                  sx={{
                    borderRadius: '28px',
                    p: { xs: 2.5, md: 3 },
                    backgroundColor: colors.bgCard,
                    backdropFilter: 'blur(24px)',
                    boxShadow: colors.shadow,
                    border: colors.border,
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      pb: 2,
                      mb: 2,
                      borderBottom: colors.borderSubtle,
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
                      <Straighten sx={{ fontSize: 20, color: colors.accentBrass }} />
                      <Typography
                        sx={{
                          fontSize: '15px',
                          fontWeight: 700,
                          color: colors.textPrimary,
                          fontFamily: isRtl ? farsiDisplayStack : 'inherit',
                        }}
                      >
                        {LL.customerProfile.preferencesCardTitle()}
                      </Typography>
                    </Box>
                    <Tooltip title={!isLoggedIn ? LL.customerProfile.loginToEditTooltip() : ''}>
                      <span>
                        <Button
                          size="small"
                          disabled={!isLoggedIn}
                          onClick={() => {
                            if (isLoggedIn) {
                              setPrefForm(preferences);
                              setEditPreferencesOpen(true);
                            }
                          }}
                          sx={{
                            fontSize: '11px',
                            fontWeight: 700,
                            color: colors.accentBrass,
                            textTransform: 'none',
                            minWidth: 'auto',
                            p: 0,
                            fontFamily: 'inherit',
                            '&:hover': { textDecoration: 'underline', backgroundColor: 'transparent' },
                            '&.Mui-disabled': { opacity: 0.4 },
                          }}
                        >
                          {LL.customerProfile.edit()}
                        </Button>
                      </span>
                    </Tooltip>
                  </Box>

                  <Grid container spacing={2}>
                    <Grid size={{ xs: 6 }}>
                      <Box
                        sx={{
                          p: 1.75,
                          borderRadius: '16px',
                          backgroundColor: colors.itemBg,
                          border: colors.itemBorder,
                          textAlign: 'right',
                        }}
                      >
                        <Typography sx={{ fontSize: '11px', color: colors.textMuted, mb: 0.5, fontFamily: 'inherit' }}>
                          {LL.customerProfile.preferredClothingSize()}
                        </Typography>
                        <Typography sx={{ fontSize: '13px', fontWeight: 700, color: colors.textPrimary, fontFamily: 'inherit' }}>
                          {displayClothingSize}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid size={{ xs: 6 }}>
                      <Box
                        sx={{
                          p: 1.75,
                          borderRadius: '16px',
                          backgroundColor: colors.itemBg,
                          border: colors.itemBorder,
                          textAlign: 'right',
                        }}
                      >
                        <Typography sx={{ fontSize: '11px', color: colors.textMuted, mb: 0.5, fontFamily: 'inherit' }}>
                          {LL.customerProfile.standardShoeSize()}
                        </Typography>
                        <Typography sx={{ fontSize: '13px', fontWeight: 700, color: colors.textPrimary, fontFamily: 'inherit' }}>
                          {displayShoeSize}
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>

              {/* Column 2: Single Shipping Address (7 Cols) */}
              <Grid size={{ xs: 12, lg: 7 }}>
                <Box
                  sx={{
                    borderRadius: '28px',
                    p: { xs: 2.5, md: 3.5 },
                    backgroundColor: colors.bgCard,
                    backdropFilter: 'blur(24px)',
                    boxShadow: colors.shadow,
                    border: colors.border,
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      pb: 2,
                      mb: 2.5,
                      borderBottom: colors.borderSubtle,
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
                      <LocationOn sx={{ fontSize: 20, color: colors.accentBrass }} />
                      <Typography
                        sx={{
                          fontSize: '15px',
                          fontWeight: 700,
                          color: colors.textPrimary,
                          fontFamily: isRtl ? farsiDisplayStack : 'inherit',
                        }}
                      >
                        {LL.customerProfile.shippingCenterTitle()}
                      </Typography>
                    </Box>

                    <Tooltip title={!isLoggedIn ? LL.customerProfile.loginToEditTooltip() : ''}>
                      <span>
                        <Button
                          variant="outlined"
                          size="small"
                          disabled={!isLoggedIn}
                          onClick={handleOpenEditAddress}
                          startIcon={<Edit sx={{ fontSize: 16 }} />}
                          sx={{
                            borderRadius: '9999px',
                            px: 2,
                            py: 0.5,
                            fontSize: '12px',
                            fontWeight: 600,
                            textTransform: 'none',
                            fontFamily: 'inherit',
                            borderColor: colors.accentBrass,
                            color: colors.textPrimary,
                            '&:hover': {
                              borderColor: colors.accentBrass,
                              backgroundColor: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)',
                            },
                            '&.Mui-disabled': {
                              opacity: 0.45,
                              borderColor: colors.borderSubtle,
                            },
                          }}
                        >
                          {hasAddress ? LL.customerProfile.editAddress() : LL.customerProfile.addNewAddress()}
                        </Button>
                      </span>
                    </Tooltip>
                  </Box>

                  {hasAddress ? (
                    <Box
                      sx={{
                        borderRadius: '20px',
                        p: { xs: 2.5, md: 3 },
                        backgroundColor: colors.itemBg,
                        border: colors.itemBorder,
                        textAlign: 'right',
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                        <Box
                          sx={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 0.75,
                            px: 1.5,
                            py: 0.4,
                            borderRadius: '9999px',
                            backgroundColor: colors.accentBrass,
                            color: isDark ? '#121210' : '#ffffff',
                            fontSize: '11px',
                            fontWeight: 700,
                            fontFamily: 'inherit',
                          }}
                        >
                          <LocationOn sx={{ fontSize: 13 }} />
                          <span>{LL.customerProfile.primaryAddressBadge()}</span>
                        </Box>
                      </Box>

                      {/* Region Breadcrumb */}
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1,
                          fontSize: '12px',
                          fontWeight: 600,
                          color: colors.accentBrass,
                          mb: 1.5,
                          flexWrap: 'wrap',
                          fontFamily: 'inherit',
                        }}
                      >
                        {currentState && <span>{LL.customerProfile.province()}: {currentState}</span>}
                        {currentState && currentCity && <Typography sx={{ color: colors.textMuted }}>•</Typography>}
                        {currentCity && <span>{LL.customerProfile.city()}: {currentCity}</span>}
                        {currentCountry && (
                          <>
                            <Typography sx={{ color: colors.textMuted }}>•</Typography>
                            <span>{currentCountry}</span>
                          </>
                        )}
                      </Box>

                      {/* Street Address */}
                      <Typography
                        sx={{
                          fontSize: '14px',
                          fontWeight: 700,
                          color: colors.textPrimary,
                          lineHeight: 1.7,
                          mb: 2,
                          fontFamily: 'inherit',
                        }}
                      >
                        {currentAddress}
                      </Typography>

                      {/* Metadata: Postal Code & Recipient */}
                      <Grid container spacing={2} sx={{ pt: 2, borderTop: colors.borderSubtle }}>
                        <Grid size={{ xs: 12, sm: 6 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, fontSize: '12px', color: colors.textSecondary, fontFamily: 'inherit' }}>
                            <MarkunreadMailbox sx={{ fontSize: 16, color: colors.textMuted }} />
                            <span>{LL.customerProfile.postalCode()}</span>
                            <Typography component="span" dir="ltr" sx={{ fontWeight: 700, color: colors.textPrimary, letterSpacing: '0.05em', fontFamily: 'inherit' }}>
                              {currentZipCode ? toEnglishDigits(currentZipCode) : '—'}
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, fontSize: '12px', color: colors.textSecondary, fontFamily: 'inherit' }}>
                            <PhoneInTalk sx={{ fontSize: 16, color: colors.textMuted }} />
                            <span>{LL.customerProfile.recipient()}</span>
                            <Typography component="span" sx={{ fontWeight: 700, color: colors.textPrimary, fontFamily: 'inherit' }}>
                              {displayName} {displayPhone !== '—' ? `(${displayPhone})` : ''}
                            </Typography>
                          </Box>
                        </Grid>
                      </Grid>
                    </Box>
                  ) : (
                    <Box
                      sx={{
                        p: 4,
                        borderRadius: '20px',
                        backgroundColor: colors.itemBg,
                        border: colors.itemBorder,
                        textAlign: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 1.5,
                      }}
                    >
                      <AddLocationAlt sx={{ fontSize: 44, color: colors.accentBrass, opacity: 0.6 }} />
                      <Typography
                        sx={{
                          fontWeight: 700,
                          fontSize: '15px',
                          color: colors.textPrimary,
                          fontFamily: isRtl ? farsiDisplayStack : 'inherit',
                        }}
                      >
                        {LL.customerProfile.noAddressTitle()}
                      </Typography>
                      <Typography sx={{ fontSize: '13px', color: colors.textSecondary, maxWidth: 360, fontFamily: 'inherit' }}>
                        {isLoggedIn
                          ? LL.customerProfile.noAddressSubtitle()
                          : LL.customerProfile.guestNoAddress()}
                      </Typography>
                      <Tooltip title={!isLoggedIn ? LL.customerProfile.loginToEditTooltip() : ''}>
                        <span>
                          <Button
                            variant="contained"
                            disabled={!isLoggedIn}
                            onClick={handleOpenEditAddress}
                            sx={{
                              mt: 1,
                              borderRadius: '9999px',
                              backgroundColor: colors.buttonPrimaryBg,
                              color: colors.buttonPrimaryColor,
                              px: 3,
                              textTransform: 'none',
                              fontWeight: 700,
                              fontFamily: 'inherit',
                              '&:hover': { backgroundColor: colors.buttonPrimaryHover },
                              '&.Mui-disabled': {
                                opacity: 0.45,
                                backgroundColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)',
                                color: colors.textMuted,
                              },
                            }}
                          >
                            {LL.customerProfile.addNewAddress()}
                          </Button>
                        </span>
                      </Tooltip>
                    </Box>
                  )}
                </Box>
              </Grid>
            </Grid>
          )}

          {/* TAB 1: Orders (KickZone Site Style) */}
          {activeTab === 1 && (
            <Box
              sx={{
                width: '100%',
                borderRadius: '28px',
                p: { xs: 2.5, md: 3.5 },
                backgroundColor: colors.bgCard,
                backdropFilter: 'blur(24px)',
                boxShadow: colors.shadow,
                border: colors.border,
                textAlign: 'right',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <ShoppingBag sx={{ fontSize: 22, color: colors.accentBrass }} />
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 800,
                      color: colors.textPrimary,
                      fontFamily: isRtl ? farsiDisplayStack : 'inherit',
                    }}
                  >
                    {LL.customerProfile.tabMyOrders()}
                  </Typography>
                </Box>
                {isLoggedIn && (
                  <Button
                    variant="outlined"
                    onClick={() => navigate(CUSTOMER_ROUTES.ORDERS)}
                    endIcon={isRtl ? <ArrowBack sx={{ fontSize: 16 }} /> : <ArrowForward sx={{ fontSize: 16 }} />}
                    sx={{
                      borderRadius: '9999px',
                      borderColor: colors.accentBrass,
                      color: colors.textPrimary,
                      textTransform: 'none',
                      fontWeight: 600,
                      fontSize: '12px',
                      fontFamily: 'inherit',
                      '&:hover': {
                        borderColor: colors.accentBrass,
                        backgroundColor: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)',
                      },
                    }}
                  >
                    {LL.customerProfile.goToOrders()}
                  </Button>
                )}
              </Box>

              {!isLoggedIn ? (
                <Box sx={{ py: 6, textAlign: 'center', color: colors.textSecondary }}>
                  <Typography sx={{ mb: 2.5, fontSize: '14px', fontFamily: 'inherit' }}>
                    {LL.customerProfile.guestNoOrders()}
                  </Typography>
                  <Button
                    variant="contained"
                    onClick={() => navigate(CUSTOMER_ROUTES.LOGIN)}
                    startIcon={<Login sx={{ fontSize: 16 }} />}
                    sx={{
                      borderRadius: '9999px',
                      backgroundColor: colors.buttonPrimaryBg,
                      color: colors.buttonPrimaryColor,
                      px: 3.5,
                      py: 1,
                      textTransform: 'none',
                      fontWeight: 700,
                      fontFamily: 'inherit',
                      '&:hover': { backgroundColor: colors.buttonPrimaryHover },
                    }}
                  >
                    {LL.customerProfile.loginButton()}
                  </Button>
                </Box>
              ) : ordersLoading ? (
                <Box sx={{ py: 6, display: 'flex', justifyContent: 'center' }}>
                  <CircularProgress size={32} sx={{ color: colors.accentBrass }} />
                </Box>
              ) : myOrders.length > 0 ? (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                  {myOrders.map((order) => (
                    <Box
                      key={order.id}
                      sx={{
                        p: { xs: 2, md: 2.5 },
                        borderRadius: '20px',
                        backgroundColor: colors.itemBg,
                        border: colors.itemBorder,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1.5,
                      }}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: 1.5,
                          pb: 1.5,
                          borderBottom: colors.borderSubtle,
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                          <Typography sx={{ fontWeight: 800, fontSize: '14px', color: colors.textPrimary, fontFamily: 'inherit' }}>
                            سفارش #{order.orderNumber}
                          </Typography>
                          <OrderStatusChip status={order.status} />
                        </Box>
                        <Typography sx={{ fontSize: '12px', color: colors.textMuted, fontFamily: 'inherit' }}>
                          {formatDate(order.createdAt)}
                        </Typography>
                      </Box>

                      {/* Items List */}
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75 }}>
                        {order.items.map((item) => (
                          <Box
                            key={item.id}
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              fontSize: '13px',
                              fontFamily: 'inherit',
                            }}
                          >
                            <Typography sx={{ color: colors.textPrimary, fontWeight: 500, fontFamily: 'inherit' }}>
                              {item.productName}{' '}
                              <Typography component="span" sx={{ color: colors.textMuted, fontSize: '12px', fontFamily: 'inherit' }}>
                                (تعداد: {item.quantity})
                              </Typography>
                            </Typography>
                            <Typography sx={{ color: colors.textSecondary, fontWeight: 600, fontFamily: 'inherit' }}>
                              <PriceDisplay priceInUSD={item.totalPrice} showSymbol={true} />
                            </Typography>
                          </Box>
                        ))}
                      </Box>

                      {/* Order Footer */}
                      <Box
                        sx={{
                          pt: 1.5,
                          borderTop: colors.borderSubtle,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                        }}
                      >
                        <Typography sx={{ fontSize: '13px', fontWeight: 600, color: colors.textSecondary, fontFamily: 'inherit' }}>
                          مبلغ کل فاکتور:
                        </Typography>
                        <Typography sx={{ fontSize: '15px', fontWeight: 800, color: colors.accentBrass, fontFamily: 'inherit' }}>
                          <PriceDisplay priceInUSD={order.total} showSymbol={true} />
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </Box>
              ) : (
                <Box sx={{ py: 6, textAlign: 'center', color: colors.textSecondary }}>
                  <Typography sx={{ mb: 2, fontSize: '14px', fontFamily: 'inherit' }}>
                    {LL.customerProfile.noOrdersFound()}
                  </Typography>
                  <Button
                    variant="contained"
                    onClick={() => navigate(CUSTOMER_ROUTES.PRODUCTS)}
                    sx={{
                      borderRadius: '9999px',
                      backgroundColor: colors.buttonPrimaryBg,
                      color: colors.buttonPrimaryColor,
                      px: 3,
                      textTransform: 'none',
                      fontWeight: 700,
                      fontFamily: 'inherit',
                      '&:hover': { backgroundColor: colors.buttonPrimaryHover },
                    }}
                  >
                    {LL.customerProfile.startShopping()}
                  </Button>
                </Box>
              )}
            </Box>
          )}

          {/* TAB 2: Account Security (No 2FA) */}
          {activeTab === 2 && (
            <Box
              sx={{
                width: '100%',
                borderRadius: '28px',
                p: { xs: 2.5, md: 3.5 },
                backgroundColor: colors.bgCard,
                backdropFilter: 'blur(24px)',
                boxShadow: colors.shadow,
                border: colors.border,
                textAlign: 'right',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
                <Security sx={{ fontSize: 22, color: colors.accentBrass }} />
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 800,
                    color: colors.textPrimary,
                    fontFamily: isRtl ? farsiDisplayStack : 'inherit',
                  }}
                >
                  {LL.customerProfile.securityTitle()}
                </Typography>
              </Box>

              {!isLoggedIn && (
                <Alert
                  severity="info"
                  sx={{
                    mb: 3,
                    borderRadius: '16px',
                    backgroundColor: isDark ? 'rgba(32, 32, 28, 0.8)' : 'rgba(247, 246, 243, 0.8)',
                    color: colors.textPrimary,
                    fontFamily: 'inherit',
                    '& .MuiAlert-icon': { color: colors.accentBrass },
                  }}
                >
                  {LL.customerProfile.guestNoSecurity()}
                </Alert>
              )}

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 640 }}>
                {/* Account Email */}
                <Box
                  sx={{
                    p: 2.5,
                    borderRadius: '20px',
                    backgroundColor: colors.itemBg,
                    border: colors.itemBorder,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <Box>
                    <Typography sx={{ fontWeight: 700, fontSize: '14px', color: colors.textPrimary, mb: 0.5, fontFamily: 'inherit' }}>
                      {LL.customerProfile.email()}
                    </Typography>
                    <Typography dir="ltr" sx={{ fontSize: '13px', color: colors.textSecondary, fontFamily: 'inherit' }}>
                      {displayEmail}
                    </Typography>
                  </Box>
                  <Email sx={{ fontSize: 20, color: colors.textMuted }} />
                </Box>

                {/* Password Reset */}
                <Box
                  sx={{
                    p: 2.5,
                    borderRadius: '20px',
                    backgroundColor: colors.itemBg,
                    border: colors.itemBorder,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: 1.5,
                  }}
                >
                  <Box>
                    <Typography sx={{ fontWeight: 700, fontSize: '14px', color: colors.textPrimary, mb: 0.5, fontFamily: 'inherit' }}>
                      {LL.customerProfile.changePassword()}
                    </Typography>
                    <Typography sx={{ fontSize: '12px', color: colors.textSecondary, fontFamily: 'inherit' }}>
                      {LL.customerProfile.changePasswordDesc()}
                    </Typography>
                  </Box>
                  <Tooltip title={!isLoggedIn ? LL.customerProfile.loginToEditTooltip() : ''}>
                    <span>
                      <Button
                        variant="outlined"
                        size="small"
                        disabled={!isLoggedIn}
                        component={RouterLink}
                        to={CUSTOMER_ROUTES.FORGOT_PASSWORD}
                        startIcon={<LockReset sx={{ fontSize: 16 }} />}
                        sx={{
                          borderRadius: '9999px',
                          textTransform: 'none',
                          borderColor: colors.accentBrass,
                          color: colors.textPrimary,
                          fontWeight: 600,
                          fontFamily: 'inherit',
                          '&:hover': {
                            borderColor: colors.accentBrass,
                            backgroundColor: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)',
                          },
                          '&.Mui-disabled': { opacity: 0.45 },
                        }}
                      >
                        {LL.customerProfile.changePassword()}
                      </Button>
                    </span>
                  </Tooltip>
                </Box>

                {/* Secure Sign Out */}
                <Box
                  sx={{
                    p: 2.5,
                    borderRadius: '20px',
                    backgroundColor: colors.itemBg,
                    border: colors.itemBorder,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: 1.5,
                  }}
                >
                  <Box>
                    <Typography sx={{ fontWeight: 700, fontSize: '14px', color: colors.textPrimary, mb: 0.5, fontFamily: 'inherit' }}>
                      {LL.customerProfile.logout()}
                    </Typography>
                    <Typography sx={{ fontSize: '12px', color: colors.textSecondary, fontFamily: 'inherit' }}>
                      {LL.customerProfile.logoutDesc()}
                    </Typography>
                  </Box>
                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    disabled={!isLoggedIn}
                    onClick={handleLogout}
                    startIcon={<Logout sx={{ fontSize: 16 }} />}
                    sx={{
                      borderRadius: '9999px',
                      textTransform: 'none',
                      fontWeight: 600,
                      fontFamily: 'inherit',
                      '&.Mui-disabled': { opacity: 0.45 },
                    }}
                  >
                    {LL.customerProfile.logout()}
                  </Button>
                </Box>
              </Box>
            </Box>
          )}
        </Box>

        {/* ----------------- DIALOGS ----------------- */}

        {/* Dialog 1: Edit Profile */}
        <Dialog
          open={editProfileOpen}
          onClose={() => setEditProfileOpen(false)}
          fullWidth
          maxWidth="xs"
          PaperProps={{
            sx: {
              borderRadius: '24px',
              backgroundColor: isDark ? '#1a1a17' : '#ffffff',
              backgroundImage: 'none',
              border: colors.border,
              fontFamily: theme.typography.fontFamily,
              p: 1,
            },
          }}
        >
          <DialogTitle
            sx={{
              textAlign: 'right',
              fontWeight: 700,
              color: colors.textPrimary,
              pb: 1,
              fontFamily: isRtl ? farsiDisplayStack : 'inherit',
            }}
          >
            {LL.customerProfile.editProfileDialogTitle()}
          </DialogTitle>
          <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: '16px !important' }}>
            <TextField
              label={LL.customerProfile.firstName()}
              value={profileForm.name}
              onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
              fullWidth
              size="small"
            />
            <TextField
              label={LL.customerProfile.lastName()}
              value={profileForm.lastName}
              onChange={(e) => setProfileForm({ ...profileForm, lastName: e.target.value })}
              fullWidth
              size="small"
            />
            <TextField
              label={LL.customerProfile.phone()}
              value={profileForm.phone}
              onChange={(e) => setProfileForm({ ...profileForm, phone: toEnglishDigits(e.target.value) })}
              fullWidth
              size="small"
              slotProps={{ htmlInput: { dir: 'ltr' } }}
            />
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 2, justifyContent: 'space-between' }}>
            <Button
              onClick={() => setEditProfileOpen(false)}
              color="inherit"
              sx={{ borderRadius: '9999px', textTransform: 'none', fontFamily: 'inherit' }}
            >
              {LL.customerProfile.cancel()}
            </Button>
            <Button
              variant="contained"
              onClick={handleSaveProfile}
              disabled={updatingProfile || !isLoggedIn}
              sx={{
                borderRadius: '9999px',
                textTransform: 'none',
                fontFamily: 'inherit',
                backgroundColor: colors.buttonPrimaryBg,
                color: colors.buttonPrimaryColor,
                px: 3,
                '&:hover': { backgroundColor: colors.buttonPrimaryHover },
              }}
            >
              {updatingProfile ? <CircularProgress size={20} color="inherit" /> : LL.customerProfile.saveChanges()}
            </Button>
          </DialogActions>
        </Dialog>

        {/* Dialog 2: Edit Address */}
        <Dialog
          open={editAddressOpen}
          onClose={() => setEditAddressOpen(false)}
          fullWidth
          maxWidth="sm"
          PaperProps={{
            sx: {
              borderRadius: '24px',
              backgroundColor: isDark ? '#1a1a17' : '#ffffff',
              backgroundImage: 'none',
              border: colors.border,
              fontFamily: theme.typography.fontFamily,
              p: 1,
            },
          }}
        >
          <DialogTitle
            sx={{
              textAlign: 'right',
              fontWeight: 700,
              color: colors.textPrimary,
              pb: 1,
              fontFamily: isRtl ? farsiDisplayStack : 'inherit',
            }}
          >
            {LL.customerProfile.editAddressDialogTitle()}
          </DialogTitle>
          <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: '16px !important' }}>
            <Grid container spacing={2}>
              <Grid size={{ xs: 6 }}>
                <TextField
                  label={LL.customerProfile.province()}
                  value={addressForm.state}
                  onChange={(e) => setAddressForm({ ...addressForm, state: e.target.value })}
                  fullWidth
                  size="small"
                />
              </Grid>
              <Grid size={{ xs: 6 }}>
                <TextField
                  label={LL.customerProfile.city()}
                  value={addressForm.city}
                  onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })}
                  fullWidth
                  size="small"
                />
              </Grid>
            </Grid>
            <TextField
              label={LL.customerProfile.addressLine()}
              value={addressForm.address}
              onChange={(e) => setAddressForm({ ...addressForm, address: e.target.value })}
              fullWidth
              multiline
              rows={2}
              size="small"
            />
            <Grid container spacing={2}>
              <Grid size={{ xs: 6 }}>
                <TextField
                  label={LL.customerProfile.postalCode()}
                  value={addressForm.zipCode}
                  onChange={(e) => setAddressForm({ ...addressForm, zipCode: toEnglishDigits(e.target.value) })}
                  fullWidth
                  size="small"
                  slotProps={{ htmlInput: { dir: 'ltr' } }}
                />
              </Grid>
              <Grid size={{ xs: 6 }}>
                <TextField
                  label={LL.customerProfile.phone()}
                  value={addressForm.phone}
                  onChange={(e) => setAddressForm({ ...addressForm, phone: toEnglishDigits(e.target.value) })}
                  fullWidth
                  size="small"
                  slotProps={{ htmlInput: { dir: 'ltr' } }}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 2, justifyContent: 'space-between' }}>
            <Button
              onClick={() => setEditAddressOpen(false)}
              color="inherit"
              sx={{ borderRadius: '9999px', textTransform: 'none', fontFamily: 'inherit' }}
            >
              {LL.customerProfile.cancel()}
            </Button>
            <Button
              variant="contained"
              onClick={handleSaveAddress}
              disabled={updatingProfile || !isLoggedIn}
              sx={{
                borderRadius: '9999px',
                textTransform: 'none',
                fontFamily: 'inherit',
                backgroundColor: colors.buttonPrimaryBg,
                color: colors.buttonPrimaryColor,
                px: 3,
                '&:hover': { backgroundColor: colors.buttonPrimaryHover },
              }}
            >
              {updatingProfile ? <CircularProgress size={20} color="inherit" /> : LL.customerProfile.saveChanges()}
            </Button>
          </DialogActions>
        </Dialog>

        {/* Dialog 3: Edit Preferred Sizing */}
        <Dialog
          open={editPreferencesOpen}
          onClose={() => setEditPreferencesOpen(false)}
          fullWidth
          maxWidth="xs"
          PaperProps={{
            sx: {
              borderRadius: '24px',
              backgroundColor: isDark ? '#1a1a17' : '#ffffff',
              backgroundImage: 'none',
              border: colors.border,
              fontFamily: theme.typography.fontFamily,
              p: 1,
            },
          }}
        >
          <DialogTitle
            sx={{
              textAlign: 'right',
              fontWeight: 700,
              color: colors.textPrimary,
              pb: 1,
              fontFamily: isRtl ? farsiDisplayStack : 'inherit',
            }}
          >
            {LL.customerProfile.editPreferencesDialogTitle()}
          </DialogTitle>
          <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: '16px !important' }}>
            <TextField
              label={LL.customerProfile.preferredClothingSize()}
              value={prefForm.clothingSize}
              onChange={(e) => setPrefForm({ ...prefForm, clothingSize: e.target.value })}
              fullWidth
              size="small"
              placeholder="e.g. M / L"
            />
            <TextField
              label={LL.customerProfile.standardShoeSize()}
              value={prefForm.shoeSize}
              onChange={(e) => setPrefForm({ ...prefForm, shoeSize: e.target.value })}
              fullWidth
              size="small"
              placeholder="e.g. 42 EU (8.5 US)"
            />
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 2, justifyContent: 'space-between' }}>
            <Button
              onClick={() => setEditPreferencesOpen(false)}
              color="inherit"
              sx={{ borderRadius: '9999px', textTransform: 'none', fontFamily: 'inherit' }}
            >
              {LL.customerProfile.cancel()}
            </Button>
            <Button
              variant="contained"
              onClick={handleSavePreferences}
              disabled={!isLoggedIn}
              sx={{
                borderRadius: '9999px',
                textTransform: 'none',
                fontFamily: 'inherit',
                backgroundColor: colors.buttonPrimaryBg,
                color: colors.buttonPrimaryColor,
                px: 3,
                '&:hover': { backgroundColor: colors.buttonPrimaryHover },
              }}
            >
              {LL.customerProfile.saveChanges()}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </CustomersLayout>
  );
}

export default CustomerProfile;
