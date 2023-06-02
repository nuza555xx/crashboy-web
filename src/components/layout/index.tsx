import { useRouter } from 'next/router';
import CrashBoyFooter from './footer';
import CrashBoyHeader from './header';
import { Box } from '@mui/material';

type LayoutProps = {
    children: React.ReactNode;
};

export default function CrashBoyLayout({ children }: LayoutProps) {
    const router = useRouter();
    const isAuthPage = ['/login', '/register'].includes(router.pathname);

    return (
        <Box sx={{ bgcolor: 'background.default', color: 'text.primary' }}>
            {isAuthPage ? null : <CrashBoyHeader />}
            <main className='page-container'>{children}</main>
            <CrashBoyFooter />
        </Box>
    );
}
