import { Masonry } from '@mui/lab';

type MasonryProps = {
    children: React.ReactElement[];
};

export default function CrashBoyMasonry({ children }: MasonryProps) {
    return (
        <Masonry columns={{ xs: 1, sm: 2, md: 3, lg: 4 }} spacing={2}>
            {children}
        </Masonry>
    );
}
