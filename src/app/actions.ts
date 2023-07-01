'use server';

import { db } from "@/firebase/app";
import getUserSession from "@/utils/getUserSession";
import { addDoc, collection, deleteDoc, doc, serverTimestamp, updateDoc } from "firebase/firestore";

export async function updateIsCompleted(
  todoId: string | undefined, 
  is_completed: boolean
) {
  if (!todoId) return;
  
  // Update is_completed field of todo
  await updateDoc(
    doc(db, 'todos', todoId), 
    {
      is_completed
    }
  );
}

export async function saveTodo(formData: FormData) {
  const session = await getUserSession();

  if (!session) throw new Error('Unauthrorize access!');

  const title = formData.get('title') ?? '';
  const todo : Todo = {    
    title: title as string,
    owner: session.user?.uid ?? null,
    is_completed: false,
    timestamp: serverTimestamp() as any
  };

  // Save to firestore
  const todosCollection = collection(db, 'todos');
  await addDoc(todosCollection, todo);
}

export async function deleteTodo(todoId: string | undefined) {
  if (!todoId) return;

  await deleteDoc(doc(db, 'todos', todoId));
}