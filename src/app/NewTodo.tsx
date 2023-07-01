'use client';

import { useRef } from "react";
import Input from "./Input";
import { saveTodo } from "./actions";
import { useRouter } from "next/navigation";

export default async function NewTodo() {
  const router = useRouter();
  const formRef = useRef();

  return (
    <form action={async (formData) => {
        await saveTodo(formData);
        // @ts-expect-error
        formRef.current.reset();
        router.refresh();
      }} 
      // @ts-expect-error
      ref={formRef}
    >
      <Input />
    </form>
  )
}
