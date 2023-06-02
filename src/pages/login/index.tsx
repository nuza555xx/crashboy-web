import CrashBoyHead from '@crashboy/components/seo';
import { theme } from '@crashboy/components/theme';
import CrashBoyInput from '@crashboy/components/ui/input/input';
import { Backdrop, Box, Button, CircularProgress, Typography } from '@mui/material';
import { Login as LoginIcon } from '@mui/icons-material';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { requestAPI } from '@crashboy/utils';
import { debounce } from 'lodash';
import router from 'next/router';
import { Login } from '@crashboy/interfaces';
import { v4 } from 'uuid';
import { useDispatch } from 'react-redux';
import { setProfile } from '@crashboy/store/user/user.action';

export default function LoginPage() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!sessionStorage.getItem('uuid')) sessionStorage.setItem('uuid', v4());
    }, []);

    const loginWithEmail = debounce(() => {
        setOpen(true);
        requestAPI<Login>({
            method: 'POST',
            url: `${process.env.BASE_API_URL}:3001/api/authentication/login-with-email`,
            data: {
                email: email,
                password: password,
            },
            headers: {
                platform: 'web',
                uuid: localStorage.getItem('uuid'),
            },
        })
            .then(async (response: Login) => {
                sessionStorage.setItem('accessToken', response.accessToken);
                sessionStorage.setItem('refreshToken', response.refreshToken);
                if (response?.profile) dispatch(setProfile(response.profile));
                setTimeout(() => {
                    router.push('/search');
                }, 1000);
            })
            .catch((error) => {
                console.error(error);
            })
            .finally(() => {
                setTimeout(() => {
                    setOpen(false);
                }, 1000);
            });
    }, 500);
    return (
        <>
            <CrashBoyHead
                title='Crash Boy | ลงชื่อเข้าใช้'
                description='Crash Boy'
                ogImage='https://storage.cloud.google.com/madify/static/logo/logo-color.png'
            />
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
            >
                <CircularProgress color='inherit' />
            </Backdrop>
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

                    <Box sx={{ my: 2 }}>
                        <CrashBoyInput
                            id='email'
                            label='อีเมล'
                            type='email'
                            isError={false}
                            onInput={(value) => setEmail(value)}
                        ></CrashBoyInput>
                    </Box>
                    <Box sx={{ my: 2 }}>
                        <CrashBoyInput
                            id='password'
                            label='รหัสผ่าน'
                            type='password'
                            isError={false}
                            onInput={(value) => setPassword(value)}
                        ></CrashBoyInput>
                    </Box>
                    <Box sx={{ my: 2 }}>
                        <Button
                            disabled={!(email && password)}
                            sx={{ width: '100%', minHeight: '50px' }}
                            variant='contained'
                            startIcon={<LoginIcon />}
                            onClick={loginWithEmail}
                        >
                            เข้าสู่ระบบ
                        </Button>
                    </Box>
                </Box>
            </Box>
        </>
    );
}
