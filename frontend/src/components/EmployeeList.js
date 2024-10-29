import React, { useEffect, useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography,
  Button, IconButton, TextField, MenuItem, FormControl, InputLabel, Select, InputAdornment,
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Pagination, Box, Grid, Checkbox, FormControlLabel
} from '@mui/material';
import { AddCircle, Edit, Delete, FileDownload } from '@mui/icons-material';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EmployeeList = () => {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    personalDetails: {
      dateOfBirth: '',
      gender: '',
      contactInformation: {
        phone: ''
      }
    },
    jobTitle: '',
    workEmail: '',
    department: '',
    status: 'Active',
    payRate: '',
    startDate: ''
  });

  const [employees, setEmployees] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [errors, setErrors] = useState({});
  const itemsPerPage = 10;
  const navigate = useNavigate();

  // Manage which columns to display
  const [columns, setColumns] = useState({
    name: true,
    jobTitle: true,
    payRate: true,
    workEmail: true,
    phoneNumber: true,
    status: true,
    department: true,
    gender: true,
    startDate: true
  });

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    try {
      const result = await axios.get('http://localhost:8080/api/employees');
      setEmployees(result.data);
      console.log(result.data);
    } catch (error) {
      console.error('Error loading employees:', error);
    }
  };

  const deleteEmployee = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/employees/${id}`);
      loadEmployees();
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  const filteredEmployees = employees
    .filter((employee) => {
      const matchesSearchTerm = employee.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.jobTitle.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesDepartment = !filterDepartment || employee.department === filterDepartment;

      return matchesSearchTerm && matchesDepartment;
    })
    .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const pageCount = Math.ceil(employees.length / itemsPerPage);

  const handleColumnToggle = (columnName) => {
    setColumns((prevColumns) => ({
      ...prevColumns,
      [columnName]: !prevColumns[columnName]
    }));
  };

  const handleAddEmployee = async () => {
    const newErrors = {};

    if (!form.firstName) {
      newErrors.firstName = "First Name is required";
    }
    if (!form.lastName) {
      newErrors.lastName = "Last Name is required";
    }
    if (!form.department) {
      newErrors.department = "Department is required";
    }
    if (!form.jobTitle) {
      newErrors.jobTitle = "Job Title is required";
    }
    if (!form.workEmail) {
      newErrors.workEmail = "Work Email is required";
    }
    // ... add validation for other required fields

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return; // Prevent form submission
    }
    try {
      await axios.post("http://localhost:8080/api/employees/add", form);
      setIsModalOpen(false);
      loadEmployees();
    } catch (error) {
      console.error("Error adding employee:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('personalDetails.contactInformation')) {
      const field = name.split('.')[2]; // Extract the nested field name
      setForm((prevForm) => ({
        ...prevForm,
        personalDetails: {
          ...prevForm.personalDetails,
          contactInformation: {
            ...prevForm.personalDetails.contactInformation,
            [field]: value
          }
        }
      }));
    } else if (name.startsWith('personalDetails')) {
      const field = name.split('.')[1];
      setForm((prevForm) => ({
        ...prevForm,
        personalDetails: {
          ...prevForm.personalDetails,
          [field]: value
        }
      }));
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      {/* Header */}
      <Grid container justifyContent="space-between" alignItems="center" style={{ marginBottom: '20px' }}>
        <Typography variant="h4">Employee List</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddCircle />}
          onClick={() => setIsModalOpen(true)}
        >
          Add Employee
        </Button>
      </Grid>

      {/* Search and Filters */}
      <Grid container spacing={2} style={{ marginBottom: '20px' }}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <FormControl fullWidth>
            <InputLabel>Department</InputLabel>
            <Select
              value={filterDepartment}
              onChange={(e) => setFilterDepartment(e.target.value)}
            >
              <MenuItem value="">All Departments</MenuItem>
              <MenuItem value="Sales">Sales</MenuItem>
              <MenuItem value="IT">IT</MenuItem>
              <MenuItem value="HR">HR</MenuItem>
              <MenuItem value="Admin">Admin</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Button variant="contained" color="success" startIcon={<FileDownload />}>
            Export as Excel
          </Button>
        </Grid>
      </Grid>

      {/* Column Display Toggles */}
      <Grid container spacing={1} style={{ marginBottom: '10px' }}>
        {Object.keys(columns).map((column) => (
          <Grid item key={column}>
            <FormControlLabel
              control={<Checkbox checked={columns[column]} onChange={() => handleColumnToggle(column)} />}
              label={column.charAt(0).toUpperCase() + column.slice(1)}
            />
          </Grid>
        ))}
      </Grid>

      {/* Employee Table */}
      <TableContainer component={Paper} style={{ maxHeight: '500px', overflowY: 'scroll' }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#e0e0e0' }}>
              {columns.name && <TableCell sx={{ fontWeight: 'bold' }}>Full Name</TableCell>}
              {columns.jobTitle && <TableCell sx={{ fontWeight: 'bold' }}>Job Title</TableCell>}
              {columns.payRate && <TableCell sx={{ fontWeight: 'bold' }}>Pay Rate</TableCell>}
              {columns.workEmail && <TableCell sx={{ fontWeight: 'bold' }}>Work Email</TableCell>}
              {columns.phoneNumber && <TableCell sx={{ fontWeight: 'bold' }}>Peronal Phone</TableCell>}
              {columns.status && <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>}
              {columns.department && <TableCell sx={{ fontWeight: 'bold' }}>Department</TableCell>}
              {columns.gender && <TableCell sx={{ fontWeight: 'bold' }}>Gender</TableCell>}
              {columns.startDate && <TableCell sx={{ fontWeight: 'bold' }}>Start Date</TableCell>}
              <TableCell sx={{ fontWeight: 'bold', position: 'sticky', right: 0, backgroundColor: '#fff' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredEmployees.map((employee) => (
              <TableRow key={employee.id} onClick={() => navigate(`/userprofile/${employee.id}`)}
                hover>
                {columns.name && <TableCell>{`${employee.firstName} ${employee.lastName}`}</TableCell>}
                {columns.jobTitle && <TableCell>{employee.jobTitle}</TableCell>}
                {columns.payRate && <TableCell>{employee.payRate}</TableCell>}
                {columns.workEmail && <TableCell>{employee.workEmail}</TableCell>}
                {columns.phoneNumber && <TableCell>{employee.personalDetails.contactInformation.phone}</TableCell>}
                {columns.status && (
                  <TableCell>
                    <span className={`status-badge ${employee.status === 'Active' ? 'bg-green-500' :
                      employee.status === 'On Leave' ? 'bg-yellow-500' : 'bg-red-500'}`}>
                      {employee.status}
                    </span>
                  </TableCell>
                )}
                {columns.department && <TableCell>{employee.department}</TableCell>}
                {columns.gender && <TableCell>{employee.personalDetails.gender}</TableCell>}
                {columns.startDate && <TableCell>{employee.startDate}</TableCell>}
                <TableCell>
                  <IconButton key={employee.id} color="primary" onClick={(e) => {
                    console.log(`/edituserprofile/${employee.id}`)
                    navigate(`/edituserprofile/${employee.id}`)
                    e.stopPropagation(); // Prevent row click from triggering
                    console.log(`Edit ${employee.id}`);
                  }}>
                    <Edit />
                  </IconButton>
                  <IconButton color="secondary" onClick={(e) => {
                    e.stopPropagation(); // Prevent row click from triggering
                    deleteEmployee(employee.id)
                  }}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <Pagination
        count={pageCount}
        page={currentPage}
        onChange={(event, page) => setCurrentPage(page)}
        style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}
      />

      {/* Modal for Adding Employee */}
      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <DialogTitle>Add New Employee</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please fill out the form to add a new employee.
          </DialogContentText>
          <TextField
            fullWidth
            margin="normal"
            name="firstName"
            label="First Name"
            value={form.firstName}
            onChange={handleChange}
            required
            error={!!errors.firstName} // Show error state if error exists
            helperText={errors.firstName} // Display error message
          />
          <TextField
            fullWidth
            margin="normal"
            name="lastName"
            label="Last Name"
            value={form.lastName}
            onChange={handleChange}
            required
            error={!!errors.lastName} // Show error state if error exists
            helperText={errors.lastName} // Display error message
          />
          <TextField
            fullWidth
            margin="normal"
            name="department"
            label="Department"
            value={form.department}
            onChange={handleChange}
            required
            error={!!errors.lastName} // Show error state if error exists
            helperText={errors.lastName} // Display error message
            select
          >
            <MenuItem value="IT">IT</MenuItem>
            <MenuItem value="ADMIN">ADMIN</MenuItem>
            <MenuItem value="FINANCE">FINANCE</MenuItem>
            <MenuItem value="HR">HR</MenuItem>
          </TextField>
          <TextField
            fullWidth
            margin="normal"
            name="jobTitle"
            label="Job Title"
            value={form.jobTitle}
            onChange={handleChange}
            error={!!errors.jobTitle} // Show error state if error exists
            helperText={errors.jobTitle} // Display error message
            required
          />
          <TextField
            fullWidth
            margin="normal"
            name="workEmail"
            label="Work Email"
            value={form.workEmail}
            onChange={handleChange}
            error={!!errors.workEmail} // Show error state if error exists
            helperText={errors.workEmail} // Display error message
            required
            type="email"
          />
          <TextField
            fullWidth
            margin="normal"
            name="personalDetails.contactInformation.phone"
            label="Peronal Phone"
            value={form.personalDetails.contactInformation.phone}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            name="personalDetails.dateOfBirth"
            label="Date of Birth"
            value={form.personalDetails.dateOfBirth}
            onChange={handleChange}
            required
            type="date"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            fullWidth
            margin="normal"
            name="personalDetails.gender"
            label="Gender"
            value={form.personalDetails.gender}
            onChange={handleChange}
            required
            select
          >
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
            <MenuItem value="other">Other</MenuItem>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsModalOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleAddEmployee} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>

    </div>
  );
};

export default EmployeeList;
