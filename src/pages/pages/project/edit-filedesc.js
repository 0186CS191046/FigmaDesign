import React ,{ useState }from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import EditComponent from './upload-list'
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

const EditFileDescPage = () => {
    const router = useRouter();
  const { fileId, fileDescription } = router.query;

  // State to track the edited description
  const [editedDescription, setEditedDescription] = useState(fileDescription || '');

  const handleDescriptionChange = (evt) => {
    setEditedDescription(evt.target.value);
  };

  const handleSave = async () => {
    try {
      // Make an API call to update the file description
      const response = await fetch(`http://localhost:8000/api/files/${fileId}`, {
        method: 'PUT', // Assuming your server supports PUT for updating data
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          description: editedDescription,
          // Add other properties as needed
        }),
      });

      if (response.ok) {
        console.log('File description updated successfully!');
        // Close the modal or navigate back
        router.back();
      } else {
        console.error('Failed to update file description:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating file description:', error);
    }
  };

  const discard=()=>{
    setEditedDescription(router.query.fileDescription)
  }
  return (

          <Grid>
            <h1>Edit Transcript</h1>
            <div className='discard' style={{ float: 'right' }}>
                <Button
                  size='medium'
                  variant='contained'
                  sx={{ marginBottom: 5, marginTop: 5 }}
                  onClick={discard}
                >
                  Discard
                </Button>
                <Button
                  size='medium'
                  variant='contained'
                  sx={{ marginBottom: 5, marginTop: 5 }}
                  onClick={handleSave}
                >
                  Save & Exit
                </Button>
              </div>
            <Grid>
              <textarea
                fullWidth
                type='text'
                placeholder='Type here.......'
                helperText=''
                value={editedDescription}
                 onChange={handleDescriptionChange}
                
              />
             
            </Grid>
          </Grid>
       
  );
  };
export default EditFileDescPage;
