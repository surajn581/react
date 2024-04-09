import React, { useState, useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

const DataTable = ({name, route, columns, refreshInterval = 5}) => {

const handleUpdateAllRows = () => {
    fetch(route).then((data)=>data.json()).then((data)=>setRows(data))
    };

const [rows, setRows] = useState([]);

if (rows.length >0){} else { handleUpdateAllRows() }

useEffect(() => {
    const interval = setInterval(() => handleUpdateAllRows(), refreshInterval*1000);
    return () => clearInterval(interval);
  }, []);

return (
<div style={{ width: '100%' }}>
    <h3>{name} || size: {rows.length}</h3>
    <Stack direction="row" spacing={1}>
        <Button size="small" onClick={handleUpdateAllRows}>
        refresh
        </Button>
    </Stack>
    <DataGrid rows={rows} columns={columns}/>
</div>
)
}

export default DataTable