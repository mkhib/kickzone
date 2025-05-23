import { AdminsLayout } from '@kickzone-workspace/admins-layout';
import {
  useCategories,
  useCategoriesQuery,
} from '@kickzone-workspace/categories-hook';
import { KickzoneGraphqlTypes } from '@kickzone-workspace/codegen';
import { colors } from '@kickzone-workspace/colors';
import { useProducts, useProductById } from '@kickzone-workspace/products-hook';
import { useSnackbarContext } from '@kickzone-workspace/snackbar-hook';
import AddIcon from '@mui/icons-material/Add';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import WarningIcon from '@mui/icons-material/Warning';
import { Tooltip } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid2 from '@mui/material/Grid2';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import { styled, useTheme } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useColors } from '@kickzone-workspace/colors-hook';
import { SketchPicker, ColorResult } from 'react-color';

interface CategoryModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (name: string) => void;
  initialName?: string;
  title: string;
  isLoading?: boolean;
}

const CategoryModal = ({
  open,
  onClose,
  onSubmit,
  initialName = '',
  title,
  isLoading = false,
}: CategoryModalProps) => {
  const [categoryName, setCategoryName] = useState(initialName);

  useEffect(() => {
    setCategoryName(initialName);
  }, [initialName]);

  const handleSubmit = useCallback(() => {
    onSubmit(categoryName);
    setCategoryName('');
    onClose();
  }, [categoryName, onSubmit, onClose]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg">
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Category Name"
          fullWidth
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          slotProps={{
            input: { 'aria-label': 'Category Name' },
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={handleSubmit}
          loading={isLoading}
          variant="contained"
          color="primary"
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

interface DeleteCategoryModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  categoryName: string;
  isLoading?: boolean;
}

const DeleteCategoryModal = ({
  open,
  onClose,
  onConfirm,
  categoryName,
  isLoading = false,
}: DeleteCategoryModalProps) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <WarningIcon color="warning" />
        Delete Category
      </DialogTitle>
      <DialogContent>
        <Typography>
          Are you sure you want to delete the category "{categoryName}"? This
          action cannot be undone.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={onConfirm}
          loading={isLoading}
          variant="contained"
          color="error"
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

interface DeleteImageModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  imageType: 'preview' | 'uploaded';
}

const DeleteImageModal = ({
  open,
  onClose,
  onConfirm,
  imageType,
}: DeleteImageModalProps) => (
  <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
    <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <WarningIcon color="warning" />
      Delete Image
    </DialogTitle>
    <DialogContent>
      <Typography>
        Are you sure you want to delete this{' '}
        {imageType === 'preview' ? 'selected' : 'uploaded'} image?
      </Typography>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose}>Cancel</Button>
      <Button onClick={onConfirm} variant="contained" color="error">
        Delete
      </Button>
    </DialogActions>
  </Dialog>
);

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const ImagePreviewCard = styled(Card)(({ theme }) => ({
  maxWidth: 200,
  margin: theme.spacing(1),
  position: 'relative',
}));

const ImagePreviewContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: theme.spacing(2),
  marginTop: theme.spacing(2),
}));

// Define ProductInfoState independently
export type ProductInfoState = {
  productId: number;
  size: string;
  price: number;
  costPrice: number;
  color: KickzoneGraphqlTypes.Color | null; // Use the generated Color type
  weight: number;
  discount: number;
  stockQuantity: number;
  images: File[];
  imagePreviews: string[];
  uploadedImageUrls: string[];
  createdId: number | null;
  isUploading: boolean;
  newImages: File[];
  newImagePreviews: { file: File; url: string }[];
};

