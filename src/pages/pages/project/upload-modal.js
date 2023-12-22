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
  p: 8,
};

const UploadComponent = ({ open, onClose, projectId }) => {
  const router = useRouter();
  console.log(projectId, 'frorm project-details compnent');
  const [projectName, setProjectName] = React.useState('');
  const [fileDescription, SetFileDescription] = React.useState('');
  const createFile = async () => {
   
    try {
      
      const response = await fetch(`http://localhost:8000/api/projects/${projectId}/files`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          filename: projectName,
          description:fileDescription
          // Add other properties as needed
        }),
      });
      if (response.ok) {
        console.log('Project created successfully!');
          console.log(projectId, 'projectId');
          router.push({
            pathname: '/pages/project/upload-list',
            query:  {'data' : projectId} , // Pass projectId as a query parameter
          });
        
      } else {
        console.error('Failed to create project:', response.statusText);
      }
    } catch (error) {
      console.error('Error creating file:', error);
    }

  };
  const handleFileNameChange = (evt) => {
    setProjectName(evt.target.value);   
  };

  const handleDescriptionChange = (evt) => {
    SetFileDescription(evt.target.value);   
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
            <h2>Upload from Youtube</h2>
            <Grid>
              <label style={{marginBottom : "10px", display:'block'}}>Name</label>
              <TextField
                fullWidth
                type='text'
                placeholder='Type here.......'
                helperText=''
                style={{marginBottom:"20px"}}
                onChange={handleFileNameChange}
              />
               <label style={{marginBottom : "10px", display:'block'}}>Description</label>
              <TextField
                fullWidth
                type='text'
                placeholder='Type here.......'
                helperText=''
                onChange={handleDescriptionChange}
              />
              <div style={{float : "right" }}>
              <Button
                size='medium'
                variant='contained'
                sx={{ marginBottom: 5, marginTop:5 }}
                onClick={createFile}
              >
                Upload
              </Button>
            </div>
            </Grid>
          </Grid>
        </DatePickerWrapper>
      </Box>
    </Modal>
  );
};

export default UploadComponent;
