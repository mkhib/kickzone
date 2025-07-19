import React, { useCallback, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid2 from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Chip from '@mui/material/Chip';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Alert from '@mui/material/Alert';
import DeleteIcon from '@mui/icons-material/Delete';
import AddPhotoIcon from '@mui/icons-material/AddPhotoAlternate';
import UploadIcon from '@mui/icons-material/Upload';
import { KickzoneGraphqlTypes } from '@kickzone-workspace/codegen';
import { useProducts } from '@kickzone-workspace/products-hook';
import { useSnackbarContext } from '@kickzone-workspace/snackbar-hook';

interface ProductImageManagementModalProps {
  open: boolean;
  onClose: () => void;
  product: KickzoneGraphqlTypes.Product | null;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`image-tabpanel-${index}`}
      aria-labelledby={`image-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export function ProductImageManagementModal({
  open,
  onClose,
  product,
}: ProductImageManagementModalProps) {
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedFiles, setSelectedFiles] = useState<{ [key: number]: File[] }>(
    {}
  );
  const [selectedFilePreviews, setSelectedFilePreviews] = useState<{
    [key: number]: { file: File; url: string }[];
  }>({});
  const [uploading, setUploading] = useState<{ [key: number]: boolean }>({});
  const { uploadProductInfoImages, removeProductInfoImage } = useProducts();
  const { showSnackbar } = useSnackbarContext();

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  const handleFileSelection = useCallback(
    (productInfoId: number, event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;
      if (!files) return;
      const newFiles = Array.from(files);
      // Validate file types
      const validImageTypes = [
        'image/jpeg',
        'image/png',
        'image/gif',
        'image/webp',
      ];
      const invalidFiles = newFiles.filter(
        (file) => !validImageTypes.includes(file.type)
      );
      if (invalidFiles.length > 0) {
        showSnackbar('Only image files (JPEG, PNG, GIF, WEBP) are allowed', {
          severity: 'error',
        });
        return;
      }
      // Validate file sizes (max 5MB per file)
      const maxSize = 5 * 1024 * 1024; // 5MB
      const oversizedFiles = newFiles.filter((file) => file.size > maxSize);
      if (oversizedFiles.length > 0) {
        showSnackbar('Some files exceed the maximum size of 5MB', {
          severity: 'error',
        });
        return;
      }
      setSelectedFiles((prev) => ({
        ...prev,
        [productInfoId]: [...(prev[productInfoId] || []), ...newFiles],
      }));

      // Create preview URLs for selected files
      const newFilePreviews = newFiles.map((file) => ({
        file,
        url: URL.createObjectURL(file),
      }));
      setSelectedFilePreviews((prev) => ({
        ...prev,
        [productInfoId]: [...(prev[productInfoId] || []), ...newFilePreviews],
      }));
    },
    [showSnackbar]
  );

  const handleUploadImages = useCallback(
    async (productInfoId: number) => {
      const files = selectedFiles[productInfoId];
      if (!files || files.length === 0) return;
      setUploading((prev) => ({ ...prev, [productInfoId]: true }));
      try {
        await uploadProductInfoImages(productInfoId, files);
        setSelectedFiles((prev) => {
          const newState = { ...prev };
          delete newState[productInfoId];
          return newState;
        });
        setSelectedFilePreviews((prev) => {
          const newState = { ...prev };
          // Clean up object URLs
          if (newState[productInfoId]) {
            newState[productInfoId].forEach((preview) =>
              URL.revokeObjectURL(preview.url)
            );
            delete newState[productInfoId];
          }
          return newState;
        });
        showSnackbar('Images uploaded successfully', { severity: 'success' });
      } catch (error) {
        showSnackbar((error as Error).message, { severity: 'error' });
      } finally {
        setUploading((prev) => ({ ...prev, [productInfoId]: false }));
      }
    },
    [selectedFiles, uploadProductInfoImages, showSnackbar]
  );

  const handleRemoveImage = useCallback(
    async (productInfoId: number, imageUrl: string) => {
      const imageName = imageUrl.split('/').pop();
      if (!imageName) return;
      try {
        await removeProductInfoImage(productInfoId, imageName);
        showSnackbar('Image removed successfully', { severity: 'success' });
      } catch (error) {
        showSnackbar((error as Error).message, { severity: 'error' });
      }
    },
    [removeProductInfoImage, showSnackbar]
  );

  const handleClose = () => {
    setSelectedFiles({});
    setSelectedFilePreviews((prev) => {
      // Clean up all object URLs
      Object.values(prev).forEach((previews) =>
        previews.forEach((preview) => URL.revokeObjectURL(preview.url))
      );
      return {};
    });
    setUploading({});
    setSelectedTab(0);
    onClose();
  };

  if (!product) return null;

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>Manage Images - {product.name}</DialogTitle>
      <DialogContent>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={selectedTab} onChange={handleTabChange}>
            {product.productInfos.map((productInfo, index) => (
              <Tab
                key={productInfo.id}
                label={`${productInfo.size}${
                  productInfo.color ? ` - ${productInfo.color.name}` : ''
                }`}
                id={`image-tab-${index}`}
                aria-controls={`image-tabpanel-${index}`}
              />
            ))}
          </Tabs>
        </Box>
        {product.productInfos.map((productInfo, index) => (
          <TabPanel key={productInfo.id} value={selectedTab} index={index}>
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Variant: {productInfo.size}
                {productInfo.color && ` - ${productInfo.color.name}`}
              </Typography>
              {/* Current Images */}
              <Typography variant="subtitle1" gutterBottom>
                Current Images ({productInfo.images?.length || 0})
              </Typography>
              {productInfo.images && productInfo.images.length > 0 ? (
                <Grid2 container spacing={2} sx={{ mb: 3 }}>
                  {productInfo.images.map((imageUrl, imageIndex) => (
                    <Grid2 key={imageIndex} size={{ xs: 12, sm: 6, md: 4 }}>
                      <Card>
                        <CardMedia
                          component="img"
                          height="140"
                          image={
                            imageUrl.startsWith('/uploads/')
                              ? `https://localhost:4000${imageUrl}`
                              : imageUrl
                          }
                          alt={`Product image ${imageIndex + 1}`}
                          sx={{ objectFit: 'cover' }}
                        />
                        <CardActions>
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() =>
                              handleRemoveImage(productInfo.id, imageUrl)
                            }
                          >
                            <DeleteIcon />
                          </IconButton>
                        </CardActions>
                      </Card>
                    </Grid2>
                  ))}
                </Grid2>
              ) : (
                <Alert severity="info" sx={{ mb: 3 }}>
                  No images uploaded for this variant yet.
                </Alert>
              )}
              {/* Add New Images */}
              <Typography variant="subtitle1" gutterBottom>
                Add New Images
              </Typography>
              <Box sx={{ mb: 2 }}>
                <input
                  accept="image/*"
                  style={{ display: 'none' }}
                  id={`file-input-${productInfo.id}`}
                  type="file"
                  multiple
                  onChange={(e) => handleFileSelection(productInfo.id, e)}
                />
                <label htmlFor={`file-input-${productInfo.id}`}>
                  <Button
                    variant="outlined"
                    component="span"
                    startIcon={<AddPhotoIcon />}
                    sx={{ mr: 2 }}
                  >
                    Select Images
                  </Button>
                </label>
                {selectedFiles[productInfo.id] &&
                  selectedFiles[productInfo.id].length > 0 && (
                    <Button
                      variant="contained"
                      startIcon={<UploadIcon />}
                      onClick={() => handleUploadImages(productInfo.id)}
                      disabled={uploading[productInfo.id]}
                    >
                      {uploading[productInfo.id]
                        ? 'Uploading...'
                        : 'Upload Images'}
                    </Button>
                  )}
              </Box>
              {/* Selected Files Preview */}
              {selectedFilePreviews[productInfo.id] &&
                selectedFilePreviews[productInfo.id].length > 0 && (
                  <Box>
                    <Typography variant="body2" gutterBottom>
                      Selected files (
                      {selectedFilePreviews[productInfo.id].length}):
                    </Typography>
                    <Box
                      sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}
                    >
                      {selectedFilePreviews[productInfo.id].map(
                        (preview, fileIndex) => (
                          <Chip
                            key={fileIndex}
                            label={preview.file.name}
                            size="small"
                            onDelete={() => {
                              setSelectedFiles((prev) => ({
                                ...prev,
                                [productInfo.id]: prev[productInfo.id].filter(
                                  (_, i) => i !== fileIndex
                                ),
                              }));
                              setSelectedFilePreviews((prev) => {
                                const newState = { ...prev };
                                URL.revokeObjectURL(
                                  newState[productInfo.id][fileIndex].url
                                );
                                newState[productInfo.id] = newState[
                                  productInfo.id
                                ].filter((_, i) => i !== fileIndex);
                                return newState;
                              });
                            }}
                          />
                        )
                      )}
                    </Box>
                    {/* Image Thumbnails */}
                    <Typography variant="body2" gutterBottom>
                      Image Previews:
                    </Typography>
                    <Grid2 container spacing={2} sx={{ mb: 2 }}>
                      {selectedFilePreviews[productInfo.id].map(
                        (preview, fileIndex) => (
                          <Grid2
                            key={fileIndex}
                            size={{ xs: 12, sm: 6, md: 4 }}
                          >
                            <Card>
                              <CardMedia
                                component="img"
                                height="140"
                                image={preview.url}
                                alt={`Selected image ${fileIndex + 1}`}
                                sx={{ objectFit: 'cover' }}
                              />
                              <CardActions>
                                <IconButton
                                  size="small"
                                  color="error"
                                  onClick={() => {
                                    setSelectedFiles((prev) => ({
                                      ...prev,
                                      [productInfo.id]: prev[
                                        productInfo.id
                                      ].filter((_, i) => i !== fileIndex),
                                    }));
                                    setSelectedFilePreviews((prev) => {
                                      const newState = { ...prev };
                                      URL.revokeObjectURL(
                                        newState[productInfo.id][fileIndex].url
                                      );
                                      newState[productInfo.id] = newState[
                                        productInfo.id
                                      ].filter((_, i) => i !== fileIndex);
                                      return newState;
                                    });
                                  }}
                                >
                                  <DeleteIcon />
                                </IconButton>
                              </CardActions>
                            </Card>
                          </Grid2>
                        )
                      )}
                    </Grid2>
                  </Box>
                )}
            </Box>
          </TabPanel>
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
