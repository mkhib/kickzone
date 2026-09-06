import { useState } from 'react';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export type PasswordTextFieldProps = Omit<TextFieldProps, 'type'>;

export function PasswordTextField({
  InputProps,
  slotProps,
  sx,
  ...props
}: PasswordTextFieldProps) {
  const [showPassword, setShowPassword] = useState(false);
  const htmlInputSlot =
    slotProps && typeof slotProps === 'object' && 'htmlInput' in slotProps
      ? (slotProps.htmlInput as Record<string, unknown> | undefined)
      : undefined;

  return (
    <TextField
      {...props}
      type={showPassword ? 'text' : 'password'}
      slotProps={{
        ...slotProps,
        htmlInput: {
          ...htmlInputSlot,
          dir: 'ltr',
        },
      }}
      sx={[
        {
          '& .MuiInputBase-input': {
            direction: 'ltr',
            textAlign: 'left',
            unicodeBidi: 'isolate',
          },
        },
        ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
      ]}
      InputProps={{
        ...InputProps,
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label={showPassword ? 'hide password' : 'show password'}
              onClick={() => setShowPassword((prev) => !prev)}
              onMouseDown={(event) => event.preventDefault()}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
}

export default PasswordTextField;
