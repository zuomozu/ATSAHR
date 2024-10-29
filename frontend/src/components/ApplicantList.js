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

const ApplicantList = () => {
  const [form, setForm] = useState({
    jobPostingID: '',
    personalDetails: {
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      gender: '',
      contactInformation: {
        primary_emails: '',
        phone: '',
        address: {
          street: '',
          city: '',
          state: '',
          postalCode: '',
          country: ''
        }
      }
    },
    applicationDetails: {
      appliedPosition: '',
      applicationDate: new Date().toISOString().split('T')[0],
      status: 'Pending',
      resume: {
        fileName: '',
        uploadDate: new Date().toISOString().split('T')[0]
      }
    }
  });

  const [applicants, setApplicants] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPosition, setFilterPosition] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [errors, setErrors] = useState({});
  const [jobPostings, setJobPostings] = useState([]);
  const itemsPerPage = 10;
  const navigate = useNavigate();

  const [columns, setColumns] = useState({
    name: true,
    position: true,
    email: true,
    phone: true,
    status: true,
    applicationDate: true,
    location: true
  });

  useEffect(() => {
    loadApplicants();
    loadJobPostings();
  }, []);
  const loadJobPostings = async () => {
    try {
      const result = await axios.get('http://localhost:8080/api/jobpostings');
      setJobPostings(result.data);
    } catch (error) {
      console.error('Error loading job postings:', error);
    }
  };
  const loadApplicants = async () => {
    try {
      const result = await axios.get('http://localhost:8080/api/applicants');
      setApplicants(result.data);
    } catch (error) {
      console.error('Error loading applicants:', error);
    }
  };

  const deleteApplicant = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/applicants/${id}`);
      loadApplicants();
    } catch (error) {
      console.error('Error deleting applicant:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const fields = name.split('.');

    setForm(prevForm => {
      let updatedForm = { ...prevForm };
      let current = updatedForm;

      for (let i = 0; i < fields.length - 1; i++) {
        current[fields[i]] = { ...current[fields[i]] };
        current = current[fields[i]];
      }

      current[fields[fields.length - 1]] = value;
      return updatedForm;
    });
  };
  const handleColumnToggle = (columnName) => {
    setColumns((prevColumns) => ({
      ...prevColumns,
      [columnName]: !prevColumns[columnName]
    }));
  };

  const handleAddApplicant = async () => {
    const newErrors = {};

    if (!form.personalDetails.firstName) newErrors.firstName = "First Name is required";
    if (!form.personalDetails.lastName) newErrors.lastName = "Last Name is required";
    if (!form.applicationDetails.appliedPosition) newErrors.position = "Position is required";
    if (!form.personalDetails.contactInformation.primary_emails) newErrors.email = "Email is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      // Use jobPostingId from the form state
      await axios.post(`http://localhost:8080/api/applicants/add?jobPostingId=${form.applicationDetails.jobPostingId}`, form);

      setIsModalOpen(false);
      loadApplicants();
    } catch (error) {
      console.error("Error adding applicant:", error);
    }
  };

  const handlePositionChange = (event) => {
    const selectedRole = event.target.value;
    const selectedJob = jobPostings.find((job) => job.jobRole === selectedRole);

    setForm({
      ...form,
      applicationDetails: {
        ...form.applicationDetails,
        appliedPosition: selectedRole,
        jobPostingId: selectedJob ? selectedJob.id : null // Save the job ID
      }
    });
  };


  const filteredApplicants = applicants
    .filter((applicant) => {
      const matchesSearchTerm =
        applicant.personalDetails.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        applicant.personalDetails.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        applicant.applicationDetails.appliedPosition.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesPosition = !filterPosition || applicant.applicationDetails.appliedPosition === filterPosition;

      return matchesSearchTerm && matchesPosition;
    })
    .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const pageCount = Math.ceil(applicants.length / itemsPerPage);

  return (
    <div style={{ padding: '20px' }}>
      {/* Header */}
      <Grid container justifyContent="space-between" alignItems="center" style={{ marginBottom: '20px' }}>
        <Typography variant="h4">Applicant List</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddCircle />}
          onClick={() => setIsModalOpen(true)}
        >
          Add Applicant
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
            <InputLabel>Position</InputLabel>
            <Select
              value={filterPosition}
              onChange={(e) => setFilterPosition(e.target.value)}
            >
              <MenuItem value="">All Positions</MenuItem>
              <MenuItem value="Software Engineer">Software Engineer</MenuItem>
              <MenuItem value="Product Manager">Product Manager</MenuItem>
              <MenuItem value="Sales Representative">Sales Representative</MenuItem>
              <MenuItem value="HR Manager">HR Manager</MenuItem>
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

      {/* Applicant Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {columns.name && <TableCell>Full Name</TableCell>}
              {columns.position && <TableCell>Applied Position</TableCell>}
              {columns.email && <TableCell>Email</TableCell>}
              {columns.phone && <TableCell>Phone</TableCell>}
              {columns.status && <TableCell>Status</TableCell>}
              {columns.applicationDate && <TableCell>Application Date</TableCell>}
              {columns.location && <TableCell>Location</TableCell>}
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredApplicants.map((applicant) => (
              <TableRow key={applicant.id} hover>
                <TableCell>
                  {`${applicant.personalDetails.firstName} ${applicant.personalDetails.lastName}`}
                </TableCell>
                <TableCell>{applicant.applicationDetails.appliedPosition}</TableCell>
                <TableCell>{applicant.personalDetails.contactInformation.primary_emails}</TableCell>
                <TableCell>{applicant.personalDetails.contactInformation.phone}</TableCell>
                <TableCell>
                  <span className={`status-badge ${applicant.applicationDetails.status === 'Accepted' ? 'bg-green-500' :
                      applicant.applicationDetails.status === 'Pending' ? 'bg-yellow-500' : 'bg-red-500'
                    }`}>
                    {applicant.applicationDetails.status}
                  </span>
                </TableCell>
                <TableCell>{new Date(applicant.applicationDetails.applicationDate).toLocaleDateString()}</TableCell>
                <TableCell>
                  {`${applicant.personalDetails.contactInformation.address.city}, ${applicant.personalDetails.contactInformation.address.state}`}
                </TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => navigate(`/applicant/${applicant.id}`)}>
                    <Edit />
                  </IconButton>
                  <IconButton color="secondary" onClick={() => deleteApplicant(applicant.id)}>
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
        count={pageCount > 0 ? pageCount : 1}
        page={currentPage}
        onChange={(event, page) => setCurrentPage(page)}
        style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}
      />


      {/* Add Applicant Modal */}
      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Add New Applicant</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please fill out the form to add a new applicant.
          </DialogContentText>

          {/* Personal Details */}
          <Typography variant="h6" style={{ marginTop: '20px' }}>Personal Details</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                margin="normal"
                name="personalDetails.firstName"
                label="First Name"
                value={form.personalDetails.firstName}
                onChange={handleChange}
                error={!!errors.firstName}
                helperText={errors.firstName}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                margin="normal"
                name="personalDetails.lastName"
                label="Last Name"
                value={form.personalDetails.lastName}
                onChange={handleChange}
                error={!!errors.lastName}
                helperText={errors.lastName}
                required
              />
            </Grid>
          </Grid>

          {/* Contact Information */}
          <Typography variant="h6" style={{ marginTop: '20px' }}>Contact Information</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                margin="normal"
                name="personalDetails.contactInformation.primary_emails"
                label="Email"
                value={form.personalDetails.contactInformation.primary_emails}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
                required
                type="email"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                margin="normal"
                name="personalDetails.contactInformation.phone"
                label="Phone"
                value={form.personalDetails.contactInformation.phone}
                onChange={handleChange}
                required
              />
            </Grid>
          </Grid>

          {/* Application Details */}
          <Typography variant="h6" style={{ marginTop: '20px' }}>Application Details</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                margin="normal"
                name="applicationDetails.appliedPosition"
                label="Applied Position"
                value={form.applicationDetails.appliedPosition}
                onChange={handlePositionChange}
                error={!!errors.position}
                helperText={errors.position}
                required
                select
              >
                {jobPostings.map((job) => (
                  <MenuItem key={job.id} value={job.jobRole}>
                    {job.jobRole}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                margin="normal"
                name="applicationDetails.status"
                label="Status"
                value={form.applicationDetails.status}
                onChange={handleChange}
                required
                select
              >
                <MenuItem value="Pending">Pending</MenuItem>
                <MenuItem value="Under Review">Under Review</MenuItem>
                <MenuItem value="Interviewed">Interviewed</MenuItem>
                <MenuItem value="Accepted">Accepted</MenuItem>
                <MenuItem value="Rejected">Rejected</MenuItem>
              </TextField>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsModalOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleAddApplicant} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ApplicantList;