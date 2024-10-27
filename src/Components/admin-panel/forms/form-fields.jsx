import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

const genres = [
    { value: 'ACTION', label: 'Action' },
    { value: 'COMEDY', label: 'Comedy' },
    { value: 'DRAMA', label: 'Drama' },
    { value: 'HORROR', label: 'Horror' },
    { value: 'ROMANCE', label: 'Romance' },
    // Add more genres as needed
];

const statuses = [
    { value: 'NOW_SHOWING', label: 'Now Showing' },
    { value: 'COMING_SOON', label: 'Coming Soon' },
    { value: 'ARCHIVED', label: 'Archived' },
];

export default function MovieTextFields({ formData, handleFormChange, errors }) {
    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '50ch', fontSize: '1rem'},
            }}
            noValidate
            autoComplete="off"
        >
            <div>
                <TextField
                    label="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    helperText={errors.name || "Enter the movie name"}
                    error={Boolean(errors.name)}
                    FormHelperTextProps={{
                        sx: {
                            fontSize: '1rem',
                        },
                    }}
                />
                <TextField
                    label="Duration"
                    name="duration"
                    value={formData.duration}
                    onChange={handleFormChange}
                    helperText={errors.duration || "Enter the duration (e.g., 2h 30m)"}
                    error={Boolean(errors.duration)}
                    FormHelperTextProps={{
                        sx: {
                            fontSize: '1rem',
                        },
                    }}
                />
            </div>
            <div>
                <TextField
                    label="Actor"
                    name="actor"
                    value={formData.actor}
                    onChange={handleFormChange}
                    helperText={errors.actor || "Enter the lead actor's name"}
                    error={Boolean(errors.actor)}
                    FormHelperTextProps={{
                        sx: {
                            fontSize: '1rem',
                        },
                    }}
                />
                <TextField
                    label="Actress"
                    name="actress"
                    value={formData.actress}
                    onChange={handleFormChange}
                    helperText={errors.actress || "Enter the lead actress's name"}
                    error={Boolean(errors.actress)}
                    FormHelperTextProps={{
                        sx: {
                            fontSize: '1rem',
                        },
                    }}
                />
            </div>
            <div>
                <TextField
                    label="Director"
                    name="director"
                    value={formData.director}
                    onChange={handleFormChange}
                    helperText={errors.director || "Enter the director's name"}
                    error={Boolean(errors.director)}
                    FormHelperTextProps={{
                        sx: {
                            fontSize: '1rem',
                        },
                    }}
                />
                <TextField
                    label="Language"
                    name="language"
                    value={formData.language}
                    onChange={handleFormChange}
                    helperText={errors.language || "Enter the language"}
                    error={Boolean(errors.language)}
                    FormHelperTextProps={{
                        sx: {
                            fontSize: '1rem',
                        },
                    }}
                />
            </div>
            <div>
                <TextField
                    label="Trailer URL"
                    name="trailer"
                    value={formData.trailer}
                    onChange={handleFormChange}
                    helperText={errors.trailer || "Enter the trailer URL"}
                    error={Boolean(errors.trailer)}
                    FormHelperTextProps={{
                        sx: {
                            fontSize: '1rem',
                        },
                    }}
                />
                <TextField
                    label="IMDb Rating"
                    name="imdb"
                    type="number"
                    value={formData.imdb}
                    onChange={handleFormChange}
                    helperText={errors.imdb || "Enter the IMDb rating"}
                    error={Boolean(errors.imdb)}
                    InputProps={{
                        inputProps: { min: 0, max: 10, step: 0.1 },
                    }}
                    FormHelperTextProps={{
                        sx: {
                            fontSize: '1rem',
                        },
                    }}
                />
            </div>
            <div>
                <TextField
                    id="outlined-select-genre"
                    select
                    label="Genre"
                    name="genre"
                    value={formData.genre}
                    onChange={handleFormChange}
                    helperText="Select genre"
                    error={Boolean(errors.genre)}
                    FormHelperTextProps={{
                        sx: {
                            fontSize: '1rem',
                        },
                    }}
                >
                    {genres.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    label="Dimension"
                    name="dimension"
                    value={formData.dimension}
                    onChange={handleFormChange}
                    helperText={errors.dimension || "Enter dimension (e.g., 2D, 3D)"}
                    error={Boolean(errors.dimension)}
                    FormHelperTextProps={{
                        sx: {
                            fontSize: '1rem',
                        },
                    }}
                />
            </div>
            <div>
                <TextField
                    label="Portrait Photo URL"
                    name="portrait"
                    value={formData.portrait}
                    onChange={handleFormChange}
                    helperText={errors.portrait || "Enter the portrait photo URL"}
                    error={Boolean(errors.portrait)}
                    FormHelperTextProps={{ sx: { fontSize: '1rem' } }}
                    fullWidth
                />
                <TextField
                    label="Landscape Photo URL"
                    name="landscape"
                    value={formData.landscape}
                    onChange={handleFormChange}
                    helperText={errors.landscape || "Enter the landscape photo URL"}
                    error={Boolean(errors.landscape)}
                    FormHelperTextProps={{ sx: { fontSize: '1rem' } }}
                    fullWidth
                    sx={{ marginTop: '1rem' }} // Optional: Add some spacing between fields
                />
                <TextField
                    id="outlined-select-status"
                    select
                    label="Status"
                    name="status"
                    value={formData.status}
                    onChange={handleFormChange}
                    helperText="Select status"
                    error={Boolean(errors.status)}
                    FormHelperTextProps={{
                        sx: {
                            fontSize: '1rem',
                        },
                    }}
                >
                    {statuses.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
            </div>
        </Box>
    );
}
