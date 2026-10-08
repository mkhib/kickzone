# Applying the Design System to Fix UI/UX Issues

This guide shows how to apply the design system components I've created to fix the specific UI/UX issues mentioned:

## 1. User Profile Screen UX Improvements

The current profile screen has good design but can be improved for better UX:

### Issues to Fix:
- Complex nested structure that's hard to maintain
- Inconsistent spacing and typography
- Manual glassmorphism implementation
- Limited interactive feedback
- Could benefit from better visual hierarchy

### Solution: Apply Design System Components

```tsx
// Example of refactored Profile Screen using Design System
import React, { useState, useEffect } from 'react';
import { Glassmorphism } from '../../design-system/glassmorphism';
import { Typography } from '../../design-system/typography';
import { Button } from '../../design-system/button';
import { Input } from '../../design-system/input';
import { Card } from '../../design-system/card';
// ... other imports

export function CustomerProfile() {
  // ... existing hooks and state
  
  return (
    <Glassmorphism 
      padding={4} 
      isDark={isDark} 
      className="profile-container"
    >
      {/* Header Section */}
      <Card 
        isDark={isDark} 
        padding={3} 
        mb={4}
        hoverLift
      >
        <div className="flex items-center space-x-4">
          {/* Avatar */}
          <div className="w-16 h-16 rounded-full bg-brass/20 flex items-center justify-center">
            <Person className="text-brass" fontSize="24" />
          </div>
          
          <div className="space-y-1">
            <Typography variant="h5" isRtl={isRtl}>
              {displayName}
            </Typography>
            <Typography variant="caption" isRtl={isRtl} color="textSecondary">
              {displayRole}
            </Typography>
            <Typography variant="body2" isRtl={isRtl} color="textMuted">
              {displayEmail}
            </Typography>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="mt-4 flex flex-wrap gap-2">
          <Button variant="outline" isRtl={isRtl} startIcon={<ShoppingBag />}>
            {LL.customerProfile.tabMyOrders()}
          </Button>
          <Button 
            variant="secondary" 
            isRtl={isRtl} 
            startIcon={<Edit />} 
            onClick={() => setEditProfileOpen(true)}
          >
            {LL.customerProfile.editInformation()}
          </Button>
        </div>
      </Card>
      
      {/* Tab Bar */}
      <div className="flex rounded-lg bg-brass/5 dark:bg-brass/10 p-0.5">
        <Button 
          variant={activeTab === 0 ? 'secondary' : 'outline'} 
          isRtl={isRtl} 
          onClick={() => setActiveTab(0)}
          size="md"
        >
          {LL.customerProfile.tabProfileAndAddresses()}
        </Button>
        <Button 
          variant={activeTab === 1 ? 'secondary' : 'outline'} 
          isRtl={isRtl} 
          onClick={() => setActiveTab(1)}
          size="md"
        >
          {LL.customerProfile.tabSettingsAndSecurity()}
        </Button>
      </div>
      
      {/* Tab Content */}
      {activeTab === 0 && (
        <>
          {/* Profile Details */}
          <Card isDark={isDark} padding={3} mb={4}>
            <Typography variant="h6" isRtl={isRtl} mb={3}>
              {LL.customerProfile.identityCardTitle()}
            </Typography>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Typography variant="body2" isRtl={isRtl}>
                  {LL.customerProfile.fullName()}
                </Typography>
                <Typography variant="h6" isRtl={isRtl} fontWeight="bold">
                  {displayName}
                </Typography>
              </div>
              
              <div className="space-y-2">
                <Typography variant="body2" isRtl={isRtl}>
                  {LL.customerProfile.phone()}
                </Typography>
                <Typography variant="h6" isRtl={isRtl} fontWeight="bold" dir="ltr">
                  {displayPhone}
                </Typography>
              </div>
              
              <div className="space-y-2">
                <Typography variant="body2" isRtl={isRtl}>
                  {LL.customerProfile.email()}
                </Typography>
                <Typography variant="h6" isRtl={isRtl} fontWeight="bold" dir="ltr">
                  {displayEmail}
                </Typography>
                {isLoggedIn && displayEmail !== '—' && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    isRtl={isRtl} 
                    onClick={handleCopyEmail}
                    ml={2}
                  >
                    {LL.customerProfile.copyEmail()}
                  </Button>
                )}
              </div>
            </div>
          </Card>
          
          {/* Preferences Card */}
          <Card isDark={isDark} padding={3} mb={4}>
            <div className="flex justify-between items-start mb-3">
              <Typography variant="h6" isRtl={isRtl}>
                {LL.customerProfile.preferencesCardTitle()}
              </Typography>
              <Button 
                variant="outline" 
                size="sm" 
                isRtl={isRtl} 
                onClick={handleOpenEditPreferences}
              >
                {LL.customerProfile.edit()}
              </Button>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Typography variant="body2" isRtl={isRtl}>
                  {LL.customerProfile.preferredClothingSize()}
                </Typography>
                <Typography variant="h6" isRtl={isRtl} fontWeight="bold">
                  {displayClothingSize}
                </Typography>
              </div>
              
              <div className="space-y-2">
                <Typography variant="body2" isRtl={isRtl}>
                  {LL.customerProfile.standardShoeSize()}
                </Typography>
                <Typography variant="h6" isRtl={isRtl} fontWeight="bold">
                  {displayShoeSize}
                </Typography>
              </div>
            </div>
          </Card>
          
          {/* Address Card */}
          <Card isDark={isDark} padding={3}>
            <div className="flex justify-between items-start mb-3">
              <Typography variant="h6" isRtl={isRtl}>
                {LL.customerProfile.shippingCenterTitle()}
              </Typography>
              {hasAddress ? (
                <Button 
                  variant="outline" 
                  size="sm" 
                  isRtl={isRtl} 
                  onClick={handleOpenEditAddress}
                >
                  {LL.customerProfile.editAddress()}
                </Button>
              ) : (
                <Button 
                  variant="secondary" 
                  size="sm" 
                  isRtl={isRtl} 
                  onClick={handleOpenEditAddress}
                >
                  {LL.customerProfile.addNewAddress()}
                </Button>
              )}
            </div>
            
            {hasAddress ? (
              <div className="space-y-3">
                {/* Address Details */}
                <div className="flex items-start space-x-3">
                  <LocationOn className="h-5 w-5 text-brass flex-shrink-0 mt-1" />
                  <div className="space-y-1">
                    <Typography variant="body2" isRtl={isRtl} fontWeight="bold">
                      {currentAddress}
                    </Typography>
                    <div className="flex flex-wrap gap-2 text-sm">
                      {currentState && <span>{LL.customerProfile.province()}: {currentState}</span>}
                      {currentCity && <span>{LL.customerProfile.city()}: {currentCity}</span>}
                      {currentCountry && (
                        <>
                          <span>•</span>
                          <span>{currentCountry}</span>
                        </>
                      )}
                    </div>
                    <div className="mt-2 flex items-center space-x-2 text-sm">
                      <MarkunreadMailbox className="h-4 w-4 text-brass" />
                      <span>{LL.customerProfile.postalCode()}: </span>
                      <Typography variant="body2" isRtl={isRtl} fontWeight="bold" dir="ltr">
                        {currentZipCode ? toEnglishDigits(currentZipCode) : '—'}
                      </Typography>
                    </div>
                  </div>
                </div>
                
                {/* Metadata */}
                <div className="mt-4 pt-3 border-t border-brass/20">
                  <div className="flex items-center space-x-2 text-sm">
                    <ShoppingBag className="h-4 w-4 text-brass" />
                    <span>{LL.customerProfile.orderHistory()}:</span>
                    <Typography variant="body2" isRtl={isRtl} fontWeight="bold" ml="auto">
                      24 orders • $3,450 spent
                    </Typography>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <AddLocationAlt className="h-12 w-12 text-brass/50 mb-4" />
                <Typography variant="h6" isRtl={isRtl}>
                  {LL.customerProfile.noAddressTitle()}
                </Typography>
                <Typography variant="body2" isRtl={isRtl} color="textSecondary">
                  {isLoggedIn 
                    ? LL.customerProfile.noAddressSubtitle() 
                    : LL.customerProfile.guestNoAddress()}
                </Typography>
                <Button 
                  variant="secondary" 
                  isRtl={isRtl} 
                  onClick={handleOpenEditAddress}
                  mt={4}
                >
                  {LL.customerProfile.addNewAddress()}
                </Button>
              </div>
            )}
          </Card>
        </>
      )}
      
      {/* Security Tab */}
      {activeTab === 1 && (
        <Card isDark={isDark} padding={3}>
          <Typography variant="h6" isRtl={isRtl} mb={4}>
            {LL.customerProfile.securityTitle()}
          </Typography>
          
          {/* Security Sections */}
          <div className="space-y-4">
            {/* Email Section */}
            <div className="space-y-2">
              <Typography variant="body2" isRtl={isRtl}>
                {LL.customerProfile.email()}
              </Typography>
              <div className="flex justify-between items-center">
                <Typography variant="body2" isRtl={isRtl} fontWeight="bold" dir="ltr">
                  {displayEmail}
                </Typography>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  isRtl={isRtl} 
                  onClick={handleCopyEmail}
                >
                  {LL.customerProfile.copyEmail()}
                </Button>
              </div>
            </div>
            
            {/* Password Section */}
            <Button 
              variant="outline" 
              isRtl={isRtl} 
              startIcon={<LockReset />} 
              component={RouterLink} 
              to={CUSTOMER_ROUTES.FORGOT_PASSWORD}
            >
              {LL.customerProfile.changePassword()}
            </Button>
            
            {/* Logout Section */}
            <Button 
              variant="outline" 
              isRtl={isRtl} 
              startIcon={<Logout />} 
              color="error"
              onClick={handleLogout}
            >
              {LL.customerProfile.logout()}
            </Button>
          </div>
        </Card>
      )}
      
      {/* Modals */}
      {/* Edit Profile Modal */}
      <Dialog 
        open={editProfileOpen} 
        onClose={() => setEditProfileOpen(false)}
        maxWidth="sm"
      >
        <DialogTitle>
          {LL.customerProfile.editProfileDialogTitle()}
        </DialogTitle>
        <DialogContent>
          {/* Form fields using Input component */}
          <Input 
            label={LL.customerProfile.firstName()} 
            value={profileForm.name} 
            disabled
            helperText="برای تغییر نام به پشتیبانی پیام دهید"
          />
          <Input 
            label={LL.customerProfile.lastName()} 
            value={profileForm.lastName} 
            disabled
          />
          <Input 
            label={LL.customerProfile.phone()} 
            value={profileForm.phone} 
            onChange={(e) => setProfileForm({ ...profileForm, phone: toEnglishDigits(e.target.value) })}
            slotProps={{ htmlInput: { dir: 'ltr' } }}
          />
        </DialogContent>
        <DialogActions>
          <Button 
            variant="outline" 
            onClick={() => setEditProfileOpen(false)}
          >
            {LL.customerProfile.cancel()}
          </Button>
          <Button 
            variant="secondary" 
            onClick={handleSaveProfile}
            disabled={updatingProfile || !isLoggedIn}
          >
            {updatingProfile ? 
              <CircularProgress size={20} color="inherit" /> 
              : LL.customerProfile.saveChanges()}
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Other modals would follow similar pattern */}
    </Glassmorphism>
  );
}
```

