import React, { useContext, useEffect, useState } from 'react';
import { AdminContext } from "../admin-context";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import axios from 'axios';
import TheaterTextFields from "../forms/theater-fields";

function AdminTheater() {
    const { setComponentData } = useContext(AdminContext);

    // State for theater and location data, errors, and edit mode
    const [theaterData, setTheaterData] = useState({
        name: '',
        contactNumber: '',
        slogan: '',
        ratings: '',
        dimension: '',
        portrait: '',
        landscape: ''
    });
    const [locationData, setLocationData] = useState({
        district: '',
        city: '',
        lat: '',
        lang: '',
        address: '',
    });
    const [theaterErrors, setTheaterErrors] = useState({});
    const [locationErrors, setLocationErrors] = useState({});
    const [isEditMode, setIsEditMode] = useState(false);

    // Fetch initial theater data from backend on component mount
    useEffect(() => {
        const fetchTheaterData = async () => {
            try {
                const response = await axios.get('/api/theater'); // Mock backend API endpoint
                const data = response.data;
                setTheaterData({
                    name: data.name,
                    contactNumber: data.contactNumber,
                    slogan: data.slogan,
                    ratings: data.ratings,
                    dimension: data.dimension,
                    portrait: data.portrait,
                    landscape: data.landscape
                });
                setLocationData({
                    district: data.location.district,
                    city: data.location.city,
                    lat: data.location.lat,
                    lang: data.location.lang,
                    address: data.location.address,
                });
            } catch (error) {
                console.error("Failed to fetch theater data", error);
            }
        };

        // Set component data in context and fetch theater data
        setComponentData({ title: "Theater", slogan: "Manage your Theater data" });
        fetchTheaterData();
    }, [setComponentData]);

    // Handlers for data change
    const handleTheaterChange = (event) => {
        setTheaterData({
            ...theaterData,
            [event.target.name]: event.target.value,
        });
    };

    const handleLocationChange = (event) => {
        setLocationData({
            ...locationData,
            [event.target.name]: event.target.value,
        });
    };

    // Toggle edit mode
    const handleEditToggle = () => {
        setIsEditMode(!isEditMode);
    };

    // Submit updated data to backend
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.put('/api/theater', {
                ...theaterData,
                location: locationData,
            });
            alert("Theater data updated successfully");
            setIsEditMode(false);
        } catch (error) {
            console.error("Failed to update theater data", error);
            alert("An error occurred while updating the theater data.");
        }
    };

    return (
        <Box
            component="div"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '80%',
                margin: 'auto',
                color: '#ffd700',
                backgroundColor: '#1e1e1e',
                padding: '20px',
                borderRadius: '8px',
                boxShadow: '0px 4px 10px rgba(255, 215, 0, 0.4)'
            }}
        >
            <TheaterTextFields
                theaterData={theaterData}
                handleTheaterChange={handleTheaterChange}
                theaterErrors={theaterErrors}
                locationData={locationData}
                handleLocationChange={handleLocationChange}
                locationErrors={locationErrors}
            />

            <Box sx={{ display: 'flex', justifyContent: 'space-around', mt: 2, width: '100%' }}>
                {isEditMode ? (
                    <Button
                        variant="contained"
                        onClick={handleSubmit}
                        sx={{
                            backgroundColor: '#ffd700',
                            color: '#1e1e1e',
                            '&:hover': { backgroundColor: '#e6be00' },
                        }}
                    >
                        Submit
                    </Button>
                ) : (
                    <Button
                        variant="contained"
                        onClick={handleEditToggle}
                        sx={{
                            backgroundColor: '#ffd700',
                            color: '#1e1e1e',
                            '&:hover': { backgroundColor: '#e6be00' },
                        }}
                    >
                        Edit
                    </Button>
                )}
                <Button
                    variant="outlined"
                    onClick={() => setIsEditMode(false)}
                    sx={{
                        color: '#ffd700',
                        borderColor: '#ffd700',
                        '&:hover': { borderColor: '#e6be00', color: '#e6be00' },
                        ml: 2,
                    }}
                >
                    Change
                </Button>
            </Box>
        </Box>
    );
}

export default AdminTheater;
