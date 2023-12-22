import { InputProps, TextField } from '@mui/material';
import React from 'react';

interface TextInputInterface {
    id?: string,
    myKey?: string,
    name: string,
    value: string,
    label: string,
    placeholder: string,
    onChange: (_event: React.ChangeEvent<HTMLInputElement>) => void,
    error?: boolean,
    helperText?: string,
    fullWidth?: boolean,
    style?: React.CSSProperties,
    size?: 'small' | 'medium',
    className?: string,
    disabled?: boolean,
    textEndAdornment?: string,
    endAdornment?: any,
    startAdornment?: any,
    type?: 'text' | 'password' | 'number' | 'search',
    InputProps?: InputProps;
}

const TextInput: React.FC<TextInputInterface> = (props) => (
  <TextField
    id={props.id}
    key={props.myKey}
    name={props.name}
    value={props.value}
    label={props.label}
    type={props.type || 'text'}
    placeholder={props.placeholder}
    onChange={props.onChange}
    error={props.error}
    helperText={props.helperText}
    fullWidth={props.fullWidth}
    size={props.size}
    style={props.style}
    disabled={props.disabled}
    className={props.className}
    sx={{
      '& .MuiFormHelperText-root': {
        transform: 'translateY(0.15rem)',
        lineHeight: '1.28',
      },
      '& .MuiOutlinedInput-root': {
        borderRadius: '8px',
        '& fieldset': {
          borderColor: '#bdbdbd',
        },
        '&:hover fieldset, &.Mui-focused fieldset': {
          borderColor: '#0c485e',
        },
        '& input': {
          color: '#0c485e',
        },
      },
      'input::-webkit-outer-spin-button, input::-webkit-inner-spin-button': {
        WebkitAppearance: 'none',
        margin: 0,
      },
      '& .MuiInputLabel-root': {
        color: '#0c485e',
        fontWeight: '500',

        '&.Mui-focused': {
          color: '#0c485e',
        },
      },
    }}
    InputProps={{
      ...props.InputProps,
      endAdornment: (
        <div>
          {props.textEndAdornment && (
          <span style={{ opacity: '50%', fontSize: '15px' }}>
            {props.textEndAdornment}
          </span>
          )}
          {props.endAdornment && (
            <span>
              {props.endAdornment}
            </span>
          )}
        </div>
      ),
      startAdornment: (
        props.startAdornment && (
          <span className="pr-2">
            {props.startAdornment}
          </span>
        )
      ),
    }}
  />
);

export default TextInput;
