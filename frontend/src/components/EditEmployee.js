import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  TextField,
  Button,
  CircularProgress,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const EditEmployee = () => {
  const { id: employeeId } = useParams();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:8080/api/employees/userprofile/${employeeId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch employee data');
        }
        const data = await response.json();
        console.log(data)
        setEmployee(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [employeeId]);
  const formatDateForInput = (dateString) => {
    // Ensure the input is a string
    if (typeof dateString !== 'string') {
      console.error("Invalid input: expected a string.");
      return ""; // Return an empty string or handle it as needed
    }

    const parts = dateString.split("-");

    // Check if the split returns an array of the expected length
    if (parts.length !== 3) {
      console.error("Invalid date format. Expected format: yyyy-mm-dd");
      return ""; // Handle the error as needed
    }

    const [year, month, day] = parts;
    return `${year}-${month}-${day}`; // This will return the same format as input
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/api/employees/edituserprofile/${employeeId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(employee),
      });
      if (!response.ok) {
        throw new Error('Failed to update employee');
      }
      alert('Employee updated successfully!');
    } catch (err) {
      console.error('Error updating employee:', err);
      alert('Failed to update employee.');
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const handlePersonalDetailsChange = (e) => {
    const { name, value } = e.target;
    setEmployee({
      ...employee,
      personalDetails: {
        ...employee.personalDetails,
        [name]: value,
      },
    });
  };

  const handleContactInfoChange = (e) => {
    const { name, value } = e.target;
    setEmployee({
      ...employee,
      personalDetails: {
        ...employee.personalDetails,
        contactInformation: {
          ...employee.personalDetails.contactInformation,
          [name]: value,
        },
      },
    });
    const TXTX = employee.personalDetails.dateOfBirth;

    // This will print the value of `x` (dateOfBirth) to the console
    console.log("XXXXXXXX", TXTX);
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setEmployee({
      ...employee,
      personalDetails: {
        ...employee.personalDetails,
        contactInformation: {
          ...employee.personalDetails.contactInformation,
          address: {
            ...employee.personalDetails.contactInformation.address,
            [name]: value,
          },
        },
      },
    });
  };

  const handleEmergencyContactChange = (e) => {
    const { name, value } = e.target;
    setEmployee({
      ...employee,
      personalDetails: {
        ...employee.personalDetails,
        emergencyContact: {
          ...employee.personalDetails.emergencyContact,
          [name]: value,
        },
      },
    });
  };



  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  if (!employee) {
    return null;
  }
  const formattedDOB = formatDateForInput(employee.personalDetails.dateOfBirth);

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ margin: 'auto', padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Edit Employee
      </Typography>

      <Accordion defaultExpanded >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6" color="primary">Employer Information</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="First Name"
                name="firstName"
                value={employee.firstName}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Last Name"
                name="lastName"
                value={employee.lastName}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Department</InputLabel>
                <Select
                  name="department"
                  value={employee.department}
                  onChange={handleInputChange}
                  label="Department"
                >
                  <MenuItem value="IT">IT</MenuItem>
                  <MenuItem value="ADMIN">ADMIN</MenuItem>
                  <MenuItem value="FINANCE">FINANCE</MenuItem>
                  <MenuItem value="HR">HR</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Job Title"
                name="jobTitle"
                value={employee.jobTitle}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Work Email"
                name="workEmail"
                value={employee.workEmail}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Work Phone"
                name="workPhone"
                value={employee.workPhone}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  name="status"
                  value={employee.status}
                  onChange={handleInputChange}
                  label="status"
                >
                  <MenuItem value="Active">Active</MenuItem>
                  <MenuItem value="Leave">Leave</MenuItem>
                  <MenuItem value="Resign">Resign</MenuItem>
                  <MenuItem value="Terminated">Terminated</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Salary"
                name="jobDetails.salary"
                value={employee?.jobDetails?.salary || ''}
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6" color="primary">Personal Information</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Date of Birth"
                name="dateOfBirth"
                type="date"
                value={new Date(employee.personalDetails.dateOfBirth).toISOString().split('T')[0]}
                onChange={handlePersonalDetailsChange}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Gender</InputLabel>
                <Select
                  name="gender"
                  value={employee.personalDetails.gender}
                  onChange={handlePersonalDetailsChange}
                  label="Gender"
                >
                  <MenuItem value="MALE">Male</MenuItem>
                  <MenuItem value="FEMALE">Female</MenuItem>
                  <MenuItem value="OTHER">Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Primary Email"
                name="primary_emails"
                value={employee.personalDetails.contactInformation.primary_emails}
                onChange={handleContactInfoChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Phone"
                name="phone"
                value={employee.personalDetails.contactInformation.phone}
                onChange={handleContactInfoChange}
              />
            </Grid>
          </Grid>

          <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
            Address
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Street"
                name="street"
                value={employee?.personalDetails?.contactInformation?.address?.street || ''}
                onChange={handleAddressChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="City"
                name="city"
                value={employee?.personalDetails?.contactInformation?.address?.city || ''}
                onChange={handleAddressChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="State"
                name="state"
                value={employee?.personalDetails?.contactInformation?.address?.state || ''}
                onChange={handleAddressChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Postal Code"
                name="postalCode"
                value={employee?.personalDetails?.contactInformation?.address?.postalCode || ''}
                onChange={handleAddressChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Country"
                name="country"
                value={employee?.personalDetails?.contactInformation?.address?.country || ''}
                onChange={handleAddressChange}
              />
            </Grid>
          </Grid>

          <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
            Emergency Contact
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={employee?.personalDetails?.emergencyContact?.name || ''}
                onChange={handleEmergencyContactChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Relationship"
                name="relationship"
                value={employee?.personalDetails?.emergencyContact?.relationship || ''}
                onChange={handleEmergencyContactChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Phone"
                name="phone"
                value={employee?.personalDetails?.emergencyContact?.phone || ''}
                onChange={handleEmergencyContactChange}
              />
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>

      <Box sx={{ mt: 2 }}>
        <Button type="submit" variant="contained" color="primary">
          Update Employee
        </Button>
      </Box>
    </Box>
  );
};

export default EditEmployee;
