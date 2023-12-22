import React, { FC, ReactNode } from 'react';
import Dialog from '@mui/material/Dialog';
// import BackIconWhite from '../assets/icons/back-icon-white.svg';
// import BackIconPrimary from '../assets/icons/back-icon-primary.svg';
import { ColorKey, Colors } from '../constants/constants';

const BackIconPrimary = require('../assets/icons/back-icon-primary.svg').default;
const BackIconWhite = require('../assets/icons/back-icon-white.svg').default;


interface BasicDialogProps {
    closeDialog?: () => void,
    open: boolean,
    title: string,
    children: ReactNode;
    allowCloseOnBackdrop?: boolean,
    headerColor?: ColorKey,
    loginStyle?: boolean,
}

const BasicDialog: FC<BasicDialogProps> = (props) => (
    <Dialog
        open={props.open}
        maxWidth="md"
        onClose={(event, reason) => {
            if (!props.allowCloseOnBackdrop && reason === 'backdropClick') {
                return;
            }
            props.closeDialog?.();
        }}
        sx={{
            '& .MuiBackdrop-root': {
                backgroundColor: Colors.primary,
                opacity: '20% !important',
            },
            '& .MuiDialog-paper': {
                borderRadius: '8px',
                minWidth: props.loginStyle ? 505 : 555,
            },
            '@media (max-width: 768px)': {
                '& .MuiDialog-paper': {
                    minWidth: 'unset',
                },
            },
        }}
    >
        <div
            className="flex items-center gap-5 rounded-lg px-[30px] py-[21px]"
            style={{ backgroundColor: props.headerColor ? Colors[props.headerColor] : Colors.gray }}
        >
            {props.headerColor === 'gray' || !props.headerColor ? (
                <>
                    {props.closeDialog && (
                        <button
                            type="button"
                            className="p-1 duration-100 hover:opacity-70 active:opacity-50"
                            onClick={props.closeDialog}
                        >
                            <img src={BackIconPrimary} alt="" />
                        </button>
                    )}
                    <p className="text-primary font-medium text-lg">
                        {props.title}
                    </p>
                </>
            ) : (
                <>
                    {props.closeDialog && (
                        <button
                            type="button"
                            className="p-1 duration-100 hover:opacity-70 active:opacity-50"
                            onClick={props.closeDialog}
                        >
                            <img src={BackIconWhite} alt="" />
                        </button>
                    )}
                    <p className="text-white font-medium text-lg">
                        {props.title}
                    </p>
                </>
            )}
        </div>
        <div className="px-7 py-5">
            {props.children}
        </div>
    </Dialog>
);

export default BasicDialog;
