import React from 'react';
import { TextField, Grid } from '@mui/material';

const HallTextFields = ({ hallData, handleFormChange, errors }) => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <TextField
                    label="Number of Seats"
                    variant="outlined"
                    fullWidth
                    name="seats"
                    value={hallData.seats}
                    onChange={handleFormChange}
                    error={!!errors.seats}
                    helperText={errors.seats}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    label="Number of Rows"
                    variant="outlined"
                    fullWidth
                    name="nrows"
                    value={hallData.nrows}
                    onChange={handleFormChange}
                    error={!!errors.nrows}
                    helperText={errors.nrows}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    label="Number of Columns"
                    variant="outlined"
                    fullWidth
                    name="columns"
                    value={hallData.columns}
                    onChange={handleFormChange}
                    error={!!errors.columns}
                    helperText={errors.columns}
                />
            </Grid>
        </Grid>
    );
};

export default HallTextFields;
