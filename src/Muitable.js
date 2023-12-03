import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow,Checkbox } from "@mui/material"
import { useEffect, useState } from "react"
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const Muitable = () => {
    const columns=[
        { id: 'checkbox', name: 'Checkbox' },
        { id: 'id', name: 'Id' },
        {id:'name',name:'Name'},
        {id:'email',name:'Email'},
        {id:'role',name:'Role'},
        {id:'action',name:'Actions'}

    ]
    const handleEdit = (id) => {
        
        console.log(`Editing row with ID ${id}`);
    }

    const handleDelete = (id) => {
        
        console.log(`Deleting row with ID ${id}`);
    }

    const handleChangePage=(event,newpage)=>{
        pageChange(newpage)
    }
    const handleRowsPerPage = (event) => {
        rowperpageChange(+event.target.value)
        pageChange(0);
    }
    const[rows,rowChange] = useState([]);
    const[page,pageChange] = useState(0);
    const[rowsperpage,rowperpageChange] = useState(8);
    useEffect(()=> {
     fetch("https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json").then(resp=>{
        return resp.json();
     }).then(resp => {
       rowChange(resp);
     }).catch(e =>{
        console.log(e.message);
     })
    },[])
    const handleCheckboxChange = (event, rowIndex) => {
        
        console.log(`Checkbox at row ${rowIndex} is checked: ${event.target.checked}`);
    }
 return (
    <div style={{textAlign: 'center'}}>
        <h1>MUI Table</h1>
        <Paper sx = {{width:'90%', marginLeft:'5%'}}>
 <TableContainer>
    <Table>
  <TableHead>
    <TableRow>
        
    {columns.map((column) => (
                                    <TableCell key={column.id}>
                                        {column.id === 'checkbox' ? (
                                            <Checkbox
                                                onChange={(event) => handleCheckboxChange(event, -1)} // -1 indicates header checkbox
                                            />
                                        ) : (
                                            column.name
                                        )}
                                    </TableCell>
                                ))}

    </TableRow>
  </TableHead>
  <TableBody>
    {rows && rows
    .slice(page * rowsperpage, page*rowsperpage + rowsperpage)
    .map((row,i)=> {
        return (
            <TableRow key={i}>
            <TableCell>
                <Checkbox onChange={(event) => handleCheckboxChange(event, i)} />
            </TableCell>
            <TableCell>{row.id}</TableCell>
            <TableCell>{row.name}</TableCell>
            <TableCell>{row.email}</TableCell>
            <TableCell>{row.role}</TableCell>
            
            <TableCell>
                                            <EditIcon onClick={() => handleEdit(row.id)} />
                                            <DeleteIcon onClick={() => handleDelete(row.id)} />
                                        </TableCell>
        </TableRow>
        )
        })}
  </TableBody>
    </Table>
 </TableContainer>
 <TablePagination
 rowsPerPageOptions={[8,16,24]}
 rowsPerPage={rowsperpage}
 page={page}
 count = {rows.length}
 component="div"
 onPageChange={handleChangePage}
 onRowsPerPageChange={handleRowsPerPage}>

 </TablePagination>
        </Paper>
    </div>
 )
}

export default Muitable;