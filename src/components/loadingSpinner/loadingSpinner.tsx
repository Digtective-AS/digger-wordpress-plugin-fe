import React, { FC } from 'react';
import { CircularProgress } from '@mui/material';

interface LoadingSpinnerProps {
    color?: 'primary' | string,
    sx?: any,
    size?: number,
    variant?: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning' | undefined,
    center?: boolean,
}

const LoadingSpinner: FC<LoadingSpinnerProps> = (props) => (
    <div className={`${props.center ? 'h-full w-full flex justify-center items-center' : ''} max-w-[full] max-h-[full]`}>
        <CircularProgress
            color={props.variant}
            sx={props.sx}
            disableShrink
            style={{ color: props.color === 'primary' ? '#0c485e' : `${props.color || 'white'}` }}
            size={props.size}
        />
    </div>
);

export default LoadingSpinner;
