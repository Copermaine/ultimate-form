import React, {useState} from 'react';
import Typography from "@mui/material/Typography";
import {useForm} from "react-hook-form";
import * as yup from 'yup';
import {yupResolver} from "@hookform/resolvers/yup";
import {Button, Checkbox, Container, FormControlLabel, Switch, TextField} from "@mui/material";
import {useNavigate} from "react-router-dom";
import parsePhoneNumberFromString from "libphonenumber-js";
import {useData} from "../DataContext";


//обработка ошибок
const schema = yup.object().shape({
    email: yup
        .string()
        .required("Email name is required field")
        .email("Email should have correct format")
});
const normalizePhoneNumber = (value) => {
    const phoneNumber = parsePhoneNumberFromString(value)
    if (!phoneNumber) {
        return value
    }
    return phoneNumber.formatInternational()
}

export const Step2 = () => {
    const navigate = useNavigate();

    const {data, setValues} = useData();
    const {register, handleSubmit, watch, formState: {errors}} = useForm({
        defaultValues: {email: data.email, phoneNumber: data.phoneNumber, hasPhone: data.hasPhone},
        mode: "onBlur", //валидация после снятия фокуса
        resolver: yupResolver(schema)
    });

    const hasPhone = watch("hasPhone");
    const onSubmit = (data) => {
        setValues(data)
        navigate('/step3');

    }

    return (
        <Container component="main" maxWidth="xs" sx={{mt: 10}}>

            <Typography component="h2" variant="h5" sx={{textAlign: "center"}}>
                Step 2
            </Typography>

            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <TextField {...register("email")}
                           sx={{mb: 3}}
                           fullWidth
                           required //*
                           variant="outlined"
                           margin="normal"
                           id="email"
                           type="email"
                           label="Email"
                           name="email"
                           error={!!errors.email}
                           helperText={errors?.email?.message}/>

                <FormControlLabel control={
                    <Checkbox defaultChecked={data.hasPhone}
                              {...register("hasPhone")}
                              name="hasPhone" color="primary"/>
                } label="Do you have a phone?"/>

                {hasPhone && <TextField {...register("phoneNumber")}
                                        sx={{mb: 3}}
                                        fullWidth
                                        variant="outlined"
                                        margin="normal"
                                        id="phone"
                                        type="phone"
                                        label="Phone Number"
                                        name="phoneNumber"
                                        onChange={(event) => {
                                            event.target.value = normalizePhoneNumber(event.target.value)
                                        }}

                />}

                <Button type="submit" fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2}}>Next</Button>
            </form>
        </Container>
    )
}