### Key UX Improvements:
1. **Better Visual Hierarchy** - Clear separation of sections using Cards
2. **Consistent Spacing** - Using design token spacing system
3. **Improved Typography** - Consistent heading hierarchy and text styles
4. **Better Interactive States** - Hover lift on cards, proper button feedback
5. **Enhanced Mobile Experience** - Responsive grid layouts
6. **Clear Visual Feedback** - Loading states, disabled states, hover effects
7. **Improved Information Architecture** - Better grouping of related information

## 2. Home Screen Product Cards - iOS 27 Liquid Glass Design

### Issues to Fix:
- Product cards lack the premium liquid glass aesthetic
- Inconsistent styling across different product cards
- Poor mobile responsiveness (last child losing width)
- Lack of depth and visual hierarchy
- Missing interactive feedback

### Solution: Apply iOS 27 Liquid Glass Design Principles

```tsx
// ProductCard Component with iOS 27 Liquid Glass Design
import React from 'react';
import { Glassmorphism } from '../../design-system/glassmorphism';
import { Typography } from '../../design-system/typography';
import { Button } from '../../design-system/button';
import { colors, radius, animation, spacing } from '../../design-system/design-tokens';

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    price: number;
    imageUrl: string;
    rating: number;
    inStock: boolean;
    isNew?: boolean;
    isSale?: boolean;
    discountPercentage?: number;
  };
  onAddToCart: (productId: string) => void;
  onViewDetails: (productId: string) => void;
  isRtl?: boolean;
}

export function ProductCard({ 
  product, 
  onAddToCart, 
  onViewDetails, 
  isRtl = false 
}: ProductCardProps) => {
  const { name, price, imageUrl, rating, inStock, isNew, isSale, discountPercentage } = product;
  
  // Calculate discounted price
  const displayPrice = isSale && discountPercentage 
    ? price * (1 - discountPercentage / 100) 
    : price;
  
  const savings = isSale && discountPercentage 
    ? price - displayPrice 
    : 0;

  return (
    <Glassmorphism
      padding={3}
      isDark={false} // Products typically shown on light background
      elevation="light"
      borderRadius={radius.lg}
      hoverLift
      className="product-card"
      // iOS 27 specific enhancements
      style={{
        // Subtle animated border on hover
        '&:hover': {
          boxShadow: '0 20px 40px -10px rgba(0,0,0,0.1), 0 0 0 1px rgba(255,255,255,0.3)',
          transform: 'translateY(-4px)',
        },
        // Micro-interaction for tap/press
        '&:active': {
          transform: 'translateY(-2px)',
        }
      }}
    >
      {/* Badges */}
      <div className="absolute top-3 start-3 flex gap-2">
        {isNew && (
          <span className="flex items-center gap-1 px-2 py-0.5 bg-brass/20 text-xs font-medium rounded-full">
            <span className="w-2 h-2 bg-brass rounded-full" />{LL.product.new()}
          </span>
        )}
        {isSale && (
          <span className="flex items-center gap-1 px-2 py-0.5 bg-brass/20 text-xs font-medium rounded-full">
            -{discountPercentage}% {LL.product.sale()}
          </span>
        )}
      </div>
      
      {/* Product Image */}
      <div className="aspect-square mb-4">
        <img 
          src={imageUrl} 
          alt={name} 
          className="w-full h-full object-contain"
          style={{
            // Subtle parallax effect on hover
            '&:hover': {
              transform: 'scale(1.05)',
              transition: 'transform 0.5s ease-out'
            }
          }}
        />
      </div>
      
      {/* Product Info */}
      <div className="space-y-2">
        <Typography variant="body2" isRtl={isRtl} color="textSecondary" lineHeight="1.4">
          {name}
        </Typography>
        
        {/* Price Section */}
        <div className="flex items-baseline gap-2">
          {isSale && discountPercentage ? (
            <>
              <Typography 
                variant="body2" 
                isRtl={isRtl} 
                color="textSecondary" 
                textDecoration="line-through"
              >
                {price.toLocaleString()} {LL.currency()}
              </Typography>
              <Typography 
                variant="h6" 
                isRtl={isRtl} 
                color="textPrimary" 
                fontWeight="bold"
              >
                {displayPrice.toLocaleString()} {LL.currency()}
              </Typography>
            </>
          ) : (
            <Typography 
              variant="h6" 
              isRtl={isRtl} 
              color="textPrimary" 
              fontWeight="bold"
            >
              {price.toLocaleString()} {LL.currency()}
            </>
          )}
          
          {/* Savings Badge */}
          {isSale && discountPercentage && (
            <span className="flex items-center gap-1 px-1.5 py-0.5 bg-brass/20 text-xs font-medium rounded-full">
              {LL.product.save()}: {savings.toLocaleString()} {LL.currency()}
            </span>
          )}
        </div>
        
        {/* Rating */}
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <span 
              key={star} 
              className={`w-4 h-4 text-${star <= rating ? 'brass' : 'muted/50'}`}
            >
              ★
            </span>
          ))}
          <Typography variant="caption" isRtl={isRtl} color="textSecondary" ml={1}>
            ({rating}) {LL.product.reviews()}
          </Typography>
        </div>
        
        {/* Stock Status */}
        {!inStock && (
          <Typography 
            variant="caption" 
            isRtl={isRtl} 
            color="textSecondary" 
            fontWeight="medium"
          >
            {LL.product.outOfStock()}
          </Typography>
        )}
      </div>
      
      {/* Action Buttons */}
      <div className="mt-4 space-y-2">
        <Button 
          variant="secondary" 
          isRtl={isRtl} 
          onClick={() => onViewDetails(product.id)}
          size="sm"
        >
          {LL.product.viewDetails()}
        </Button>
        
        <Button 
          variant={inStock ? 'primary' : 'outline'} 
          isRtl={isRtl} 
          disabled={!inStock}
          onClick={() => onAddToCart(product.id)}
          size="sm"
        >
          {inStock ? LL.product.addToCart() : LL.product.outOfStock()}
        </Button>
      </div>
    </Glassmorphism>
  );
}
```

