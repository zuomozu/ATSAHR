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

const JobPostingList = () => {
  const [form, setForm] = useState({
    jobRole: '',
    department: '',
    location: '',
    description: '',
    requirements: [],
    salaryRange: { min: '', max: '' },
    startingDate: '',
    closingDate: '',
    numberOfPositions: 1,
    mode: '',
    type: '',
    payType: '',
    hiringManagers: [],
    talentAcquisitionTeam: [],
    requiredSkills: [],
    preferredSkills: [],
    status: 'DRAFT'
  });

  const [jobPostings, setJobPostings] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [errors, setErrors] = useState({});
  const itemsPerPage = 10;
  const navigate = useNavigate();

  const [columns, setColumns] = useState({
    jobRole: true,
    department: true,
    location: true,
    startingDate: true,
    closingDate: true,
    numberOfPositions: true,
    numberOfApplicants: true,
    status: true,
    mode: true,
    type: true
  });

  useEffect(() => {
    loadJobPostings();
  }, []);

  const loadJobPostings = async () => {
    try {
      const result = await axios.get('http://localhost:8080/api/jobpostings',{
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`
        }
      });
      setJobPostings(result.data);
    } catch (error) {
      console.error('Error loading job postings:', error);
    }
  };

  const deleteJobPosting = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/jobpostings/${id}`,{
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`
        }
      });
      loadJobPostings();
    } catch (error) {
      console.error('Error deleting job posting:', error);
    }
  };

  const filteredJobPostings = jobPostings
    .filter((posting) => {
      const matchesSearchTerm = posting.jobRole.toLowerCase().includes(searchTerm.toLowerCase()) ||
        posting.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesDepartment = !filterDepartment || posting.department === filterDepartment;

      return matchesSearchTerm && matchesDepartment;
    })
    .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const pageCount = Math.ceil(jobPostings.length / itemsPerPage);

  const handleColumnToggle = (columnName) => {
    setColumns((prevColumns) => ({
      ...prevColumns,
      [columnName]: !prevColumns[columnName]
    }));
  };

  const handleAddJobPosting = async () => {
    const newErrors = {};

    if (!form.jobRole) newErrors.jobRole = "Job Role is required";
    if (!form.department) newErrors.department = "Department is required";
    //if (!form.startingDate) newErrors.startingDate = "Starting Date is required";
    //if (!form.closingDate) newErrors.closingDate = "Closing Date is required";
    if (!form.mode) newErrors.mode = "Work Mode is required";
    if (!form.type) newErrors.type = "Job Type is required";
    if (!form.payType) newErrors.payType = "Pay Type is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await axios.post("http://localhost:8080/api/jobpostings/addJob/", form, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`
        }
      });
      setIsModalOpen(false);
      loadJobPostings();
    } catch (error) {
      console.error("Error adding job posting:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('salaryRange.')) {
      const field = name.split('.')[1];
      setForm((prevForm) => ({
        ...prevForm,
        salaryRange: {
          ...prevForm.salaryRange,
          [field]: value
        }
      }));
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <Grid container justifyContent="space-between" alignItems="center" style={{ marginBottom: '20px' }}>
        <Typography variant="h4">Job Postings</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddCircle />}
          onClick={() => setIsModalOpen(true)}
        >
          Add Job Posting
        </Button>
      </Grid>

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
              {/* Assuming you have a defined list of departments */}
              {['HR', 'IT', 'Finance'].map((dept) => (
                <MenuItem key={dept} value={dept}>{dept}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Button variant="contained" color="success" startIcon={<FileDownload />}>
            Export as Excel
          </Button>
        </Grid>
      </Grid>

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

      <TableContainer component={Paper} style={{ maxHeight: '500px', overflowY: 'scroll' }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#e0e0e0' }}>
              {columns.jobRole && <TableCell sx={{ fontWeight: 'bold' }}>Job Role</TableCell>}
              {columns.department && <TableCell sx={{ fontWeight: 'bold' }}>Department</TableCell>}
              {columns.location && <TableCell sx={{ fontWeight: 'bold' }}>Location</TableCell>}
              {columns.startingDate && <TableCell sx={{ fontWeight: 'bold' }}>Starting Date</TableCell>}
              {columns.closingDate && <TableCell sx={{ fontWeight: 'bold' }}>Closing Date</TableCell>}
              {columns.numberOfPositions && <TableCell sx={{ fontWeight: 'bold' }}>Positions</TableCell>}
              {columns.numberOfApplicants && <TableCell sx={{ fontWeight: 'bold' }}>Applicants</TableCell>}
              {columns.status && <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>}
              {columns.mode && <TableCell sx={{ fontWeight: 'bold' }}>Work Mode</TableCell>}
              {columns.type && <TableCell sx={{ fontWeight: 'bold' }}>Job Type</TableCell>}
              <TableCell sx={{ fontWeight: 'bold', position: 'sticky', right: 0, backgroundColor: '#fff' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredJobPostings.map((posting) => (
              <TableRow key={posting.id} onClick={() => navigate(`/jobposting/${posting.id}`)} hover>
                {columns.jobRole && <TableCell>{posting.jobRole}</TableCell>}
                {columns.department && <TableCell>{posting.department}</TableCell>}
                {columns.location && <TableCell>{posting.location}</TableCell>}
                {columns.startingDate && <TableCell>{posting.startingDate}</TableCell>}
                {columns.closingDate && <TableCell>{posting.closingDate}</TableCell>}
                {columns.numberOfPositions && <TableCell>{posting.numberOfPositions}</TableCell>}
                {columns.numberOfApplicants && <TableCell>{posting.numberOfApplicants}</TableCell>}
                {columns.status && (
                  <TableCell>
                    <span className={`status-badge ${posting.status === 'OPEN' ? 'bg-green-500' :
                        posting.status === 'CLOSED' ? 'bg-red-500' :
                          posting.status === 'ON_HOLD' ? 'bg-yellow-500' : 'bg-gray-500'
                      }`}>
                      {posting.status}
                    </span>
                  </TableCell>
                )}
                {columns.mode && <TableCell>{posting.mode}</TableCell>}
                {columns.type && <TableCell>{posting.type}</TableCell>}
                <TableCell sx={{ position: 'sticky', right: 0, backgroundColor: '#fff' }}>
                  <IconButton key={posting.id} color="primary" onClick={(e) => {
                    console.log(`/editJob/${posting.id}`)
                    navigate(`/editJob/${posting.id}`)
                    e.stopPropagation(); // Prevent row click from triggering
                    console.log(`Edit ${posting.id}`);
                  }}>
                    <Edit />
                  </IconButton>
                  <IconButton onClick={(e) => { e.stopPropagation(); deleteJobPosting(posting.id); }}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box display="flex" justifyContent="center" marginTop="20px">
        <Pagination count={pageCount} page={currentPage} onChange={(event, value) => setCurrentPage(value)} />
      </Box>

      {/* Modal for Add/Edit */}
      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <DialogTitle>Add Job Posting</DialogTitle>
        <DialogContent>
          <DialogContentText>Fill out the job posting details below.</DialogContentText>
          <TextField margin="dense" label="Job Role" name="jobRole" value={form.jobRole} onChange={handleChange} fullWidth error={!!errors.jobRole} helperText={errors.jobRole} />
          <TextField margin="dense" label="Department" name="department" value={form.department} onChange={handleChange} fullWidth error={!!errors.department} helperText={errors.department} />
          <TextField margin="dense" label="Location" name="location" value={form.location} onChange={handleChange} fullWidth />
          <TextField margin="dense" label="Description" name="description" value={form.description} onChange={handleChange} fullWidth multiline rows={4} />
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField margin="dense" label="Starting Date" name="startingDate" value={form.startingDate} onChange={handleChange} fullWidth error={!!errors.startingDate} helperText={errors.startingDate} />
            </Grid>
            <Grid item xs={6}>
              <TextField margin="dense" label="Closing Date" name="closingDate" value={form.closingDate} onChange={handleChange} fullWidth error={!!errors.closingDate} helperText={errors.closingDate} />
            </Grid>
          </Grid>
          <TextField margin="dense" label="Number of Positions" name="numberOfPositions" type="number" value={form.numberOfPositions} onChange={handleChange} fullWidth />
          <FormControl fullWidth>
            <InputLabel>Work Mode</InputLabel>
            <Select name="mode" value={form.mode} onChange={handleChange}>
              <MenuItem value="IN_PERSON">IN_PERSON</MenuItem>
              <MenuItem value="REMOTE">REMOTE</MenuItem>
              <MenuItem value="HYBRID">HYBRID</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Job Type</InputLabel>
            <Select name="type" value={form.type} onChange={handleChange}>
              <MenuItem value="FULL_TIME">FULL_TIME</MenuItem>
              <MenuItem value="PART_TIME">PART_TIME</MenuItem>
              <MenuItem value="Contract">Contract</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Pay Type</InputLabel>
            <Select name="payType" value={form.payType} onChange={handleChange}>
              <MenuItem value="WEEKLY">WEEKLY</MenuItem>
              <MenuItem value="BIWEEKLY">BIWEEKLY</MenuItem>
              <MenuItem value="MONTHLY">MONTHLY</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsModalOpen(false)} color="secondary">Cancel</Button>
          <Button onClick={handleAddJobPosting} color="primary">Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default JobPostingList;
