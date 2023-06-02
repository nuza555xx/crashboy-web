import {
    Avatar,
    Box,
    Card,
    CardActionArea,
    CardContent,
    CardHeader,
    CardMedia,
    Fade,
    Skeleton,
    Typography,
} from '@mui/material';
import React from 'react';
import styles from '@crashboy/styles/_variables.module.scss';
import { CardImageData } from '@crashboy/interfaces';

type CardImageProps = {
    loading?: boolean;
    data: CardImageData;
};
export default function CrashBoyCardImage(props: CardImageProps) {
    const { loading = false, data } = props;
    return (
        <Box sx={{ minWidth: { md: 200 } }}>
            <Fade in={Object.keys(data).length > 0}>
                <Card sx={{ borderRadius: styles.defaultBorderRadius, sm: { width: 1 } }}>
                    <CardActionArea>
                        <CardHeader
                            sx={{ p: { xs: 1, md: 2 } }}
                            avatar={
                                loading ? (
                                    <Skeleton
                                        animation='wave'
                                        variant='rounded'
                                        width={40}
                                        height={40}
                                    />
                                ) : (
                                    <Avatar
                                        alt={data.title}
                                        src={data.avatarImage}
                                        variant='rounded'
                                        sx={{
                                            objectFit: 'contain !important',
                                            height: { xs: '25px', md: '40px' },
                                            width: 'auto',
                                            padding: 0.5,
                                            minWidth: '35px',
                                            maxWidth: '60px',
                                        }}
                                    />
                                )
                            }
                            title={
                                loading ? (
                                    <Skeleton
                                        animation='wave'
                                        height={10}
                                        width='80%'
                                        style={{ marginBottom: 6 }}
                                    />
                                ) : (
                                    data.title
                                )
                            }
                            subheader={
                                loading ? (
                                    <Skeleton animation='wave' height={10} width='40%' />
                                ) : (
                                    data.subTitle
                                )
                            }
                        />

                        {loading ? (
                            <Skeleton
                                sx={{ height: { xs: 300, sm: 350 } }}
                                animation='wave'
                                variant='rectangular'
                            />
                        ) : (
                            <CardMedia
                                component='img'
                                sx={{ minHeight: '140px', height: { xs: '300px', sm: 'auto' } }}
                                alt={data.title}
                                image={data.cardImage}
                            />
                        )}
                        <CardContent sx={{ p: { xs: 1, md: 2 } }}>
                            {loading ? (
                                <Skeleton
                                    animation='wave'
                                    height={15}
                                    style={{ marginBottom: 6 }}
                                />
                            ) : (
                                <Typography color='text.secondary' component='p'>
                                    {data.description} | {data.description2}
                                </Typography>
                            )}
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Fade>
        </Box>
    );
}