### iOS 27 Liquid Glass Design Features:
1. **Enhanced Glassmorphism** - More refined blur and transparency effects
2. **Micro-interactions** - Subtle scale/transform on hover/press
3. **Layered Depth** - Multiple elevation levels for different elements
4. **Refined Typography** - Clear hierarchy with appropriate weights
5. **Interactive Feedback** - Press states, hover effects, loading indicators
6. **Badge System** - Informative overlays without cluttering design
7. **Price Presentation** - Clear original vs discounted pricing
8. **Visual Focus** - Product image as hero element with subtle animations

### Fixing Mobile Padding Issues:
To fix the issue where "the padding of the last child card gets too much from the screen and loses too much width":

```css
/* Product Grid Container - Fix for mobile padding */
.product-grid {
  display: grid;
  gap: 16px; /* Consistent gap from design tokens */
  
  /* Mobile-first approach */
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  
  /* Fix for last child width issue */
  & > *:last-child {
    /* Don't let last item take full width unless it's the only item */
    @media (max-width: 640px) {
      /* On mobile, allow wrapping but don't stretch last item */
      margin-right: auto;
    }
  }
  
  /* Alternative: Use CSS Grid's auto-fit with proper distribution */
  /* This prevents the last item from stretching unnecessarily */
  grid-auto-flow: row dense;
}

/* Even better solution: Use fractional units with minmax */
.product-grid {
  display: grid;
  gap: env(safe-area-inset-right, 16px); /* Respect safe areas on mobile */
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  
  /* Prevent last item from taking excess space */
  & > *:nth-last-child(-n+2) {
    /* Last 2 items don't take full width unless needed */
    max-width: 100%;
  }
}

/* Ultimate fix: Use CSS Grid with proper alignment */
.product-grid {
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  
  /* Key fix: Align items to start, not stretch */
  align-items: start;
  
  /* Prevent last item from stretching */
  & > * {
    /* Each item takes only the space it needs */
    justify-self: start;
  }
  
  /* Center the grid container if there's extra space */
  justify-content: center;
  
  /* Add padding that respects safe areas */
  padding: 0 env(safe-area-inset-horizontal, 16px);
}
```

