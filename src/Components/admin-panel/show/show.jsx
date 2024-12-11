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
import { Button, MenuItem, Select, TextField } from "@mui/material";
import CustomizedDialogs from "../forms/add-transaction";
import { AdminContext } from "../admin-context";
import {fetchData, updateData} from "../../../Services/admin-services";
import {useAuthContext} from "@asgardeo/auth-react";

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
    tid: "1111111", // Static theater ID
    mid: '',
    fullPrice: '',
    halfPrice: '',
    timeSlot: '',
    hid: '',
};

export default function AdminShow() {
    const [open, setOpen] = React.useState(false);
    const [formData, setFormData] = useState(initialFormData);
    const [errors, setErrors] = useState({});
    const [shows, setShows] = useState([]);
    const [movies, setMovies] = useState([]);
    const { state} = useAuthContext();

    const userId = state?.sub.replace(/-/g, "");

    const { setComponentData } = useContext(AdminContext);

    useEffect(() => {
        setComponentData({ title: "Show", slogan: "Manage Shows on watchMovie" });
    }, []);

    useEffect(() => {
        fetchData("/movies").then(data => {
            setMovies(data);
            console.log("Movies data:", data);
        });

        fetchData("/theaterMovies").then(data => {
            setShows(data);
            console.log("Shows data:", data);
        });
    }, []);

    const handleClickOpen = (show) => {
        setOpen(true);
        setFormData({
            tid: userId,
            mid: show?.id.mid || '',
            fullPrice: show?.fullPrice || '',
            halfPrice: show?.halfPrice || '',
            timeSlot: show?.id.timeSlot || '',
            hid: show?.hid || '',
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
        if (!formData.mid) {
            hasError = true;
            newErrors.mid = "Movie selection is required";
        }
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

        // Save changes logic (API call can be added here)
        console.log("Saving formData:", formData);

        const newShow = {
            id : {
                tid: userId,
                mid: formData.mid,
                timeSlot: formData.timeSlot
            },
            fullPrice: formData.fullPrice,
            halfPrice: formData.halfPrice,
            hid: formData.hid
        }

        updateData("/theaterMovies", newShow).then(() => {
            fetchData("/theaterMovies").then(data => {
                setShows(data);
                console.log("Shows data:", data);
            });

        });

        setFormData(initialFormData);
        setErrors({});
        setOpen(false);
    };

    return (
        <div className="show-component" style={{ width: '95%', marginLeft: '3%' }}>
            <Button
                variant="contained"
                onClick={() => handleClickOpen()}
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
                    {shows && shows.length !== 0 && (
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align="left">Movie</StyledTableCell>
                                <StyledTableCell align="left">Full Price</StyledTableCell>
                                <StyledTableCell align="left">Half Price</StyledTableCell>
                                <StyledTableCell align="left">Time Slot</StyledTableCell>
                                <StyledTableCell align="left">Hall Id</StyledTableCell>
                            </TableRow>
                        </TableHead>
                    )}
                    <TableBody>
                        {shows.map((show, index) => (
                            <StyledTableRow key={index}>
                                <StyledTableCell align="left">
                                    {movies.find(movie => movie.mid === show.id.mid)?.name || 'Unknown'}
                                </StyledTableCell>
                                <StyledTableCell align="left">{show.fullPrice}</StyledTableCell>
                                <StyledTableCell align="left">{show.halfPrice}</StyledTableCell>
                                <StyledTableCell align="left">{show.id.timeSlot}</StyledTableCell>
                                <StyledTableCell align="left">{show.hid}</StyledTableCell>
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
                    name="mid"
                    value={formData.mid}
                    onChange={handleFormChange}
                    error={Boolean(errors.mid)}
                    sx={{ width: '100%', mb: 2 }}
                >
                    {movies.map((movie) => (
                        <MenuItem key={movie.mid} value={movie.mid}>
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
                <TextField
                    label="Hall Id"
                    name="hid"
                    value={formData.hid}
                    onChange={handleFormChange}
                    fullWidth
                    sx={{ mb: 2 }}
                />
            </CustomizedDialogs>
        </div>
    );
}
