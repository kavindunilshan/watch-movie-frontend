import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import LocationTextFields from "./location-fields";

export default function TheaterTextFields({
                                              theaterData,
                                                isEditable,
                                              handleTheaterChange,
                                              theaterErrors,
                                              locationData,
                                              handleLocationChange,
                                              locationErrors,
                                          }) {
    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': {
                    m: 1,
                    width: '50ch',
                    fontSize: '1rem',
                    backgroundColor: '#333', // Dark gray for input fields
                    color: '#ffd700', // Gold text color
                    borderRadius: '4px',
                },
                '& .MuiFormLabel-root': {
                    color: '#ffd700', // Gold label color
                },
                '& .MuiInputBase-root': {
                    color: '#ffffff', // White input text color
                },
                '& .MuiFormHelperText-root': {
                    color: '#b3b3b3', // Light gray for helper text
                },
                '& .Mui-error': {
                    color: '#ff4d4d', // Red for error text
                },
                '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#ffd700', // Gold outline for input
                },
                '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#ffd700', // Gold outline on focus
                },
            }}
            noValidate
            autoComplete="off"
        >
            <div>
                <TextField
                    label="Theater Name"
                    name="name"
                    value={theaterData.name}
                    onChange={handleTheaterChange}
                    helperText={theaterErrors.name || "Enter the theater name"}
                    error={Boolean(theaterErrors.name)}
                    FormHelperTextProps={{ sx: { fontSize: '1rem' } }}
                />
                <TextField
                    label="Contact Number"
                    name="contactNumber"
                    type="tel"
                    value={theaterData.contactNumber}
                    onChange={handleTheaterChange}
                    helperText={theaterErrors.contactNumber || "Enter contact number"}
                    error={Boolean(theaterErrors.contactNumber)}
                    FormHelperTextProps={{ sx: { fontSize: '1rem' } }}
                />
            </div>
            <div>
                <TextField
                    label="Slogan"
                    name="slogan"
                    value={theaterData.slogan}
                    onChange={handleTheaterChange}
                    helperText={theaterErrors.slogan || "Enter the slogan"}
                    error={Boolean(theaterErrors.slogan)}
                    FormHelperTextProps={{ sx: { fontSize: '1rem' } }}
                />
                <TextField
                    label="Ratings"
                    name="ratings"
                    type="number"
                    value={theaterData.ratings}
                    onChange={handleTheaterChange}
                    helperText={theaterErrors.ratings || "Enter the ratings"}
                    error={Boolean(theaterErrors.ratings)}
                    InputProps={{ inputProps: { min: 0, max: 5, step: 0.1 } }}
                    FormHelperTextProps={{ sx: { fontSize: '1rem' } }}
                />
                <TextField
                    label="Dimension"
                    name="dimension"
                    value={theaterData.dimension}
                    onChange={handleTheaterChange}
                    helperText={theaterErrors.dimension || "Enter dimension (e.g., 2D, 3D)"}
                    error={Boolean(theaterErrors.dimension)}
                    FormHelperTextProps={{ sx: { fontSize: '1rem' } }}
                />
            </div>
            <div>
                <TextField
                    label="Landscape Photo URL"
                    name="landscape"
                    value={theaterData.landscape}
                    onChange={handleTheaterChange}
                    helperText={theaterErrors.landscape || "Enter the landscape photo URL"}
                    error={Boolean(theaterErrors.landscape)}
                    FormHelperTextProps={{ sx: { fontSize: '1rem' } }}
                />
                <TextField
                    label="Portrait Photo URL"
                    name="portrait"
                    value={theaterData.portrait}
                    onChange={handleTheaterChange}
                    helperText={theaterErrors.portrait || "Enter the portrait photo URL"}
                    error={Boolean(theaterErrors.portrait)}
                    FormHelperTextProps={{ sx: { fontSize: '1rem' } }}
                />
            </div>
            <LocationTextFields
                locationData={locationData}
                handleLocationChange={handleLocationChange}
                locationErrors={locationErrors}
            />
        </Box>
    );
}