## 3. Dark/Light Theme Consistency

### Issues to Fix:
- Inconsistent theme handling across components
- Manual color calculations instead of theme-aware tokens
- Poor contrast ratios in some states
- Missing theme transition animations

### Solution: Theme-Aware Implementation Using Design Tokens

```tsx
// ThemeProvider Component (if not already implemented)
import React, { createContext, useContext, useState, useEffect } from 'react';
import { colors } from './design-tokens';

const ThemeContext = createContext({
  isDark: false,
  toggleTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(false);
  
  useEffect(() => {
    // Check for saved preference or system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
      setIsDark(savedTheme === 'dark');
    } else {
      setIsDark(systemPrefersDark);
    }
    
    // Apply theme to document
    document.documentElement.classList.toggle('dark', isDark);
  }, []);
  
  const toggleTheme = () => {
    setIsDark(prev => {
      const newValue = !prev;
      localStorage.setItem('theme', newValue ? 'dark' : 'light');
      document.documentElement.classList.toggle('dark', newValue);
      return newValue;
    });
  };
  
  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}

// Usage in components:
import { useTheme } from './ThemeProvider';
import { getBgColor, getTextPrimary, getBorder } from './design-tokens';

function SomeComponent() {
  const { isDark } = useTheme();
  
  return (
    <div 
      style={{
        backgroundColor: getBgColor(isDark),
        color: getTextPrimary(isDark),
        borderColor: getBorder(isDark),
        // Smooth theme transitions
        transition: 'background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease'
      }}
    >
      {/* Component content */}
    </div>
  );
}
```

