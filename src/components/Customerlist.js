import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCustomer from './AddCustomer';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';


function Customerlist() {

const [customers, setCustomers] = useState([]);

useEffect(() => {
     fetchCustomers();
}, []);

const fetchCustomers = () => {

   fetch('https://customerrest.herokuapp.com/api/customers')
   .then(response => response.json())
   .then(data => setCustomers(data.content))
    .catch(err => console.err(err))
}

const deleteCustomer = (url) => {
    if (window.confirm('Are you sure?')) {
    fetch(url, {method: 'DELETE'})
    .then(response => {
        if(response.ok)
            fetchCustomers();
        else
            alert('Jokin meni vikaan');
    })
    .catch(err => console.err(err))
 }
} 

const addCustomer = (newCustomer) => {
    fetch('https://customerrest.herokuapp.com/api/customers',
    {
        method: 'POST',
        body: JSON.stringify(newCustomer),
        headers: { 'Content-type' : 'application/json' }
    }
    ) 
    .then( _ => fetchCustomers())
    .catch(err => console.error(err))
}



const columns = [
    { field: 'firstname', sortable: true, filter: true },
    { field: 'lastname', sortable: true, filter: true },
    { field: 'streetaddress', sortable: true, filter: true },
    { field: 'postcode', sortable: true, filter: true },
    { field: 'city', sortable: true, filter: true },
    { field: 'email', sortable: true, filter: true },
    { field: 'phone', sortable: true, filter: true},
    { 
        field:'links.0.href',
        cellRendererFramework: params => 
        <IconButton color="secondary" onClick={() => deleteCustomer(params.value)}><DeleteIcon/></IconButton>
        
        
    }

];



    return (
        <div>
    <AddCustomer addCustomer={addCustomer} />
        <div className="ag-theme-material" style={{ height: 600, width: '90%', margin: 'auto' }}>
            <AgGridReact
            rowData={customers}
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

export default Customerlist;