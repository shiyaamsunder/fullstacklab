import { useEffect, useState } from "react";

export default function FunctionalComponent(props) {
  const [count, setCount] = useState(0);
  const [isHidden, setIsHidden] = useState(false);
  const [todotext, setTodotext] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    setTodos([
      {
        id: 1,
        text: "Learn React",
        checked: false,
      },
      {
        id: 2,
        text: "Learn Java",
        checked: false,
      },
      {
        id: 3,
        text: "Take out garbage",
        checked: true,
      },
    ]);

    return () => {};
  }, []);

  const handleClick = () => {
    setCount((prev) => {
      return prev + 1;
    });
  };

  const handleAddTodo = () => {
    const currentTodo = {
      id: todos.length + 1,
      text: todotext,
      checked: false,
    };

    // todos.push(currentTodo);
    const todosCopy = [...todos];
    todosCopy.push(currentTodo);
    setTodos([...todos, currentTodo]);
  };
  return (
    <div>
      <input
        onChange={(e) => {
          setTodotext(e.target.value);
        }}
      />
      <button onClick={handleAddTodo}>Add todo</button>

      {todos.map((todo) => {
        return (
          <TodoItem key={todo.id} text={todo.text} checked={todo.checked} />
        );
      })}
    </div>
  );
}

const TodoItem = (props) => {
  return (
    <div>
      {props.text}
      <input type="checkbox" checked={props.checked} />
    </div>
  );
};
