import type { SxProps, Theme } from '@mui/material/styles';
import type { TextFieldProps } from '@mui/material/TextField';
import Box from '@mui/material/Box';
import DialogContent, {
  type DialogContentProps,
} from '@mui/material/DialogContent';

/** Keep Latin values (email, username, phone, numbers) LTR in RTL locales. */
export const ltrInputSx: SxProps<Theme> = {
  '& .MuiInputBase-input': {
    direction: 'ltr',
    textAlign: 'left',
    unicodeBidi: 'isolate',
  },
};

type Sx = SxProps<Theme> | undefined;

function mergeSx(...parts: Sx[]): SxProps<Theme> {
  const flat = parts.flatMap((part) => {
    if (!part) return [];
    return Array.isArray(part) ? part : [part];
  });
  return flat as SxProps<Theme>;
}

/**
 * Spread onto TextField for values that must stay LTR regardless of UI language.
 */
export function getLtrTextFieldProps(
  extraSx?: SxProps<Theme>
): Pick<TextFieldProps, 'sx' | 'slotProps'> {
  return {
    slotProps: {
      htmlInput: { dir: 'ltr' },
    },
    sx: mergeSx(ltrInputSx, extraSx),
  };
}

/**
 * Dialog body for forms with outlined TextFields.
 * Uses dividers + inner padding so the first field label is not clipped
 * under DialogTitle (MUI sets DialogContent padding-top to 0 after a title).
 */
export function DialogFormContent({
  children,
  sx,
  ...props
}: DialogContentProps) {
  return (
    <DialogContent
      dividers
      {...props}
      sx={mergeSx({ overflowY: 'auto' }, sx)}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          pt: 1,
        }}
      >
        {children}
      </Box>
    </DialogContent>
  );
}
