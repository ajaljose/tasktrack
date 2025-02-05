import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import TodoListCard from "../../components/TodoListCard";
import TodoListDetails from "../../components/TodoListDetails";
import CommonAPI from "../../services/CommonAPI";
const Landing = () => {
  const [fullTodoList, setFullTodoList] = useState([]); 
  const [todoList, setTodoList] = useState([]);
  const [userList, setUserList] = useState([]);
  const [showPopup, setShowpopup] = useState({ open: false, edit: false });
  const [editId, setEditId] = useState("");
  const [filterSort, setFiltersort] = useState({ status: "", assignedUser: "", sort: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  useEffect(() => {
    const fetchDataWrapper = async () => {
      await fetchData();
    };
    fetchDataWrapper();
  }, [showPopup.open, filterSort]);
  useEffect(() => {
    applyPagination();
  }, [fullTodoList, currentPage]);
  const fetchData = async () => {
    let userList: any = await CommonAPI.getData("users", {}, {});
    setUserList(userList.data);
    let todoData: any = await CommonAPI.getData(`todo?status=${filterSort.status}&assignedUser=${filterSort.assignedUser}&_sort=${filterSort.sort}&_order=asc`, {}, {});
    // setTodoList(todoData.data);
    setFullTodoList(todoData.data);
    setCurrentPage(1);
  }
  const handleAddNewClick = () => {
    setShowpopup({ open: true, edit: false })
  }
  const handlePopClose = () => {
    setEditId("");
    setShowpopup({ open: false, edit: false });
  }
  const handleCardClick = (id: string) => {
    setEditId(id);
    setShowpopup({ open: true, edit: true });
  }
  const applyPagination = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedItems = fullTodoList.slice(startIndex, startIndex + itemsPerPage);
    setTodoList(paginatedItems);
  };
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= Math.ceil(fullTodoList.length / itemsPerPage)) {
      setCurrentPage(newPage);
    }
  };
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
          <h1>Filter</h1>
          <label>
            By Status
          </label>
          <select onChange={(e) => setFiltersort({ status: e.target.value, assignedUser: filterSort.assignedUser, sort: filterSort.sort })} value={filterSort.status}>
          <option value="">ALL</option>
            <option value="todo">To Do</option>
            <option value="inProgress">In Progress</option>
            <option value="done">Done</option>
          </select>
          <label>User:</label>
          <select onChange={(e) => setFiltersort({ status: filterSort.status, assignedUser: e.target.value, sort: filterSort.sort })} value={filterSort.assignedUser}>
            <option value="">ALL</option>
            {
              userList.map((user: any) => {
                return <option key={user.id} value={user.id}>{user.name}</option>

              })
            }
          </select>
          <label>Sort By:</label>
          <select onChange={(e) => setFiltersort({ status: filterSort.status, assignedUser: filterSort.assignedUser, sort: e.target.value })} value={filterSort.sort}>
          <option value="">Select</option>
          <option value="title">Title</option>
          <option value="status">Status</option>
          <option value="dueDate">Due Date</option>
          </select>
          <button className="btn__secondary" onClick={(e) => setFiltersort({ status: "", assignedUser: "", sort: "" })}>Reset</button>
        </div>
        <div className="todo__list">

        
        <div className="filter__paginate">
          <button className="btn__secondary" disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>
            Previous
          </button>
          <p>
            Page {currentPage} of {Math.ceil(fullTodoList.length / itemsPerPage)}
          </p>
          <button className="btn__secondary"
            disabled={currentPage === Math.ceil(fullTodoList.length / itemsPerPage)}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next
          </button>
        </div>
        <div className="todo__table" id="todoList">
          {todoList.map((obj: any) => {
            const filteredList: any = userList.filter((userObj: any) => userObj.id == obj.assignedUser);
            const userName = filteredList.length > 0 ? filteredList[0].name : "Unknown";
            console.log(userName)
            return <TodoListCard key={obj.id} cardData={obj} userName={userName} onCardClick={handleCardClick} />
          })}
        </div>
        </div>
      </div>
      {
        showPopup.open ?
          <TodoListDetails closeModal={handlePopClose} editId={editId} /> : ""
      }
      <Outlet></Outlet>
    </>
  )
}

export default Landing