import {
  AdminProductEditor,
  CreatedCatalogProduct,
} from '@kickzone-workspace/admin-product-editor';
import { KickzoneGraphqlTypes } from '@kickzone-workspace/codegen';
import { getLtrTextFieldProps } from '@kickzone-workspace/language-components';
import { useI18nContext } from '@kickzone-workspace/shared-i18n';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React, { useMemo, useState } from 'react';

type ListingDraft = {
  productInfoId: number;
  label: string;
  colorHex?: string;
  price: number;
  costPrice: number;
  discount: number;
  stockQuantity: number;
  boxLess: boolean;
};

const emptyListing = (
  info: CreatedCatalogProduct['productInfos'][number]
): ListingDraft => ({
  productInfoId: info.id,
  label: `${info.size} - ${info.color?.name || ''} (${info.weight}kg)`,
  colorHex: info.color?.hexCode,
  price: 0,
  costPrice: 0,
  discount: 0,
  stockQuantity: 0,
  boxLess: false,
});

export interface SellersDefineProductFlowProps {
  onCreateListings: (
    listings: KickzoneGraphqlTypes.CreateSellerProductInput[]
  ) => Promise<void>;
  isSubmitting: boolean;
}

export function SellersDefineProductFlow({
  onCreateListings,
  isSubmitting,
}: SellersDefineProductFlowProps) {
  const { LL } = useI18nContext();
  const [created, setCreated] = useState<CreatedCatalogProduct | null>(null);
  const [listings, setListings] = useState<ListingDraft[]>([]);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleCreated = (result: CreatedCatalogProduct) => {
    setCreated(result);
    setListings(result.productInfos.map(emptyListing));
    setSubmitError(null);
  };

  const updateListing = (
    productInfoId: number,
    field: keyof Omit<ListingDraft, 'productInfoId' | 'label' | 'colorHex'>,
    value: number | boolean
  ) => {
    setListings((prev) =>
      prev.map((item) =>
        item.productInfoId === productInfoId ? { ...item, [field]: value } : item
      )
    );
  };

  const listingsToSave = useMemo(
    () =>
      listings.filter(
        (item) =>
          item.stockQuantity > 0 && item.price > 0 && item.costPrice > 0
      ),
    [listings]
  );

  const handleSaveListings = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!listingsToSave.length) {
      setSubmitError(LL.products.skipVariantHint());
      return;
    }
    setSubmitError(null);
    await onCreateListings(
      listingsToSave.map((item) => ({
        productInfoId: item.productInfoId,
        price: item.price,
        costPrice: item.costPrice,
        discount: item.discount,
        stockQuantity: item.stockQuantity,
        boxLess: item.boxLess,
      }))
    );
  };

  if (!created) {
    return (
      <Box>
        <Alert severity="info" sx={{ mb: 3 }}>
          {LL.products.defineProductThenStock()}
        </Alert>
        <AdminProductEditor
          embedded
          LayoutComponent={({ children }) => <>{children}</>}
          onCreated={handleCreated}
        />
      </Box>
    );
  }

  return (
    <Box component="form" onSubmit={handleSaveListings}>
      <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
        {created.product.name}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        {LL.products.setYourInventory()}
      </Typography>
      {submitError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {submitError}
        </Alert>
      )}
      <Grid container spacing={3}>
        {listings.map((item) => (
          <Grid key={item.productInfoId} size={{ xs: 12 }}>
            <Card variant="outlined" sx={{ borderRadius: 2 }}>
              <CardContent>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    mb: 2,
                  }}
                >
                  {item.colorHex && (
                    <Box
                      sx={{
                        width: 20,
                        height: 20,
                        borderRadius: '50%',
                        backgroundColor: item.colorHex,
                        border: '1px solid',
                        borderColor: 'divider',
                      }}
                    />
                  )}
                  <Typography fontWeight={600}>{item.label}</Typography>
                </Box>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <TextField
                      fullWidth
                      required
                      label={LL.form.stockQuantity()}
                      type="number"
                      value={item.stockQuantity}
                      onChange={(e) =>
                        updateListing(
                          item.productInfoId,
                          'stockQuantity',
                          parseFloat(e.target.value) || 0
                        )
                      }
                      disabled={isSubmitting}
                      helperText={LL.products.skipVariantHint()}
                      {...getLtrTextFieldProps()}
                      slotProps={{ htmlInput: { dir: 'ltr', min: 0 } }}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <TextField
                      fullWidth
                      label={LL.form.price()}
                      type="number"
                      value={item.price}
                      onChange={(e) =>
                        updateListing(
                          item.productInfoId,
                          'price',
                          parseFloat(e.target.value) || 0
                        )
                      }
                      disabled={isSubmitting}
                      {...getLtrTextFieldProps()}
                      slotProps={{
                        htmlInput: { dir: 'ltr', min: 0, step: 0.01 },
                      }}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <TextField
                      fullWidth
                      label={LL.form.costPrice()}
                      type="number"
                      value={item.costPrice}
                      onChange={(e) =>
                        updateListing(
                          item.productInfoId,
                          'costPrice',
                          parseFloat(e.target.value) || 0
                        )
                      }
                      disabled={isSubmitting}
                      {...getLtrTextFieldProps()}
                      slotProps={{
                        htmlInput: { dir: 'ltr', min: 0, step: 0.01 },
                      }}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <TextField
                      fullWidth
                      label={LL.form.discount()}
                      type="number"
                      value={item.discount}
                      onChange={(e) =>
                        updateListing(
                          item.productInfoId,
                          'discount',
                          parseFloat(e.target.value) || 0
                        )
                      }
                      disabled={isSubmitting}
                      {...getLtrTextFieldProps()}
                      slotProps={{
                        htmlInput: { dir: 'ltr', min: 0, max: 100, step: 0.01 },
                      }}
                    />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={item.boxLess}
                          onChange={(e) =>
                            updateListing(
                              item.productInfoId,
                              'boxLess',
                              e.target.checked
                            )
                          }
                          disabled={isSubmitting}
                        />
                      }
                      label={LL.products.boxLess()}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        ))}
        <Grid size={{ xs: 12 }}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              type="submit"
              variant="contained"
              size="large"
              loading={isSubmitting}
              disabled={!listingsToSave.length}
              sx={{ textTransform: 'none', fontWeight: 600, px: 4 }}
            >
              {LL.button.addProduct()}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
