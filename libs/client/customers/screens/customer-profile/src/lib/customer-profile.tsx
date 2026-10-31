import React, { useState, useEffect, useMemo } from 'react';
import { useForm, type FieldErrors, type FieldValues, type Resolver } from 'react-hook-form';
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
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
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
import ShoppingBag from '@mui/icons-material/ShoppingBag';
import VpnKey from '@mui/icons-material/VpnKey';
import MarkunreadMailbox from '@mui/icons-material/MarkunreadMailbox';
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
} from '@kickzone-workspace/shared-i18n';
import { CUSTOMER_ROUTES } from '@kickzone-workspace/customers-routes';
import {
  GET_MY_PROFILE,
  UPDATE_MY_PROFILE,
} from '@kickzone-workspace/customers-graphql';
import { useSnackbar } from '@kickzone-workspace/snackbar-hook';
import {
  shippingIssueMessage,
  toEnglishDigits,
} from '@kickzone-workspace/shipping-validation';
import {
  profileAddressFormSchema,
  profilePhoneFormSchema,
  type ProfileAddressFormInput,
  type ProfilePhoneFormInput,
} from '@kickzone-workspace/validation';
import type { TranslationFunctions } from '@kickzone-workspace/shared-i18n';
import {
  APPAREL_SIZES,
  FOOTWEAR_EU_SIZES,
  euToUs,
} from '@kickzone-workspace/product-sizes';

const farsiFont = '"Vazirmatn", "Manrope", sans-serif';

/** Profile field names that differ from the checkout (shipping) field names. */
const PROFILE_TO_SHIPPING_FIELD: Record<string, string> = {
  phone: 'customerPhone',
  address: 'shippingAddress',
};

type ProfileIssue = {
  code: string;
  path: PropertyKey[];
  input?: unknown;
  errors?: ProfileIssue[][];
};

type ProfileSchema = {
  safeParse: (
    data: unknown,
    params: { reportInput: boolean }
  ) => { success: true } | { success: false; error: { issues: ProfileIssue[] } };
};

/** Maps a shared profile-schema issue to the existing localized validation message. */
export const profileIssueMessage = (
  issue: ProfileIssue,
  LL: TranslationFunctions
): string => {
  const field = String(issue.path[0] ?? '');
  // Clearable fields are "'' or a valid value": report the valid-value branch.
  const inner =
    issue.code === 'invalid_union'
      ? issue.errors?.[issue.errors.length - 1]?.[0] ?? issue
      : issue;
  return shippingIssueMessage(
    { code: inner.code, input: inner.input, path: [PROFILE_TO_SHIPPING_FIELD[field] ?? field] },
    LL
  );
};