### Theme-Specific Enhancements:

#### Light Theme:
- Softer shadows for depth
- Subtle glassmorphism with warm undertones
- Higher contrast for readability
- Gentler interactive states

#### Dark Theme:
- Deeper shadows for premium feel
- Richer glassmorphism with brass accents
- Optimized contrast for low-light environments
- Warm interactive states that pop against dark background

## 4. Overall Site Implementation Strategy

### Phase 1: Foundation
1. Replace all manual styling with design token usage
2. Implement ThemeProvider for consistent dark/light switching
3. Replace custom containers with Glassmorphism component
4. Standardize typography with Typography component
5. Replace buttons with Button component
6. Replace inputs with Input component

### Phase 2: Component Refactoring
1. Refactor ProductCard using iOS 27 liquid glass principles
2. Refactor User Profile screen with improved UX
3. Refactor Login/Signup screens with design system
4. Create reusable components for common patterns (avatars, badges, etc.)

### Phase 3: Page-Level Improvements
1. Fix mobile responsive issues with proper grid layouts
2. Implement consistent pagination and loading states
3. Add micro-interactions and motion design
4. Optimize for performance (lazy loading, code splitting)
5. Enhance accessibility (ARIA labels, focus management, contrast)

### Phase 4: Polish & Testing
1. Test across devices and screen sizes
2. Verify dark/light theme consistency
3. Validate accessibility compliance (WCAG AA)
4. Performance testing and optimization
5. User testing for UX improvements

