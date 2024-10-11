import React from 'react'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelect({value, items, label, onChange}) {
  const handleChange = (event) => {
    onChange(event.target.value);
  }
  return (
    <Box sx={{ minWidth: 120}}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          label="Age"
          onChange={(event, key) => onChange(event, key)}
          sx={{fontSize: "12px"}}
        >
          {Array.isArray(items) ? items.map((item, index) => {
                return <MenuItem key={index} name={index} value={item.id.timeSlot}>{item.id.timeSlot}</MenuItem>;
          }): ""}
          
        </Select>
      </FormControl>
    </Box>
  );
}