/** react-hook-form resolver for the shared profile schemas (digits normalized first). */
export const createProfileResolver =
  <T extends FieldValues>(schema: ProfileSchema, LL: TranslationFunctions): Resolver<T> =>
  async (values) => {
    const normalized: Record<string, unknown> = { ...values };
    for (const key of ['phone', 'zipCode']) {
      const v = normalized[key];
      if (typeof v === 'string') normalized[key] = toEnglishDigits(v).trim();
    }
    const result = schema.safeParse(normalized, { reportInput: true });
    if (result.success) return { values, errors: {} };
    const errors: Record<string, { type: string; message: string }> = {};
    for (const issue of result.error.issues) {
      const field = String(issue.path[0] ?? '');
      if (field && !errors[field]) {
        errors[field] = { type: issue.code, message: profileIssueMessage(issue, LL) };
      }
    }
    return { values: {}, errors: errors as FieldErrors<T> };
  };

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

  // Active Navigation Tab: 0 = Profile & Address, 1 = Security
  const [activeTab, setActiveTab] = useState<number>(0);

  // Modals state
  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const [editAddressOpen, setEditAddressOpen] = useState(false);
  const [editPreferencesOpen, setEditPreferencesOpen] = useState(false);

  // Query: My Profile (includes preferred sizing from database)
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
      clothingSize?: string | null;
      shoeSize?: string | null;
    };
  }>(GET_MY_PROFILE, {
    fetchPolicy: 'cache-and-network',
    skip: !isLoggedIn,
  });

  // Mutation: Update My Profile
  const [updateProfileMutation, { loading: updatingProfile }] =
    useMutation(UPDATE_MY_PROFILE);

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

  // Preferred Sizing Form state
  const [prefForm, setPrefForm] = useState({
    clothingSize: profileData?.myProfile?.clothingSize || '',
    shoeSize: profileData?.myProfile?.shoeSize || '',
  });

  useEffect(() => {
    if (profileData?.myProfile) {
      setPrefForm({
        clothingSize: profileData.myProfile.clothingSize || '',
        shoeSize: profileData.myProfile.shoeSize || '',
      });
    }
  }, [profileData]);

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

  // Preferred sizing display data from service
  const currentClothingSize =
    (isLoggedIn && profileData?.myProfile?.clothingSize) || '';
  const currentShoeSize =
    (isLoggedIn && profileData?.myProfile?.shoeSize) || '';
  const displayClothingSize = isLoggedIn
    ? currentClothingSize || '—'
    : '—';
  const displayShoeSize = isLoggedIn ? currentShoeSize || '—' : '—';

  // Display user info (only placeholders if not logged in)
  const displayName = isLoggedIn && user?.name
    ? `${user.name} ${user.lastName || ''}`.trim()
    : '—';
  const displayEmail = isLoggedIn && user?.email ? user.email : '—';
  const displayPhone = isLoggedIn && currentPhone ? currentPhone : '—';
  const displayRole = isLoggedIn
    ? LL.customerProfile.customerAccount()
    : LL.customerProfile.guestAccount();

  // Handle Copy Email
  const handleCopyEmail = () => {
    if (isLoggedIn && displayEmail !== '—') {
      navigator.clipboard.writeText(displayEmail);
      showSnackbar(LL.customerProfile.emailCopied(), { severity: 'success' });
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

  const addressResolver = useMemo(
    () => createProfileResolver<ProfileAddressFormInput>(profileAddressFormSchema, LL),
    [LL]
  );
  const phoneResolver = useMemo(
    () => createProfileResolver<ProfilePhoneFormInput>(profilePhoneFormSchema, LL),
    [LL]
  );
  const addressRhf = useForm<ProfileAddressFormInput>({
    values: addressForm,
    resolver: addressResolver,
    mode: 'onSubmit',
  });
  const phoneRhf = useForm<ProfilePhoneFormInput>({
    values: { phone: profileForm.phone },
    resolver: phoneResolver,
    mode: 'onSubmit',
  });
  const addressErrors = addressRhf.formState.errors;
  const phoneErrors = phoneRhf.formState.errors;

  // Save Address Modal Action
  const handleSaveAddress = async () => {
    if (!isLoggedIn) return;
    if (!(await addressRhf.trigger())) return;
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
      showSnackbar(LL.customerProfile.saveSuccess(), { severity: 'success' });
    } catch (err) {
      console.error('Error updating address:', err);
      showSnackbar(LL.customerProfile.saveError(), { severity: 'error' });
    }
  };

  // Save Profile Form Action
  const handleSaveProfile = async () => {
    if (!isLoggedIn) return;
    if (!(await phoneRhf.trigger())) return;
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
      showSnackbar(LL.customerProfile.saveSuccess(), { severity: 'success' });
    } catch (err) {
      console.error('Error updating profile:', err);
      showSnackbar(LL.customerProfile.saveError(), { severity: 'error' });
    }
  };

  // Open Edit Preferences Modal
  const handleOpenEditPreferences = () => {
    if (!isLoggedIn) return;
    setPrefForm({
      clothingSize: currentClothingSize,
      shoeSize: currentShoeSize,
    });
    setEditPreferencesOpen(true);
  };

  // Save Preferred Sizing to Service
  const handleSavePreferences = async () => {
    if (!isLoggedIn) return;
    try {
      await updateProfileMutation({
        variables: {
          input: {
            clothingSize: prefForm.clothingSize || null,
            shoeSize: prefForm.shoeSize || null,
          },
        },
      });
      refetchProfile();
      setEditPreferencesOpen(false);
      showSnackbar(LL.customerProfile.saveSuccess(), { severity: 'success' });
    } catch (err) {
      console.error('Error updating sizing preferences:', err);
      showSnackbar(LL.customerProfile.saveError(), { severity: 'error' });
    }
  };

  // Logout handler
  const handleLogout = async () => {
    try {
      await logout();
      navigate(CUSTOMER_ROUTES.LOGIN);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Dynamic Theme Colors
  const colors = {
    bgPage: isDark ? '#0f0f0e' : '#f4f3f0',
    liquidCardBg: isDark
      ? 'linear-gradient(145deg, rgba(28, 28, 25, 0.72) 0%, rgba(18, 18, 16, 0.85) 100%)'
      : 'linear-gradient(145deg, rgba(255, 255, 255, 0.78) 0%, rgba(247, 246, 242, 0.9) 100%)',
    bgCard: isDark ? 'rgba(28, 28, 25, 0.6)' : 'rgba(255, 255, 255, 0.65)',
    border: isDark
      ? '1px solid rgba(255, 255, 255, 0.08)'
      : '1px solid rgba(0, 0, 0, 0.06)',
    borderSubtle: isDark
      ? '1px solid rgba(255, 255, 255, 0.05)'
      : '1px solid rgba(0, 0, 0, 0.04)',
    textPrimary: isDark ? '#f5f5f2' : '#181816',
    textSecondary: isDark ? '#9c9a92' : '#6b6962',
    textMuted: isDark ? '#6b6962' : '#9c9a92',
    accentBrass: isDark ? '#d4c7a5' : '#8f8362',
    itemBg: isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.02)',
    itemBorder: isDark
      ? '1px solid rgba(255, 255, 255, 0.05)'
      : '1px solid rgba(0, 0, 0, 0.04)',
    tabBarBg: isDark ? 'rgba(22, 22, 20, 0.7)' : 'rgba(240, 239, 235, 0.8)',
    tabBarBorder: isDark
      ? '1px solid rgba(255, 255, 255, 0.08)'
      : '1px solid rgba(0, 0, 0, 0.06)',
    activeTabBg: isDark ? '#262623' : '#ffffff',
    activeTabColor: isDark ? '#ffffff' : '#121210',
    activeTabBorder: isDark
      ? '1px solid rgba(255, 255, 255, 0.12)'
      : '1px solid rgba(0, 0, 0, 0.08)',
    buttonPrimaryBg: isDark ? '#e6dfd1' : '#181816',
    buttonPrimaryColor: isDark ? '#121210' : '#ffffff',
    buttonPrimaryHover: isDark ? '#d8cebc' : '#2c2c28',
    shadow: isDark
      ? '0 20px 40px rgba(0, 0, 0, 0.4)'
      : '0 20px 40px rgba(0, 0, 0, 0.04)',
  };

  return (
    <CustomersLayout>
      <Box
        sx={{
          minHeight: '100vh',
          py: { xs: 3, md: 5 },
          maxWidth: 1200,
          mx: 'auto',
          px: { xs: 2, sm: 3, md: 4 },
          fontFamily: isRtl ? farsiFont : theme.typography.fontFamily,
        }}
      >
        {/* Unauthenticated / Guest Warning Banner */}
        {!isLoggedIn && (
          <Alert
            severity="info"
            icon={<Login sx={{ fontSize: 22, color: colors.accentBrass }} />}
            action={
              <Button
                variant="contained"
                size="small"
                onClick={() => navigate(CUSTOMER_ROUTES.LOGIN)}
                startIcon={<Login sx={{ fontSize: 16 }} />}
                sx={{
                  borderRadius: '9999px',
                  textTransform: 'none',
                  fontFamily: isRtl ? farsiFont : 'inherit',
                  backgroundColor: colors.buttonPrimaryBg,
                  color: colors.buttonPrimaryColor,
                  fontWeight: 700,
                  fontSize: '12px',
                  px: 2,
                  '&:hover': { backgroundColor: colors.buttonPrimaryHover },
                }}
              >
                {LL.customerProfile.loginButton()}
              </Button>
            }
            sx={{
              mb: 3.5,
              borderRadius: '20px',
              backgroundColor: isDark
                ? 'rgba(36, 36, 32, 0.85)'
                : 'rgba(245, 244, 239, 0.95)',
              backdropFilter: 'blur(16px)',
              border: colors.border,
              color: colors.textPrimary,
              fontFamily: isRtl ? farsiFont : 'inherit',
              alignItems: 'center',
              boxShadow: colors.shadow,
            }}
          >
            {LL.customerProfile.noUserWarning()}
          </Alert>
        )}

        {/* Master Liquid Glass Container wrapping the profile sections */}
        <Box
          sx={{
            borderRadius: { xs: '28px', md: '36px' },
            p: { xs: 2.5, sm: 4, md: 5 },
            background: colors.liquidCardBg,
            backdropFilter: 'blur(32px) saturate(190%)',
            WebkitBackdropFilter: 'blur(32px) saturate(190%)',
            border: colors.border,
            boxShadow: isDark
              ? '0 30px 60px rgba(0, 0, 0, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.08)'
              : '0 30px 60px rgba(0, 0, 0, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.9)',
            display: 'flex',
            flexDirection: 'column',
            gap: { xs: 3, md: 4 },
          }}
        >
          {/* Header: User Avatar & Actions */}
          <Box
            component="header"
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: { xs: 'flex-start', sm: 'center' },
              justifyContent: 'space-between',
              gap: 2.5,
              pb: 3,
              borderBottom: colors.borderSubtle,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.5 }}>
              {/* Profile Avatar Glass Ring */}
              <Box
                sx={{
                  position: 'relative',
                  width: { xs: 68, md: 80 },
                  height: { xs: 68, md: 80 },
                  borderRadius: '50%',
                  background: isDark
                    ? 'linear-gradient(135deg, #262622 0%, #161614 100%)'
                    : 'linear-gradient(135deg, #f0efe9 0%, #e3e2dc 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: isDark
                    ? '1.5px solid rgba(255, 255, 255, 0.12)'
                    : '1.5px solid rgba(0, 0, 0, 0.08)',
                  boxShadow: colors.shadow,
                  color: colors.accentBrass,
                  flexShrink: 0,
                }}
              >
                <Person sx={{ fontSize: { xs: 38, md: 44 } }} />
              </Box>

              {/* Names & User Subtitle */}
              <Box sx={{ display: 'flex', flexDirection: 'column', textAlign: isRtl ? 'right' : 'left' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap' }}>
                  <Typography
                    variant="h5"
                    component="h1"
                    sx={{
                      fontWeight: 800,
                      fontSize: { xs: '22px', md: '28px' },
                      color: colors.textPrimary,
                      fontFamily: isRtl ? farsiFont : 'inherit',
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
                      fontFamily: isRtl ? farsiFont : 'inherit',
                    }}
                  />
                </Box>
                <Typography
                  sx={{
                    fontSize: '14px',
                    color: colors.textSecondary,
                    mt: 0.5,
                    fontFamily: isRtl ? farsiFont : 'inherit',
                  }}
                >
                  {displayEmail}
                </Typography>
              </Box>
            </Box>

            {/* Header Action Buttons (Orders screen shortcut + Edit Information) */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                flexWrap: 'wrap',
                alignSelf: { xs: 'stretch', sm: 'auto' },
              }}
            >
              {/* Direct button to Orders Screen */}
              <Button
                component={RouterLink}
                to={CUSTOMER_ROUTES.ORDERS}
                variant="outlined"
                startIcon={<ShoppingBag sx={{ fontSize: 18, color: colors.accentBrass }} />}
                sx={{
                  height: 42,
                  px: 2.5,
                  borderRadius: '9999px',
                  borderColor: colors.accentBrass,
                  color: colors.textPrimary,
                  fontSize: '13px',
                  fontWeight: 600,
                  textTransform: 'none',
                  fontFamily: isRtl ? farsiFont : 'inherit',
                  '&:hover': {
                    borderColor: colors.accentBrass,
                    backgroundColor: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)',
                  },
                }}
              >
                {LL.customerProfile.tabMyOrders()}
              </Button>

              {/* Edit Information Button */}
              <Tooltip title={!isLoggedIn ? LL.customerProfile.loginToEditTooltip() : ''}>
                <span>
                  <Button
                    variant="contained"
                    disabled={!isLoggedIn}
                    onClick={() => isLoggedIn && setEditProfileOpen(true)}
                    startIcon={<Edit sx={{ fontSize: 16 }} />}
                    sx={{
                      height: 42,
                      px: 3,
                      borderRadius: '9999px',
                      backgroundColor: colors.buttonPrimaryBg,
                      color: colors.buttonPrimaryColor,
                      fontSize: '13px',
                      fontWeight: 700,
                      textTransform: 'none',
                      fontFamily: isRtl ? farsiFont : 'inherit',
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

          {/* Segmented Glass Tab Bar (Profile & Addresses, Account Security) */}
          <Box
            component="nav"
            sx={{
              width: '100%',
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
            }}
          >
            {/* Tab 0: Profile & Address */}
            <Box
              component="button"
              type="button"
              onClick={() => setActiveTab(0)}
              sx={{
                flex: 1,
                height: 46,
                borderRadius: '18px',
                px: 2,
                py: 1,
                border: activeTab === 0 ? colors.activeTabBorder : 'none',
                outline: 'none',
                cursor: 'pointer',
                fontFamily: isRtl ? farsiFont : 'inherit',
                backgroundColor: activeTab === 0 ? colors.activeTabBg : 'transparent',
                color: activeTab === 0 ? colors.activeTabColor : colors.textSecondary,
                fontWeight: activeTab === 0 ? 700 : 500,
                fontSize: { xs: '13px', sm: '14px' },
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

            {/* Tab 1: Account Security */}
            <Box
              component="button"
              type="button"
              onClick={() => setActiveTab(1)}
              sx={{
                flex: 1,
                height: 46,
                borderRadius: '18px',
                px: 2,
                py: 1,
                border: activeTab === 1 ? colors.activeTabBorder : 'none',
                outline: 'none',
                cursor: 'pointer',
                fontFamily: isRtl ? farsiFont : 'inherit',
                backgroundColor: activeTab === 1 ? colors.activeTabBg : 'transparent',
                color: activeTab === 1 ? colors.activeTabColor : colors.textSecondary,
                fontWeight: activeTab === 1 ? 700 : 500,
                fontSize: { xs: '13px', sm: '14px' },
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
              <VpnKey sx={{ fontSize: 18, color: colors.accentBrass }} />
              <span>{LL.customerProfile.tabSettingsAndSecurity()}</span>
            </Box>
          </Box>

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
                          fontFamily: isRtl ? farsiFont : 'inherit',
                        }}
                      >
                        {LL.customerProfile.identityCardTitle()}
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                    {/* Full Name */}
                    <Box
                      sx={{
                        p: 2,
                        borderRadius: '16px',
                        backgroundColor: colors.itemBg,
                        border: colors.itemBorder,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <Box sx={{ textAlign: isRtl ? 'right' : 'left' }}>
                        <Typography sx={{ fontSize: '11px', color: colors.textMuted, mb: 0.35, fontFamily: isRtl ? farsiFont : 'inherit' }}>
                          {LL.customerProfile.fullName()}
                        </Typography>
                        <Typography sx={{ fontSize: { xs: '15px', sm: '16px' }, fontWeight: 700, color: colors.textPrimary, fontFamily: isRtl ? farsiFont : 'inherit' }}>
                          {displayName}
                        </Typography>
                      </Box>
                    </Box>

                    {/* Phone Number */}
                    <Box
                      sx={{
                        p: 2,
                        borderRadius: '16px',
                        backgroundColor: colors.itemBg,
                        border: colors.itemBorder,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <Box sx={{ textAlign: isRtl ? 'right' : 'left' }}>
                        <Typography sx={{ fontSize: '11px', color: colors.textMuted, mb: 0.35, fontFamily: isRtl ? farsiFont : 'inherit' }}>
                          {LL.customerProfile.phone()}
                        </Typography>
                        <Typography dir="ltr" sx={{ fontSize: { xs: '15px', sm: '16px' }, fontWeight: 700, color: colors.textPrimary, fontFamily: isRtl ? farsiFont : 'inherit' }}>
                          {displayPhone}
                        </Typography>
                      </Box>
                    </Box>

                    {/* Email */}
                    <Box
                      sx={{
                        p: 2,
                        borderRadius: '16px',
                        backgroundColor: colors.itemBg,
                        border: colors.itemBorder,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <Box sx={{ textAlign: isRtl ? 'right' : 'left' }}>
                        <Typography sx={{ fontSize: '11px', color: colors.textMuted, mb: 0.35, fontFamily: isRtl ? farsiFont : 'inherit' }}>
                          {LL.customerProfile.email()}
                        </Typography>
                        <Typography dir="ltr" sx={{ fontSize: { xs: '14px', sm: '15px' }, fontWeight: 700, color: colors.textPrimary, fontFamily: isRtl ? farsiFont : 'inherit' }}>
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

                {/* Sizing Preferences Card (Connected to Database / Service) */}
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
                          fontFamily: isRtl ? farsiFont : 'inherit',
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
                          onClick={handleOpenEditPreferences}
                          sx={{
                            fontSize: '12px',
                            fontWeight: 700,
                            color: colors.accentBrass,
                            textTransform: 'none',
                            minWidth: 'auto',
                            p: 0,
                            fontFamily: isRtl ? farsiFont : 'inherit',
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
                          p: 2,
                          borderRadius: '16px',
                          backgroundColor: colors.itemBg,
                          border: colors.itemBorder,
                          textAlign: isRtl ? 'right' : 'left',
                        }}
                      >
                        <Typography sx={{ fontSize: '11px', color: colors.textMuted, mb: 0.5, fontFamily: isRtl ? farsiFont : 'inherit' }}>
                          {LL.customerProfile.preferredClothingSize()}
                        </Typography>
                        <Typography sx={{ fontSize: { xs: '14px', sm: '15px' }, fontWeight: 700, color: colors.textPrimary, fontFamily: isRtl ? farsiFont : 'inherit' }}>
                          {displayClothingSize}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid size={{ xs: 6 }}>
                      <Box
                        sx={{
                          p: 2,
                          borderRadius: '16px',
                          backgroundColor: colors.itemBg,
                          border: colors.itemBorder,
                          textAlign: isRtl ? 'right' : 'left',
                        }}
                      >
                        <Typography sx={{ fontSize: '11px', color: colors.textMuted, mb: 0.5, fontFamily: isRtl ? farsiFont : 'inherit' }}>
                          {LL.customerProfile.standardShoeSize()}
                        </Typography>
                        <Typography sx={{ fontSize: { xs: '14px', sm: '15px' }, fontWeight: 700, color: colors.textPrimary, fontFamily: isRtl ? farsiFont : 'inherit' }}>
                          {displayShoeSize}
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>

              {/* Column 2: Single Shipping Address & Orders Banner (7 Cols) */}
              <Grid size={{ xs: 12, lg: 7 }} sx={{ display: 'flex', flexDirection: 'column', gap: 3.5 }}>
                {/* Shipping Address Card */}
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
                          fontFamily: isRtl ? farsiFont : 'inherit',
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
                            fontFamily: isRtl ? farsiFont : 'inherit',
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
                        textAlign: isRtl ? 'right' : 'left',
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
                            fontFamily: isRtl ? farsiFont : 'inherit',
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
                          fontFamily: isRtl ? farsiFont : 'inherit',
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
                          fontFamily: isRtl ? farsiFont : 'inherit',
                        }}
                      >
                        {currentAddress}
                      </Typography>

                      {/* Metadata: Postal Code (Recipient removed as requested) */}
                      <Box sx={{ pt: 2, borderTop: colors.borderSubtle }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, fontSize: '12px', color: colors.textSecondary, fontFamily: isRtl ? farsiFont : 'inherit' }}>
                          <MarkunreadMailbox sx={{ fontSize: 16, color: colors.accentBrass }} />
                          <span>{LL.customerProfile.postalCode()}</span>
                          <Typography component="span" dir="ltr" sx={{ fontWeight: 700, color: colors.textPrimary, letterSpacing: '0.05em', fontFamily: isRtl ? farsiFont : 'inherit' }}>
                            {currentZipCode ? toEnglishDigits(currentZipCode) : '—'}
                          </Typography>
                        </Box>
                      </Box>
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
                          fontFamily: isRtl ? farsiFont : 'inherit',
                        }}
                      >
                        {LL.customerProfile.noAddressTitle()}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: '13px',
                          color: colors.textSecondary,
                          maxWidth: 380,
                          lineHeight: 1.6,
                          fontFamily: isRtl ? farsiFont : 'inherit',
                        }}
                      >
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
                            startIcon={<LocationOn />}
                            sx={{
                              mt: 1,
                              borderRadius: '9999px',
                              backgroundColor: colors.buttonPrimaryBg,
                              color: colors.buttonPrimaryColor,
                              textTransform: 'none',
                              fontFamily: isRtl ? farsiFont : 'inherit',
                              fontWeight: 700,
                              px: 3,
                              '&:hover': { backgroundColor: colors.buttonPrimaryHover },
                              '&.Mui-disabled': { opacity: 0.45 },
                            }}
                          >
                            {LL.customerProfile.addNewAddress()}
                          </Button>
                        </span>
                      </Tooltip>
                    </Box>
                  )}
                </Box>

                {/* Quick Order Tracker Banner (Navigates to Orders Screen) */}
                <Box
                  sx={{
                    borderRadius: '28px',
                    p: { xs: 2.5, md: 3 },
                    backgroundColor: colors.bgCard,
                    backdropFilter: 'blur(24px)',
                    boxShadow: colors.shadow,
                    border: colors.border,
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    alignItems: { xs: 'flex-start', sm: 'center' },
                    justifyContent: 'space-between',
                    gap: 2,
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        borderRadius: '16px',
                        backgroundColor: colors.itemBg,
                        border: colors.itemBorder,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: colors.accentBrass,
                        flexShrink: 0,
                      }}
                    >
                      <ShoppingBag sx={{ fontSize: 24 }} />
                    </Box>
                    <Box sx={{ textAlign: isRtl ? 'right' : 'left' }}>
                      <Typography sx={{ fontWeight: 700, fontSize: '15px', color: colors.textPrimary, fontFamily: isRtl ? farsiFont : 'inherit' }}>
                        {LL.customerProfile.orderBannerTitle()}
                      </Typography>
                      <Typography sx={{ fontSize: '12px', color: colors.textSecondary, mt: 0.25, fontFamily: isRtl ? farsiFont : 'inherit' }}>
                        {LL.customerProfile.orderBannerTextDefault()}
                      </Typography>
                    </Box>
                  </Box>
                  <Button
                    component={RouterLink}
                    to={CUSTOMER_ROUTES.ORDERS}
                    variant="contained"
                    endIcon={isRtl ? <ArrowBack sx={{ fontSize: 16 }} /> : <ArrowForward sx={{ fontSize: 16 }} />}
                    sx={{
                      borderRadius: '9999px',
                      textTransform: 'none',
                      backgroundColor: colors.buttonPrimaryBg,
                      color: colors.buttonPrimaryColor,
                      fontSize: '12px',
                      fontWeight: 700,
                      px: 2.5,
                      py: 1,
                      whiteSpace: 'nowrap',
                      fontFamily: isRtl ? farsiFont : 'inherit',
                      alignSelf: { xs: 'stretch', sm: 'auto' },
                      '&:hover': { backgroundColor: colors.buttonPrimaryHover },
                    }}
                  >
                    {LL.customerProfile.goToOrders()}
                  </Button>
                </Box>
              </Grid>
            </Grid>
          )}

          {/* TAB 1: Account Security & Authentication */}
          {activeTab === 1 && (
            <Box
              sx={{
                width: '100%',
                direction: isRtl ? 'rtl' : 'ltr',
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  fontSize: '18px',
                  color: colors.textPrimary,
                  mb: 3,
                  textAlign: isRtl ? 'right' : 'left',
                  fontFamily: isRtl ? farsiFont : 'inherit',
                }}
              >
                {LL.customerProfile.securityTitle()}
              </Typography>

              {!isLoggedIn && (
                <Alert
                  severity="info"
                  sx={{
                    mb: 3,
                    borderRadius: '16px',
                    backgroundColor: isDark ? 'rgba(32, 32, 28, 0.8)' : 'rgba(247, 246, 243, 0.8)',
                    color: colors.textPrimary,
                    fontFamily: isRtl ? farsiFont : 'inherit',
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
                    direction: isRtl ? 'rtl' : 'ltr',
                  }}
                >
                  <Box sx={{ textAlign: isRtl ? 'right' : 'left' }}>
                    <Typography sx={{ fontWeight: 700, fontSize: '14px', color: colors.textPrimary, mb: 0.5, fontFamily: isRtl ? farsiFont : 'inherit' }}>
                      {LL.customerProfile.email()}
                    </Typography>
                    <Typography dir="ltr" sx={{ fontSize: '13px', color: colors.textSecondary, fontFamily: isRtl ? farsiFont : 'inherit' }}>
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
                    direction: isRtl ? 'rtl' : 'ltr',
                  }}
                >
                  <Box sx={{ textAlign: isRtl ? 'right' : 'left' }}>
                    <Typography sx={{ fontWeight: 700, fontSize: '14px', color: colors.textPrimary, mb: 0.5, fontFamily: isRtl ? farsiFont : 'inherit' }}>
                      {LL.customerProfile.changePassword()}
                    </Typography>
                    <Typography sx={{ fontSize: '12px', color: colors.textSecondary, fontFamily: isRtl ? farsiFont : 'inherit' }}>
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
                          fontFamily: isRtl ? farsiFont : 'inherit',
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
                    direction: isRtl ? 'rtl' : 'ltr',
                  }}
                >
                  <Box sx={{ textAlign: isRtl ? 'right' : 'left' }}>
                    <Typography sx={{ fontWeight: 700, fontSize: '14px', color: colors.textPrimary, mb: 0.5, fontFamily: isRtl ? farsiFont : 'inherit' }}>
                      {LL.customerProfile.logout()}
                    </Typography>
                    <Typography sx={{ fontSize: '12px', color: colors.textSecondary, fontFamily: isRtl ? farsiFont : 'inherit' }}>
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
                      fontFamily: isRtl ? farsiFont : 'inherit',
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
              fontFamily: isRtl ? farsiFont : theme.typography.fontFamily,
              p: 1,
            },
          }}
        >
          <DialogTitle
            sx={{
              textAlign: isRtl ? 'right' : 'left',
              fontWeight: 700,
              color: colors.textPrimary,
              pb: 1,
              fontFamily: isRtl ? farsiFont : 'inherit',
            }}
          >
            {LL.customerProfile.editProfileDialogTitle()}
          </DialogTitle>
          <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: '16px !important' }}>
            <TextField
              label={LL.customerProfile.firstName()}
              value={profileForm.name}
              disabled
              fullWidth
              size="small"
              helperText="جهت تغییر نام به پشتیبانی پیام دهید"
            />
            <TextField
              label={LL.customerProfile.lastName()}
              value={profileForm.lastName}
              disabled
              fullWidth
              size="small"
            />
            <TextField
              label={LL.customerProfile.phone()}
              value={profileForm.phone}
              error={Boolean(phoneErrors.phone)}
              helperText={phoneErrors.phone?.message}
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
              sx={{ borderRadius: '9999px', textTransform: 'none', fontFamily: isRtl ? farsiFont : 'inherit' }}
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
                fontFamily: isRtl ? farsiFont : 'inherit',
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
              fontFamily: isRtl ? farsiFont : theme.typography.fontFamily,
              p: 1,
            },
          }}
        >
          <DialogTitle
            sx={{
              textAlign: isRtl ? 'right' : 'left',
              fontWeight: 700,
              color: colors.textPrimary,
              pb: 1,
              fontFamily: isRtl ? farsiFont : 'inherit',
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
                  error={Boolean(addressErrors.state)}
                  helperText={addressErrors.state?.message}
                  onChange={(e) => setAddressForm({ ...addressForm, state: e.target.value })}
                  fullWidth
                  size="small"
                />
              </Grid>
              <Grid size={{ xs: 6 }}>
                <TextField
                  label={LL.customerProfile.city()}
                  value={addressForm.city}
                  error={Boolean(addressErrors.city)}
                  helperText={addressErrors.city?.message}
                  onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })}
                  fullWidth
                  size="small"
                />
              </Grid>
            </Grid>
            <TextField
              label={LL.customerProfile.addressLine()}
              value={addressForm.address}
              error={Boolean(addressErrors.address)}
              helperText={addressErrors.address?.message}
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
                  error={Boolean(addressErrors.zipCode)}
                  helperText={addressErrors.zipCode?.message}
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
                  error={Boolean(addressErrors.phone)}
                  helperText={addressErrors.phone?.message}
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
              sx={{ borderRadius: '9999px', textTransform: 'none', fontFamily: isRtl ? farsiFont : 'inherit' }}
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
                fontFamily: isRtl ? farsiFont : 'inherit',
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

        {/* Dialog 3: Edit Preferred Sizing with Dropdown Selects */}
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
              fontFamily: isRtl ? farsiFont : theme.typography.fontFamily,
              p: 1,
            },
          }}
        >
          <DialogTitle
            sx={{
              textAlign: isRtl ? 'right' : 'left',
              fontWeight: 700,
              color: colors.textPrimary,
              pb: 1,
              fontFamily: isRtl ? farsiFont : 'inherit',
            }}
          >
            {LL.customerProfile.editPreferencesDialogTitle()}
          </DialogTitle>
          <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, pt: '16px !important' }}>
            {/* Apparel / Clothing Size Dropdown */}
            <FormControl fullWidth size="small">
              <InputLabel id="apparel-size-label" sx={{ fontFamily: isRtl ? farsiFont : 'inherit' }}>
                {LL.customerProfile.preferredClothingSize()}
              </InputLabel>
              <Select
                labelId="apparel-size-label"
                value={prefForm.clothingSize}
                label={LL.customerProfile.preferredClothingSize()}
                onChange={(e) => setPrefForm({ ...prefForm, clothingSize: e.target.value })}
                sx={{
                  fontFamily: isRtl ? farsiFont : 'inherit',
                  textAlign: isRtl ? 'right' : 'left',
                  borderRadius: '12px',
                }}
              >
                <MenuItem value="" sx={{ fontFamily: isRtl ? farsiFont : 'inherit' }}>
                  <em>—</em>
                </MenuItem>
                {APPAREL_SIZES.map((size) => (
                  <MenuItem key={size} value={size} sx={{ fontFamily: isRtl ? farsiFont : 'inherit' }}>
                    {size}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Footwear / Shoe Size Dropdown */}
            <FormControl fullWidth size="small">
              <InputLabel id="footwear-size-label" sx={{ fontFamily: isRtl ? farsiFont : 'inherit' }}>
                {LL.customerProfile.standardShoeSize()}
              </InputLabel>
              <Select
                labelId="footwear-size-label"
                value={prefForm.shoeSize}
                label={LL.customerProfile.standardShoeSize()}
                onChange={(e) => setPrefForm({ ...prefForm, shoeSize: e.target.value })}
                sx={{
                  fontFamily: isRtl ? farsiFont : 'inherit',
                  textAlign: isRtl ? 'right' : 'left',
                  borderRadius: '12px',
                }}
              >
                <MenuItem value="" sx={{ fontFamily: isRtl ? farsiFont : 'inherit' }}>
                  <em>—</em>
                </MenuItem>
                {FOOTWEAR_EU_SIZES.map((eu) => {
                  const us = euToUs(eu);
                  const label = us ? `${eu} EU (${us} US)` : `${eu} EU`;
                  return (
                    <MenuItem key={eu} value={label} sx={{ fontFamily: isRtl ? farsiFont : 'inherit' }}>
                      {label}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 2, justifyContent: 'space-between' }}>
            <Button
              onClick={() => setEditPreferencesOpen(false)}
              color="inherit"
              sx={{ borderRadius: '9999px', textTransform: 'none', fontFamily: isRtl ? farsiFont : 'inherit' }}
            >
              {LL.customerProfile.cancel()}
            </Button>
            <Button
              variant="contained"
              onClick={handleSavePreferences}
              disabled={updatingProfile || !isLoggedIn}
              sx={{
                borderRadius: '9999px',
                textTransform: 'none',
                fontFamily: isRtl ? farsiFont : 'inherit',
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
      </Box>
    </CustomersLayout>
  );
}

export default CustomerProfile;
