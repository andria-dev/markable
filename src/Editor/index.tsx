import React from 'react';
import { EditorState } from '..';
const { useCallback } = React;

import './style.css';

interface EditorProps {
  state: EditorState;
  onChange: (editorState: EditorState) => void | any;
  onBeforeChange?: (editorState: EditorState, range: Range | null) => EditorState;
  placeholder?: string;
  className?: string;
  [s: string]: any;
}
export function Editor({
  state,
  onChange,
  onBeforeChange,
  placeholder,
  className = ''
}: EditorProps) {
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
    <div
      className={'Markable ' + className}
      placeholder={placeholder}
      contentEditable
      suppressContentEditableWarning
    >
      {children}
    </div>
  );
}
