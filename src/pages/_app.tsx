import type { AppProps } from 'next/app';
import { CssBaseline, ThemeProvider } from '@mui/material';
import CrashBoyLayout from '@crashboy/components/layout';
import { theme } from '@crashboy/components/theme';
import '@crashboy/styles/globals.scss';
import { Provider } from 'react-redux';
import store from '@crashboy/store/store';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <CrashBoyLayout>
                    <Component {...pageProps} />
                </CrashBoyLayout>
            </ThemeProvider>
        </Provider>
    );
}
