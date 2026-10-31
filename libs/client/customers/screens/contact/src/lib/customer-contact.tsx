import React, { useState } from 'react';
import { useForm, type FieldErrors, type Resolver } from 'react-hook-form';
import {
  contactFormSchema,
  type ContactFormInput,
} from '@kickzone-workspace/validation';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Chip from '@mui/material/Chip';
import Alert from '@mui/material/Alert';
import PhoneInTalkOutlinedIcon from '@mui/icons-material/PhoneInTalkOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import VerifiedIcon from '@mui/icons-material/Verified';
import SupportAgentOutlinedIcon from '@mui/icons-material/SupportAgentOutlined';
import InstagramIcon from '@mui/icons-material/Instagram';
import TelegramIcon from '@mui/icons-material/Telegram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import TwitterIcon from '@mui/icons-material/Twitter';
import { CustomersLayout } from '@kickzone-workspace/customers-layout';
import {
  useLanguageContext,
  usePageTitle,
  SITE_NAME,
} from '@kickzone-workspace/shared-i18n';

interface ContactChannel {
  id: string;
  titleEn: string;
  titleFa: string;
  valueEn: string;
  valueFa: string;
  href: string;
  badgeEn?: string;
  badgeFa?: string;
  icon: React.ReactNode;
}

const CONTACT_CHANNELS: ContactChannel[] = [
  {
    id: 'phone',
    titleEn: 'VIP Concierge Hotline',
    titleFa: 'خط اختصاصی پشتیبانی و کنسیرژ',
    valueEn: '+98 21 9100 8888',
    valueFa: '۰۲۱-۹۱۰۰۸۸۸۸',
    href: 'tel:+982191008888',
    badgeEn: 'Direct Call',
    badgeFa: 'تماس مستقیم',
    icon: <PhoneInTalkOutlinedIcon sx={{ fontSize: 28 }} />,
  },
  {
    id: 'email',
    titleEn: 'Private Concierge Email',
    titleFa: 'ایمیل تشریفات و پشتیبانی',
    valueEn: 'concierge@saintbala.com',
    valueFa: 'concierge@saintbala.com',
    href: 'mailto:concierge@saintbala.com',
    badgeEn: '< 2h Response',
    badgeFa: 'پاسخگویی زیر ۲ ساعت',
    icon: <EmailOutlinedIcon sx={{ fontSize: 28 }} />,
  },
  {
    id: 'address',
    titleEn: 'Private Showroom & Vault',
    titleFa: 'بوتیک مرکزی و شوروم اختصاصی',
    valueEn: 'District 1, Valiasr St, Tehran, Iran',
    valueFa: 'تهران، خیابان ولیعصر، منطقه ۱، برج تجاری فرشته',
    href: 'https://maps.google.com',
    badgeEn: 'By Appointment',
    badgeFa: 'با تعیین وقت قبلی',
    icon: <LocationOnOutlinedIcon sx={{ fontSize: 28 }} />,
  },
  {
    id: 'hours',
    titleEn: 'Concierge Operations Hours',
    titleFa: 'ساعات فعالیت و خدمات مشتریان',
    valueEn: 'Mon – Sat: 10:00 – 21:00 (IRDT)',
    valueFa: 'شنبه تا پنج‌شنبه: ۱۰:۰۰ الی ۲۱:۰۰',
    href: '#hours',
    badgeEn: '6 Days a Week',
    badgeFa: '۶ روز در هفته',
    icon: <AccessTimeOutlinedIcon sx={{ fontSize: 28 }} />,
  },
];

const SOCIAL_LINKS = [
  {
    name: 'Instagram',
    handle: '@saintbala',
    href: 'https://instagram.com/saintbala',
    icon: <InstagramIcon sx={{ fontSize: 22 }} />,
  },
  {
    name: 'Telegram',
    handle: '@saintbala_official',
    href: 'https://t.me/saintbala_official',
    icon: <TelegramIcon sx={{ fontSize: 22 }} />,
  },
  {
    name: 'WhatsApp',
    handle: '+98 912 000 8888',
    href: 'https://wa.me/989120008888',
    icon: <WhatsAppIcon sx={{ fontSize: 22 }} />,
  },
  {
    name: 'Twitter / X',
    handle: '@saintbala',
    href: 'https://twitter.com/saintbala',
    icon: <TwitterIcon sx={{ fontSize: 22 }} />,
  },
];

