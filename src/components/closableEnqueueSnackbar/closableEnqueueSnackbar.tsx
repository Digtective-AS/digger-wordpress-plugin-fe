import React from 'react';
import { enqueueSnackbar, closeSnackbar } from 'notistack';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

interface SnackbarVariant {
    default: string;
    error: string;
    success: string;
    warning: string;
    info: string;
}

const debouncedMessages: Set<string> = new Set();
let debounceTimeout: any | null = null;

const closableEnqueueSnackbar = (text: string, variant: keyof SnackbarVariant | undefined) => {
    if (debouncedMessages.has(text)) {
        return;
    }

    debouncedMessages.add(text);

    if (debounceTimeout) {
        clearTimeout(debounceTimeout);
    }

    debounceTimeout = setTimeout(() => {
        debouncedMessages.clear();
        debounceTimeout = null;

        enqueueSnackbar(text, {
            variant,
            action: (key) => (
                <IconButton color="inherit" onClick={() => closeSnackbar(key)}>
                    <CloseIcon />
                </IconButton>
            ),
        });
    }, 100);
};

export default closableEnqueueSnackbar;
