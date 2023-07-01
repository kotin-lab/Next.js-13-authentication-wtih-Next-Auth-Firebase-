export {};

declare global {
  type Todo = {
    id?: string,
    owner: string | null,
    title: string | null,
    timestamp?: {
      seconds: number,
      nanoseconds: number
    },
    is_completed: boolean
  }

  type FormAction = string | ((formData: FormData) => void)
}