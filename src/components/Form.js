import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

export default function Form() {
    const [form, setForm] = React.useState({ id: Date.now(), question: '', respondent: [{ answer: '', rule: 'may' }] })
    const [isSuccess, setIsSuccess] = React.useState(false)
    const handleSubmit = (event) => {
        event.preventDefault();
        let lsData = localStorage.getItem('populix-survey-items')
        if (lsData) {
            lsData = JSON.parse(lsData)
            lsData.push(form)
        }
        localStorage.setItem("populix-survey-items", JSON.stringify(lsData ? lsData : [form]))
        setIsSuccess(true)
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

    React.useEffect(() => {
        if (isSuccess) setTimeout(() => {
            window.location.href = `/`
        }, 2000);
    }, [isSuccess])

    return (
        <Box sx={{ py: 8 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography component="h1" variant="h5">
                    {
                        isEditPage() ?
                            'Edit Question' :
                            'Add Question Form'
                    }
                </Typography>
                {
                    !isSuccess &&
                    <Button
                        onClick={() => addAnswer()}
                        variant='outlined'>
                        Add Answer
                    </Button>
                }
            </Box>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Question"
                    name="question"
                    defaultValue={form.question}
                    onChange={(e) => setForm({ ...form, question: e.target.value })}
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
                {
                    !isSuccess ? <Box sx={{ display: 'flex', mt: 3, justifyContent: isEditPage() ? 'space-between' : 'flex-end' }}>
                        {
                            isEditPage() &&
                            <Button
                                variant="outlined"
                                color="error"
                            >
                                Delete question
                            </Button>
                        }
                        <Box>
                            <Button
                                onClick={() => window.location.href = `/`}
                                variant="contained"
                                sx={{ mr: 2, backgroundColor: 'gray' }}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                variant="contained"
                            >
                                Submit
                            </Button>
                        </Box>
                    </Box> :
                        <Alert sx={{ mt: 3 }} severity="success">
                            <AlertTitle>Success</AlertTitle>
                            Success add question and answer to list
                        </Alert>
                }
            </Box>
        </Box>
    );
}