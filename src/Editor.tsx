import React from 'react';
import { EditorState } from '.';
const { useCallback } = React;

interface EditorProps {
  state: EditorState;
  onChange: (editorState: EditorState) => void | any;
  onBeforeChange?: (editorState: EditorState, range: Range | null) => EditorState;
  placeholder?: string;
  [s: string]: any;
}
export function Editor({ state, onChange, onBeforeChange, placeholder }: EditorProps) {
  const handleChange = useCallback(
    event => {
      event.preventDefault();
      event.persist();
      console.log(event);
      /* TODO: modify state */
      /* TODO: capture range of state that was modified */
      const range = null;
      onChange(onBeforeChange(state, range));
    },
    [onChange, onBeforeChange]
  );

  const children = state
    .getLines()
    .map(line => {
      return line.getCharacters().map(({ value: letter, styles }) => {
        let node = <span>{letter}</span>;

        if (styles.has('bold')) {
          node = <strong>{node}</strong>;
        }

        if (styles.has('italic')) {
          node = <em>{node}</em>;
        }

        return node;
      });
    })
    .flatten()
    .toJS();

  return (
    <div contentEditable suppressContentEditableWarning onKeyPress={handleChange}>
      {children.length ? children : placeholder || null}
    </div>
  );
}
