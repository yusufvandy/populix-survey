import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import DeleteIcon from '@mui/icons-material/Delete';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';

const theme = createTheme();

export default function Form() {
    const [form, setForm] = React.useState({ question: '', respondent: [{ answer: '', rule: 'may' }] })
    const handleSubmit = (event) => {
        event.preventDefault();
        // const data = new FormData(event.currentTarget);
        // console.log({
        //     email: data.get('email'),
        //     password: data.get('password'),
        // });
        console.log(form)
    };

    const handleChangeForm = (e, idx) => {
        let newForm = { ...form }
        newForm.respondent[idx][e.target.name] = e.target.value
    }

    const addAnswer = () => {
        let ans = { answer: '', rule: 'may' };
        setForm({ ...form, respondent: [...form.respondent, ans] })
    }

    const removeAnswer = (idx) => {
        let newForm = { ...form }
        newForm.respondent.splice(idx, 1)
        setForm(newForm)
    }

    const isEditPage = () => {
        if (window.location.pathname === '/edit' && window.location.hash) return true;
        return false
    }

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="md">
                <CssBaseline />
                <Box sx={{ mt: 8 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography component="h1" variant="h5">
                            {
                                isEditPage() ?
                                    'Edit Question' :
                                    'Add Question Form'
                            }
                        </Typography>
                        <Button
                            onClick={() => addAnswer()}
                            variant='outlined'>
                            Add Answer
                        </Button>
                    </Box>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: '100%' }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Question"
                            name="question"
                        />
                        {
                            form.respondent.map((el, idx) => (
                                <Grid key={idx} container spacing={2}>
                                    <Grid item xs={8}>
                                        <TextField
                                            margin="normal"
                                            name="answer"
                                            required
                                            fullWidth
                                            label="Answer"
                                            defaultValue={form.respondent[idx].answer}
                                            onChange={(e) => handleChangeForm(e, idx)}
                                        />
                                    </Grid>
                                    <Grid item xs={idx === 0 ? 4 : 3}>
                                        <FormControl sx={{ mt: 2 }} fullWidth>
                                            <InputLabel id="rule-label">Rule</InputLabel>
                                            <Select
                                                labelId="rule-label"
                                                defaultValue={form.respondent[idx].rule}
                                                name="rule"
                                                label="Rule"
                                                onChange={(e) => handleChangeForm(e, idx)}
                                            >
                                                <MenuItem value={'may'}>May Select</MenuItem>
                                                <MenuItem value={'must'}>Must Select</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    {
                                        idx !== 0 &&
                                        <Grid item xs={1}>
                                            <IconButton onClick={() => removeAnswer(idx)} sx={{ mt: 2 }} color="error" aria-label="delete" size="large">
                                                <DeleteIcon />
                                            </IconButton>
                                        </Grid>
                                    }
                                </Grid>
                            ))
                        }
                        <Box sx={{ display: 'flex', justifyContent: isEditPage() ? 'space-between' : 'flex-end' }}>
                            {
                                isEditPage() &&
                                <Button
                                    variant="outlined"
                                    color="error"
                                    sx={{ mt: 3, mb: 2, mr: 2 }}
                                >
                                    Delete question
                                </Button>
                            }
                            <Box>
                                <Button
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2, mr: 2, backgroundColor: 'gray' }}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Submit
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider >
    );
}