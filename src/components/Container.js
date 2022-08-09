import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        background: {
            default: "#f1f4f6"
        }
    }
});

export default function ContainerComponent({ children }) {
    return (
        <ThemeProvider theme={theme}>
            <Container sx={{ backgroundColor: '#fff' }} component="main" maxWidth="md">
                <CssBaseline />
                {children}
            </Container>
        </ThemeProvider >
    );
}