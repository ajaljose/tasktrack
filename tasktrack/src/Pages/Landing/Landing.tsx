import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import TodoListCard from "../../components/TodoListCard";
import TodoListDetails from "../../components/TodoListDetails";
import CommonAPI from "../../services/CommonAPI";
const Landing = () => {
  const [todoList, setTodoList] = useState([]);
  const [userList, setUserList] = useState([]);
  const [showPopup, setShowpopup] = useState({ open: false, edit: false });
  const [editId, setEditId] = useState("");
  useEffect(() => {
    const fetchDataWrapper = async () => {
      await fetchData();
    };
    fetchDataWrapper();
  }, []);
  const fetchData = async () => {
    let userList: any = await CommonAPI.getData("users", {}, {});
    setUserList(userList.data);
    let todoData: any = await CommonAPI.getData("todo", {}, {});
    setTodoList(todoData.data);
  }
  const handleAddNewClick = () => {
    setShowpopup({ open: true, edit: false })
  }
  const handlePopClose = () => {
    setEditId("");
    setShowpopup({ open: false, edit: false });
  }
  const handleCardClick = (id:string) => {
    setEditId(id);
    setShowpopup({ open: true, edit: true });
  }
  return (
    <>
      <div className="list">

        <div className="list__container">
          <h1 className="list__header">To Do List</h1>
          <div className="list__add">
            <button className="btn__primary" id="btn__add" onClick={handleAddNewClick}>ADD A NEW TASK</button>
          </div>
        </div>
        {/* <hr></hr> */}
      </div>
      <div className="todo__container">
        <div className="todo__filter">
          <h1>by name</h1>
          <h1>by date</h1>
        </div>
        <div className="todo__table" id="todoList">
          {todoList.map((obj: any) => {
            const filteredList: any = userList.filter((userObj: any) => userObj.id == obj.assignedUser);
            const userName = filteredList.length > 0 ? filteredList[0].name : "Unknown";
            console.log(userName)
            return <TodoListCard key={obj.id} cardData={obj} userName={userName} onCardClick={handleCardClick}/>
          })}
        </div>

      </div>
      {
        showPopup.open ?
          <TodoListDetails closeModal={handlePopClose} editId={editId}/> : ""
      }
      <Outlet></Outlet>
    </>
  )
}

export default Landing