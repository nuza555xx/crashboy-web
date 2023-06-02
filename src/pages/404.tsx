import CrashBoyHead from '@crashboy/components/seo';
import { Box } from '@mui/material';
import React from 'react';

export default function NotfoundPage() {
    return (
        <>
            <CrashBoyHead
                title='Crash Boy | Not found'
                description='Crash Boy'
                ogImage='https://storage.cloud.google.com/madify/static/logo/logo-color.png'
            />
            <Box
                className='page-container'
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <h2 style={{ fontSize: '3.5rem', fontWeight: 300 }}>404</h2>
                <h2 style={{ fontSize: '3.5rem', fontWeight: 300 }}>&nbsp;|&nbsp;</h2>
                <h5 style={{ fontSize: '1.2rem', fontWeight: 300 }}>
                    ไม่พบหน้านี้ กรุณาตรวจสอบใหม่อีกครั้ง
                </h5>
            </Box>
        </>
    );
}
