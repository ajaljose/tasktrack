type TodoCardProps = {
  cardData: {
    id:string;
    title: string;
    description?: string; 
    assignedUser?: string; 
    status?: string; 
  },
  userName:string,
  onCardClick: (id: string) => void,
};
const TodoListCard: React.FC<TodoCardProps> = ({cardData,userName,onCardClick}) => {
  const handleClick=()=>{
    onCardClick(cardData.id);
  }
  return (
    <div className="todo__card" onClick={handleClick}>
        <h2>{cardData.title}</h2>
        <p>{cardData.description}</p>
        <h3>{userName}</h3>
        <h3>{cardData.status}</h3>
    </div>
  )
}

export default TodoListCard