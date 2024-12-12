import React, { useContext, useEffect, useState } from 'react';
import { AdminContext } from "../admin-context";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import axios from 'axios';
import TheaterTextFields from "../forms/theater-fields";
import {useAuthContext} from "@asgardeo/auth-react";
import {fetchTheaterData} from "../../../Services/admin-services";

function AdminTheater() {
    const { setComponentData } = useContext(AdminContext);
    const { state } = useAuthContext();

    const userId = state?.sub.replace(/-/g, "");

    

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

    useEffect(() => {
        setComponentData({ title: "Theater", slogan: "Manage your Theater data" });
    }, [setComponentData]);

    useEffect(() => {
        if(userId) {
            fetchTheaterData(userId).then(data => {
                if (data) {
                    const theaterData = {
                        name: data.name,
                        contactNumber: data.contactNumber,
                        slogan: data.slogan,
                        ratings: data.ratings,
                        dimension: data.dimension,
                        portrait: data.portrait,
                        landscape: data.landscape
                    }

                    const locationData = {
                        district: data.location.district,
                        city: data.location.city,
                        lat: data.location.lat,
                        lang: data.location.lang,
                        address: data.location.address
                    }

                    setTheaterData(theaterData);
                    setLocationData(locationData);
                }
                
            }).catch((error) => {
                console.error("Failed to fetch theater data", error);
            });
        }
    }, [userId]);



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
        

        const location = {
            tid: userId,
            ...locationData
        }
        try {
            const response = await axios.put('http://localhost:8080/api/theaters', {
                ...theaterData,
                tid: userId,
                location: location,
            });
            setIsEditMode(false);

            
        } catch (error) {
            console.error("Failed to update theater data", error);
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
                editable={isEditMode}
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
                            fontSize: '1.5rem',
                            backgroundColor: '#ffd700',
                            padding: '5px 20px',
                            color: '#1e1e1e',
                            '&:hover': { backgroundColor: 'rgba(230,190,0,0.92)' },
                        }}
                    >
                        Edit
                    </Button>
                )}
            </Box>
        </Box>
    );
}

export default AdminTheater;
