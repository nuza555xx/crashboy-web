import CrashBoyHead from '@crashboy/components/seo';
import { theme } from '@crashboy/components/theme';
import CrashBoyInput from '@crashboy/components/ui/input/input';
import { Box, Button, Typography } from '@mui/material';
import { Login as LoginIcon } from '@mui/icons-material';
import Image from 'next/image';
import { useState } from 'react';

export default function RegisterPage() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    return (
        <>
            <CrashBoyHead
                title='Crash Boy'
                description='Crash Boy'
                ogImage='https://storage.cloud.google.com/madify/static/logo/logo-color.png'
            />
            <Box
                className='auth-container'
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Box
                    component='form'
                    noValidate
                    autoComplete='off'
                    sx={{
                        width: { xs: '100%', sm: '35rem' },
                        padding: { xs: '2rem', sm: '3rem' },
                    }}
                >
                    <Box sx={{ textAlign: 'center' }}>
                        <Image
                            src={
                                theme.palette.mode === 'light'
                                    ? '/logo-dark.svg'
                                    : '/logo-white.svg'
                            }
                            alt='Logo'
                            width={300}
                            height={100}
                        ></Image>
                    </Box>

                    <Typography variant='h2' sx={{ fontSize: '1.2rem' }}>
                        ลงชื่อเข้าใช้
                    </Typography>

                    {/* <Box sx={{ my: 2 }}>
                        <CrashBoyInput
                            id='email'
                            label='อีเมล'
                            type='email'
                            isError={false}
                        ></CrashBoyInput>
                    </Box>
                    <Box sx={{ my: 2 }}>
                        <CrashBoyInput
                            id='password'
                            label='รหัสผ่าน'
                            type='password'
                            isError={false}
                        ></CrashBoyInput>
                    </Box> */}
                    <Box sx={{ my: 2 }}>
                        <Button
                            sx={{ width: '100%', minHeight: '50px' }}
                            variant='contained'
                            startIcon={<LoginIcon />}
                        >
                            เข้าสู่ระบบ
                        </Button>
                    </Box>
                </Box>
            </Box>
        </>
    );
}
