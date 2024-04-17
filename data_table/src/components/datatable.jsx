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
<div style={{ width: 'fit-content', height: Math.min( 108*rows.length, 400) + 105, overflow:'hidden'}}>
    <div style={{height:45, paddingLeft: '15px', paddingRight: '15px'}} >
        <Stack direction="row" spacing={1}>
            <Button size="small" onClick={handleUpdateAllRows}>
                refresh
            </Button>
            <div style={{textAlign:'center', width:'50%', margin:'0 auto'}}>
                <p style={{font:"'Segoe UI'"}} >{name} </p>
            </div>            
            <div style={{right:'0px', position:'relative'}}>
                <p>size: {rows.length}</p>
            </div>
        </Stack>
    </div>
    <div style={{ height: Math.min( 108*rows.length, 400), width: 'fit-content', overflow: 'auto', alignContent:'end' }}>
        <DataGrid
            rows={rows}
            columns={columns}
            pageSizeOptions={[15, 15, 125]}
            initialState={{
                            pagination: {
                            paginationModel: { pageSize: 15 },
                            },
                        }}
            sx={{
                    fontFamily: '"Segoe UI"',
                    boxShadow: 0.5,
                    border: 1,
                    borderColor: 'black',
                    '& .MuiDataGrid-row:hover': { color: 'blue' },
                    '& .MuiDataGrid-columnHeader': { backgroundColor:'#f0f0f0' },   
                }}
            
        />
    </div>
</div>
)
}

export default DataTable