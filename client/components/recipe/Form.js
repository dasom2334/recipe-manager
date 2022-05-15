import React, {useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';

import Head from 'next/head';
const theme = createTheme();

export function Form({onChange, onSubmit, recipe}) {
    return (
        <ThemeProvider theme={theme}>
            <Head>
                <title>레시피 | {
                        recipe === undefined
                            ? '추가'
                            : '수정'
                    }
                </title>
            </Head>
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <Box
                    sx={{
                        marginTop: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}>
                    <Avatar
                        sx={{
                            m: 1,
                            bgcolor: 'secondary.main'
                        }}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        레시피 {
                        recipe === undefined
                            ? '추가'
                            : '수정'
                    }
                    </Typography>

                    <Box
                        component="form"
                        noValidate="noValidate"
                        sx={{
                            mt: 3
                        }}
                        onSubmit={onSubmit}>
                        <Typography component="h1" variant="h5">
                            기본
                        </Typography>
                        <Grid container="container" spacing={2}>
                            <Grid item="item" xs={12}>
                                <TextField
                                    name="recipe_name"
                                    required="required"
                                    fullWidth="fullWidth"
                                    id="recipe_name"
                                    label="이름"
                                    defaultValue={(recipe !== undefined)?recipe.recipe_name:null}
                                    autoFocus="autoFocus"
                                    onChange={onChange}/>
                            </Grid>
                            <Grid item="item" xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="per_person"
                                    required="required"
                                    fullWidth="fullWidth"
                                    id="per_person"
                                    label="인분 수"
                                    defaultValue={(recipe !== undefined)?recipe.per_person:null}
                                    autoFocus="autoFocus"
                                    onChange={onChange}/>
                            </Grid>
                            <Grid item="item" xs={12} sm={6}>
                                <TextField
                                    required="required"
                                    fullWidth="fullWidth"
                                    id="cooking_time"
                                    label="소요시간"
                                    name="cooking_time"
                                    defaultValue={(recipe !== undefined)?recipe.cooking_time:null}
                                    autoComplete="family-name"
                                    onChange={onChange}/>
                            </Grid>
                        </Grid>
                        <Typography component="h1" variant="h5">
                            기본 재료
                        </Typography>
                        <Grid container="container" spacing={2}>
                            <Grid item="item" xs={4}>
                                <TextField
                                    required="required"
                                    fullWidth="fullWidth"
                                    id="cooking_ingredient-0-ingredient_name"
                                    label="기본 재료명"
                                    name="cooking_ingredient.0.ingredient_name"
                                    onChange={onChange}/>
                            </Grid>
                            <Grid item="item" xs={4}>
                                <TextField
                                    required="required"
                                    fullWidth="fullWidth"
                                    id="cooking_ingredient-0-ingredient_amount"
                                    label="기본 재료 수"
                                    name="cooking_ingredient.0.ingredient_amount"
                                    onChange={onChange}/>
                            </Grid>
                            <Grid item="item" xs={4}>
                                <TextField
                                    required="required"
                                    fullWidth="fullWidth"
                                    id="cooking_ingredient-0-ingredient_unit"
                                    label="기본 재료 단위"
                                    name="cooking_ingredient.0.ingredient_unit"
                                    onChange={onChange}/>
                            </Grid>
                        </Grid>
                        <Typography component="h1" variant="h5">
                            양념 재료
                        </Typography>
                        <Grid container="container" spacing={2}>
                            <Grid item="item" xs={4}>
                                <TextField
                                    required="required"
                                    fullWidth="fullWidth"
                                    id="cooking_seasoning-0-seasoning_name"
                                    label="양념 재료 이름"
                                    name="cooking_seasoning.0.seasoning_name"
                                    onChange={onChange}/>
                            </Grid>
                            <Grid item="item" xs={4}>
                                <TextField
                                    required="required"
                                    fullWidth="fullWidth"
                                    id="cooking_seasoning-0-seasoning_amount"
                                    label="양념 재료 양"
                                    name="cooking_seasoning.0.seasoning_amount"
                                    onChange={onChange}/>
                            </Grid>
                            <Grid item="item" xs={4}>
                                <TextField
                                    required="required"
                                    fullWidth="fullWidth"
                                    id="cooking_seasoning-0-seasoning_unit"
                                    label="양념 재료 단위"
                                    name="cooking_seasoning.0.seasoning_unit"
                                    onChange={onChange}/>
                            </Grid>
                        </Grid>

                        <Typography component="h1" variant="h5">
                            진행 순서
                        </Typography>
                        <Grid container="container" spacing={2}>
                            <Grid item="item" xs={8}>
                                <TextField
                                    required="required"
                                    fullWidth="fullWidth"
                                    id="cooking_step-0-step-description"
                                    label="진행 순서 설명"
                                    name="cooking_step.0.step_description"
                                    onChange={onChange}/>
                            </Grid>
                            <Grid item="item" xs={4}>
                                <TextField
                                    required="required"
                                    fullWidth="fullWidth"
                                    id="cooking_step-0-step-timer"
                                    label="진행 시간"
                                    name="cooking_step.0.step_timer"
                                    onChange={onChange}/>
                            </Grid>
                            <hr></hr>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth="fullWidth"
                            variant="contained"
                            sx={{
                                mt: 3,
                                mb: 2
                            }}>
                            전 송
                        </Button>
                        <Grid container="container" justifyContent="flex-end">
                            <Grid item="item">
                                <Link href="/auth/login" variant="body2">
                                    로그인 화면으로 전환
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
