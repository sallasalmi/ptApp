import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';


function Traininglist() {

const [trainings, setTrainings] = useState([]);

useEffect(() => {
     fetchTrainings();
}, []);

const fetchTrainings = () => {

   fetch('https://customerrest.herokuapp.com/gettrainings')
   .then(response => response.json())
   .then(data => setTrainings(data))
    .catch(err => console.err(err))
}

const deleteTraining = (id) => {
    if (window.confirm('Are you sure?')) {
    fetch('https://customerrest.herokuapp.com/api/trainings/' + id, {method: 'DELETE'})
    .then(response => {
        if(response.ok)
            fetchTrainings();
        else
            alert('Jokin meni vikaan');
    })
    .catch(err => console.err(err))
 }
} 



const columns = [
    { field: 'date', sortable: true, filter: true },
    { field: 'duration', sortable: true, filter: true },
    { field: 'activity', sortable: true, filter: true },
    { field: 'customer', sortable: true, filter: true },
    { 
        field:'id',
        cellRendererFramework: params => 
        <IconButton color="secondary" onClick={() => deleteTraining(params.value)}><DeleteIcon/></IconButton>
        
        
    }
];



    return (
        <div>
    
        <div className="ag-theme-material" style={{ height: 600, width: '90%', margin: 'auto' }}>
            <AgGridReact
            rowData={trainings}
            columnDefs={columns}
            pagination={true}
            paginationPageSize={8}
            floatingFilter={true}
            suppressCellSelection={true}
            /> 
        </div>
        </div>
    )
};

export default Traininglist;
