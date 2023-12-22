// ** MUI Imports
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import React, { useState, useEffect } from 'react';
import UploadComponent from './upload-modal';
import { useRouter } from 'next/router';

const UploadList = () => {
  
  const handleEdit = (fileId,fileDescription) => {
    // console.log(fileNames,"jjjjjjjjjj")
    // Navigate to the edit page with the file ID
    router.push({
      pathname: '/pages/project/edit-filedesc',
      query: {  fileId, fileDescription }, // Pass projectId as a query parameter
    });
  };
  

  const handleDelete = async (fileId) => {
    try {
      const response = await fetch(`http://localhost:8000/api/files/${fileId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete file');
      }

      // If deletion is successful, fetch the updated file list
      fetchFileNames();
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  };
  
  const [open, setOpen] = useState(false);
  const [fileNames, setFileNames] = useState([]);
  const [projectId, setProjectId] = useState(null); // Use null instead of false
  const [loading, setLoading] = useState(true); // New loading state
  const router = useRouter();

  useEffect(() => {
    // Move the setProjectId inside the useEffect
    setProjectId(router.query.data);
  }, [router.query.data]);

  const handleClose = () => {
    setOpen(false);
  };

  const createProject = async () => {
    setOpen(true);
  };

  const fetchFileNames = async () => {
    try {
      if (projectId === null || projectId === undefined) {
        // Skip the API call if projectId is null or undefined
        setLoading(false);
        return;
      }
  
      const response = await fetch(`http://localhost:8000/api/projects/${projectId}/files`);
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch files');
      }
  
      const files = data.files;
      console.log(files,"hhhhhhhhhhhhhhhhhh")
      setFileNames(files);
      setLoading(false); // Set loading to false once data is fetched
    } catch (error) {
      console.error('Error fetching files:', error);
      setLoading(false); // Set loading to false in case of an error
    }
  };

  useEffect(() => {
    fetchFileNames();
  }, [projectId]);

  return (
    <div className='flex-layout text-left upload-list'>
    <div className='flex'>
    <h1>Sample Project</h1>
    </div>
    <div className='card'>
  <div className='media-object' onClick={createProject}>
    <div className='left mani'>
       <img src='/images/youtube.png' />
    </div>
    <div className='right'>
     <h5 className='text-upload'>Upload Youtube Video</h5>
    </div>
  </div>
  <div className='media-object'>
  <div className='left mani'>
       <img src='/images/spotify.png' />
    </div>
    <div className='right'>
    <h5 className='text-upload'>Upload 
Spotify Podcast</h5>
    </div>
  </div>
  <div className='media-object'>
  <div className='left mani'>
       <img src='/images/rss.png' />
    </div>
    <div className='right'>
    <h5 className='text-upload'>Upload from
RSS Feed</h5>
    </div>
  </div>

</div>


<div className='flex-layout text-left upload-list'>
      {/* ... (your existing code) */}

      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell align='right'>Upload Time & Date </TableCell>
          <TableCell align='right'>Description</TableCell>
          <TableCell align='right'>Actions</TableCell>
          
        </TableRow>
      </TableHead>
        {/* ... (your existing code) */}
        <TableBody>
            {fileNames?.map((file) => (
              <TableRow key={file._id}
              sx={{
                '&:last-of-type td, &:last-of-type th': {
                  border: 0
                }
              }}
            >
              <TableCell component='th' scope='row'>
                {file.filename}
              </TableCell>
              <TableCell align='right'>21/12/2023</TableCell>
              <TableCell align='right'>{file.description}</TableCell>
              <TableCell align='right'>
                  <button onClick={() => handleEdit(file._id,file.description)}>Edit</button>
                  <button onClick={() => handleDelete(file._id)}>Delete</button>
                </TableCell>
              
            </TableRow>
            ))}
          </TableBody>
          </Table>
      </TableContainer>

      <UploadComponent open={open} onClose={handleClose}  />
    </div>
    </div>
  )
}

export default UploadList

