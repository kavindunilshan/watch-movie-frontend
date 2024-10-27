import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function LocationTextFields({ locationData, handleLocationChange, locationErrors }) {
    return (
        <Box
            component="div"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '50ch', fontSize: '1rem' },
            }}
            noValidate
            autoComplete="off"
        >
            <div>
                <TextField
                    label="District"
                    name="district"
                    value={locationData.district}
                    onChange={handleLocationChange}
                    helperText={locationErrors.district || "Enter the district"}
                    error={Boolean(locationErrors.district)}
                    FormHelperTextProps={{ sx: { fontSize: '1rem' } }}
                />
                <TextField
                    label="City"
                    name="city"
                    value={locationData.city}
                    onChange={handleLocationChange}
                    helperText={locationErrors.city || "Enter the city"}
                    error={Boolean(locationErrors.city)}
                    FormHelperTextProps={{ sx: { fontSize: '1rem' } }}
                />
            </div>
            <div>
                <TextField
                    label="Latitude"
                    name="lat"
                    type="number"
                    value={locationData.lat}
                    onChange={handleLocationChange}
                    helperText={locationErrors.lat || "Enter latitude"}
                    error={Boolean(locationErrors.lat)}
                    FormHelperTextProps={{ sx: { fontSize: '1rem' } }}
                />
                <TextField
                    label="Longitude"
                    name="lang"
                    type="number"
                    value={locationData.lang}
                    onChange={handleLocationChange}
                    helperText={locationErrors.lang || "Enter longitude"}
                    error={Boolean(locationErrors.lang)}
                    FormHelperTextProps={{ sx: { fontSize: '1rem' } }}
                />
            </div>
            <div>
                <TextField
                    label="Address"
                    name="address"
                    value={locationData.address}
                    onChange={handleLocationChange}
                    helperText={locationErrors.address || "Enter the address"}
                    error={Boolean(locationErrors.address)}
                    multiline
                    rows={2}
                    sx={{ width: '57ch' }}
                    FormHelperTextProps={{ sx: { fontSize: '1rem' } }}
                />
            </div>
        </Box>
    );
}
