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
import { Tooltip, Button } from "@mui/material";
import { Edit } from "@mui/icons-material";
import CustomizedDialogs from "../forms/add-transaction";
import { AdminContext } from "../admin-context";
import HallTextFields from "../forms/hall-fields";
import {useAuthContext} from "@asgardeo/auth-react";
import axios from "axios";
import {fetchData} from "../../../Services/admin-services";

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

// Initial data structure for the hall form
const initialHallData = {
    index: 0,
    hallId: 0,
    seats: 0,
    nrows: 0,
    columns: 0,
};

export default function AdminHall() {
    const [open, setOpen] = React.useState(false);
    const [hallData, setHallData] = useState(initialHallData);
    const [errors, setErrors] = useState({});
    const [halls, setHalls] = React.useState([]);

    const { state, signIn, signOut } = useAuthContext();

    const userId = state?.sub.replace(/-/g, "");

    const { setComponentData } = useContext(AdminContext);

    useEffect(() => {
        setComponentData({ "title": "Hall", "slogan": "Manage Halls for Theater" });
    }, []);

    useEffect(() => {
        // Fetch halls from API and set the state
        console.log("Fetching halls...");

        if (userId) {
            fetchData(`/halls/${userId}`).then(data => setHalls(data));
        }
    }, [userId]);

    const handleClickOpen = (index, hall) => {
        setOpen(true);
        setHallData({
            index: index,
            hallId: hall.hallId,
            seats: hall.seats,
            nrows: hall.nrows,
            columns: hall.columns,
        });
    };

    const handleClose = () => {
        setOpen(false);
        setHallData(initialHallData);
        setErrors({});
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setHallData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: !value,
        }));
    };

    const handleSaveChanges = async () => {
        let hasError = false;
        let newErrors = {};

        // Validate required fields
        if (!hallData.seats) {
            hasError = true;
            newErrors.seats = "Number of seats is required";
        }
        if (!hallData.nrows) {
            hasError = true;
            newErrors.nrows = "Number of rows is required";
        }
        if (!hallData.columns) {
            hasError = true;
            newErrors.columns = "Number of columns is required";
        }

        if (hasError) {
            setErrors(newErrors);
            return;
        }

        try {
            const response = await axios.put('http://localhost:8080/api/halls', {
                ...hallData,
                id: {tid: userId},
            });
            console.log("Here response", response.data);
        } catch (error) {
            console.error("Failed to update theater data", error);
        }

        setHallData(initialHallData);
        setErrors({});
        setOpen(false);
    };

    return (
        <div className="hall-component" style={{ width: '95%', marginLeft: '3%' }}>
            <Button
                variant="contained"
                onClick={() => setOpen(true)}
                sx={{
                    backgroundColor: '#ffd700',
                    color: 'black',
                    marginTop: '4%',
                    fontSize: '1.6rem',
                    '&:hover': { backgroundColor: '#e6c200' }
                }}
            >
                Add Hall
            </Button>

            <TableContainer component={Paper} style={{ marginTop: '4%', marginBottom: "15%" }}>
                <Table sx={{ minWidth: 200 }} aria-label="hall table">
                    {
                        halls.length !== 0 &&
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align={'left'}>Seats</StyledTableCell>
                                <StyledTableCell align={'left'}>Rows</StyledTableCell>
                                <StyledTableCell align={'left'}>Columns</StyledTableCell>
                                <StyledTableCell align={'center'}>Actions</StyledTableCell>
                            </TableRow>
                        </TableHead>
                    }
                    <TableBody>
                        {halls.map((hall, index) => (
                            <StyledTableRow key={index}>
                                <StyledTableCell align="left">{hall.seats}</StyledTableCell>
                                <StyledTableCell align="left">{hall.nrows}</StyledTableCell>
                                <StyledTableCell align="left">{hall.columns}</StyledTableCell>
                                <StyledTableCell align="center">
                                    <Tooltip title="Edit" placement="left">
                                        <Edit onClick={() => handleClickOpen(index, hall)} />
                                    </Tooltip>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <CustomizedDialogs
                title={"Edit Hall"}
                open={open}
                handleClose={handleClose}
                handleSaveChanges={handleSaveChanges}
            >
                <HallTextFields
                    hallData={hallData}
                    handleFormChange={handleFormChange}
                    errors={errors}
                />
            </CustomizedDialogs>
        </div>
    );
}