interface ProductInfoCardProps {
  info: ProductInfoState;
  idx: number;
  onChange: (
    idx: number,
    name: keyof Omit<
      ProductInfoState,
      | 'color'
      | 'images'
      | 'imagePreviews'
      | 'uploadedImageUrls'
      | 'createdId'
      | 'isUploading'
      | 'newImages'
      | 'newImagePreviews'
    >,
    value: unknown
  ) => void;
  onColorChange: (
    idx: number,
    color: KickzoneGraphqlTypes.Color | null
  ) => void;
  availableColors: KickzoneGraphqlTypes.Color[];
  onImageUpload: (idx: number, e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemove: (idx: number) => void;
  onRemoveImage: (infoIdx: number, imageIdx: number) => void;
  disableRemove: boolean;
  onRemoveSelectedImage: (infoIdx: number, imageIdx: number) => void;
  onUploadSelectedImages: (infoIdx: number) => void;
}

const ProductInfoCard = React.memo(
  ({
    info,
    idx,
    onChange,
    onColorChange,
    availableColors,
    onImageUpload,
    onRemove,
    onRemoveImage,
    disableRemove,
    onRemoveSelectedImage,
    onUploadSelectedImages,
  }: ProductInfoCardProps) => {
    // Tooltip for upload button if product info is not created
    const isSelectImagesDisabled = info.isUploading || !info.createdId;
    const showTooltip = !info.createdId;
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const uploadButton = (
      <Button
        component="label"
        variant="contained"
        startIcon={<AddPhotoAlternateIcon />}
        disabled={isSelectImagesDisabled}
        sx={{
          backgroundColor: colors.main,
          '&:hover': { backgroundColor: colors.hoverMain },
        }}
        aria-label="Select Images"
      >
        {info.isUploading ? 'Uploading...' : 'Select Images'}
        <VisuallyHiddenInput
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => {
            onImageUpload(idx, e);
            // Reset the value so the same file can be selected again
            e.target.value = '';
          }}
          disabled={isSelectImagesDisabled}
        />
      </Button>
    );
    return (
      <Paper sx={{ mb: 2, p: 2, position: 'relative' }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: 2,
            flexWrap: { xs: 'nowrap', md: 'wrap' },
          }}
        >
          <Autocomplete
            options={availableColors}
            getOptionLabel={(option) => option.name}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            value={info.color}
            onChange={(_e, newValue) => onColorChange(idx, newValue)}
            renderInput={(params) => (
              <TextField {...params} label="Color" required />
            )}
            sx={{ minWidth: 120, width: '100%', mb: { xs: 2, md: 0 } }}
          />
          <TextField
            label="Size"
            name="size"
            value={info.size}
            onChange={(
              e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            ) => onChange(idx, 'size', e.target.value)}
            required
            sx={{
              flex: 1,
              minWidth: 100,
              width: isMobile ? '100%' : undefined,
            }}
          />
          <TextField
            label="Price"
            name="price"
            type="number"
            value={info.price}
            onChange={(
              e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            ) => onChange(idx, 'price', e.target.value)}
            required
            sx={{
              flex: 1,
              minWidth: 100,
              width: isMobile ? '100%' : undefined,
            }}
          />
          <TextField
            label="Cost Price"
            name="costPrice"
            type="number"
            value={info.costPrice}
            onChange={(
              e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            ) => onChange(idx, 'costPrice', e.target.value)}
            required
            sx={{
              flex: 1,
              minWidth: 100,
              width: isMobile ? '100%' : undefined,
            }}
          />
          <TextField
            label="Weight (kg)"
            name="weight"
            type="number"
            value={info.weight}
            onChange={(
              e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            ) => onChange(idx, 'weight', e.target.value)}
            required
            sx={{
              flex: 1,
              minWidth: 100,
              width: isMobile ? '100%' : undefined,
            }}
          />
          <TextField
            label="Discount (%)"
            name="discount"
            type="number"
            value={info.discount}
            onChange={(
              e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            ) => onChange(idx, 'discount', e.target.value)}
            sx={{
              flex: 1,
              minWidth: 100,
              width: isMobile ? '100%' : undefined,
            }}
          />
          <TextField
            label="Stock Quantity"
            name="stockQuantity"
            type="number"
            value={info.stockQuantity}
            onChange={(
              e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            ) => onChange(idx, 'stockQuantity', e.target.value)}
            required
            sx={{
              flex: 1,
              minWidth: 100,
              width: isMobile ? '100%' : undefined,
            }}
          />
        </Box>
        <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
          {showTooltip ? (
            <Tooltip
              title="You must save the product before selecting images."
              placement="top"
            >
              <span>{uploadButton}</span>
            </Tooltip>
          ) : (
            uploadButton
          )}
          <IconButton
            onClick={() => onRemove(idx)}
            color="error"
            aria-label="Remove variant"
            sx={{ ml: 1 }}
            disabled={disableRemove}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
        <ImagePreviewContainer>
          {/* Selected (not yet uploaded) images */}
          {info.newImagePreviews.length > 0 && (
            <Box sx={{ width: '100%' }}>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                sx={{ mb: 1 }}
              >
                Selected Images (not yet uploaded):
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                {info.newImagePreviews.map((previewObj, imageIdx) => (
                  <ImagePreviewCard key={imageIdx}>
                    <CardMedia
                      component="img"
                      height="140"
                      image={previewObj.url}
                      alt={`Selected image ${imageIdx + 1}`}
                    />
                    <CardActions>
                      <IconButton
                        size="small"
                        onClick={() => onRemoveSelectedImage(idx, imageIdx)}
                        sx={{ color: 'error.main' }}
                        aria-label="Delete selected image"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </CardActions>
                  </ImagePreviewCard>
                ))}
              </Box>
              <Button
                variant="contained"
                color="primary"
                sx={{ mt: 1 }}
                onClick={() => onUploadSelectedImages(idx)}
                disabled={
                  info.isUploading ||
                  info.newImages.length === 0 ||
                  !info.createdId
                }
              >
                {info.isUploading ? 'Uploading...' : 'Upload Images'}
              </Button>
            </Box>
          )}
          {/* Uploaded images from server */}
          {info.uploadedImageUrls.length > 0 && (
            <Box sx={{ width: '100%', mt: 2 }}>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                sx={{ mb: 1 }}
              >
                Uploaded Images:
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                {info.uploadedImageUrls.map(
                  (preview: string, imageIdx: number) => (
                    <ImagePreviewCard key={imageIdx}>
                      <CardMedia
                        component="img"
                        height="140"
                        image={
                          preview.startsWith('/uploads/')
                            ? `${BACKEND_BASE_URL}${preview}`
                            : preview
                        }
                        alt={`Product variant image ${imageIdx + 1}`}
                      />
                      <CardActions>
                        <IconButton
                          size="small"
                          onClick={() => onRemoveImage(idx, imageIdx)}
                          sx={{ color: 'error.main' }}
                          aria-label="Delete uploaded image"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </CardActions>
                    </ImagePreviewCard>
                  )
                )}
              </Box>
            </Box>
          )}
        </ImagePreviewContainer>
      </Paper>
    );
  }
);

