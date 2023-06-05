import CrashBoyHead from '@crashboy/components/seo';
import CrashBoyCardImage from '@crashboy/components/ui/card/card-image';
import CrashBoyInput from '@crashboy/components/ui/input/input';
import CrashBoyMasonry from '@crashboy/components/ui/masonry';
import { Vehicle, Response } from '@crashboy/interfaces';
import { requestAPI } from '@crashboy/utils';
import {
    Box,
    Button,
    CircularProgress,
    Container,
    Divider,
    Fade,
    Tab,
    Tabs,
    Typography,
} from '@mui/material';
import { useState, SyntheticEvent, useRef, useEffect } from 'react';
import { TransitionGroup } from 'react-transition-group';
import Grid from '@mui/material/Unstable_Grid2';
export default function ProfilePage() {
    const [selectedTab, setSelectedTab] = useState(0);
    const prevScrollPosRef = useRef(0);

    const [next, setNext] = useState<number>(0);
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [loadMore, setLoadMore] = useState<boolean>(false);
    const [initialPage, setInitialPage] = useState<boolean>(false);
    const [noMore, setNoMore] = useState<boolean>(false);

    useEffect(() => {
        setLoading(true);
        if (!vehicles.length)
            fetchSearchData({ limit: 25 })
                .then((response) => {
                    setVehicles(response.payload);
                    setNext(response.meta?.next ?? 0);
                    if (response.payload.length) setLoadMore(true);
                })
                .catch((error) => {
                    console.error(error);
                    setLoadMore(false);
                })
                .finally(() => {
                    setInitialPage(true);
                    setTimeout(() => {
                        setLoading(false);
                    }, 1000);
                });
    }, [vehicles]);

    useEffect(() => {
        function handleScroll() {
            const currentScrollPos = window.scrollY;
            const body = document.body;
            const html = document.documentElement;
            const offset = 200; // offset from the bottom of the page
            const height = Math.max(
                body.scrollHeight,
                body.offsetHeight,
                html.clientHeight,
                html.scrollHeight,
                html.offsetHeight
            );
            if (
                currentScrollPos > prevScrollPosRef.current &&
                window.innerHeight + currentScrollPos >= height - offset
            ) {
                if (loadMore) {
                    setLoadMore(false);
                    try {
                        fetchSearchData({
                            next: next,
                            limit: window.innerWidth > 400 ? 15 : 5,
                        })
                            .then(async (response) => {
                                if (!response.payload.length) {
                                    setNoMore(true);
                                    return;
                                }
                                await new Promise((resolve) => {
                                    setTimeout(async () => {
                                        vehicles.push(...response.payload);
                                        setVehicles(vehicles);
                                        setNext(response.meta?.next ?? 0);
                                        if (response.payload.length) {
                                            setLoadMore(true);
                                            resolve(true);
                                        } else resolve(true);
                                    }, 1000);
                                });
                            })
                            .catch((error) => {
                                console.error(error);
                            });
                    } catch (error) {
                        setNoMore(false);
                    }
                }
            }
            prevScrollPosRef.current = currentScrollPos;
        }

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [loadMore, next, vehicles]);

    const handleTabChange = (event: SyntheticEvent, newValue: number) => {
        setSelectedTab(newValue);
    };

    async function fetchSearchData(options: { next?: number; limit: number }) {
        return requestAPI<Response<Vehicle[]>>({
            method: 'GET',
            url: `https://crashboy.tech/api/user/vehicle/list`,
            params: {
                skip: options?.next,
                limit: options?.limit,
            },
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
            },
        });
    }

    return (
        <>
            <CrashBoyHead
                title='Crash Boy | โปรไฟล์'
                description='Crash Boy'
                ogImage='https://storage.cloud.google.com/madify/static/logo/logo-color.png'
            />
            <Box
                className='page-container'
                sx={{
                    justifyContent: 'center',
                    pt: { xs: 5, md: 30 },
                }}
            >
                <Container>
                    <Tabs value={selectedTab} onChange={handleTabChange} centered>
                        <Tab label='ข้อมูลส่วนตัว' />
                        <Tab label='พาหนะของฉัน' />
                        <Tab label='ตั้งค่า' />
                    </Tabs>

                    {selectedTab === 0 && (
                        <Box p={3}>
                            <TransitionGroup>
                                <Fade in={true}>
                                    <Typography variant='h2' sx={{ fontSize: '1.2rem', mb: 2 }}>
                                        ข้อมูลส่วนตัว
                                    </Typography>
                                </Fade>
                                <Fade in={true}>
                                    <Box component='form' noValidate autoComplete='off'>
                                        <Grid container spacing={2}>
                                            <Grid xs={12} md={6}>
                                                <CrashBoyInput
                                                    id='disPlayName'
                                                    label='ชื่อ'
                                                    type='disPlayName'
                                                    isError={false}
                                                    onInput={(value) => {}}
                                                ></CrashBoyInput>
                                            </Grid>
                                            <Grid xs={12} md={6}>
                                                <CrashBoyInput
                                                    id='email'
                                                    label='อีเมล'
                                                    type='email'
                                                    isError={false}
                                                    onInput={(value) => {}}
                                                ></CrashBoyInput>
                                            </Grid>
                                            <Grid xs={12} md={6}>
                                                <CrashBoyInput
                                                    id='phone'
                                                    label='เบอร์โทรศัพท์'
                                                    type='phone'
                                                    isError={false}
                                                    onInput={(value) => {}}
                                                ></CrashBoyInput>
                                            </Grid>
                                        </Grid>

                                        <Box sx={{ my: 2, textAlign: 'right' }}>
                                            <Button
                                                sx={{ minWidth: '20%', minHeight: '50px' }}
                                                variant='contained'
                                                // startIcon={<LoginIcon />}
                                            >
                                                แก้ไขข้อมูล
                                            </Button>
                                        </Box>
                                    </Box>
                                </Fade>
                                <Fade in={true}>
                                    <Divider variant='middle' sx={{ my: 5 }} />
                                </Fade>

                                <Fade in={true}>
                                    <Typography variant='h2' sx={{ fontSize: '1.2rem', mb: 2 }}>
                                        เปลี่ยนรหัสผ่าน
                                    </Typography>
                                </Fade>

                                <Fade in={true}>
                                    <Box component='form' noValidate autoComplete='off'>
                                        <Grid container spacing={2}>
                                            <Grid xs={12} md={6}>
                                                <CrashBoyInput
                                                    id='password'
                                                    label='รหัสผ่าน'
                                                    type='password'
                                                    isError={false}
                                                    onInput={(value) => {}}
                                                ></CrashBoyInput>
                                            </Grid>
                                            <Grid xs={12} md={6}>
                                                <CrashBoyInput
                                                    id='newPassword'
                                                    label='รหัสผ่านใหม่'
                                                    type='password'
                                                    isError={false}
                                                    onInput={(value) => {}}
                                                ></CrashBoyInput>
                                            </Grid>
                                        </Grid>

                                        <Box sx={{ my: 2, textAlign: 'right' }}>
                                            <Button
                                                sx={{ minWidth: '20%', minHeight: '50px' }}
                                                variant='contained'
                                                // startIcon={<LoginIcon />}
                                            >
                                                เปลี่ยนรหัสผ่าน
                                            </Button>
                                        </Box>
                                    </Box>
                                </Fade>
                            </TransitionGroup>
                        </Box>
                    )}
                    {selectedTab === 1 && (
                        <Box p={3}>
                            {vehicles.length ? (
                                <TransitionGroup>
                                    <Fade in={vehicles.length > 0}>
                                        {/* Content to be faded in */}
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                p: 0,
                                            }}
                                        >
                                            <CrashBoyMasonry>
                                                {vehicles.map((vehicle, index) => {
                                                    return (
                                                        <CrashBoyCardImage
                                                            key={`${vehicle.id}-${index}`}
                                                            loading={loading}
                                                            data={{
                                                                title: vehicle.vehicleRegistration,
                                                                subTitle:
                                                                    vehicle.registrationProvince
                                                                        .name.th,
                                                                avatarImage:
                                                                    vehicle.brand.image ?? '',
                                                                cardImage: vehicle.image,
                                                                description: vehicle.brand.name.en,
                                                                description2: vehicle.model.name.en,
                                                            }}
                                                        />
                                                    );
                                                })}
                                            </CrashBoyMasonry>
                                        </Box>
                                    </Fade>
                                </TransitionGroup>
                            ) : (
                                ''
                            )}

                            {!loadMore && vehicles.length && !noMore ? (
                                <Container
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        height: 70,
                                    }}
                                >
                                    <Box sx={{ display: 'flex' }}>
                                        <Fade in={true}>
                                            <CircularProgress size={40} />
                                        </Fade>
                                    </Box>
                                </Container>
                            ) : (
                                <Container sx={{ height: 70 }}></Container>
                            )}

                            {initialPage && !vehicles.length ? (
                                <Container
                                    sx={{
                                        display: 'flex',
                                        height: { xs: '30vh', md: '40vh' },
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        pt: 2,
                                    }}
                                >
                                    <Fade in={true}>
                                        <Typography variant='h3' sx={{ pb: 1, fontSize: '1.2rem' }}>
                                            ไม่พบข้อมูล
                                        </Typography>
                                    </Fade>
                                </Container>
                            ) : (
                                ''
                            )}
                        </Box>
                    )}
                    {selectedTab === 2 && (
                        <Box p={3}>
                            <Typography variant='body1'>Content for Tab 3</Typography>
                        </Box>
                    )}
                </Container>
            </Box>
        </>
    );
}