/** Localized contact form messages: [English, Persian]. */
const CONTACT_MESSAGES = {
  fullName: ['Please enter your full name', 'لطفاً نام و نام خانوادگی خود را وارد کنید'],
  email: ['Please enter your email address', 'لطفاً آدرس ایمیل خود را وارد کنید'],
  emailInvalid: ['Please enter a valid email address', 'فرمت آدرس ایمیل نامعتبر است'],
  subject: ['Please enter a subject', 'لطفاً موضوع پیام را وارد کنید'],
  message: ['Please write your message or inquiry', 'لطفاً متن پیام یا درخواست خود را بنویسید'],
} as const;

type ContactMessageKey = keyof typeof CONTACT_MESSAGES;

/** react-hook-form resolver over the shared contact schema with the existing messages. */
export const createContactResolver =
  (isEn: boolean): Resolver<ContactFormInput> =>
  async (values) => {
    const result = contactFormSchema.safeParse(values);
    if (result.success) return { values, errors: {} };
    const errors: Record<string, { type: string; message: string }> = {};
    for (const issue of result.error.issues) {
      const field = String(issue.path[0] ?? '');
      if (!field || errors[field]) continue;
      const key: ContactMessageKey | undefined =
        field === 'email' && issue.code !== 'too_small'
          ? 'emailInvalid'
          : field in CONTACT_MESSAGES
          ? (field as ContactMessageKey)
          : undefined;
      if (!key) continue;
      const [en, fa] = CONTACT_MESSAGES[key];
      errors[field] = { type: issue.code, message: isEn ? en : fa };
    }
    return { values: {}, errors: errors as FieldErrors<ContactFormInput> };
  };

const INQUIRY_TYPES = [
  {
    value: 'AUTHENTICATION',
    labelEn: 'Authentication Audit & Provenance Verification',
    labelFa: 'استعلام اصالت و رهگیری پلمپ اختصاصی',
  },
  {
    value: 'SHIPPING',
    labelEn: 'Order Tracking & VIP Armored Delivery',
    labelFa: 'پیگیری سفارش و ارسال اختصاصی VIP',
  },
  {
    value: 'EXCHANGE',
    labelEn: 'Size Exchange & Return Assistance',
    labelFa: 'درخواست تعویض سایز و خدمات مرجوعی',
  },
  {
    value: 'STYLING',
    labelEn: 'Private Sizing & Streetwear Styling Session',
    labelFa: 'مشاوره اختصاصی سایز و استایلینگ لوکس',
  },
  {
    value: 'GENERAL',
    labelEn: 'General Concierge Inquiry',
    labelFa: 'سایر موارد و پشتیبانی عمومی',
  },
];

