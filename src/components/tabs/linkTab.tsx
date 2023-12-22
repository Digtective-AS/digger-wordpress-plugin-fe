import {useLocation, useNavigate, useSearchParams} from 'react-router-dom';
import { Tab } from '@mui/material';
import React, {ReactElement, useState} from 'react';
import { Colors } from '../../constants/constants';

interface LinkTabProps {
    id?: string;
    label?: string;
    href?: string;
    icon?: ReactElement;
}

const LinkTab = (props: LinkTabProps) => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    return (
        <Tab
            icon={props?.icon}
            iconPosition="start"
            component="a"
            onClick={(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
                event.preventDefault();
                searchParams.set('page', `digtective-${props.href}` || '');
                navigate(`?${searchParams}`);
            }}
            sx={{
                color: Colors.primary,
                paddingInline: 0.75,
                paddingBlock: 1.5,
                marginTop: 1.5,
                marginRight: '1rem',
                marginLeft: '0.25rem',
                minHeight: '21px',
                height: '21px',
                borderRadius: '8px',
                textTransform: 'none',
                '&.Mui-selected': {
                    fontWeight: '600',
                    color: Colors.primary,
                },
            }}
            {...props}
        />
    );
};

export default LinkTab;
