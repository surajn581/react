import React, { useState, useEffect } from 'react'
import DataTable from './datatable'

const WorkPublisherQueueTable = () => {

  const columns = [
    { field: 'id', headerName: 'Workitem Name', width: 400 },
    { field: 'time', headerName: 'Block Time', width: 200 },
    { field: 'CLASS_NAME', headerName: 'Workitem Type', width: 200},
  ]

  return (
    <DataTable name='Work Items' route='/api/workpublisher' columns={columns} refreshInterval={15}/>
  )
}

export default WorkPublisherQueueTable