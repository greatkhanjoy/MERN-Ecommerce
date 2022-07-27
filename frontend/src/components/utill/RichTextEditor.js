import JoditEditor from 'jodit-react'
import { useRef } from 'react'

const RichTextEditor = ({ setValue, content }) => {
  const editor = useRef(null)

  return (
    <JoditEditor
      ref={editor}
      onChange={(content) => setValue(content)}
      value={content}
    />
  )
}

export default RichTextEditor
