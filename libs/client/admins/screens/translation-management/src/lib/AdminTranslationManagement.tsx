import * as React from 'react';
import { useState, useCallback } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
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
import VisibilityIcon from '@mui/icons-material/Visibility';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import { useQuery } from '@apollo/client/react';
import { gql } from '@apollo/client';
import { KickzoneGraphqlTypes } from '@kickzone-workspace/codegen';
import { useSnackbarContext } from '@kickzone-workspace/snackbar-hook';
import { AdminsLayout } from '@kickzone-workspace/admins-layout';
import { GlassmorphismContainer } from '@kickzone-workspace/glassmorphism-container';
import {
  useTranslationsManagement,
  useEntityTranslations,
} from '@kickzone-workspace/translations-management-hook';

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

interface TranslationsModalProps {
  open: boolean;
  onClose: () => void;
  entityType: 'category' | 'color';
  entityId: number;
  entityName: string;
  onRefetchReady?: (refetch: () => void) => void;
}

function TranslationsModal({
  open,
  onClose,
  entityType,
  entityId,
  entityName,
  onRefetchReady,
}: TranslationsModalProps) {
  const { showSnackbar } = useSnackbarContext();
  const { setTranslation } = useTranslationsManagement();
  const { translations, loading, refetch } = useEntityTranslations(
    entityType,
    entityId
  );
  const [editingLocale, setEditingLocale] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');

  // Expose refetch function to parent component
  React.useEffect(() => {
    if (onRefetchReady && refetch) {
      onRefetchReady(refetch);
    }
  }, [onRefetchReady, refetch]);

  const locales = ['en', 'fa', 'ar'];
  const localeNames = {
    en: 'English',
    fa: 'Farsi (فارسی)',
    ar: 'Arabic (العربية)',
  };

  const handleEdit = (locale: string, currentValue: string) => {
    setEditingLocale(locale);
    setEditValue(currentValue);
  };

  const handleSave = async () => {
    if (!editingLocale) return;
    try {
      await setTranslation(
        entityType,
        entityId,
        editingLocale,
        'name',
        editValue,
        false
      );
      showSnackbar('Translation saved successfully', { severity: 'success' });
      setEditingLocale(null);
      setEditValue('');
    } catch {
      showSnackbar('Failed to save translation', { severity: 'error' });
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        Translations for {entityType}: {entityName}
      </DialogTitle>
      <DialogContent>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Language</TableCell>
                <TableCell>Translation</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {locales.map((locale) => {
                const value = translations.get(locale) || '';
                const isEditing = editingLocale === locale;
                return (
                  <TableRow key={locale}>
                    <TableCell>
                      <Typography fontWeight="bold">
                        {localeNames[locale as keyof typeof localeNames]}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      {isEditing ? (
                        <TextField
                          fullWidth
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          autoFocus
                        />
                      ) : (
                        <Typography>{value || 'No translation'}</Typography>
                      )}
                    </TableCell>
                    <TableCell>
                      {isEditing ? (
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <Button
                            size="small"
                            onClick={handleSave}
                            variant="contained"
                          >
                            Save
                          </Button>
                          <Button
                            size="small"
                            onClick={() => setEditingLocale(null)}
                          >
                            Cancel
                          </Button>
                        </Box>
                      ) : (
                        <Button
                          size="small"
                          onClick={() => handleEdit(locale, value)}
                        >
                          Edit
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}

export function AdminTranslationManagement() {
  const { showSnackbar } = useSnackbarContext();
  const { bulkTranslate } = useTranslationsManagement();
  const [tabValue, setTabValue] = useState(0);
  const [translationsModal, setTranslationsModal] = useState<{
    open: boolean;
    entityType: 'category' | 'color';
    entityId: number;
    entityName: string;
  } | null>(null);
  const translationsRefetchRef = React.useRef<Map<string, () => void>>(
    new Map()
  );

  const { data: categoriesData, loading: categoriesLoading } =
    useQuery<Pick<KickzoneGraphqlTypes.Query, 'categories'>>(GET_CATEGORIES);

  const { data: colorsData, loading: colorsLoading } =
    useQuery<Pick<KickzoneGraphqlTypes.Query, 'colors'>>(GET_COLORS);

  const handleBulkTranslate = useCallback(
    async (
      entityType: 'category' | 'color',
      entityIds: number[],
      sourceLocale: string,
      targetLocales: string[]
    ) => {
      try {
        await bulkTranslate(entityType, entityIds, sourceLocale, targetLocales);
        showSnackbar('Bulk translation completed successfully', {
          severity: 'success',
        });

        // Refetch translations for the affected entities
        entityIds.forEach((entityId) => {
          const key = `${entityType}:${entityId}`;
          const refetch = translationsRefetchRef.current.get(key);
          if (refetch) {
            refetch();
          }
        });
      } catch (err) {
        console.error('Bulk translation failed:', err);
        showSnackbar('Bulk translation failed', { severity: 'error' });
      }
    },
    [bulkTranslate, showSnackbar]
  );

  const handleRefetchReady = useCallback(
    (entityType: string, entityId: number, refetch: () => void) => {
      const key = `${entityType}:${entityId}`;
      translationsRefetchRef.current.set(key, refetch);
    },
    []
  );

  return (
    <AdminsLayout>
      <GlassmorphismContainer fullHeight>
        <Typography variant="h4" gutterBottom>
          Translation Management
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Manage translations for categories and colors. Click "Auto-translate"
          to automatically generate translations.
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
                      <TableCell>Category (English)</TableCell>
                      <TableCell>Slug</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>View</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {categoriesData?.categories?.map((category) => (
                      <TableRow key={category?.id}>
                        <TableCell>
                          <Typography>{category?.name}</Typography>
                        </TableCell>
                        <TableCell>{category?.slug}</TableCell>
                        <TableCell>
                          <Chip
                            label={category?.isActive ? 'Active' : 'Inactive'}
                            color={category?.isActive ? 'success' : 'default'}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          <IconButton
                            size="small"
                            onClick={() =>
                              category?.id &&
                              setTranslationsModal({
                                open: true,
                                entityType: 'category',
                                entityId: category.id,
                                entityName: category.name,
                              })
                            }
                          >
                            <VisibilityIcon />
                          </IconButton>
                        </TableCell>
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
                                ['fa', 'ar']
                              )
                            }
                          >
                            Translate to Other Languages
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
                      <TableCell>Color (English)</TableCell>
                      <TableCell>Hex Code</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>View</TableCell>
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
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Typography fontFamily="monospace">
                            {color?.hexCode}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={color?.isActive ? 'Active' : 'Inactive'}
                            color={color?.isActive ? 'success' : 'default'}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          <IconButton
                            size="small"
                            onClick={() =>
                              color?.id &&
                              setTranslationsModal({
                                open: true,
                                entityType: 'color',
                                entityId: color.id,
                                entityName: color.name,
                              })
                            }
                          >
                            <VisibilityIcon />
                          </IconButton>
                        </TableCell>
                        <TableCell>
                          <Button
                            size="small"
                            variant="outlined"
                            onClick={() =>
                              color?.id &&
                              handleBulkTranslate('color', [color.id], 'en', [
                                'fa',
                                'ar',
                              ])
                            }
                          >
                            Translate to Other Languages
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

        {translationsModal && (
          <TranslationsModal
            open={translationsModal.open}
            onClose={() => setTranslationsModal(null)}
            entityType={translationsModal.entityType}
            entityId={translationsModal.entityId}
            entityName={translationsModal.entityName}
            onRefetchReady={(refetch) =>
              handleRefetchReady(
                translationsModal.entityType,
                translationsModal.entityId,
                refetch
              )
            }
          />
        )}
      </GlassmorphismContainer>
    </AdminsLayout>
  );
}
