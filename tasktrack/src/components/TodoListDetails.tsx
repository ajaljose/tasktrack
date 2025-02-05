import { useEffect, useState } from "react";
import CommonAPI from "../services/CommonAPI";
interface TodoListDetailsProps {
    closeModal: () => void;
    editId: string
}

const TodoListDetails: React.FC<TodoListDetailsProps> = ({ closeModal, editId }) => {
    const [title, settitle] = useState("");
    const [status, setstatus] = useState("");
    const [dueDate, setdueDate] = useState("");
    const [description, setdescription] = useState("");
    const [assignedUser, setassignedUser] = useState("");
    useEffect(() => {
        if (editId != "") {
            fetchEditData();
        }
    }, []);
    const fetchEditData = async () => {
        let data: any = await CommonAPI.getData(`todo/${editId}`, {}, {});
        console.log(data);
        settitle(data.data.title);
        setstatus(data.data.status);
        setdueDate(data.data.dueDate);
        setdescription(data.data.description);
        setassignedUser(data.data.assignedUser);

    }
    const handleClose = () => {
        resetForm();
        closeModal();
    }
    const handleSaveClick = async () => {
        if (editId == "") {

            let data: any = await CommonAPI.postData("todo", {}, { title, status, dueDate, description, assignedUser });
            if (data.status == 201) {
                alert("task created successfully");
                closeModal();
            }
        } else {
            let data: any = await CommonAPI.putData(`todo/${editId}`, {}, { title, status, dueDate, description, assignedUser });
            if (data.status == 200) {
                alert("task updated successfully");
                closeModal();
            }
        }
    }
    const resetForm = () => {
        settitle("");
        setstatus("");
        setdueDate("");
        setdescription("");
        setassignedUser("");
    };

    return (
        <div className="modal">

            <div className="modal__content">
                <div className="modal__header">
                    <input type="text" placeholder="Task Title" onChange={(e) => settitle(e.target.value)} value={title}></input>
                    <div className="header__grp">
                        <label>User:</label>
                        <select onChange={(e) => setassignedUser(e.target.value)} value={assignedUser}>
                            <option value="1">To Do</option>
                            <option value="2">In Progress</option>
                            <option value="3">Done</option>
                        </select>
                        <label>Status:</label>
                        <select onChange={(e) => setstatus(e.target.value)} value={status}>
                            <option value="todo">To Do</option>
                            <option value="inProgress">In Progress</option>
                            <option value="done">Done</option>
                        </select>
                        <label>Due Date:</label>
                        <input type="date" onChange={(e) => setdueDate(e.target.value)} value={dueDate}></input>
                        <span className="close" onClick={handleClose}>&times;</span>
                    </div>
                </div>
                <hr></hr>
                <div className="modal__body">
                    <textarea rows={4} cols={50} placeholder="Enter description ..." onChange={(e) => setdescription(e.target.value)} value={description}></textarea >
                </div>
                <hr></hr>
                <div className="btn_group">
                    <button className="btn__primary" onClick={handleSaveClick}>Save</button>
                    <button className="btn__danger">Delete</button>
                </div>
            </div>

        </div>
    )
}

export default TodoListDetails;