import React, { useState, useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'Workitem Name', width: 400 },
  { field: 'time', headerName: 'Block Time', width: 200 },
  { field: 'CLASS_NAME', headerName: 'Workitem Type', width: 200},
]

const WorkPublisherQueueTable = () => {

  const [tableData, setTableData] = useState([])

  const [rows, setRows] = useState(tableData);
  const [deletedRows, setDeletedRows] = useState([]);

  useEffect(() => {
    fetch("/api/workpublisher")
      .then((data) => data.json())
      .then((data) => setTableData(data))

  }, [])

  console.log(tableData);

  return (
    <div style={{ height: 700, width: '100%' }}>
      <h3 style={{marginTop: 100 + 'px'}}>WorkItems</h3>
      <DataGrid
        rows={tableData}
        columns={columns}
        pageSize={40}
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

export default WorkPublisherQueueTable