import React, { FC, useState } from 'react';
import { Box, Tabs } from '@mui/material';
import { TabInterface } from '../../interfaces/simpleTabs.interface';
import { Colors } from '../../constants/constants';
import LinkTab from "./linkTab.tsx";

interface SimpleTabProps {
    tabs: TabInterface[],
    activePanel: number,
    setActivePanel: (value: number) => void,
}

const SimpleTabs: FC<SimpleTabProps> = (props) => {

    const onPanelChange = (_e: React.SyntheticEvent, value: any) => {
        props.setActivePanel(value);
    };

    return (
        <>
            <Box sx={{
                borderBottom: 1,
                borderColor: 'divider',
                height: 44,
                width: '100%',
                paddingLeft: '1.5rem',
            }}
            >
                <Tabs
                    value={props.activePanel}
                    onChange={onPanelChange}
                    aria-label="basic tabs"
                    TabIndicatorProps={{
                        style: {
                            backgroundColor: Colors.primary,
                            height: 3,
                            borderTopLeftRadius: 25,
                            borderTopRightRadius: 25,
                            bottom: 5,
                        },
                    }}
                >
                    {props.tabs.map((tab, index) => (
                        <LinkTab
                            key={index}
                            label={tab.tabLabel}
                            id={`tab.identifierName-${index}`}
                            href={tab.href}
                            icon={tab?.icon ? <img src={tab?.icon} alt="tab-icon" className="h-[16px] object-contain" /> : undefined}
                        />
                    ))}
                </Tabs>
            </Box>
            <Box className="h-full w-full p-5">
                {props.tabs[props.activePanel].renderedComponent}
            </Box>
        </>
    );
};

export default SimpleTabs;
