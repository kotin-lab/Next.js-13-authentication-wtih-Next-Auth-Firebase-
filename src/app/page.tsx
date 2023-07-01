import { db } from "@/firebase/app";
import { collection, getDocs, limit, orderBy, query, where } from "firebase/firestore";
import { redirect } from "next/navigation";
import getUserSession from "@/utils/getUserSession";

// Components
import NewTodo from "./NewTodo";
import TodoComponent from "./Todo";

async function getUserTodos(userId?: string | null) {
  const todos: Todo[] = [];

  if (userId) {
    const querySnap = await getDocs(query(
      collection(db, 'todos'),
      where('owner', '==', userId),
      orderBy('timestamp', 'desc'),
      limit(10)
    ));
    querySnap.forEach(doc => {
      const todo: any = {
        id: doc.id,
        ...doc.data()
      };

      // Convert Timestamp to JSON object
      todo.timestamp = todo.timestamp.toJSON();

      // Add to todos[]
      todos.push(todo);
    });
  }

  return todos;
}

export default async function Home() {
  const session = await getUserSession();

  // Redirect un-authenticated user
  if (!session) {
    redirect('/unauthenticated');
  }

  // Get todos
  const todos = await getUserTodos(session.user?.uid);

  return (
    <main className="px-4">
      <p>Hello, {session.user?.email}</p>
      <NewTodo />
      {todos.length > 0 ? (
        todos.map(todo => (
          <TodoComponent key={todo.id} todo={todo} />
        ))
      ) : (
        <p className="text-gray-600 text-sm">You don&apos;t have any todos yet.</p>
      )}
    </main>
  );
}
