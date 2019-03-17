import React from 'react';
const { useState } = React;
import ReactDOM from 'react-dom';
import { Editor, EditorState } from '../src/index';

function App() {
  const [state, setState] = useState();

  function handleBeforeChange(nextState: EditorState) {
    return nextState;
  }

  return <Editor state={state} onChange={setState} onBeforeChange={handleBeforeChange} />;
}

ReactDOM.render(<App />, document.getElementById('root'));
