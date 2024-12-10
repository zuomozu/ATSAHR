import React, { useState, useMemo } from 'react';
import { 
  Box, 
  Button, 
  Typography, 
  Grid, 
  Select, 
  MenuItem, 
  FormControl, 
  InputLabel 
} from '@mui/material';


const Calendar = () =>{
  // State for current view and date
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState('month');

  // Sample event data (in a real app, this would come from an API or database)
  const events = {
    // Example events format: [year-month-day]: { visits: number, calls: number }
    '2024-5-1': { visits: 4, calls: 2 },
    '2024-5-6': { visits: 3 },
    '2024-5-9': { visits: 3 },
    '2024-5-13': { calls: 2 },
    '2024-5-14': { visits: 1 },
    '2024-5-21': { visits: 2 },
    '2024-5-28': { calls: 4 },
  };

  // Generate array of years (e.g., current year -5 to +5)
  const years = useMemo(() => {
    const currentYear = currentDate.getFullYear();
    return Array.from({ length: 11 }, (_, i) => currentYear - 5 + i);
  }, [currentDate]);

  // Get days in a month
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Get first day of the month (to determine starting point in grid)
  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  // Handle month change
  const changeMonth = (increment) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + increment);
    setCurrentDate(newDate);
  };

  // Render day in month view
  const renderDayInMonthView = (day) => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const fullDateKey = `${year}-${month + 1}-${day}`;
    const event = events[fullDateKey];
    const isToday = new Date().toDateString() === new Date(year, month, day).toDateString();

    return (
      <Box
        sx={{
          height: "100px",
          border: "1px solid #e0e0e0",
          borderRadius: "8px",
          padding: "4px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: isToday ? "#f5f9ff" : "white",
          boxShadow: isToday ? "0px 0px 4px rgba(0, 0, 255, 0.3)" : "none",
        }}
      >
        <Typography variant="body2" sx={{ fontWeight: isToday ? "bold" : "normal" }}>
          {day}
        </Typography>
        {event && (
          <>
            {event.visits && (
              <Typography
                variant="caption"
                sx={{
                  backgroundColor: "#ffebee",
                  borderRadius: "4px",
                  padding: "2px 4px",
                  color: "#d32f2f",
                  fontSize: "0.7rem",
                }}
              >
                Visits {event.visits}
              </Typography>
            )}
            {event.calls && (
              <Typography
                variant="caption"
                sx={{
                  backgroundColor: "#e3f2fd",
                  borderRadius: "4px",
                  padding: "2px 4px",
                  color: "#1976d2",
                  fontSize: "0.7rem",
                }}
              >
                Calls {event.calls}
              </Typography>
            )}
          </>
        )}
      </Box>
    );
  };

  // Render different views
  const renderView = () => {
    switch(view) {
      case 'day':
        return (
          <Box>
            <Typography variant="h6">Day View</Typography>
            {/* Implement day view logic */}
            <Typography>Detailed view for a single day</Typography>
          </Box>
        );
      
      case 'week':
        return (
          <Box>
            <Typography variant="h6">Week View</Typography>
            {/* Implement week view logic */}
            <Typography>Detailed view for a week</Typography>
          </Box>
        );
      
      case 'year':
        return (
          <Box>
            <Typography variant="h6">Year View</Typography>
            {/* Implement year view logic */}
            <Typography>Condensed view of the entire year</Typography>
          </Box>
        );
      
      case 'month':
      default:
        const daysInMonth = getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth());
        const firstDayOfMonth = getFirstDayOfMonth(currentDate.getFullYear(), currentDate.getMonth());
        
        return (
          <>
            {/* Week day headers */}
            <Grid container spacing={2}>
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <Grid item xs={1.7} key={day}>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      textAlign: "center",
                      fontWeight: "bold",
                      color: "#9e9e9e",
                    }}
                  >
                    {day}
                  </Typography>
                </Grid>
              ))}
              
              {/* Padding for first week */}
              {[...Array(firstDayOfMonth)].map((_, index) => (
                <Grid item xs={1.7} key={`empty-${index}`}></Grid>
              ))}
              
              {/* Days of the month */}
              {[...Array(daysInMonth)].map((_, index) => (
                <Grid item xs={1.7} key={index + 1}>
                  {renderDayInMonthView(index + 1)}
                </Grid>
              ))}
            </Grid>
          </>
        );
    }
  };

  return (
    <Box sx={{ padding: "16px", backgroundColor: "#f9f9f9", borderRadius: "8px" }}>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "16px",
        }}
      >
        {/* Date and Year Selection */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button onClick={() => changeMonth(-1)} variant="outlined">
            Prev
          </Button>
          
          <FormControl variant="outlined" sx={{ minWidth: 120 }}>
            <InputLabel>Month</InputLabel>
            <Select
              value={currentDate.getMonth()}
              label="Month"
              onChange={(e) => {
                const newDate = new Date(currentDate);
                newDate.setMonth(e.target.value);
                setCurrentDate(newDate);
              }}
            >
              {[...Array(12)].map((_, index) => (
                <MenuItem key={index} value={index}>
                  {new Date(0, index).toLocaleString('default', { month: 'long' })}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          
          <FormControl variant="outlined" sx={{ minWidth: 120 }}>
            <InputLabel>Year</InputLabel>
            <Select
              value={currentDate.getFullYear()}
              label="Year"
              onChange={(e) => {
                const newDate = new Date(currentDate);
                newDate.setFullYear(e.target.value);
                setCurrentDate(newDate);
              }}
            >
              {years.map((year) => (
                <MenuItem key={year} value={year}>
                  {year}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          
          <Button onClick={() => changeMonth(1)} variant="outlined">
            Next
          </Button>
        </Box>

        {/* View Selector */}
        <Box>
          {['Day', 'Week', 'Month', 'Year'].map((viewOption) => (
            <Button
              key={viewOption}
              sx={{
                textTransform: "none",
                fontWeight: "bold",
                color: view.toLowerCase() === viewOption.toLowerCase() ? "#1976d2" : "#9e9e9e",
                borderBottom: view.toLowerCase() === viewOption.toLowerCase() ? "2px solid #1976d2" : "none",
                marginRight: "8px",
              }}
              onClick={() => setView(viewOption.toLowerCase())}
            >
              {viewOption}
            </Button>
          ))}
        </Box>
      </Box>

      {/* Calendar Content */}
      <Box>
        <Typography variant="h6" sx={{ marginBottom: 2 }}>
          {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
        </Typography>
        {renderView()}
      </Box>
    </Box>
  );
}
export default Calendar;