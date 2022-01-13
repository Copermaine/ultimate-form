import React from "react";
import Typography from "@mui/material/Typography";
import {FileInput} from "./FileInput";
import {useForm} from "react-hook-form";
import {Button, Container} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {useData} from "../DataContext";

export const Step3 = () => {
    const {data, setValues} = useData();
    const {handleSubmit, control} = useForm({
        defaultValues: {files: data.files},
    });
    const navigate = useNavigate();

    const onSubmit = (data) => {
        setValues(data)
        navigate('/result');
    }
    return (
        <Container component="main" maxWidth="xs" sx={{my: 10}}>

            <Typography component="h2" variant="h5" sx={{textAlign: "center"}}>
                Step 3
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FileInput name="files" control={control} />
                <Button type="submit" fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2}}>Next</Button>
            </form>
        </Container>
    )
}