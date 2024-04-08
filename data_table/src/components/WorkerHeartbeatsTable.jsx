import React, { useState, useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'Worker Name', width: 200 },
  { field: 'heartbeat', headerName: 'Timestamp', width: 200 },
  { field: 'stale_by', headerName: 'Staleness (seconds)', width: 200},
]

const WorkerHeartbeatsTable = () => {

  const [tableData, setTableData] = useState([])

  const [rows, setRows] = useState(tableData);
  const [deletedRows, setDeletedRows] = useState([]);

  useEffect(() => {
    fetch("/api")
      .then((data) => data.json())
      .then((data) => setTableData(data))

  }, [])

  console.log(tableData);

  return (
    <div style={{ height: 400, width: '100%' }}>
      <h3>Worker Heartbeats</h3>
      <DataGrid
        rows={tableData}
        columns={columns}
        pageSize={12}
        // checkboxSelection
        onSelectionModelChange={({ selectionModel }) => {
          const rowIds = selectionModel.map(rowId => parseInt(String(rowId), 10));
          const rowsToDelete = tableData.filter(row => rowIds.includes(row.id));
          setDeletedRows(rowsToDelete);
          console.log(deletedRows);
        }}
      />
    </div>
  )
}

export default WorkerHeartbeatsTable