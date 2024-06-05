import React, { useState } from 'react';
import EditTask from '../modals/EditTask';
import { Card as MuiCard, CardContent, Typography, Checkbox, Button, Box } from '@mui/material';


const Card = ({ taskObj, index, deleteTask, updateListArray }) => {
    const [modal, setModal] = useState(false);


    const categoryColors = {
        Work: {
            primaryColor: "#5D93E1",
            secondaryColor: "#ECF3FC"
        },
        Personal: {
            primaryColor: "#F9D288",
            secondaryColor: "#FEFAF1"
        },
        Urgent: {
            primaryColor: "#F48687",
            secondaryColor: "#FDF1F1"
        }
    };

    const colors = categoryColors[taskObj.Category] || {
        primaryColor: "#B964F7",
        secondaryColor: "#F3F0FD"
    };

    const toggle = () => {
        setModal(!modal);
    };

    const updateTask = (obj) => {
        updateListArray(obj, index);
    };

    const handleDelete = () => {
        deleteTask(index);
    };

    const toggleCompleted = () => {
        updateListArray({ ...taskObj, completed: !taskObj.completed }, index);
    }


    return (
        <MuiCard className="card-wrapper">
            <Box
                className="card-top"
                sx={{
                    backgroundColor: taskObj.completed ? '#9ACD32' : colors.primaryColor,
                }}
            ></Box>
            <CardContent className="task-holder">
                <Typography
                    variant="h6"
                    className="card-header"
                    sx={{
                        backgroundColor: taskObj.completed ? '#E8F5E1' : colors.secondaryColor,
                    }}
                >
                    {`${taskObj.Name} (${taskObj.Category})`}
                </Typography>
                <Typography variant="body1" className="mt-3">
                    {taskObj.Description}
                </Typography>
                <Typography variant="body2">
                    {taskObj.Deadline ? new Date(taskObj.Deadline).toLocaleDateString() : 'No deadline'}
                </Typography>
                <Box className="actions">
                    <Checkbox checked={taskObj.completed} onChange={toggleCompleted} />
                    <Button onClick={() => setModal(true)}>
                        Edit
                    </Button>
                    <Button  onClick={handleDelete}>
                        Delete
                    </Button>
                </Box>
            </CardContent>
            <EditTask modal={modal} toggle={toggle} updateTask={updateTask} taskObj={taskObj} />
        </MuiCard>
    );
};

export default Card;
