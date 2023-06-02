import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { useState, MouseEvent, KeyboardEvent, FormEventHandler, FormEvent, ChangeEvent } from 'react';

type InputProps = {
    id: string;
    label: string;
    type: string;
    isError: boolean;
    onInput: (value: string) => void;
};
export default function CrashBoyInput(props: InputProps) {
    const [showPassword, setShowPassword] = useState(false);
    const [inputValue, setInputValue] = useState<string>('');

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        setInputValue(event.target.value);
        props.onInput(event.target.value);
    }

    return (
        <>
            <TextField
                error={props.isError}
                id={props.id}
                type={props.type === 'password' ? (showPassword ? 'text' : 'password') : props.type}
                label={props.label}
                sx={{ width: '100%' }}
                InputLabelProps={{
                    shrink: true,
                }}
                value={inputValue}
                onChange={handleInputChange}
                InputProps={{
                    endAdornment:
                        props.type === 'password' ? (
                            <InputAdornment position='end'>
                                <IconButton
                                    aria-label='toggle password visibility'
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge='end'
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ) : (
                            ''
                        ),
                }}
            />
        </>
    );
}
