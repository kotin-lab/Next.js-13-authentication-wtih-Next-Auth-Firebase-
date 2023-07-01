'use client';

import { experimental_useFormStatus as useFormStatus } from 'react-dom';

export default function Input() {
  const { pending } = useFormStatus();

  return (
    <>
      <input 
        type="text" 
        name="title" 
        className="border bg-gray-100 px-2 py-1 my-4" 
      />
      {pending ? ' Sending' : ''}
    </>
  )
}
