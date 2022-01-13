import React, {useState} from 'react';
import Typography from "@mui/material/Typography";
import {useForm} from "react-hook-form";
import * as yup from 'yup';
import {yupResolver} from "@hookform/resolvers/yup";
import {Button, Container, TextField} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {useData} from "../DataContext";


//обработка ошибок
const schema = yup.object().shape({
    firstName: yup
        .string()
        .required("First name is required field")
        .matches(/^([^0-9]*)$/, "First name should not contain number"),
    lastName: yup
        .string()
        .required("Last name is required field")
        .matches(/^([^0-9]*)$/, "Last name should not contain number")
});

export const Step1 = () => {
    const navigate = useNavigate();
    const {data, setValues} = useData();
    const {register, handleSubmit, formState: {errors}} = useForm({
        defaultValues: {firstName: data.firstName, lastName: data.lastName},
        mode: "onBlur", //валидация после снятия фокуса
        resolver: yupResolver(schema)
    });

    const onSubmit = (data) => {
        //data обьект с заполненными полями из формы
        setValues(data);
        navigate('/step2');
    }
    return (
        <Container component="main" maxWidth="xs" sx={{mt: 10}}>

            <Typography component="h2" variant="h5"  sx={{textAlign: "center"}}>
                Step 1
            </Typography>

            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <TextField {...register('firstName')}
                           sx={{mb: 3}}
                           fullWidth
                           variant="outlined"
                           margin="normal"
                           id="firsName"
                           type="text"
                           label="First Name"
                           name="firstName"
                           error={!!errors.firstName}
                           helperText={errors?.firstName?.message}/>

                <TextField {...register('lastName')}
                           fullWidth
                           id="lastName"
                           type="text"
                           label="Last Name"
                           name="lastName"
                           error={!!errors.lastName}
                           helperText={errors?.lastName?.message}/>

                <Button type="submit" fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2}}>Next</Button>
            </form>
        </Container>
    )
}