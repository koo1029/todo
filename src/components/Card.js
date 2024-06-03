import React, { useState } from 'react';
import EditTask from '../modals/EditTask';

const Card = ({ taskObj, index, deleteTask, updateListArray }) => {
    const [modal, setModal] = useState(false);
    const [completed, setCompleted] = useState(false); 

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
        setCompleted(!completed);
    };

    return (
        <div className="card-wrapper mr-5">
            <div className="card-top" style={{ "backgroundColor": completed ? "#9ACD32" : colors.primaryColor }}></div> {/* 완료 시 다른 색상으로 변경 */}
            <div className="task-holder">
                <span className="card-header" style={{ "backgroundColor": colors.secondaryColor, "borderRadius": "10px" }}>{taskObj.Name + ' (' + taskObj.Category + ')'}</span>
                <p className="mt-3">{taskObj.Description}</p>
                <p>{taskObj.Deadline ? new Date(taskObj.Deadline).toLocaleDateString() : "No deadline"}</p>
                <div style={{ "position": "absolute", "top": "160px", "left": "160px" }}>
                    <input type="checkbox" checked={completed} onChange={toggleCompleted} />
                    <button style={{ "color": colors.primaryColor, "cursor": "pointer" }} onClick={() => setModal(true)}>Edit</button>
                    <button style={{ "color": colors.primaryColor, "cursor": "pointer" }} onClick={handleDelete}>Delete</button>
                </div>
            </div>
            <EditTask modal={modal} toggle={toggle} updateTask={updateTask} taskObj={taskObj} />
        </div>
    );
};

export default Card;
