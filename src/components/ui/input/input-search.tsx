import { Box, Button, FormHelperText, Stack, TextField } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { ChangeEvent, useState, KeyboardEvent } from 'react';
import styles from '@crashboy/styles/_variables.module.scss';

type InputSearchProps = {
    onSearch: (value: string) => void;
};

export default function CrashBoyInputSearch(props: InputSearchProps) {
    const [inputValue, setInputValue] = useState<string>('');

    function handleClick() {
        props.onSearch(inputValue);
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        setInputValue(event.target.value);
    }

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            props.onSearch(inputValue);
        }
    };

    return (
        <>
            <Stack direction='row' spacing={2}>
                <Box
                    sx={{
                        width: 1200,
                        maxWidth: '100%',
                    }}
                >
                    <TextField
                        fullWidth
                        sx={{
                            minHeight: styles.defaultHeight,
                        }}
                        value={inputValue}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        aria-label='Search'
                    />
                </Box>
                <Box>
                    <Button
                        aria-label='Search form'
                        type='button'
                        variant='contained'
                        size='large'
                        startIcon={<SearchIcon />}
                        onClick={handleClick}
                        sx={{
                            height: styles.defaultHeight,
                        }}
                    >
                        ค้นหา
                    </Button>
                </Box>
            </Stack>
            <FormHelperText sx={{ fontSize: { xs: '.8rem', md: '.9rem' } }}>
                ** ตัวอย่าง :: กข-1000 honda accord เพื่อได้รับข้อมูลที่แม่นยำมากขึ้น
            </FormHelperText>
        </>
    );
}
