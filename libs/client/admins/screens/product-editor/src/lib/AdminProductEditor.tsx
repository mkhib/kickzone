import { AdminsLayout } from '@kickzone-workspace/admins-layout';
import {
  useCategories,
  useCategoriesQuery,
} from '@kickzone-workspace/categories-hook';
import { KickzoneGraphqlTypes } from '@kickzone-workspace/codegen';
import { colors } from '@kickzone-workspace/colors';
import { useProducts, useProductById } from '@kickzone-workspace/products-hook';
import { useSnackbarContext } from '@kickzone-workspace/snackbar-hook';
import { useI18nContext } from '@kickzone-workspace/shared-i18n';
import { GlassmorphismContainer } from '@kickzone-workspace/glassmorphism-container';
import AddIcon from '@mui/icons-material/Add';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import WarningIcon from '@mui/icons-material/Warning';
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
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import { styled, useTheme } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import React, { useCallback, useEffect, useState } from 'react';
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
  LL: ReturnType<typeof useI18nContext>['LL'];
}

const CategoryModal = ({
  open,
  onClose,
  onSubmit,
  initialName = '',
  title,
  isLoading = false,
  LL,
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
          label={LL.form.categoryName()}
          fullWidth
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{LL.button.cancel()}</Button>
        <Button
          onClick={handleSubmit}
          loading={isLoading}
          variant="contained"
          color="primary"
        >
          {LL.button.save()}
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
  LL: ReturnType<typeof useI18nContext>['LL'];
}

const DeleteCategoryModal = ({
  open,
  onClose,
  onConfirm,
  categoryName,
  isLoading = false,
  LL,
}: DeleteCategoryModalProps) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <WarningIcon color="warning" />
        {LL.categories.deleteCategory()}
      </DialogTitle>
      <DialogContent>
        <Typography>
          {LL.categories.deleteCategoryConfirm({ name: categoryName })}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{LL.button.cancel()}</Button>
        <Button
          onClick={onConfirm}
          loading={isLoading}
          variant="contained"
          color="error"
        >
          {LL.button.delete()}
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
  isLoading?: boolean;
}

const DeleteImageModal = ({
  open,
  onClose,
  onConfirm,
  imageType,
  isLoading = false,
  LL,
}: DeleteImageModalProps & { LL: ReturnType<typeof useI18nContext>['LL'] }) => (
  <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
    <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <WarningIcon color="warning" />
      {LL.modal.deleteImage()}
    </DialogTitle>
    <DialogContent>
      <Typography>
        {LL.modal.deleteImageConfirm({
          imageType:
            imageType === 'preview'
              ? LL.products.selectedImage()
              : LL.products.uploadedImage(),
        })}
      </Typography>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose} disabled={isLoading}>
        {LL.button.cancel()}
      </Button>
      <Button
        onClick={onConfirm}
        variant="contained"
        color="error"
        disabled={isLoading}
      >
        {isLoading ? LL.status.deleting() : LL.button.delete()}
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
  color: KickzoneGraphqlTypes.Color | null;
  weight: number;
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
  onRemove: (idx: number) => void;
  onRemoveImage: (infoIdx: number, imageIdx: number) => void;
  disableRemove: boolean;
  onUploadSelectedImages: (infoIdx: number) => void;
  setProductInfos: React.Dispatch<React.SetStateAction<ProductInfoState[]>>;
}

