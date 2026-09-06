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
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import { useQuery } from '@apollo/client/react';
import { gql } from '@apollo/client';
import { KickzoneGraphqlTypes } from '@kickzone-workspace/codegen';
import { useSnackbarContext } from '@kickzone-workspace/snackbar-hook';
import { AdminsLayout } from '@kickzone-workspace/admins-layout';
import { GlassmorphismContainer } from '@kickzone-workspace/glassmorphism-container';
import { DialogFormContent } from '@kickzone-workspace/language-components';
import {
  useTranslationsManagement,
  useEntityTranslations,
} from '@kickzone-workspace/translations-management-hook';
import { useI18nContext, usePageTitle } from '@kickzone-workspace/shared-i18n';
import { TranslateToOtherLanguagesButton } from './TranslateToOtherLanguagesButton';

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
  onSaveSuccess?: () => void;
}

function TranslationsModal({
  open,
  onClose,
  entityType,
  entityId,
  entityName,
  onRefetchReady,
  onSaveSuccess,
}: TranslationsModalProps) {
  const { LL } = useI18nContext();
  const { showSnackbar } = useSnackbarContext();
  const { setTranslation } = useTranslationsManagement();
  const { translations, loading, refetch } = useEntityTranslations(
    entityType,
    entityId
  );
  const [editingLocale, setEditingLocale] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');
  const [isSavingTranslation, setIsSavingTranslation] = useState(false);

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
    setIsSavingTranslation(true);
    try {
      await setTranslation(
        entityType,
        entityId,
        editingLocale,
        'name',
        editValue,
        false
      );
      showSnackbar(
        LL.admin.translationManagement.translationSavedSuccessfully(),
        { severity: 'success' }
      );
      setEditingLocale(null);
      setEditValue('');
      // Refetch translations to update the displayed values
      await refetch();
      // Notify parent to refetch main queries
      if (onSaveSuccess) {
        onSaveSuccess();
      }
    } catch {
      showSnackbar(LL.admin.translationManagement.failedToSaveTranslation(), {
        severity: 'error',
      });
    } finally {
      setIsSavingTranslation(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        {LL.admin.translationManagement.translationsFor({
          entityType,
          entityName,
        })}
      </DialogTitle>
      <DialogFormContent>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  {LL.admin.translationManagement.language()}
                </TableCell>
                <TableCell>
                  {LL.admin.translationManagement.translation()}
                </TableCell>
                <TableCell>{LL.table.actions()}</TableCell>
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
                        <Typography>
                          {value ||
                            LL.admin.translationManagement.noTranslation()}
                        </Typography>
                      )}
                    </TableCell>
                    <TableCell>
                      {isEditing ? (
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <Button
                            size="small"
                            onClick={handleSave}
                            variant="contained"
                            loading={isSavingTranslation}
                          >
                            {LL.button.save()}
                          </Button>
                          <Button
                            size="small"
                            onClick={() => setEditingLocale(null)}
                            disabled={isSavingTranslation}
                          >
                            {LL.button.cancel()}
                          </Button>
                        </Box>
                      ) : (
                        <Button
                          size="small"
                          onClick={() => handleEdit(locale, value)}
                        >
                          {LL.button.edit()}
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </DialogFormContent>
      <DialogActions>
        <Button onClick={onClose}>{LL.button.close()}</Button>
      </DialogActions>
    </Dialog>
  );
}

export function AdminTranslationManagement() {
  const { LL } = useI18nContext();
  usePageTitle(() => LL.pageTitles.adminTranslations());
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

  const {
    data: categoriesData,
    loading: categoriesLoading,
    refetch: refetchCategories,
  } = useQuery<Pick<KickzoneGraphqlTypes.Query, 'categories'>>(GET_CATEGORIES);

  const {
    data: colorsData,
    loading: colorsLoading,
    refetch: refetchColors,
  } = useQuery<Pick<KickzoneGraphqlTypes.Query, 'colors'>>(GET_COLORS);

  const handleBulkTranslate = useCallback(
    async (
      entityType: 'category' | 'color',
      entityIds: number[],
      sourceLocale: string,
      targetLocales: string[]
    ) => {
      try {
        await bulkTranslate(entityType, entityIds, sourceLocale, targetLocales);
        showSnackbar(
          LL.admin.translationManagement.bulkTranslationCompletedSuccessfully(),
          {
            severity: 'success',
          }
        );

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
        showSnackbar(LL.admin.translationManagement.bulkTranslationFailed(), {
          severity: 'error',
        });
      }
    },
    [bulkTranslate, showSnackbar, LL.admin.translationManagement]
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
          {LL.admin.translationManagement.title()}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          {LL.admin.translationManagement.description()}
        </Typography>

        <Paper sx={{ width: '100%' }}>
          <Tabs
            value={tabValue}
            onChange={(_, newValue) => setTabValue(newValue)}
            aria-label="translation tabs"
          >
            <Tab label={LL.admin.translationManagement.categories()} />
            <Tab label={LL.admin.translationManagement.colors()} />
          </Tabs>

          <TabPanel value={tabValue} index={0}>
            <Typography variant="h6" gutterBottom>
              {LL.admin.translationManagement.categoryTranslations()}
            </Typography>
            {categoriesLoading ? (
              <Typography>{LL.table.loadingCategories()}</Typography>
            ) : (
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>{LL.table.categoryEnglish()}</TableCell>
                      <TableCell>{LL.table.slug()}</TableCell>
                      <TableCell>{LL.table.status()}</TableCell>
                      <TableCell>{LL.table.view()}</TableCell>
                      <TableCell>{LL.table.actions()}</TableCell>
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
                            label={
                              category?.isActive
                                ? LL.table.active()
                                : LL.table.inactive()
                            }
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
                          <TranslateToOtherLanguagesButton
                            onClick={() =>
                              category?.id &&
                              handleBulkTranslate(
                                'category',
                                [category.id],
                                'en',
                                ['fa', 'ar']
                              )
                            }
                          />
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
              {LL.admin.translationManagement.colorTranslations()}
            </Typography>
            {colorsLoading ? (
              <Typography>
                {LL.admin.translationManagement.loadingColors()}
              </Typography>
            ) : (
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        {LL.admin.translationManagement.colorEnglish()}
                      </TableCell>
                      <TableCell>
                        {LL.admin.translationManagement.hexCode()}
                      </TableCell>
                      <TableCell>{LL.table.status()}</TableCell>
                      <TableCell>{LL.table.view()}</TableCell>
                      <TableCell>{LL.table.actions()}</TableCell>
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
                            label={
                              color?.isActive
                                ? LL.table.active()
                                : LL.table.inactive()
                            }
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
                          <TranslateToOtherLanguagesButton
                            onClick={() =>
                              color?.id &&
                              handleBulkTranslate('color', [color.id], 'en', [
                                'fa',
                                'ar',
                              ])
                            }
                          />
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
            onSaveSuccess={() => {
              // Refetch categories/colors to update the main table
              if (translationsModal.entityType === 'category') {
                refetchCategories();
              } else {
                refetchColors();
              }
            }}
          />
        )}
      </GlassmorphismContainer>
    </AdminsLayout>
  );
}
