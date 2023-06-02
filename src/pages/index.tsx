import CrashBoyHead from '@crashboy/components/seo';
import CrashBoyInputSearch from '@crashboy/components/ui/input/input-search';
import { Box, Container } from '@mui/material';
import router from 'next/router';
import React from 'react';

export default function IndexPage() {

    function handleSearchClick(value: string) {
        router.push({
            pathname: '/search',
            query: value ? { text: value } : {},
        });
    }

    return (
        <>
            <CrashBoyHead
                title='Crash Boy'
                description='Crash Boy'
                ogImage='https://storage.cloud.google.com/madify/static/logo/logo-color.png'
            />
            <Box
                className='page-container'
                sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
                <Container>
                    <CrashBoyInputSearch onSearch={handleSearchClick} />
                </Container>
            </Box>
        </>
    );
}