const ProductInfoCard = React.memo(
  ({
    info,
    idx,
    onChange,
    onColorChange,
    availableColors,
    onRemove,
    onRemoveImage,
    disableRemove,
    onUploadSelectedImages,
    setProductInfos,
    LL,
  }: ProductInfoCardProps & {
    LL: ReturnType<typeof useI18nContext>['LL'];
  }) => {
    // Only allow image selection when editing (product info is already created)
    const isSelectImagesDisabled = info.isUploading || !info.createdId;
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
      >
        {info.isUploading ? LL.status.uploading() : LL.products.selectImages()}
        <VisuallyHiddenInput
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => {
            const files = Array.from(e.target.files || []);
            if (files.length > 0) {
              // Create preview URLs for selected files
              const newImagePreviews = files.map((file) => ({
                file,
                url: URL.createObjectURL(file),
              }));

              // Update the product info state with new images
              setProductInfos((prev) => {
                const updated = [...prev];
                updated[idx].newImages = [...updated[idx].newImages, ...files];
                updated[idx].newImagePreviews = [
                  ...updated[idx].newImagePreviews,
                  ...newImagePreviews,
                ];
                return updated;
              });
            }
            // Reset the value so the same file can be selected again
            e.target.value = '';
          }}
          disabled={isSelectImagesDisabled}
        />
      </Button>
    );
    return (
      <Paper
        elevation={0}
        sx={{
          mb: 2,
          p: 2,
          position: 'relative',
          backgroundColor: 'transparent !important',
          backdropFilter: 'none !important',
          WebkitBackdropFilter: 'none !important',
          border: '2px solid rgba(255, 255, 255, 0.4) !important',
          borderRadius: '16px !important',
          boxShadow: 'none !important',
        }}
      >
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
              <TextField {...params} label={LL.form.color()} required />
            )}
            sx={{ minWidth: 120, width: '100%', mb: { xs: 2, md: 0 } }}
          />
          <TextField
            label={LL.products.size()}
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
            label={LL.products.weight()}
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
        </Box>
        <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
          {info.createdId && uploadButton}
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
                {LL.products.selectedImagesNotUploaded()}
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
                        onClick={() => onRemoveImage(idx, imageIdx)}
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
                onClick={() => {
                  onUploadSelectedImages(idx);
                }}
                disabled={
                  info.isUploading ||
                  info.newImages.length === 0 ||
                  !info.createdId
                }
              >
                {info.isUploading
                  ? LL.status.uploading()
                  : LL.products.uploadImages()}
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
                {LL.products.uploadedImages()}
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
                          onClick={() =>
                            onRemoveImage(
                              idx,
                              info.newImagePreviews.length + imageIdx
                            )
                          }
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
  LL: ReturnType<typeof useI18nContext>['LL'];
}

