import CrashBoyHead from '@crashboy/components/seo';
import CrashBoyCardImage from '@crashboy/components/ui/card/card-image';
import CrashBoyInputSearch from '@crashboy/components/ui/input/input-search';
import CrashBoyMasonry from '@crashboy/components/ui/masonry';
import { Vehicle, Response } from '@crashboy/interfaces';
import { requestAPI } from '@crashboy/utils';
import { Box, CircularProgress, Container, Fade, Typography } from '@mui/material';
import { debounce } from 'lodash';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { TransitionGroup } from 'react-transition-group';

export default function SearchPage() {
    const router = useRouter();
    const { text: textSearch } = router.query;
    const prevScrollPosRef = useRef(0);

    const [text, setText] = useState<string>('');
    const [next, setNext] = useState<number>(0);
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [loadMore, setLoadMore] = useState<boolean>(false);
    const [initialPage, setInitialPage] = useState<boolean>(false);
    const [noMore, setNoMore] = useState<boolean>(false);

    useEffect(() => {
        if (textSearch) setText(textSearch as string);
        setLoading(true);
        fetchSearchData(text, { limit: 25 })
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
    }, [text, textSearch]);

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
                        fetchSearchData(text, {
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
    }, [loadMore, next, text, vehicles]);

    async function fetchSearchData(value: string, options: { next?: number; limit: number }) {
        return requestAPI<Response<Vehicle[]>>({
            method: 'GET',
            url: `${process.env.BASE_API_URL}:3003/api/vehicle/search`,
            params: {
                search: value,
                skip: options?.next,
                limit: options?.limit,
            },
        });
    }

    const handleSearchClick = debounce((value: string) => {
        setLoading(true);

        router.push({
            pathname: '/search',
            query: value ? { text: value } : {},
        });

        fetchSearchData(value, {
            limit: 25,
        })
            .then((response) => {
                setVehicles(response.payload);
                if (response.payload.length) setLoadMore(true);
            })
            .catch((error) => {
                console.error(error);
            })
            .finally(() => {
                setTimeout(() => {
                    setLoading(false);
                }, 1000);
            });
    }, 500);

    return (
        <>
            <CrashBoyHead
                title='Crash Boy | ค้นหา'
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
                    <Typography variant='h2' sx={{ fontSize: { xs: '1.5rem', md: '2rem' }, pb: 1 }}>
                        ช่วยเหลือคุณติดต่อคู่กรณีผ่านแอปพลิเคชันของเรา
                    </Typography>

                    <Typography
                        variant='subtitle1'
                        sx={{ fontSize: { xs: '.9rem', md: '1rem' }, pb: 3 }}
                    >
                        แอปพลิเคชันของเราจะช่วยให้คุณได้รับการช่วยเหลือได้อย่างรวดเร็ว
                        ออกแบบมาเพื่อความสะดวกสบายและง่ายต่อการใช้งาน ไปลุย
                    </Typography>
                    <CrashBoyInputSearch onSearch={handleSearchClick} />
                </Container>

                {vehicles.length ? (
                    <TransitionGroup>
                        <Fade in={vehicles.length > 0}>
                            {/* Content to be faded in */}
                            <Container sx={{ display: 'flex', justifyContent: 'center', pt: 4 }}>
                                <CrashBoyMasonry>
                                    {vehicles.map((vehicle, index) => {
                                        return (
                                            <CrashBoyCardImage
                                                key={`${vehicle.id}-${index}`}
                                                loading={loading}
                                                data={{
                                                    title: vehicle.vehicleRegistration,
                                                    subTitle: vehicle.registrationProvince.name.th,
                                                    avatarImage: vehicle.brand.image ?? '',
                                                    cardImage: vehicle.image,
                                                    description: vehicle.brand.name.en,
                                                    description2: vehicle.model.name.en,
                                                }}
                                            />
                                        );
                                    })}
                                </CrashBoyMasonry>
                            </Container>
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
                            <CircularProgress size={40} />
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
                        <Typography variant='h3' sx={{ pb: 1, fontSize: '1.2rem' }}>
                            ไม่พบข้อมูล กรุณาลองใหม่อีกครั้ง
                        </Typography>
                    </Container>
                ) : (
                    ''
                )}
            </Box>
        </>
    );
}
