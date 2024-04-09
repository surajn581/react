import React, { useState, useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

const columns = [
  { field: 'id', headerName: 'Worker Name', width: 200 },
  { field: 'heartbeat', headerName: 'Timestamp', width: 200 },
  { field: 'stale_by', headerName: 'Staleness (seconds)', width: 200},
]

const WorkerHeartbeatsTable = () => {

  const [rows, setRows] = useState([]);

  const handleUpdateAllRows = () => {
    fetch("/api").then((data)=>data.json()).then((data)=>setRows(data))
  };

  console.log(rows);

  return (
    <div style={{ width: '100%' }}>
      <h3>Worker Heartbeats</h3>
        <Stack direction="row" spacing={1}>
          <Button size="small" onClick={handleUpdateAllRows}>
            fetch heartbeats
          </Button>
        </Stack>
        <DataGrid rows={rows} columns={columns}/>
    </div>
  )
}

export default WorkerHeartbeatsTable