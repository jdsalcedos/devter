'use client'

import { Avatar } from "@heroui/react"
import { ComposePostButton } from "./compose-post-button"
import { addPost } from "../actions/add-post-action"
import { useRef } from "react"

export function ComposePost({
  userAvatarUrl
}: {
  userAvatarUrl: string
}) {
  const formRef = useRef<HTMLFormElement>(null) //Esta referencia se asigna al formulario para poder acceder a él directamente en el DOM

  return (
    <form ref={formRef} // se utiliza para acceder al formulario directamente en el DOM
      action={async (formData) => {
        await addPost(formData)
        formRef.current?.reset() // borra todos los campos del formulario
      }} className='flex flex-row p-3 border-b border-white/20'>
      <Avatar
        radius="full"
        size="md"
        className='mr-2 w-10 h-10'
        src={userAvatarUrl}
      />
      <div className='flex flex-1 flex-col gap-y-4'>
        <textarea
          name='content'
          rows={4}
          className="w-full text-xl bg-black placeholder-gray-500 p-2"
          placeholder="Que esta pasando?"
        ></textarea>
        <ComposePostButton />
      </div>
    </form>
  )
}