const BACKEND_BASE_URL = 'https://localhost:4000';

interface ColorModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (id: number | null, name: string, hexCode: string) => void;
  initialColor?: KickzoneGraphqlTypes.Color | null;
  title: string;
  isLoading?: boolean;
}

const ColorModal = ({
  open,
  onClose,
  onSubmit,
  initialColor = null,
  title,
  isLoading = false,
}: ColorModalProps) => {
  const [colorName, setColorName] = useState(initialColor?.name || '');
  const [hexCode, setHexCode] = useState(initialColor?.hexCode || '#ffffff');

  useEffect(() => {
    setColorName(initialColor?.name || '');
    setHexCode(initialColor?.hexCode || '#ffffff');
  }, [initialColor]);

  const handleSubmit = useCallback(() => {
    onSubmit(initialColor?.id || null, colorName, hexCode);
    // Don't reset state here, useEffect will handle it when modal closes or initialColor changes
    onClose();
  }, [initialColor, colorName, hexCode, onSubmit, onClose]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Color Name"
          fullWidth
          value={colorName}
          onChange={(e) => setColorName(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          margin="dense"
          label="Hex Code"
          fullWidth
          value={hexCode}
          onChange={(e) => setHexCode(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <SketchPicker
            color={hexCode}
            onChangeComplete={(color: ColorResult) => setHexCode(color.hex)}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={handleSubmit}
          disabled={isLoading} // Use disabled instead of loading prop if not available
          variant="contained"
          color="primary"
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

interface DeleteColorModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  colorName: string;
  isLoading?: boolean;
}

const DeleteColorModal = ({
  open,
  onClose,
  onConfirm,
  colorName,
  isLoading = false,
}: DeleteColorModalProps) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <WarningIcon color="warning" />
        Delete Color
      </DialogTitle>
      <DialogContent>
        <Typography>
          Are you sure you want to delete the color "{colorName}"? This action
          cannot be undone.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={onConfirm}
          loading={isLoading}
          variant="contained"
          color="error"
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export function AdminProductEditor() {
  const { id } = useParams<{ id?: string }>();
  const productIdNum = id ? Number(id) : undefined;
  const { product: loadedProduct } = useProductById(productIdNum);
  const [product, setProduct] = useState({
    name: '',
    categoryIds: [] as number[],
    description: '',
  });

  const [productInfos, setProductInfos] = useState<ProductInfoState[]>([
    {
      productId: 0,
      size: '',
      price: 0,
      costPrice: 0,
      color: null, // Initialize color as null
      weight: 0,
      discount: 0,
      stockQuantity: 0,
      images: [],
      imagePreviews: [],
      uploadedImageUrls: [],
      createdId: null,
      isUploading: false,
      newImages: [],
      newImagePreviews: [],
    },
  ]);

  const [createdProductInfoIds, setCreatedProductInfoIds] = useState<
    (number | null)[]
  >([null]);

  const [isNewCategoryModalOpen, setIsNewCategoryModalOpen] = useState(false);
  const [isEditCategoryModalOpen, setIsEditCategoryModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<{
    id: number;
    name: string;
  } | null>(null);

  const [isDeleteCategoryModalOpen, setIsDeleteCategoryModalOpen] =
    useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<{
    id: number;
    name: string;
  } | null>(null);

  const [deleteImageModal, setDeleteImageModal] = useState<{
    open: boolean;
    infoIdx: number | null;
    imageIdx: number | null;
    imageType: 'preview' | 'uploaded' | null;
  }>({ open: false, infoIdx: null, imageIdx: null, imageType: null });

  const [isNewColorModalOpen, setIsNewColorModalOpen] = useState(false);
  const [isEditColorModalOpen, setIsEditColorModalOpen] = useState(false);
  const [selectedColor, setSelectedColor] =
    useState<KickzoneGraphqlTypes.Color | null>(null);

  const [isDeleteColorModalOpen, setIsDeleteColorModalOpen] = useState(false);
  const [colorToDelete, setColorToDelete] = useState<{
    id: number;
    name: string;
  } | null>(null);

  const { categories, loading: categoriesLoading } = useCategoriesQuery();
  const {
    createCategory,
    updateCategory,
    deleteCategory,
    isCreatingCategory,
    isUpdatingCategory,
    isDeletingCategory,
  } = useCategories();

  const {
    createProductWithInfos,
    uploadProductInfoImages,
    removeProductInfoImage,
    isCreatingProduct,
  } = useProducts();
  const { showSnackbar } = useSnackbarContext();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const {
    colors: availableColors,
    createColor,
    updateColor,
    deleteColor,
    loading: colorMutationsLoading,
  } = useColors();

  // Fetch product if editing
  useEffect(() => {
    if (productIdNum && loadedProduct) {
      setProduct({
        name: loadedProduct.name,
        categoryIds: loadedProduct.categories.map((cat) => cat.id),
        description: loadedProduct.description || '',
      });
      setProductInfos(
        loadedProduct.productInfos.map((info) => ({
          productId: loadedProduct.id,
          size: info.size,
          price: info.price,
          costPrice: info.costPrice,
          color: info.color
            ? {
                // Map backend color object to frontend state
                id: info.color.id,
                name: info.color.name,
                hexCode: info.color.hexCode,
              }
            : null,
          weight: info.weight,
          discount: info.discount,
          stockQuantity: info.stockQuantity,
          images: [],
          imagePreviews: [],
          uploadedImageUrls: info.images || [],
          createdId: info.id,
          isUploading: false,
          newImages: [],
          newImagePreviews: [],
        }))
      );
      setCreatedProductInfoIds(
        loadedProduct.productInfos.map((info) => info.id)
      );
    }
  }, [productIdNum, loadedProduct]);

  // Handlers for product fields
  const handleProductChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setProduct((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  // Handlers for product info fields
  const handleProductInfoChange = useCallback(
    (
      index: number,
      name: keyof Omit<
        ProductInfoState,
        | 'color'
        | 'images'
        | 'imagePreviews'
        | 'uploadedImageUrls'
        | 'createdId'
        | 'isUploading'
        | 'newImages'
        | 'newImagePreviews'
      >,
      value: unknown
    ) => {
      setProductInfos((prev) => {
        const updated = [...prev];
        updated[index] = { ...updated[index], [name]: value };
        return updated;
      });
    },
    []
  );

  // Add a new ProductInfo variant
  const handleAddProductInfo = useCallback(() => {
    setProductInfos((prev) => [
      ...prev,
      {
        productId: 0,
        size: '',
        price: 0,
        costPrice: 0,
        color: null,
        weight: 0,
        discount: 0,
        stockQuantity: 0,
        images: [],
        imagePreviews: [],
        uploadedImageUrls: [],
        createdId: null,
        isUploading: false,
        newImages: [],
        newImagePreviews: [],
      } as ProductInfoState,
    ]);
    setCreatedProductInfoIds((prev) => [...prev, null]);
  }, []);

  // Remove a ProductInfo variant
  const handleRemoveProductInfo = useCallback((index: number) => {
    setProductInfos((prev) => prev.filter((_, i) => i !== index));
    setCreatedProductInfoIds((prev) => prev.filter((_, i) => i !== index));
  }, []);

  // Handle image selection for a specific ProductInfo
  const handleImageSelection = useCallback(
    (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
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
      const maxSize = 5 * 1024 * 1024; // 5MB in bytes
      const oversizedFiles = newFiles.filter((file) => file.size > maxSize);
      if (oversizedFiles.length > 0) {
        showSnackbar('Some files exceed the maximum size of 5MB', {
          severity: 'error',
        });
        return;
      }
      setProductInfos((prev) => {
        const updated = [...prev];
        const existingFiles = updated[index].newImages || [];
        const existingPreviews = updated[index].newImagePreviews || [];
        // Only add files that are not already present (by name+size)
        const filesToAdd = newFiles.filter(
          (file) =>
            !existingFiles.some(
              (f) => f.name === file.name && f.size === file.size
            )
        );
        updated[index] = {
          ...updated[index],
          newImages: [...existingFiles, ...filesToAdd],
          newImagePreviews: [
            ...existingPreviews,
            ...filesToAdd.map((file) => ({
              file,
              url: URL.createObjectURL(file),
            })),
          ],
        };
        return updated;
      });
    },
    [showSnackbar]
  );

  // Remove a selected (not yet uploaded) image
  const handleRemoveSelectedImage = useCallback(
    (infoIdx: number, imageIdx: number) => {
      setProductInfos((prev) => {
        const updated = [...prev];
        const previewObj = updated[infoIdx].newImagePreviews[imageIdx];
        if (previewObj) URL.revokeObjectURL(previewObj.url);
        // Remove from newImages by file reference, not just index
        const newImages = updated[infoIdx].newImages.filter(
          (file) =>
            !(
              previewObj &&
              file.name === previewObj.file.name &&
              file.size === previewObj.file.size
            )
        );
        const newImagePreviews = updated[infoIdx].newImagePreviews.filter(
          (_, i) => i !== imageIdx
        );
        updated[infoIdx] = {
          ...updated[infoIdx],
          newImages,
          newImagePreviews,
        };
        return updated;
      });
    },
    []
  );

  // Upload selected images for a specific ProductInfo
  const handleUploadSelectedImages = useCallback(
    async (index: number) => {
      const productInfoId = createdProductInfoIds[index];
      if (!productInfoId) {
        showSnackbar('Please save the product first to upload images', {
          severity: 'warning',
        });
        return;
      }
      setProductInfos((prev) => {
        const updated = [...prev];
        updated[index].isUploading = true;
        return updated;
      });
      try {
        // Use the latest state for newImages and newImagePreviews
        let newImages: File[] = [];
        let previewsToRevoke: string[] = [];
        setProductInfos((prev) => {
          newImages = prev[index].newImages;
          previewsToRevoke = prev[index].newImagePreviews.map((obj) => obj.url);
          return prev;
        });
        // Wait a tick to ensure state is updated
        await new Promise((resolve) => setTimeout(resolve, 0));
        const uploadedUrls = await uploadProductInfoImages(
          productInfoId,
          newImages
        );
        // Revoke all object URLs after upload
        previewsToRevoke.forEach((url) => URL.revokeObjectURL(url));
        setProductInfos((prev) => {
          const updated = [...prev];
          updated[index] = {
            ...updated[index],
            uploadedImageUrls: [
              ...(updated[index].uploadedImageUrls || []),
              ...uploadedUrls,
            ],
            newImages: [],
            newImagePreviews: [] as { file: File; url: string }[],
            isUploading: false,
          };
          return updated;
        });
        showSnackbar('Images uploaded successfully', { severity: 'success' });
      } catch (error) {
        setProductInfos((prev) => {
          const updated = [...prev];
          updated[index].isUploading = false;
          return updated;
        });
        showSnackbar((error as Error).message, { severity: 'error' });
      }
    },
    [createdProductInfoIds, uploadProductInfoImages, showSnackbar]
  );

  // Remove an uploaded image (from server)
  const handleRemoveUploadedImage = useCallback(
    async (infoIndex: number, imageIndex: number) => {
      const productInfoId = createdProductInfoIds[infoIndex];
      if (!productInfoId) return;
      const imageUrl = productInfos[infoIndex].uploadedImageUrls[imageIndex];
      const imageName = imageUrl.split('/').pop();
      if (!imageName) return;
      try {
        await removeProductInfoImage(productInfoId, imageName);
        setProductInfos((prev) => {
          const updated = [...prev];
          updated[infoIndex].uploadedImageUrls = updated[
            infoIndex
          ].uploadedImageUrls.filter((_, i) => i !== imageIndex);
          return updated;
        });
      } catch (error) {
        showSnackbar((error as Error).message, { severity: 'error' });
      }
    },
    [createdProductInfoIds, productInfos, removeProductInfoImage, showSnackbar]
  );

  // Handle product creation
  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        // Validate required fields
        if (!product.name || product.categoryIds.length === 0) {
          showSnackbar('Please fill in all required fields', {
            severity: 'error',
          });
          return;
        }
        for (const info of productInfos) {
          if (
            !info.size ||
            !info.color ||
            !info.price ||
            !info.costPrice ||
            !info.weight ||
            !info.stockQuantity
          ) {
            showSnackbar('Please fill in all product variant fields', {
              severity: 'error',
            });
            return;
          }
        }
        // Create product and all product infos
        const created = await createProductWithInfos(
          {
            name: product.name,
            categoryIds: product.categoryIds,
            discount: 0,
            description:
              product.description === '' ? null : product.description,
          },
          productInfos.map((info) => ({
            size: info.size,
            price: Number(info.price),
            costPrice: Number(info.costPrice),
            colorId: info.color?.id || 0, // Map color object back to colorId
            weight: Number(info.weight),
            discount: Number(info.discount) || 0,
            stockQuantity: Number(info.stockQuantity),
          }))
        );
        setCreatedProductInfoIds(created.productInfos.map((pi) => pi.id));
        setProductInfos((prev) =>
          prev.map((info, i) => ({
            ...info,
            createdId: created.productInfos[i]?.id || null,
          }))
        );
        showSnackbar('Product created successfully', { severity: 'success' });
      } catch (error) {
        const message = (error as Error).message;
        if (message.includes('already exists')) {
          showSnackbar(message, { severity: 'error' });
        } else {
          showSnackbar((error as Error).message, { severity: 'error' });
        }
      }
    },
    [product, productInfos, createProductWithInfos, showSnackbar]
  );

  const handleDeleteCategory = useCallback(async () => {
    if (!categoryToDelete) return;
    try {
      await deleteCategory(categoryToDelete.id);
      setIsDeleteCategoryModalOpen(false);
      setCategoryToDelete(null);
      showSnackbar('Category deleted successfully', { severity: 'success' });
    } catch (error) {
      const message = (error as Error).message;
      showSnackbar(message, { severity: 'error' });
    }
  }, [categoryToDelete, deleteCategory, showSnackbar]);

  const handleOpenDeleteCategoryModal = useCallback(
    (category: { id: number; name: string }) => {
      setCategoryToDelete(category);
      setIsDeleteCategoryModalOpen(true);
    },
    []
  );

  const handleCloseDeleteCategoryModal = useCallback(() => {
    setIsDeleteCategoryModalOpen(false);
    setCategoryToDelete(null);
  }, []);

  const handleRequestRemoveSelectedImage = useCallback(
    (infoIdx: number, imageIdx: number) => {
      setDeleteImageModal({
        open: true,
        infoIdx,
        imageIdx,
        imageType: 'preview',
      });
    },
    []
  );

  const handleRequestRemoveUploadedImage = useCallback(
    (infoIdx: number, imageIdx: number) => {
      setDeleteImageModal({
        open: true,
        infoIdx,
        imageIdx,
        imageType: 'uploaded',
      });
    },
    []
  );

  const handleConfirmDeleteImage = useCallback(() => {
    if (
      deleteImageModal.infoIdx === null ||
      deleteImageModal.imageIdx === null ||
      !deleteImageModal.imageType
    ) {
      setDeleteImageModal({
        open: false,
        infoIdx: null,
        imageIdx: null,
        imageType: null,
      });
      return;
    }
    if (deleteImageModal.imageType === 'preview') {
      handleRemoveSelectedImage(
        deleteImageModal.infoIdx,
        deleteImageModal.imageIdx
      );
    } else if (deleteImageModal.imageType === 'uploaded') {
      handleRemoveUploadedImage(
        deleteImageModal.infoIdx,
        deleteImageModal.imageIdx
      );
    }
    setDeleteImageModal({
      open: false,
      infoIdx: null,
      imageIdx: null,
      imageType: null,
    });
  }, [deleteImageModal, handleRemoveSelectedImage, handleRemoveUploadedImage]);

  const handleCloseDeleteImageModal = useCallback(() => {
    setDeleteImageModal({
      open: false,
      infoIdx: null,
      imageIdx: null,
      imageType: null,
    });
  }, []);

  const handleOpenEditColorModal = useCallback(
    (color: KickzoneGraphqlTypes.Color) => {
      setSelectedColor(color);
      setIsEditColorModalOpen(true);
    },
    []
  );

  const handleCloseColorModal = useCallback(() => {
    setIsNewColorModalOpen(false);
    setIsEditColorModalOpen(false);
    setSelectedColor(null);
  }, []);

  const handleSaveColor = useCallback(
    async (id: number | null, name: string, hexCode: string) => {
      try {
        if (id) {
          await updateColor(id, name, hexCode);
          showSnackbar('Color updated successfully', { severity: 'success' });
        } else {
          await createColor(name, hexCode);
          showSnackbar('Color created successfully', { severity: 'success' });
        }
        handleCloseColorModal();
      } catch (error) {
        showSnackbar((error as Error).message, { severity: 'error' });
      }
    },
    [createColor, updateColor, showSnackbar, handleCloseColorModal]
  );

  const handleDeleteColor = useCallback(async () => {
    if (!colorToDelete) return;
    try {
      await deleteColor(colorToDelete.id);
      setIsDeleteColorModalOpen(false);
      setColorToDelete(null);
      showSnackbar('Color deleted successfully', { severity: 'success' });
    } catch (error) {
      showSnackbar((error as Error).message, { severity: 'error' });
    }
  }, [colorToDelete, deleteColor, showSnackbar]);

  const handleOpenDeleteColorModal = useCallback(
    (color: { id: number; name: string }) => {
      setColorToDelete(color);
      setIsDeleteColorModalOpen(true);
    },
    []
  );

  const handleCloseDeleteColorModal = useCallback(() => {
    setIsDeleteColorModalOpen(false);
    setColorToDelete(null);
  }, []);

  return (
    <AdminsLayout>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2, height: '100%' }}>
        <Typography variant="h5" sx={{ mb: 3, color: colors.text }}>
          Add/Edit Product
        </Typography>
        <form aria-label="Product Editor Form" onSubmit={handleSubmit}>
          <Grid2 container spacing={3} sx={{ height: '100%' }}>
            {/* Left Side - Basic Product Info */}
            <Grid2
              size={{ xs: 12, md: 6 }}
              sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
            >
              <TextField
                id="product-name"
                slotProps={{
                  input: { 'aria-label': 'Product Name' },
                }}
                fullWidth
                label="Product Name"
                name="name"
                value={product.name}
                onChange={handleProductChange}
                required
              />
              <Box>
                <Autocomplete
                  multiple
                  id="categories-autocomplete"
                  options={categories || []}
                  getOptionLabel={(option) => option.name}
                  value={
                    categories?.filter((cat) =>
                      product.categoryIds.includes(cat.id)
                    ) || []
                  }
                  onChange={(_e, newValue) =>
                    setProduct((prev) => ({
                      ...prev,
                      categoryIds: newValue.map((category) => category.id),
                    }))
                  }
                  loading={categoriesLoading}
                  renderOption={(props, option) => {
                    const { key, ...otherProps } = props;
                    return (
                      <li key={key} {...otherProps}>
                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            width: '100%',
                            alignItems: 'center',
                          }}
                        >
                          {option.name}
                          <Box>
                            <IconButton
                              size="small"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedCategory(option);
                                setIsEditCategoryModalOpen(true);
                              }}
                            >
                              <EditIcon fontSize="small" />
                            </IconButton>
                            <IconButton
                              size="small"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleOpenDeleteCategoryModal(option);
                              }}
                              color="error"
                            >
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </Box>
                        </Box>
                      </li>
                    );
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Category"
                      slotProps={{
                        input: {
                          ...params.InputProps,
                          'aria-label': 'Category',
                          endAdornment: (
                            <>
                              {params.InputProps?.endAdornment}
                              <IconButton
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setIsNewCategoryModalOpen(true);
                                }}
                                size="small"
                                sx={{ ml: 1 }}
                                aria-label="Add new category"
                              >
                                <AddIcon />
                              </IconButton>
                            </>
                          ),
                        },
                      }}
                    />
                  )}
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
                  filterSelectedOptions
                  openOnFocus
                />
              </Box>
              <Box sx={{ mt: 2 }}>
                <TextField
                  id="product-description"
                  label="Description"
                  name="description"
                  value={product.description || ''}
                  onChange={handleProductChange}
                  fullWidth
                  multiline
                  minRows={3}
                  maxRows={8}
                  sx={{ mb: 2 }}
                />
              </Box>
              <Box sx={{ mt: 2 }}>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Colors
                </Typography>
                <Button
                  variant="outlined"
                  startIcon={<AddIcon />}
                  onClick={() => setIsNewColorModalOpen(true)}
                  sx={{ mb: 2 }}
                  disabled={colorMutationsLoading}
                >
                  Add New Color
                </Button>
                <Box>
                  {availableColors.map((color: KickzoneGraphqlTypes.Color) => (
                    <Box
                      key={color.id}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        p: 1,
                        borderBottom: '1px solid #eee',
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box
                          sx={{
                            width: 20,
                            height: 20,
                            backgroundColor: color.hexCode,
                            mr: 1,
                            border: '1px solid #ccc',
                          }}
                        ></Box>
                        <Typography>{color.name}</Typography>
                      </Box>
                      <Box>
                        <IconButton
                          size="small"
                          onClick={() => handleOpenEditColorModal(color)}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => handleOpenDeleteColorModal(color)}
                          color="error"
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Grid2>
            {/* Right Side - ProductInfos Section */}
            <Grid2 size={{ xs: 12, md: 6 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Product Variants
              </Typography>
              {productInfos.map((info, idx) => (
                <ProductInfoCard
                  key={idx}
                  info={info}
                  idx={idx}
                  onChange={handleProductInfoChange}
                  onColorChange={(
                    idx,
                    color: KickzoneGraphqlTypes.Color | null
                  ) =>
                    setProductInfos((prev) => {
                      const updated = [...prev];
                      updated[idx] = { ...updated[idx], color };
                      return updated;
                    })
                  }
                  availableColors={availableColors || []}
                  onImageUpload={handleImageSelection}
                  onRemove={handleRemoveProductInfo}
                  onRemoveImage={handleRequestRemoveUploadedImage}
                  disableRemove={productInfos.length === 1}
                  onRemoveSelectedImage={handleRequestRemoveSelectedImage}
                  onUploadSelectedImages={handleUploadSelectedImages}
                />
              ))}
              <Button
                variant="outlined"
                startIcon={<AddIcon />}
                onClick={handleAddProductInfo}
                sx={{ mt: 2 }}
                disabled={isCreatingProduct}
                fullWidth={isMobile}
              >
                Add Variant
              </Button>
            </Grid2>
            {/* Save Button */}
            <Grid2 size={12} sx={{ mt: 'auto' }}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: { xs: 'stretch', md: 'flex-end' },
                }}
              >
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    backgroundColor: colors.main,
                    '&:hover': { backgroundColor: colors.hoverMain },
                  }}
                  loading={isCreatingProduct}
                  fullWidth={isMobile}
                >
                  Save Product
                </Button>
              </Box>
            </Grid2>
          </Grid2>
        </form>
      </Paper>
      <CategoryModal
        open={isNewCategoryModalOpen}
        onClose={() => setIsNewCategoryModalOpen(false)}
        onSubmit={async (name) => {
          try {
            await createCategory(name);
            setIsNewCategoryModalOpen(false);
          } catch (error) {
            const message = (error as Error).message;
            if (message.includes('already exists')) {
              showSnackbar(message, { severity: 'error' });
            } else {
              showSnackbar((error as Error).message, { severity: 'error' });
            }
          }
        }}
        title="Add New Category"
        isLoading={isCreatingCategory}
      />
      <CategoryModal
        open={isEditCategoryModalOpen}
        onClose={() => {
          setIsEditCategoryModalOpen(false);
          setSelectedCategory(null);
        }}
        onSubmit={async (name) => {
          try {
            if (selectedCategory)
              await updateCategory(selectedCategory.id, name);
            setIsEditCategoryModalOpen(false);
            setSelectedCategory(null);
          } catch (error) {
            const message = (error as Error).message;
            if (message.includes('already exists')) {
              showSnackbar(message, { severity: 'error' });
            } else {
              showSnackbar((error as Error).message, { severity: 'error' });
            }
          }
        }}
        initialName={selectedCategory?.name || ''}
        title="Edit Category"
        isLoading={isUpdatingCategory}
      />
      <DeleteCategoryModal
        open={isDeleteCategoryModalOpen}
        onClose={handleCloseDeleteCategoryModal}
        onConfirm={handleDeleteCategory}
        categoryName={categoryToDelete?.name || ''}
        isLoading={isDeletingCategory}
      />
      <DeleteImageModal
        open={deleteImageModal.open}
        onClose={handleCloseDeleteImageModal}
        onConfirm={handleConfirmDeleteImage}
        imageType={
          deleteImageModal.imageType === 'preview' ? 'preview' : 'uploaded'
        }
      />
      <ColorModal
        open={isNewColorModalOpen || isEditColorModalOpen}
        onClose={handleCloseColorModal}
        onSubmit={handleSaveColor}
        initialColor={selectedColor}
        title={selectedColor ? 'Edit Color' : 'Add New Color'}
        isLoading={colorMutationsLoading}
      />
      <DeleteColorModal
        open={isDeleteColorModalOpen}
        onClose={handleCloseDeleteColorModal}
        onConfirm={handleDeleteColor}
        colorName={colorToDelete?.name || ''}
        isLoading={colorMutationsLoading}
      />
    </AdminsLayout>
  );
}

export default AdminProductEditor;