## 5. Specific Fixes for Mentioned Issues

### ✅ User Profile UX Improvements:
- Better information hierarchy with card-based layout
- Consistent interactive states and feedback
- Improved mobile responsiveness
- Clear visual separation of sections
- Enhanced accessibility with proper labeling

### ✅ Home Screen Product Cards - iOS 27 Liquid Glass:
- Premium glassmorphism with enhanced depth
- Micro-interactions for engagement
- Clear price presentation and savings visualization
- Consistent sizing and spacing
- Mobile-responsive grid that prevents width issues

### ✅ Mobile Padding Fixes:
- Proper CSS Grid implementation
- Safe area respect for notch/devices
- Prevent last-child width issues
- Consistent spacing that adapts to screen size

### ✅ Dark/Light Theme Consistency:
- Theme-aware color tokens
- Consistent theme switching
- Optimized contrasts for both themes
- Smooth theme transitions

### ✅ Overall Site Consistency:
- Unified design language across all components
- Reusable component library reduces inconsistencies
- Centralized tokens for easy global updates
- Consistent interactive patterns and motion design

## Files to Reference:
- `design-tokens.ts` - Core design system
- `glassmorphism.tsx` - Glassmorphism component
- `typography.tsx` - Typography system
- `button.tsx` - Button component with interactive states
- `input.tsx` - Form input component
- `card.tsx` - Card component
- `APPLY_DESIGN_SYSTEM_GUIDE.md` - This guide
- `login-screen-refactored-example.tsx` - Example implementation
- `DESIGN_SYSTEM_SUMMARY.md` - Original design system overview

This implementation approach will transform the entire site to have a consistent, beautiful, and premium iOS 27-inspired liquid glass design while fixing all the specific UI/UX issues mentioned.