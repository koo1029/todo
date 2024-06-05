import React, { useState } from 'react';
import { Typography, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, MenuItem } from '@mui/material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const CreateTaskPopup = ({ modal, toggle, save }) => {
    const [taskName, setTaskName] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [deadline, setDeadline] = useState(null);
    const [completed, setCompleted] = useState(false); 

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'taskName') {
            setTaskName(value);
        } else if (name === 'description') {
            setDescription(value);
        } else if (name === 'category') {
            setCategory(value);
        }
    };

    const handleSave = (e) => {
        e.preventDefault();
        let taskObj = {
            Name: taskName,
            Description: description,
            Category: category,
            Deadline: deadline,
            completed: completed
        };
        save(taskObj);
        setTaskName('');
        setDescription('');
        setCategory('');
        setDeadline(null);
        setCompleted(false);
    };

    return (
        <Dialog open={modal} onClose={toggle}>
            <DialogTitle>Create Task</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    <Box className="form-group">
                        <TextField
                            label="Task Name"
                            variant="outlined"
                            fullWidth
                            value={taskName}
                            onChange={handleChange}
                            name="taskName"
                            margin="dense"
                        />
                    </Box>
                    <Box className="form-group">
                        <TextField
                            label="Description"
                            variant="outlined"
                            fullWidth
                            multiline
                            rows={5}
                            value={description}
                            onChange={handleChange}
                            name="description"
                            margin="dense"
                        />
                    </Box>
                    <Box className="form-group">
                        <TextField
                            select
                            label="Category"
                            variant="outlined"
                            fullWidth
                            value={category}
                            onChange={handleChange}
                            name="category"
                            margin="dense"
                        >
                            <MenuItem value="Work">Work</MenuItem>
                            <MenuItem value="Personal">Personal</MenuItem>
                            <MenuItem value="Urgent">Urgent</MenuItem>
                        </TextField>
                    </Box>
                    <Box className="form-group">
                        <Typography>Deadline</Typography>
                        <DatePicker
                            selected={deadline}
                            onChange={(date) => setDeadline(date)}
                            dateFormat="MMMM d, yyyy"
                            className="form-control"
                        />
                    </Box>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button color="primary" onClick={handleSave}>Create</Button>
                <Button color="secondary" onClick={toggle}>Cancel</Button>
            </DialogActions>
        </Dialog>
    );
};

export default CreateTaskPopup;
