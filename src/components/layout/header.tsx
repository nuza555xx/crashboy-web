import {
    AppBar,
    Avatar,
    Box,
    Button,
    Container,
    Drawer,
    IconButton,
    Link,
    ListItem,
    ListItemButton,
    ListItemText,
    Menu,
    MenuItem,
    Toolbar,
    Typography,
} from '@mui/material';
import Image from 'next/image';
import { useEffect, useState, MouseEvent } from 'react';
import { Menu as MenuIcon } from '@mui/icons-material';
import { theme } from '@crashboy/components/theme';
import { selectProfile } from '@crashboy/store/user/user.selector';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';

const pages = [
    {
        name: 'ค้นหา',
        path: '/search',
    },
    {
        name: 'เกี่ยวกับเรา',
        path: '/about',
    },
    {
        name: 'ติดต่อเรา',
        path: '/contact',
    },
];
const settings = [
    {
        name: 'โปรไฟล์ของฉัน',
        path: '/profile',
    },
    {
        name: 'ออกจากระบบ',
        path: '/logout',
    },
    ,
];

export default function CrashBoyHeader() {
    const router = useRouter();
    const [anchorNav, setAnchorNav] = useState<boolean>(false);
    const [anchorElUser, setAnchorElUser] = useState<HTMLElement | null>(null);
    const [isAuth, setAuth] = useState<boolean>(false);
    const profile = useSelector(selectProfile);
    const dispatch = useDispatch();

    useEffect(() => {
        if (Object.values(profile).every((value) => value)) {
            setAuth(true);
        }
    }, [profile]);

    function handleOpenUserMenu(event: MouseEvent<HTMLElement>) {
        setAnchorElUser(event.currentTarget);
    }

    function toggleDrawer(open: boolean) {
        return (event: KeyboardEvent | MouseEvent) => {
            if (
                event.type === 'keydown' &&
                ((event as KeyboardEvent).key === 'Tab' || (event as KeyboardEvent).key === 'Shift')
            )
                return;

            setAnchorNav(open);
        };
    }

    function handleCloseUserMenu() {}

    return (
        <>
            <AppBar elevation={2} position='static' color='inherit'>
                <Container maxWidth='xl'>
                    <Toolbar disableGutters>
                        {/* DESKTOP */}
                        <Box
                            sx={{
                                flexGrow: 1,
                                justifyItems: 'center',
                                display: { xs: 'none', md: 'flex' },
                            }}
                        >
                            <Link href='/'>
                                <Image
                                    src={
                                        theme.palette.mode === 'light'
                                            ? '/logo-dark.svg'
                                            : '/logo-white.svg'
                                    }
                                    alt='logo'
                                    width={160}
                                    height={20}
                                    priority
                                />
                            </Link>
                        </Box>

                        {/* MOBILE */}
                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size='large'
                                role='presentation'
                                onClick={toggleDrawer(true)}
                                color='inherit'
                            >
                                <MenuIcon />
                            </IconButton>

                            <Drawer open={anchorNav} onClose={toggleDrawer(false)}>
                                <Box sx={{ padding: 5 }}>
                                    <Image
                                        src={
                                            theme.palette.mode === 'light'
                                                ? '/logo-dark.svg'
                                                : '/logo-white.svg'
                                        }
                                        alt='logo'
                                        width={160}
                                        height={20}
                                        priority
                                    />
                                </Box>
                                {pages.map((page) => (
                                    <ListItem key={page.name} disablePadding>
                                        <ListItemButton>
                                            {/* <ListItemIcon>
                                                        {index % 2 === 0 ? (
                                                            <InboxIcon />
                                                        ) : (
                                                            <MailIcon />
                                                        )}
                                                    </ListItemIcon> */}

                                            <ListItemText
                                                primary={page.name}
                                                onClick={toggleDrawer(false)}
                                            />
                                        </ListItemButton>
                                    </ListItem>
                                ))}
                            </Drawer>
                        </Box>

                        {/* DESKTOP */}
                        <Box
                            sx={{
                                flexGrow: 0,
                                display: { xs: 'none', md: 'flex' },
                                mr: 2,
                            }}
                        >
                            {pages.map((page) => (
                                <Button
                                    style={{ textTransform: 'none' }}
                                    key={page.path}
                                    sx={{ my: 2, color: 'text.primary' }}
                                    onClick={() => router.push(page.path)}
                                >
                                    {page.name}
                                </Button>
                            ))}
                        </Box>
                        {isAuth ? (
                            <Box sx={{ flexGrow: 0 }}>
                                <Button
                                    onClick={handleOpenUserMenu}
                                    sx={{ p: 1, textTransform: 'none' }}
                                >
                                    <Avatar
                                        alt={profile?.displayName}
                                        src='https://images.pexels.com/photos/1851164/pexels-photo-1851164.jpeg'
                                        sx={{ width: 30, height: 30 }}
                                    />
                                    <Typography color='text.secondary' component='p' sx={{ ml: 1 }}>
                                        {profile?.displayName}
                                    </Typography>
                                </Button>
                                <Menu
                                    sx={{ mt: '45px' }}
                                    id='menu-appbar'
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseUserMenu}
                                >
                                    {settings.map((setting) => (
                                        <MenuItem
                                            key={setting?.path}
                                            onClick={() => {
                                                if (setting?.path) router.push(setting.path);
                                                setAnchorElUser(null);
                                            }}
                                        >
                                            <Typography textAlign='center'>
                                                {setting?.name}
                                            </Typography>
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </Box>
                        ) : (
                            <Box sx={{ flexGrow: 0 }}>
                                <Button variant='contained' onClick={() => router.push('login')}>
                                    ลงชื่อเข้าใช้
                                </Button>
                            </Box>
                        )}
                    </Toolbar>
                </Container>
            </AppBar>
        </>
    );
}
