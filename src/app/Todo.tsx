'use client';

import { experimental_useOptimistic as useOptimistic } from 'react';
import { deleteTodo, updateIsCompleted } from './actions';
import { useRouter } from 'next/navigation';

export default function Todo({todo}: {todo: Todo}) {
  const router = useRouter();
  const [optimisticTodo, updateOptimisticTodo] = useOptimistic(
    todo,
    (state, newTodo: Todo) => ({...newTodo})
  );

  // Handlers
  async function handleOnClick() {
    const updatedTodo = {
      ...todo,
      ['is_completed']: !optimisticTodo.is_completed
    };
    updateOptimisticTodo(updatedTodo);

    await updateIsCompleted(todo.id, updatedTodo.is_completed);
  }

  return (
    <div className='group my-2'>
      <button 
        onClick={handleOnClick}
        className="font-semibold text-lg"
      >
        {optimisticTodo.is_completed ? `🔴` : `⭕`}
        {' '}
        {optimisticTodo.title}
      </button>      
      <button 
        className='hidden group-hover:inline mx-2'
        onClick={async () => {
          if (confirm(`Sure you want to delete? ${todo.title}`)) {
            await deleteTodo(todo.id);
            router.refresh();
          }
        }}
      >
        ❌
      </button>
    </div>
  )
}
