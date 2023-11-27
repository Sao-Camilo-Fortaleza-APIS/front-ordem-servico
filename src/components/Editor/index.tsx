import { BubbleMenu, EditorContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { Bold } from "lucide-react"

import { BubblueButton } from "../BubbleButton"

import './styles.css'

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
        padding: '0.25rem',
        marginBottom: '0.5rem',
        border: '1px solid #000',
        borderRadius: '0.5rem',
      }}
    >
      {editor && (
        <BubbleMenu
          editor={editor}
        >
          <BubblueButton
            onClick={() => editor.chain().focus().toggleBold().run()}
            data-active={editor.isActive('bold')}
          >
            <Bold size={20} />
          </BubblueButton>
        </BubbleMenu>
      )}
    </EditorContent>
  )
}
