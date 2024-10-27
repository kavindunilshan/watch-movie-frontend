import * as React from 'react';
import { useState, useEffect, useContext } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Tooltip, Button, MenuItem, Select, TextField } from "@mui/material";
import { Edit } from "@mui/icons-material";
import CustomizedDialogs from "../forms/add-transaction";
import { AdminContext } from "../admin-context";

// Styled components for table cells
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: 'var(--chart-header-color)',
        color: theme.palette.common.black,
        fontSize: 18,
        padding: '18px 10px',
    },
    [`&.${tableCellClasses.body}`]: {
        backgroundColor: 'var(--chart-row-color)',
        color: 'var(--chart-text-color)',
        fontSize: 16,
        padding: '18px 10px',
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: 'rgba(50,4,64,0.05)',
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

// Initial data structure for the show form
const initialFormData = {
    index: 0,
    showId: 0,
    movieId: '',
    fullPrice: '',
    halfPrice: '',
    timeSlot: '',
};

export default function AdminShow() {
    const [open, setOpen] = React.useState(false);
    const [formData, setFormData] = useState(initialFormData);
    const [errors, setErrors] = useState({});
    const [shows, setShows] = useState([]);
    const [movies, setMovies] = useState([]);

    const { setComponentData } = useContext(AdminContext);

    useEffect(() => {
        setComponentData({ title: "Show", slogan: "Manage Shows on watchMovie" });
    }, []);

    useEffect(() => {
        // Fetch shows from API and set the state
        // Example: fetchShows().then(data => setShows(data));
        console.log("Fetching shows...");

        // Fetch movies list for the dropdown
        fetchMovies().then(data => setMovies(data));
    }, []);

    const fetchMovies = async () => {
        // Dummy API request to fetch movies
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve([
                    { movieId: 1, name: 'Inception' },
                    { movieId: 2, name: 'Interstellar' },
                    { movieId: 3, name: 'Tenet' },
                ]);
            }, 1000);
        });
    };

    const handleClickOpen = (index, show) => {
        setOpen(true);
        setFormData({
            index: index,
            showId: show.showId,
            movieId: show.movieId,
            fullPrice: show.fullPrice,
            halfPrice: show.halfPrice,
            timeSlot: show.timeSlot,
        });
    };

    const handleClose = () => {
        setOpen(false);
        setFormData(initialFormData);
        setErrors({});
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: !value,
        }));
    };

    const handleSaveChanges = () => {
        let hasError = false;
        let newErrors = {};

        // Validate required fields
        if (!formData.fullPrice) {
            hasError = true;
            newErrors.fullPrice = "Full price is required";
        }
        if (!formData.timeSlot) {
            hasError = true;
            newErrors.timeSlot = "Time slot is required";
        }

        if (hasError) {
            setErrors(newErrors);
            return;
        }

        // Update show data
        setFormData(initialFormData);
        setErrors({});
        setOpen(false);
    };

    return (
        <div className="show-component" style={{ width: '95%', marginLeft: '3%' }}>
            <Button
                variant="contained"
                onClick={() => setOpen(true)}
                sx={{
                    backgroundColor: '#ffd700',
                    color: 'black',
                    marginTop: '4%',
                    fontSize: '1.6rem',
                    '&:hover': { backgroundColor: '#e6c200' },
                }}
            >
                Add Show
            </Button>

            <TableContainer component={Paper} style={{ marginTop: '4%', marginBottom: "15%" }}>
                <Table sx={{ minWidth: 200 }} aria-label="show table">
                    {shows.length !== 0 && (
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align="left">Movie</StyledTableCell>
                                <StyledTableCell align="left">Full Price</StyledTableCell>
                                <StyledTableCell align="left">Half Price</StyledTableCell>
                                <StyledTableCell align="left">Time Slot</StyledTableCell>
                                <StyledTableCell align="center">Actions</StyledTableCell>
                            </TableRow>
                        </TableHead>
                    )}
                    <TableBody>
                        {shows.map((show, index) => (
                            <StyledTableRow key={index}>
                                <StyledTableCell align="left">
                                    {movies.find(movie => movie.movieId === show.movieId)?.name || 'Unknown'}
                                </StyledTableCell>
                                <StyledTableCell align="left">{show.fullPrice}</StyledTableCell>
                                <StyledTableCell align="left">{show.halfPrice}</StyledTableCell>
                                <StyledTableCell align="left">{show.timeSlot}</StyledTableCell>
                                <StyledTableCell align="center">
                                    <Tooltip title="Edit" placement="left">
                                        <Edit onClick={() => handleClickOpen(index, show)} />
                                    </Tooltip>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <CustomizedDialogs
                title="Edit Show"
                open={open}
                handleClose={handleClose}
                handleSaveChanges={handleSaveChanges}
            >
                <Select
                    label="Movie"
                    name="movieId"
                    value={formData.movieId}
                    onChange={handleFormChange}
                    sx={{ width: '100%', mb: 2 }}
                >
                    {movies.map((movie) => (
                        <MenuItem key={movie.movieId} value={movie.movieId}>
                            {movie.name}
                        </MenuItem>
                    ))}
                </Select>
                <TextField
                    label="Full Price"
                    name="fullPrice"
                    value={formData.fullPrice}
                    onChange={handleFormChange}
                    error={Boolean(errors.fullPrice)}
                    helperText={errors.fullPrice || "Enter full price"}
                    fullWidth
                    sx={{ mb: 2 }}
                />
                <TextField
                    label="Half Price"
                    name="halfPrice"
                    value={formData.halfPrice}
                    onChange={handleFormChange}
                    fullWidth
                    sx={{ mb: 2 }}
                />
                <TextField
                    label="Time Slot"
                    name="timeSlot"
                    value={formData.timeSlot}
                    onChange={handleFormChange}
                    error={Boolean(errors.timeSlot)}
                    helperText={errors.timeSlot || "Enter time slot (e.g., 10:00 AM)"}
                    fullWidth
                    sx={{ mb: 2 }}
                />
            </CustomizedDialogs>
        </div>
    );
}
