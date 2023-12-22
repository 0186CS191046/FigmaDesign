import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useRouter } from 'next/router';
// ** Styled Component
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const ModalComponent = ({ open, onClose }) => {
  const router = useRouter();
  const [projectName, setProjectName] = React.useState('');
  const createProject = async () => {
    let userDetails = localStorage.getItem('userDetails')
    userDetails = JSON.parse(userDetails)
    // userDetails = userDetails
    console.log(userDetails.data._id, 'hjhjhj');
    const USER_ID = userDetails.data._id
    try {
      const response = await fetch(`http://localhost:8000/api/users/${USER_ID}/projects`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: projectName,
          // Add other properties as needed
        }),
        
      });

      if (response.ok) {
        console.log('Project created successfully!');
        router.push({
          pathname: '/pages/project/list-project',
            // Pass projectId as a query parameter
        });
      } else {
        console.error('Failed to create project:', response.statusText);
      }
    } catch (error) {
      console.error('Error creating project:', error);
    }
  };
  const handleInputChange = (evt) => {
    console.log(evt.target.value);
    setProjectName(evt.target.value);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <DatePickerWrapper>
          <Grid>
            <h2>Create Project</h2>
            <Grid>
              <label style={{marginBottom : "10px", display:'block'}}>Enter project name</label>
              <TextField
                fullWidth
                type='text'
                placeholder='Type here.......'
                helperText=''
                onChange={handleInputChange}
              />
              <div style={{float : "right" }}>
                <a style={{color : "red", marginRight:"15px" }}>
               Cancel
              </a>
              <Button
                size='medium'
                variant='contained'
                sx={{ marginBottom: 5, marginTop:5 }}
                onClick={createProject}
              >
                Create Project
              </Button>
            </div>
            </Grid>
          </Grid>
        </DatePickerWrapper>
      </Box>
    </Modal>
  );
};

export default ModalComponent;
