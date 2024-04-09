import React, { useState, useEffect } from 'react'
import DataTable from './datatable';

const WorkerHeartbeatsTable = () => {

  const columns = [
    { field: 'id', headerName: 'Worker Name', width: 200 },
    { field: 'heartbeat', headerName: 'Timestamp', width: 200 },
    { field: 'stale_by', headerName: 'Staleness (seconds)', width: 200},
  ]

  return (
    <DataTable name='Worker Hearbeats' route='/api' columns={columns} />
  )
}

export default WorkerHeartbeatsTable