export function CustomerContact() {
  const { currentLocale } = useLanguageContext();
  const isEn = currentLocale === 'en';
  const isRTL = currentLocale === 'fa';

  usePageTitle(() =>
    isEn
      ? `Contact VIP Concierge — ${SITE_NAME}`
      : `تماس با تشریفات و پشتیبانی — ${SITE_NAME}`
  );

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    inquiryType: 'AUTHENTICATION',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const contactForm = useForm<ContactFormInput>({
    values: formData,
    resolver: createContactResolver(isEn),
    mode: 'onSubmit',
  });
  const errors = contactForm.formState.errors;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!(await contactForm.trigger())) return;

    setIsSubmitting(true);
    // Simulate luxury concierge routing
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        inquiryType: 'AUTHENTICATION',
        subject: '',
        message: '',
      });
      contactForm.clearErrors();
    }, 600);
  };

  const brandWordmark = isRTL ? (
    <bdi>{SITE_NAME}</bdi>
  ) : (
    SITE_NAME
  );

  return (
    <CustomersLayout>
      <Box
        component="main"
        sx={{
          bgcolor: (theme) =>
            theme.palette.mode === 'dark' ? '#070709' : '#f9f9fb',
          color: (theme) =>
            theme.palette.mode === 'dark' ? '#f5f5f7' : '#141416',
          py: { xs: 4, md: 8 },
          minHeight: '100vh',
        }}
      >
        <Container maxWidth="lg">
          {/* Hero Header */}
          <Box
            sx={{
              textAlign: 'center',
              mb: { xs: 5, md: 8 },
              maxWidth: 780,
              mx: 'auto',
            }}
          >
            <Chip
              icon={<SupportAgentOutlinedIcon sx={{ fontSize: 18, color: '#c9a774 !important' }} />}
              label={
                isEn ? (
                  <span>Dedicated {brandWordmark} Concierge</span>
                ) : (
                  <span>کنسیرژ و خدمات مشتریان {brandWordmark}</span>
                )
              }
              sx={{
                mb: 2.5,
                bgcolor: (theme) =>
                  theme.palette.mode === 'dark'
                    ? 'rgba(201, 167, 116, 0.12)'
                    : 'rgba(201, 167, 116, 0.18)',
                color: '#c9a774',
                borderColor: 'rgba(201, 167, 116, 0.35)',
                fontWeight: 600,
                fontSize: '0.8125rem',
                letterSpacing: isEn ? '0.06em' : 'normal',
                textTransform: isEn ? 'uppercase' : 'none',
              }}
              variant="outlined"
            />
            <Typography
              variant="h3"
              component="h1"
              sx={{
                fontWeight: 800,
                fontSize: { xs: '2rem', sm: '2.5rem', md: '3.125rem' },
                lineHeight: 1.2,
                mb: 2,
                letterSpacing: isEn ? '-0.02em' : 'normal',
                color: (theme) =>
                  theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
              }}
            >
              {isEn ? (
                <>
                  Connect with the <span style={{ color: '#c9a774' }}>{brandWordmark}</span> Concierge
                </>
              ) : (
                <>
                  ارتباط مستقیم با تیم تشریفات <span style={{ color: '#c9a774' }}>{brandWordmark}</span>
                </>
              )}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: (theme) =>
                  theme.palette.mode === 'dark'
                    ? 'rgba(255, 255, 255, 0.72)'
                    : 'rgba(0, 0, 0, 0.68)',
                fontSize: { xs: '0.9375rem', md: '1.0625rem' },
                lineHeight: 1.8,
              }}
            >
              {isEn
                ? 'Whether you require tamper-evident serial verification, bespoke sizing consultations, or expedited VIP armored delivery, our specialists are at your command.'
                : 'چه در زمینه استعلام اصالت و پلمپ امنیتی، چه مشاوره اختصاصی سایزبندی پوشاک و اسنیکر و چه ارسال فوری VIP، کارشناسان ما آماده پاسخگویی بی‌وقفه هستند.'}
            </Typography>
          </Box>

          {/* Quick Channels Grid */}
          <Grid container spacing={3} sx={{ mb: { xs: 5, md: 8 } }}>
            {CONTACT_CHANNELS.map((channel) => (
              <Grid key={channel.id} size={{ xs: 12, sm: 6, md: 3 }}>
                <Paper
                  elevation={0}
                  component="a"
                  href={channel.href}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    height: '100%',
                    p: 3,
                    borderRadius: '20px',
                    textDecoration: 'none',
                    bgcolor: (theme) =>
                      theme.palette.mode === 'dark' ? '#101115' : '#ffffff',
                    border: '1px solid',
                    borderColor: (theme) =>
                      theme.palette.mode === 'dark'
                        ? 'rgba(255, 255, 255, 0.08)'
                        : 'rgba(0, 0, 0, 0.08)',
                    transition: 'all 0.25s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      borderColor: '#c9a774',
                      boxShadow: '0 16px 36px rgba(0, 0, 0, 0.25)',
                    },
                  }}
                >
                  <Box>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        mb: 2,
                      }}
                    >
                      <Box
                        sx={{
                          width: 48,
                          height: 48,
                          borderRadius: '14px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          bgcolor: 'rgba(201, 167, 116, 0.12)',
                          color: '#c9a774',
                        }}
                      >
                        {channel.icon}
                      </Box>
                      {channel.badgeEn && (
                        <Chip
                          label={isEn ? channel.badgeEn : channel.badgeFa}
                          size="small"
                          sx={{
                            fontSize: '0.7rem',
                            fontWeight: 700,
                            bgcolor: 'rgba(201, 167, 116, 0.15)',
                            color: '#c9a774',
                          }}
                        />
                      )}
                    </Box>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        color: (theme) =>
                          theme.palette.mode === 'dark'
                            ? 'rgba(255, 255, 255, 0.6)'
                            : 'rgba(0, 0, 0, 0.55)',
                        mb: 0.5,
                        fontWeight: 600,
                      }}
                    >
                      {isEn ? channel.titleEn : channel.titleFa}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: 700,
                        color: (theme) =>
                          theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
                        direction: 'ltr',
                        textAlign: isRTL ? 'right' : 'left',
                      }}
                    >
                      <bdi>{isEn ? channel.valueEn : channel.valueFa}</bdi>
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>

          {/* Form and Social Section */}
          <Grid container spacing={4}>
            {/* Contact Inquiry Form */}
            <Grid size={{ xs: 12, md: 7 }}>
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 3, sm: 4.5 },
                  borderRadius: '24px',
                  bgcolor: (theme) =>
                    theme.palette.mode === 'dark' ? '#101115' : '#ffffff',
                  border: '1px solid',
                  borderColor: (theme) =>
                    theme.palette.mode === 'dark'
                      ? 'rgba(255, 255, 255, 0.08)'
                      : 'rgba(0, 0, 0, 0.08)',
                }}
              >
                <Typography
                  variant="h5"
                  component="h2"
                  sx={{
                    fontWeight: 700,
                    mb: 1,
                    color: (theme) =>
                      theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
                  }}
                >
                  {isEn
                    ? 'Submit a Concierge Inquiry'
                    : 'ثبت درخواست پیام یا استعلام مستقیم'}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: (theme) =>
                      theme.palette.mode === 'dark'
                        ? 'rgba(255, 255, 255, 0.6)'
                        : 'rgba(0, 0, 0, 0.6)',
                    mb: 3.5,
                  }}
                >
                  {isEn
                    ? 'Our client service specialists review all submissions in real-time.'
                    : 'تمامی پیام‌ها بلافاصله در سیستم مرکزی ثبت و توسط کارشناسان بررسی می‌شوند.'}
                </Typography>

                {submitSuccess && (
                  <Alert
                    severity="success"
                    icon={<VerifiedIcon fontSize="inherit" />}
                    sx={{
                      mb: 3,
                      borderRadius: '12px',
                      bgcolor: 'rgba(46, 125, 50, 0.15)',
                      color: '#66bb6a',
                      border: '1px solid rgba(102, 187, 106, 0.3)',
                    }}
                  >
                    {isEn ? (
                      <span>
                        Thank you. Your inquiry has been routed to a {brandWordmark} specialist. We will contact you within 2 business hours.
                      </span>
                    ) : (
                      <span>
                        درخواست شما با موفقیت ثبت شد و به کارشناس {brandWordmark} ارجاع گردید. حداکثر ظرف ۲ ساعت کاری با شما تماس خواهیم گرفت.
                      </span>
                    )}
                  </Alert>
                )}

                <Box component="form" onSubmit={handleSubmit} noValidate>
                  <Grid container spacing={2.5}>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        fullWidth
                        required
                        label={isEn ? 'Full Name' : 'نام و نام خانوادگی'}
                        value={formData.fullName}
                        onChange={(e) =>
                          setFormData({ ...formData, fullName: e.target.value })
                        }
                        error={Boolean(errors.fullName)}
                        helperText={errors.fullName?.message}
                        inputProps={{ 'data-testid': 'contact-input-name' }}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        fullWidth
                        required
                        type="email"
                        label={isEn ? 'Email Address' : 'آدرس ایمیل'}
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        error={Boolean(errors.email)}
                        helperText={errors.email?.message}
                        inputProps={{ 'data-testid': 'contact-input-email' }}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        fullWidth
                        label={isEn ? 'Phone Number (Optional)' : 'شماره تماس (اختیاری)'}
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        placeholder={isEn ? '+98 912 ...' : '۰۹۱۲...'}
                        inputProps={{ 'data-testid': 'contact-input-phone' }}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        select
                        fullWidth
                        label={isEn ? 'Inquiry Type' : 'موضوع استعلام'}
                        value={formData.inquiryType}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            inquiryType: e.target.value,
                          })
                        }
                        inputProps={{ 'data-testid': 'contact-select-type' }}
                      >
                        {INQUIRY_TYPES.map((type) => (
                          <MenuItem key={type.value} value={type.value}>
                            {isEn ? type.labelEn : type.labelFa}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                      <TextField
                        fullWidth
                        required
                        label={isEn ? 'Subject' : 'موضوع پیام'}
                        value={formData.subject}
                        onChange={(e) =>
                          setFormData({ ...formData, subject: e.target.value })
                        }
                        error={Boolean(errors.subject)}
                        helperText={errors.subject?.message}
                        inputProps={{ 'data-testid': 'contact-input-subject' }}
                      />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                      <TextField
                        fullWidth
                        required
                        multiline
                        rows={4}
                        label={isEn ? 'Message & Details' : 'متن پیام و توضیحات'}
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        error={Boolean(errors.message)}
                        helperText={errors.message?.message}
                        inputProps={{ 'data-testid': 'contact-input-message' }}
                      />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                      <Button
                        type="submit"
                        variant="contained"
                        disabled={isSubmitting}
                        startIcon={<SendOutlinedIcon />}
                        data-testid="contact-submit-btn"
                        sx={{
                          bgcolor: '#c9a774',
                          color: '#000000',
                          fontWeight: 700,
                          fontSize: '0.9375rem',
                          px: 4,
                          py: 1.5,
                          borderRadius: '12px',
                          textTransform: 'none',
                          minHeight: '48px',
                          '&:hover': {
                            bgcolor: '#d8bc8c',
                          },
                        }}
                      >
                        {isSubmitting
                          ? isEn
                            ? 'Transmitting...'
                            : 'در حال ارسال...'
                          : isEn
                          ? 'Send Concierge Message'
                          : 'ارسال پیام به تیم تشریفات'}
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </Paper>
            </Grid>

            {/* Social Media & Trust Card */}
            <Grid size={{ xs: 12, md: 5 }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <Paper
                  elevation={0}
                  sx={{
                    p: { xs: 3, sm: 4 },
                    borderRadius: '24px',
                    bgcolor: (theme) =>
                      theme.palette.mode === 'dark' ? '#101115' : '#ffffff',
                    border: '1px solid',
                    borderColor: (theme) =>
                      theme.palette.mode === 'dark'
                        ? 'rgba(255, 255, 255, 0.08)'
                        : 'rgba(0, 0, 0, 0.08)',
                  }}
                >
                  <Typography
                    variant="h6"
                    component="h3"
                    sx={{
                      fontWeight: 700,
                      mb: 1,
                      color: (theme) =>
                        theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
                    }}
                  >
                    {isEn ? 'Official Social Channels' : 'شبکه‌های اجتماعی رسمی'}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: (theme) =>
                        theme.palette.mode === 'dark'
                          ? 'rgba(255, 255, 255, 0.6)'
                          : 'rgba(0, 0, 0, 0.6)',
                      mb: 3,
                    }}
                  >
                    {isEn ? (
                      `Follow ${SITE_NAME} for private drop announcements, lookbooks, and verified provenance updates.`
                    ) : (
                      <>
                        کانال‌های رسمی {brandWordmark} برای اطلاع از دراپ‌های ویژه، آلبوم‌های استایل و اخبار کارهای اورجینال.
                      </>
                    )}
                  </Typography>

                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                    {SOCIAL_LINKS.map((social) => (
                      <Paper
                        key={social.name}
                        component="a"
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        elevation={0}
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          p: 1.75,
                          borderRadius: '14px',
                          textDecoration: 'none',
                          bgcolor: (theme) =>
                            theme.palette.mode === 'dark'
                              ? 'rgba(255, 255, 255, 0.03)'
                              : 'rgba(0, 0, 0, 0.02)',
                          border: '1px solid',
                          borderColor: (theme) =>
                            theme.palette.mode === 'dark'
                              ? 'rgba(255, 255, 255, 0.06)'
                              : 'rgba(0, 0, 0, 0.06)',
                          color: (theme) =>
                            theme.palette.mode === 'dark'
                              ? '#ffffff'
                              : '#1d1d1f',
                          transition: 'all 0.2s ease',
                          '&:hover': {
                            borderColor: '#c9a774',
                            bgcolor: 'rgba(201, 167, 116, 0.08)',
                          },
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                          <Box sx={{ color: '#c9a774', display: 'flex' }}>
                            {social.icon}
                          </Box>
                          <Typography sx={{ fontWeight: 600, fontSize: '0.875rem' }}>
                            {social.name}
                          </Typography>
                        </Box>
                        <Typography
                          variant="caption"
                          sx={{
                            color: (theme) =>
                              theme.palette.mode === 'dark'
                                ? 'rgba(255, 255, 255, 0.5)'
                                : 'rgba(0, 0, 0, 0.5)',
                            direction: 'ltr',
                          }}
                        >
                          <bdi>{social.handle}</bdi>
                        </Typography>
                      </Paper>
                    ))}
                  </Box>
                </Paper>

                {/* Authenticity Pledge Card */}
                <Paper
                  elevation={0}
                  sx={{
                    p: { xs: 3, sm: 3.5 },
                    borderRadius: '24px',
                    background: (theme) =>
                      theme.palette.mode === 'dark'
                        ? 'linear-gradient(135deg, rgba(201, 167, 116, 0.12) 0%, rgba(16, 17, 21, 0.95) 100%)'
                        : 'linear-gradient(135deg, rgba(201, 167, 116, 0.15) 0%, rgba(255, 255, 255, 0.95) 100%)',
                    border: '1px solid rgba(201, 167, 116, 0.3)',
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
                    <VerifiedIcon sx={{ color: '#c9a774', fontSize: 24 }} />
                    <Typography sx={{ fontWeight: 700, fontSize: '1rem', color: '#c9a774' }}>
                      {isEn ? '100% Authenticity Guarantee' : 'ضمانت قطعی اصالت و پلمپ امنیتی'}
                    </Typography>
                  </Box>
                  <Typography
                    variant="body2"
                    sx={{
                      color: (theme) =>
                        theme.palette.mode === 'dark'
                          ? 'rgba(255, 255, 255, 0.72)'
                          : 'rgba(0, 0, 0, 0.72)',
                      lineHeight: 1.7,
                    }}
                  >
                    {isEn ? (
                      <span>
                        Every product carries the tamper-evident {brandWordmark} security seal with an individual serial number. Authenticity disputes are settled with an immediate 200% refund pledge.
                      </span>
                    ) : (
                      <span>
                        تمامی اقلام همراه با پلمپ امنیتی و شماره سریال انحصاری {brandWordmark} ارسال می‌شوند. در صورت هرگونه مغایرت، ضمانت بازپرداخت ۲۰۰ درصدی وجه فعال خواهد بود.
                      </span>
                    )}
                  </Typography>
                </Paper>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </CustomersLayout>
  );
}

export default CustomerContact;