const ColorModal = ({
  open,
  onClose,
  onSubmit,
  initialColor = null,
  title,
  isLoading = false,
  LL,
}: ColorModalProps) => {
  const [colorName, setColorName] = useState(initialColor?.name || '');
  const [hexCode, setHexCode] = useState(initialColor?.hexCode || '#ffffff');

  useEffect(() => {
    setColorName(initialColor?.name || '');
    setHexCode(initialColor?.hexCode || '#ffffff');
  }, [initialColor]);

  const handleSubmit = useCallback(() => {
    onSubmit(initialColor?.id || null, colorName, hexCode);
    // Reset fields for new colors (when initialColor is null)
    if (!initialColor) {
      setColorName('');
      setHexCode('#ffffff');
    }
    onClose();
  }, [initialColor, colorName, hexCode, onSubmit, onClose]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label={LL.colorManagement.colorName()}
          fullWidth
          value={colorName}
          onChange={(e) => setColorName(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          margin="dense"
          label={LL.colorManagement.hexCode()}
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
        <Button onClick={onClose}>{LL.button.cancel()}</Button>
        <Button
          onClick={handleSubmit}
          disabled={isLoading}
          variant="contained"
          color="primary"
        >
          {LL.button.save()}
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
  LL: ReturnType<typeof useI18nContext>['LL'];
}

const DeleteColorModal = ({
  open,
  onClose,
  onConfirm,
  colorName,
  isLoading = false,
  LL,
}: DeleteColorModalProps) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <WarningIcon color="warning" />
        {LL.colorManagement.deleteColor()}
      </DialogTitle>
      <DialogContent>
        <Typography>
          {LL.colorManagement.deleteColorConfirm({ name: colorName })}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{LL.button.cancel()}</Button>
        <Button
          onClick={onConfirm}
          loading={isLoading}
          variant="contained"
          color="error"
        >
          {LL.button.delete()}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export function AdminProductEditor() {
  const { LL } = useI18nContext();
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
      color: null, // Initialize color as null
      weight: 0,
      images: [],
      imagePreviews: [],
      uploadedImageUrls: [],
      createdId: null,
      isUploading: false,
      newImages: [],
      newImagePreviews: [],
    },
  ]);

  const [, setCreatedProductInfoIds] = useState<(number | null)[]>([null]);

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
    isLoading: boolean;
  }>({
    open: false,
    infoIdx: null,
    imageIdx: null,
    imageType: null,
    isLoading: false,
  });

  const [isNewColorModalOpen, setIsNewColorModalOpen] = useState(false);
  const [isEditColorModalOpen, setIsEditColorModalOpen] = useState(false);
  const [selectedColor, setSelectedColor] =
    useState<KickzoneGraphqlTypes.Color | null>(null);

  const [isDeleteColorModalOpen, setIsDeleteColorModalOpen] = useState(false);
  const [colorToDelete, setColorToDelete] = useState<{
    id: number;
    name: string;
  } | null>(null);

  const { categories, getCategoriesLoading } = useCategoriesQuery();
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
    updateProduct,
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
          color: info.color || null,
          weight: info.weight,
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
  }, [
    productIdNum,
    loadedProduct?.id,
    loadedProduct?.name,
    loadedProduct?.description,
    loadedProduct?.categories,
    loadedProduct?.productInfos,
    loadedProduct,
  ]);

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
        color: null,
        weight: 0,
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
          if (!info.size || !info.color || !info.weight) {
            showSnackbar('Please fill in all product variant fields', {
              severity: 'error',
            });
            return;
          }
        }
        if (productIdNum) {
          // Editing existing product
          await updateProduct({
            id: productIdNum,
            name: product.name,
            categoryIds: product.categoryIds,
            description:
              product.description === '' ? null : product.description,
          });
          showSnackbar('Product updated successfully', { severity: 'success' });
        } else {
          // Create product and all product infos
          const created = await createProductWithInfos(
            {
              name: product.name,
              categoryIds: product.categoryIds,
              description:
                product.description === '' ? null : product.description,
            },
            productInfos.map((info) => ({
              size: info.size,
              colorId: info.color?.id || 0,
              weight: Number(info.weight),
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
          // Reset form to initial state
          setProduct({
            name: '',
            categoryIds: [],
            description: '',
          });
          setProductInfos([
            {
              productId: 0,
              size: '',
              color: null,
              weight: 0,
              images: [],
              imagePreviews: [],
              uploadedImageUrls: [],
              createdId: null,
              isUploading: false,
              newImages: [],
              newImagePreviews: [],
            },
          ]);
          setCreatedProductInfoIds([null]);
        }
      } catch (error) {
        const message = (error as Error).message;
        if (message.includes('already exists')) {
          showSnackbar(message, { severity: 'error' });
        } else {
          showSnackbar((error as Error).message, { severity: 'error' });
        }
      }
    },
    [
      product,
      productInfos,
      createProductWithInfos,
      updateProduct,
      showSnackbar,
      productIdNum,
    ]
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

  const handleRemoveSelectedImage = useCallback(
    (infoIdx: number, imageIdx: number) => {
      setProductInfos((prev) => {
        const updated = [...prev];
        updated[infoIdx].newImages.splice(imageIdx, 1);
        updated[infoIdx].newImagePreviews.splice(imageIdx, 1);
        return updated;
      });
    },
    []
  );

  const handleConfirmDeleteImage = useCallback(async () => {
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
        isLoading: false,
      });
      return;
    }

    // Set loading state
    setDeleteImageModal((prev) => ({ ...prev, isLoading: true }));

    const { infoIdx, imageIdx, imageType } = deleteImageModal;

    if (imageType === 'preview') {
      // Remove selected image (not yet uploaded)
      handleRemoveSelectedImage(infoIdx, imageIdx);
      setDeleteImageModal({
        open: false,
        infoIdx: null,
        imageIdx: null,
        imageType: null,
        isLoading: false,
      });
    } else if (imageType === 'uploaded') {
      // Remove uploaded image from server
      const info = productInfos[infoIdx];
      if (!info.createdId || !info.uploadedImageUrls[imageIdx]) {
        setDeleteImageModal({
          open: false,
          infoIdx: null,
          imageIdx: null,
          imageType: null,
          isLoading: false,
        });
        return;
      }

      const imageUrl = info.uploadedImageUrls[imageIdx];
      const imageName = imageUrl.split('/').pop();
      if (!imageName) {
        setDeleteImageModal({
          open: false,
          infoIdx: null,
          imageIdx: null,
          imageType: null,
          isLoading: false,
        });
        return;
      }

      try {
        await removeProductInfoImage(info.createdId, imageName);

        // Update local state immediately
        setProductInfos((prev) => {
          const updated = [...prev];
          updated[infoIdx].uploadedImageUrls.splice(imageIdx, 1);
          return updated;
        });

        showSnackbar('Image removed successfully', { severity: 'success' });
      } catch (error) {
        showSnackbar((error as Error).message, { severity: 'error' });
      } finally {
        setDeleteImageModal({
          open: false,
          infoIdx: null,
          imageIdx: null,
          imageType: null,
          isLoading: false,
        });
      }
    }
  }, [
    deleteImageModal,
    handleRemoveSelectedImage,
    removeProductInfoImage,
    productInfos,
    showSnackbar,
  ]);

  const handleCloseDeleteImageModal = useCallback(() => {
    setDeleteImageModal({
      open: false,
      infoIdx: null,
      imageIdx: null,
      imageType: null,
      isLoading: false,
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

  const handleUploadSelectedImages = useCallback(
    async (infoIdx: number) => {
      console.log(
        '🚀 handleUploadSelectedImages called with infoIdx:',
        infoIdx
      );
      console.log('🔍 Function called from:', new Error().stack);
      const info = productInfos[infoIdx];
      console.log('📋 Current info state:', info);
      console.log('📁 New images count:', info.newImages.length);
      console.log('🆔 Created ID:', info.createdId);

      if (!info.newImages.length || !info.createdId) {
        console.log('❌ Early return - no images or no createdId');
        return;
      }

      console.log('⏳ Setting uploading state to true');
      setProductInfos((prev) => {
        const updated = [...prev];
        updated[infoIdx].isUploading = true;
        console.log('📝 Updated state - isUploading set to true');
        return updated;
      });

      try {
        console.log('📤 Calling uploadProductInfoImages with:', {
          productInfoId: info.createdId,
          filesCount: info.newImages.length,
          fileNames: info.newImages.map((f) => f.name),
        });

        const uploadedImages = await uploadProductInfoImages(
          info.createdId,
          info.newImages
        );
        console.log('✅ Upload successful, received images:', uploadedImages);

        // Update local state immediately with the uploaded images
        console.log('🔄 Updating local state with uploaded images');
        setProductInfos((prev) => {
          console.log('📊 Previous state before update:', prev[infoIdx]);
          const updated = [...prev];
          updated[infoIdx].newImages = [];
          updated[infoIdx].newImagePreviews = [];
          updated[infoIdx].isUploading = false;
          // Add the newly uploaded images to the uploadedImageUrls array
          if (uploadedImages && uploadedImages.length > 0) {
            console.log(
              '➕ Adding uploaded images to uploadedImageUrls:',
              uploadedImages
            );
            updated[infoIdx].uploadedImageUrls = [
              ...updated[infoIdx].uploadedImageUrls,
              ...uploadedImages,
            ];
          }
          console.log('📊 Updated state after change:', updated[infoIdx]);
          return updated;
        });

        console.log('✅ Upload complete - showing success message');
        showSnackbar('Images uploaded successfully', { severity: 'success' });
      } catch (error) {
        console.error('❌ Upload failed:', error);
        setProductInfos((prev) => {
          const updated = [...prev];
          updated[infoIdx].isUploading = false;
          return updated;
        });
        showSnackbar((error as Error).message, { severity: 'error' });
      }
    },
    [productInfos, uploadProductInfoImages, showSnackbar]
  );

  return (
    <AdminsLayout>
      <GlassmorphismContainer>
        <Typography variant="h5" sx={{ mb: 3, color: colors.text }}>
          {productIdNum ? LL.products.editProduct() : LL.products.addProduct()}
        </Typography>
        <form aria-label="Product Editor Form" onSubmit={handleSubmit}>
          <Grid container spacing={3} sx={{ height: '100%' }}>
            {/* Left Side - Basic Product Info */}
            <Grid
              size={{ xs: 12, md: 6 }}
              sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
            >
              <TextField
                id="product-name"
                slotProps={{
                  input: { 'aria-label': 'Product Name' },
                }}
                fullWidth
                label={LL.form.productName()}
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
                  loading={getCategoriesLoading}
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
                      label={LL.form.category()}
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
                  label={LL.form.description()}
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
                  {LL.products.colors()}
                </Typography>
                <Button
                  variant="outlined"
                  startIcon={<AddIcon />}
                  onClick={() => setIsNewColorModalOpen(true)}
                  sx={{ mb: 2 }}
                  disabled={colorMutationsLoading}
                >
                  {LL.colorManagement.addNewColor()}
                </Button>
                <Box>
                  {(availableColors as KickzoneGraphqlTypes.Color[])
                    ?.filter(
                      (color): color is KickzoneGraphqlTypes.Color =>
                        color != null
                    )
                    .map((color) => (
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
                          />
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
            </Grid>
            {/* Right Side - ProductInfos Section */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                {LL.products.productVariants()}
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
                  availableColors={
                    (availableColors as KickzoneGraphqlTypes.Color[])?.filter(
                      (color): color is KickzoneGraphqlTypes.Color =>
                        color != null
                    ) || []
                  }
                  onRemove={handleRemoveProductInfo}
                  disableRemove={productInfos.length === 1}
                  onRemoveImage={(infoIdx: number, imageIdx: number) => {
                    const info = productInfos[infoIdx];
                    // Check if it's a selected image (newImagePreviews) or uploaded image (uploadedImageUrls)
                    if (imageIdx < info.newImagePreviews.length) {
                      // It's a selected image - show confirmation modal
                      setDeleteImageModal({
                        open: true,
                        infoIdx,
                        imageIdx,
                        imageType: 'preview',
                        isLoading: false,
                      });
                    } else {
                      // It's an uploaded image - show confirmation modal
                      const actualImageIdx =
                        imageIdx - info.newImagePreviews.length;
                      setDeleteImageModal({
                        open: true,
                        infoIdx,
                        imageIdx: actualImageIdx,
                        imageType: 'uploaded',
                        isLoading: false,
                      });
                    }
                  }}
                  onUploadSelectedImages={handleUploadSelectedImages}
                  setProductInfos={setProductInfos}
                  LL={LL}
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
                {LL.products.addVariant()}
              </Button>
            </Grid>
            {/* Save Button */}
            <Grid size={12} sx={{ mt: 'auto' }}>
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
                    textTransform: 'none',
                  }}
                  loading={isCreatingProduct}
                  fullWidth={isMobile}
                >
                  {LL.products.saveProduct()}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </GlassmorphismContainer>
      <CategoryModal
        open={isNewCategoryModalOpen}
        onClose={() => setIsNewCategoryModalOpen(false)}
        onSubmit={async (name) => {
          try {
            // Convert name to slug (lowercase, replace spaces with hyphens)
            const slug = name.toLowerCase().replace(/\s+/g, '-');
            await createCategory(slug, 0, name);
            setIsNewCategoryModalOpen(false);
            showSnackbar('Category created successfully', {
              severity: 'success',
            });
          } catch (error) {
            const message = (error as Error).message;
            if (message.includes('already exists')) {
              showSnackbar(message, { severity: 'error' });
            } else {
              showSnackbar((error as Error).message, { severity: 'error' });
            }
          }
        }}
        title={LL.categories.addCategory()}
        isLoading={isCreatingCategory}
        LL={LL}
      />
      <CategoryModal
        open={isEditCategoryModalOpen}
        onClose={() => {
          setIsEditCategoryModalOpen(false);
          setSelectedCategory(null);
        }}
        onSubmit={async (name) => {
          try {
            if (selectedCategory) {
              // Convert name to slug (lowercase, replace spaces with hyphens)
              const slug = name.toLowerCase().replace(/\s+/g, '-');
              await updateCategory(selectedCategory.id, slug);
            }
            setIsEditCategoryModalOpen(false);
            setSelectedCategory(null);
            showSnackbar('Category updated successfully', {
              severity: 'success',
            });
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
        title={LL.categories.editCategory()}
        isLoading={isUpdatingCategory}
        LL={LL}
      />
      <DeleteCategoryModal
        open={isDeleteCategoryModalOpen}
        onClose={handleCloseDeleteCategoryModal}
        onConfirm={handleDeleteCategory}
        categoryName={categoryToDelete?.name || ''}
        isLoading={isDeletingCategory}
        LL={LL}
      />
      <DeleteImageModal
        open={deleteImageModal.open}
        onClose={handleCloseDeleteImageModal}
        onConfirm={handleConfirmDeleteImage}
        imageType={
          deleteImageModal.imageType === 'preview' ? 'preview' : 'uploaded'
        }
        isLoading={deleteImageModal.isLoading}
        LL={LL}
      />
      <ColorModal
        open={isNewColorModalOpen || isEditColorModalOpen}
        onClose={handleCloseColorModal}
        onSubmit={handleSaveColor}
        initialColor={selectedColor}
        title={
          selectedColor
            ? LL.colorManagement.editColor()
            : LL.colorManagement.addNewColor()
        }
        isLoading={colorMutationsLoading}
        LL={LL}
      />
      <DeleteColorModal
        open={isDeleteColorModalOpen}
        onClose={handleCloseDeleteColorModal}
        onConfirm={handleDeleteColor}
        colorName={colorToDelete?.name || ''}
        isLoading={colorMutationsLoading}
        LL={LL}
      />
    </AdminsLayout>
  );
}

export default AdminProductEditor;
