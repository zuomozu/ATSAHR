import React, { useState, useEffect } from 'react';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  List,
  ListItem,
  ListItemText,
  Divider,
  Rating,
  Button,
  Chip,
  CircularProgress
} from '@mui/material';
import { Email, Phone, LocationOn, Cake, Work } from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
  var employeeIdd = useParams()
  const employeeId = employeeIdd['id']
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        setLoading(true);
        // Replace this URL with your actual API endpoint
        const response = await fetch(`http://localhost:8080/api/employees/userprofile/${employeeId}`);
        if (!response.ok) {
          console.log('http://localhost:8080/api/employees/userprofile/${employeeId}')
          throw new Error('Failed to fetch employee data');

        }
        console.log("response", response)
        const data = await response.json();
        setEmployee(data);

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [employeeId]);

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
  return (
    <Card sx={{ maxWidth: 800, margin: 'auto', mt: 4 }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar
            src={`https://ui-avatars.com/api/?name=${employee.firstName}+${employee.lastName}`}
            sx={{ width: 100, height: 100, mr: 2 }}
          />
          <Box>
            <Typography variant="h4">{`${employee.firstName} ${employee.lastName}`}</Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {employee.jobTitle}
            </Typography>
            <Typography variant="subtitle2" color="textSecondary">
              {employee.department}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
              <LocationOn fontSize="small" sx={{ mr: 0.5 }} />
              <Typography variant="body2">
                {employee?.personalDetails?.contactInformation?.address?.city || ''},
                {employee?.personalDetails?.contactInformation?.address?.state || ''}

              </Typography>
            </Box>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Rating value={8.6} precision={0.1} readOnly />
          <Box>
            <Button variant="contained" color="primary" sx={{ mr: 1 }}>
              Send message
            </Button>
            <Button variant="outlined" color="primary" key={employee.id} onClick={(e) => {
              navigate(`/edituserprofile/${employee.id}`)
              e.stopPropagation(); // Prevent row click from triggering
              console.log(`Edit ${employee.id}`);
            }}>
              EDIT
            </Button>
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Contact Information
            </Typography>
            <List>
              <ListItem>
                <ListItemText
                  primary="Email"
                  secondary={employee.workEmail}
                  secondaryTypographyProps={{ component: 'div' }}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Phone"
                  secondary={employee.workPhone}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Address"
                  secondary={`${employee?.personalDetails?.contactInformation?.address?.street || ''}, 
                    ${employee?.personalDetails?.contactInformation?.address?.city || ''}, 
                    ${employee?.personalDetails?.contactInformation?.address?.state || ''} 
                    ${employee?.personalDetails?.contactInformation?.address?.postalCode || ''}`}
                />
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Basic Information
            </Typography>
            <List>
              <ListItem>
                <ListItemText
                  primary="Birthday"
                  secondary={new Date(new Date(employee.personalDetails.dateOfBirth).getTime() + new Date(employee.personalDetails.dateOfBirth).getTimezoneOffset() * 60000).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',  // 'short' for 'Feb'
                    day: 'numeric',
                  })}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Gender"
                  secondary={employee.personalDetails.gender}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Employee ID"
                  secondary="ID123"
                />
              </ListItem>
            </List>
          </Grid>
        </Grid>

        <Divider sx={{ my: 2 }} />

        <Typography variant="h6" gutterBottom>
          Work Experience
        </Typography>
        {employee.employmentHistory && employee.employmentHistory.length > 0 ? (
          employee.employmentHistory.map((job, index) => (
            <Box key={index} sx={{ mb: 2 }}>
              <Typography variant="subtitle1">{job.jobTitle}</Typography>
              <Typography variant="body2" color="textSecondary">
                {job.department} | {new Date(job.startDate).getFullYear()} -
                {job.endDate ? new Date(job.endDate).getFullYear() : 'Present'}
              </Typography>
            </Box>
          ))
        ) : (
          <Typography variant="body2" color="textSecondary">
            No work experience available.
          </Typography>
        )}

        <Divider sx={{ my: 2 }} />

        <Typography variant="h6" gutterBottom>
          Skills
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {['Branding', 'UI/UX', 'Web Design', 'Packaging', 'Print & Editorial'].map((skill) => (
            <Chip key={skill} label={skill} />
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default UserProfile;
