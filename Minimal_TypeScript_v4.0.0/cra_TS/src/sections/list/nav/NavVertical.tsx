import { useEffect, useState } from 'react';
// @mui
import { Box, Stack, Drawer } from '@mui/material';
// hooks
import useResponsive from '../../../hooks/useResponsive';
// config
import { NAV } from '../../../config';
// components
import { useSettingsContext } from '../../../components/settings';
import Logo from '../../../components/logo';
import Scrollbar from '../../../components/scrollbar';
import NavSectionVertical from './NavSectionVertical';
//
const dataCate = [
    {
        id: 1,
        cate: 'Truyện trinh thám',

    },
    {
        id: 2,
        cate: 'Truyện hài',

    },
    {
        id: 3,
        cate: 'Truyện ngụ ngôn',

    },
    {
        id: 4,
        cate: 'Truyện chính trị'

    },
    {
        id: 5,
        cate: 'Truyện văn học 1'

    },
    {
        id: 6,
        cate: 'Truyện văn học 2 '
    },
    {
        id: 7,
        cate: 'Truyện văn học 3'

    },
    {
        id: 8,
        cate: 'Truyện văn học 4'

    },
]

export default function NavVertical() {
    const renderContent = (
        <Scrollbar
            sx={{
                height: 1,
                '& .simplebar-content': {
                    height: 1,
                    display: 'flex',
                    flexDirection: 'column',
                },
            }}
        >
            <Stack
                spacing={3}
                sx={{
                    pb: 2,
                    px: 2.5,
                    flexShrink: 0,
                }}
            >

            </Stack>

            <NavSectionVertical data={dataCate} />
        </Scrollbar>
    );

    return (
        <Box
            component="nav"
            sx={{
                flexShrink: { lg: 0 },
                width: { lg: NAV.W_DASHBOARD },
            }}
        >
            {/* {isDesktop ? ( */}
            <Box>
                {renderContent}
            </Box>
            {/* ) : ( */}

            {/* <></> */}
            {/* )} */}
        </Box>
    );
}
