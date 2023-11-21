import { EditorProvider, BubbleMenu, EditorContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { BubblueButton } from "../BubbleButton"

import './styles.css'
import { StyledEditorContent } from "./styles"

interface EditorProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string
  name?: string
  onChange: (event: React.FormEvent<HTMLDivElement>) => void
}

export function Editor(props: EditorProps) {

  const editor = useEditor({
    extensions: [
      StarterKit,
    ],
    content: '', // Conteúdo inicial do editor
    editorProps: {
      attributes: {
        class: 'editor', // Aqui usamos algumas classes do editor para estilizar como um default
      },
    },
    onUpdate: ({ editor }) => { // Aqui a função que vai ser chamada quando o editor for atualizado
      props.onChange({
        preventDefault: () => { }, // Aqui previnimos o comportamento padrão do editor
        currentTarget: {
          innerHTML: editor.getHTML(),
        }, // Aqui colocamos o conteúdo do editor no innerHTML
      } as React.FormEvent<HTMLDivElement>) // Aqui o editor é tipado como um FormEvent para a função onChange
    },
  })

  return (
    <EditorContent
      {...props}
      value={props.value}
      onChange={props.onChange}
      name={props.name}
      editor={editor}
      style={{
        maxWidth: '100%',
        height: '5rem',
        padding: '0.5rem',
        marginBottom: '0.5rem',
        border: '1px solid #000',
        borderRadius: '0.5rem',
      }}
    />
  )
}
