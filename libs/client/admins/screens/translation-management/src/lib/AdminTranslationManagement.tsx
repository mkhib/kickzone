import * as React from 'react';
import { useState, useCallback } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import { useQuery } from '@apollo/client/react';
import { gql } from '@apollo/client';
import { KickzoneGraphqlTypes } from '@kickzone-workspace/codegen';
import { useSnackbarContext } from '@kickzone-workspace/snackbar-hook';
import { AdminsLayout } from '@kickzone-workspace/admins-layout';
import { useTranslationsManagement } from '@kickzone-workspace/translations-management-hook';

// GraphQL queries
const GET_CATEGORIES = gql`
  query GetCategories {
    categories {
      id
      slug
      sortOrder
      isActive
      name
    }
  }
`;

const GET_COLORS = gql`
  query GetColors {
    colors {
      id
      hexCode
      sortOrder
      isActive
      name
    }
  }
`;

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
      id={`translation-tabpanel-${index}`}
      aria-labelledby={`translation-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

interface EditTranslationDialogProps {
  open: boolean;
  onClose: () => void;
  entityType: 'category' | 'color';
  entityId: number;
  entityName: string;
  locale: string;
  fieldName: string;
  currentValue: string;
  onSave: (value: string) => void;
}

function EditTranslationDialog({
  open,
  onClose,
  entityType,
  entityId,
  locale,
  fieldName,
  currentValue,
  onSave,
}: EditTranslationDialogProps) {
  const [value, setValue] = useState(currentValue);
  const { setTranslation } = useTranslationsManagement();

  const handleSave = useCallback(async () => {
    try {
      await setTranslation(
        entityType,
        entityId,
        locale,
        fieldName,
        value,
        false
      );
      onSave(value);
      onClose();
    } catch (error) {
      console.error('Failed to save translation:', error);
    }
  }, [
    entityType,
    entityId,
    locale,
    fieldName,
    value,
    setTranslation,
    onSave,
    onClose,
  ]);

  React.useEffect(() => {
    setValue(currentValue);
  }, [currentValue]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Edit Translation</DialogTitle>
      <DialogContent>
        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" color="text.secondary">
            Locale: {locale} | Field: {fieldName}
          </Typography>
        </Box>
        <TextField
          autoFocus
          margin="dense"
          label="Translation"
          fullWidth
          multiline
          rows={3}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave} variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export function AdminTranslationManagement() {
  const { showSnackbar } = useSnackbarContext();
  const { bulkTranslate } = useTranslationsManagement();
  const [tabValue, setTabValue] = useState(0);
  const [editDialog, setEditDialog] = useState<{
    open: boolean;
    entityType: 'category' | 'color';
    entityId: number;
    entityName: string;
    locale: string;
    fieldName: string;
    currentValue: string;
  } | null>(null);

  const { data: categoriesData, loading: categoriesLoading } = useQuery<{
    categories: KickzoneGraphqlTypes.Category[];
  }>(GET_CATEGORIES);

  const { data: colorsData, loading: colorsLoading } = useQuery<{
    colors: KickzoneGraphqlTypes.Color[];
  }>(GET_COLORS);

  const handleEditTranslation = useCallback(
    (
      entityType: 'category' | 'color',
      entityId: number,
      entityName: string,
      locale: string,
      fieldName: string,
      currentValue: string
    ) => {
      setEditDialog({
        open: true,
        entityType,
        entityId,
        entityName,
        locale,
        fieldName,
        currentValue,
      });
    },
    []
  );

  const handleCloseEditDialog = useCallback(() => {
    setEditDialog(null);
  }, []);

  const handleSaveTranslation = useCallback(
    (value: string) => {
      showSnackbar('Translation saved successfully', { severity: 'success' });
    },
    [showSnackbar]
  );

  const handleBulkTranslate = useCallback(
    async (
      entityType: 'category' | 'color',
      entityIds: number[],
      sourceLocale: string,
      targetLocales: string[]
    ) => {
      try {
        await bulkTranslate(entityType, entityIds, sourceLocale, targetLocales);
        showSnackbar('Bulk translation completed', { severity: 'success' });
      } catch (err) {
        console.error('Bulk translation failed:', err);
        showSnackbar('Bulk translation failed', { severity: 'error' });
      }
    },
    [bulkTranslate, showSnackbar]
  );

  const locales = ['en', 'fa', 'ar'];
  const localeNames = {
    en: 'English',
    fa: 'Farsi',
    ar: 'Arabic',
  };

  return (
    <AdminsLayout>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Translation Management
        </Typography>

        <Paper sx={{ width: '100%' }}>
          <Tabs
            value={tabValue}
            onChange={(_, newValue) => setTabValue(newValue)}
            aria-label="translation tabs"
          >
            <Tab label="Categories" />
            <Tab label="Colors" />
          </Tabs>

          <TabPanel value={tabValue} index={0}>
            <Typography variant="h6" gutterBottom>
              Category Translations
            </Typography>
            {categoriesLoading ? (
              <Typography>Loading categories...</Typography>
            ) : (
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Category</TableCell>
                      <TableCell>Slug</TableCell>
                      {locales.map((locale) => (
                        <TableCell key={locale} align="center">
                          {localeNames[locale as keyof typeof localeNames]}
                        </TableCell>
                      ))}
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {categoriesData?.categories?.map((category) => (
                      <TableRow key={category?.id}>
                        <TableCell>
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 1,
                            }}
                          >
                            <Typography>{category?.name}</Typography>
                            <Chip
                              label={category?.isActive ? 'Active' : 'Inactive'}
                              color={category?.isActive ? 'success' : 'default'}
                              size="small"
                            />
                          </Box>
                        </TableCell>
                        <TableCell>{category?.slug}</TableCell>
                        {locales.map((locale) => (
                          <TableCell key={locale} align="center">
                            <Box
                              sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: 1,
                              }}
                            >
                              <Typography variant="body2">
                                {category?.name || 'No translation'}
                              </Typography>
                              <IconButton
                                size="small"
                                onClick={() =>
                                  category?.id &&
                                  handleEditTranslation(
                                    'category',
                                    category.id,
                                    category.slug,
                                    locale,
                                    'name',
                                    category.name || ''
                                  )
                                }
                              >
                                <EditIcon fontSize="small" />
                              </IconButton>
                            </Box>
                          </TableCell>
                        ))}
                        <TableCell>
                          <Button
                            size="small"
                            variant="outlined"
                            onClick={() =>
                              category?.id &&
                              handleBulkTranslate(
                                'category',
                                [category.id],
                                'en',
                                locales.filter((l) => l !== 'en')
                              )
                            }
                          >
                            Auto-translate
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </TabPanel>

          <TabPanel value={tabValue} index={1}>
            <Typography variant="h6" gutterBottom>
              Color Translations
            </Typography>
            {colorsLoading ? (
              <Typography>Loading colors...</Typography>
            ) : (
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Color</TableCell>
                      <TableCell>Hex Code</TableCell>
                      {locales.map((locale) => (
                        <TableCell key={locale} align="center">
                          {localeNames[locale as keyof typeof localeNames]}
                        </TableCell>
                      ))}
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {colorsData?.colors?.map((color) => (
                      <TableRow key={color?.id}>
                        <TableCell>
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 1,
                            }}
                          >
                            <Box
                              sx={{
                                width: 20,
                                height: 20,
                                backgroundColor: color?.hexCode,
                                border: '1px solid #ccc',
                                borderRadius: '4px',
                              }}
                            />
                            <Typography>{color?.name}</Typography>
                            <Chip
                              label={color?.isActive ? 'Active' : 'Inactive'}
                              color={color?.isActive ? 'success' : 'default'}
                              size="small"
                            />
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Typography fontFamily="monospace">
                            {color?.hexCode}
                          </Typography>
                        </TableCell>
                        {locales.map((locale) => (
                          <TableCell key={locale} align="center">
                            <Box
                              sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: 1,
                              }}
                            >
                              <Typography variant="body2">
                                {color?.name || 'No translation'}
                              </Typography>
                              <IconButton
                                size="small"
                                onClick={() =>
                                  color?.id &&
                                  handleEditTranslation(
                                    'color',
                                    color.id,
                                    color.hexCode,
                                    locale,
                                    'name',
                                    color.name || ''
                                  )
                                }
                              >
                                <EditIcon fontSize="small" />
                              </IconButton>
                            </Box>
                          </TableCell>
                        ))}
                        <TableCell>
                          <Button
                            size="small"
                            variant="outlined"
                            onClick={() =>
                              color?.id &&
                              handleBulkTranslate(
                                'color',
                                [color.id],
                                'en',
                                locales.filter((l) => l !== 'en')
                              )
                            }
                          >
                            Auto-translate
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </TabPanel>
        </Paper>

        {editDialog && (
          <EditTranslationDialog
            open={editDialog.open}
            onClose={handleCloseEditDialog}
            entityType={editDialog.entityType}
            entityId={editDialog.entityId}
            entityName={editDialog.entityName}
            locale={editDialog.locale}
            fieldName={editDialog.fieldName}
            currentValue={editDialog.currentValue}
            onSave={handleSaveTranslation}
          />
        )}
      </Box>
    </AdminsLayout>
  );
}
