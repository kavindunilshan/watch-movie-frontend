import * as React from 'react';
import {useState, useEffect, useContext} from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Tooltip, Button } from "@mui/material";
import { Edit } from "@mui/icons-material";
import CustomizedDialogs from "../forms/add-transaction";
import MovieTextFields from "../forms/form-fields";
import {AdminContext} from "../admin-context";
import {createData, fetchData} from "../../../Services/admin-services";

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

// Initial data structure for the movie form
const initialFormData = {
    index: 0,
    mid: 0,
    name: '',
    duration: '',
    actor: '',
    actress: '',
    director: '',
    language: '',
    trailer: '',
    imdb: '',
    genre: '',
    dimension: '',
    status: '',
    portrait: '',
    landscape: '',
};

export default function AdminMovies() {
    const [open, setOpen] = React.useState(false);
    const [formData, setFormData] = useState(initialFormData);
    const [errors, setErrors] = useState({});
    const [movies, setMovies] = React.useState([]);

    const { setComponentData } = useContext(AdminContext);

    useEffect(() => {
        setComponentData({"title": "Movie", "slogan": "Manage Movies on watchMovie"});
    }, []);

    useEffect(() => {
        fetchData('/movies').then(data => setMovies(data));
    }, []);

    const handleClickOpen = (index, movie) => {
        setOpen(true);
        setFormData({
            index: index,
            mid: movie.mid,
            name: movie.name,
            duration: movie.duration,
            actor: movie.actor,
            actress: movie.actress,
            director: movie.director,
            language: movie.language,
            trailer: movie.trailer,
            imdb: movie.imdb,
            genre: movie.genre,
            dimension: movie.dimension,
            status: movie.status,
            portrait: movie.portrait,
            landscape: movie.landscape
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
        if (!formData.name) {
            hasError = true;
            newErrors.name = "Name is required";
        }

        if (hasError) {
            setErrors(newErrors);
            return;
        }

        const newMovie = { ...formData }
        delete newMovie.index;

        createData('/movies', newMovie).then(
            (data) => {
                console.log("Movie created successfully", data);
            }
        ).catch(
            (error) => {
                console.error("Failed to create movie", error);
            }
        );

        if (formData.mid === 0) {
            setMovies([...movies, formData]);
        } else {
            const updatedMovies = [...movies];
            updatedMovies[formData.index] = formData;
            setMovies(updatedMovies);
        }

        setFormData(initialFormData);
        setErrors({});
        setOpen(false);
    };

    return (
        <div className="movie-component" style={{ width: '95%', marginLeft: '3%' }}>
            <Button
                variant="contained"
                onClick={() => setOpen(true)}
                sx={{
                    backgroundColor: '#ffd700',
                    color: 'black',
                    marginTop: '4%',
                    fontSize: '1.6rem',
                    '&:hover': { backgroundColor: '#e6c200' } }}
            >
                Add Movie
            </Button>

            <TableContainer component={Paper} style={{ marginTop: '4%', marginBottom: "15%" }}>
                <Table sx={{ minWidth: 200 }} aria-label="movie table">
                    {
                        movies.length !== 0 &&
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align={'left'}>Name</StyledTableCell>
                                <StyledTableCell align={'left'}>Duration</StyledTableCell>
                                <StyledTableCell align={'left'}>Actor</StyledTableCell>
                                <StyledTableCell align={'left'}>Actress</StyledTableCell>
                                <StyledTableCell align={'left'}>Director</StyledTableCell>
                                <StyledTableCell align={'left'}>Language</StyledTableCell>
                                <StyledTableCell align={'left'}>IMDB</StyledTableCell>
                                <StyledTableCell align={'left'}>Genre</StyledTableCell>
                                <StyledTableCell align={'left'}>Dimension</StyledTableCell>
                                <StyledTableCell align={'left'}>Status</StyledTableCell>
                                <StyledTableCell align={'center'}>Actions</StyledTableCell>
                            </TableRow>
                        </TableHead>
                    }
                    <TableBody>
                        {movies.map((movie, index) => (
                            <StyledTableRow key={index}>
                                <StyledTableCell align="left">{movie.name}</StyledTableCell>
                                <StyledTableCell align="left">{movie.duration}</StyledTableCell>
                                <StyledTableCell align="left">{movie.actor}</StyledTableCell>
                                <StyledTableCell align="left">{movie.actress}</StyledTableCell>
                                <StyledTableCell align="left">{movie.director}</StyledTableCell>
                                <StyledTableCell align="left">{movie.language}</StyledTableCell>
                                <StyledTableCell align="left">{movie.imdb}</StyledTableCell>
                                <StyledTableCell align="left">{movie.genre}</StyledTableCell>
                                <StyledTableCell align="left">{movie.dimension}</StyledTableCell>
                                <StyledTableCell align="left">{movie.status}</StyledTableCell>
                                <StyledTableCell align="center">
                                    <Tooltip title="Edit" placement="left">
                                        <Edit onClick={() => handleClickOpen(index, movie)} />
                                    </Tooltip>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <CustomizedDialogs
                title={"Add Movie"}
                open={open}
                handleClose={handleClose}
                handleSaveChanges={handleSaveChanges}
            >
                <MovieTextFields
                    formData={formData}
                    handleFormChange={handleFormChange}
                    errors={errors}
                />
            </CustomizedDialogs>
        </div>
    );
}
