import { List, Record } from 'immutable';
import { Line } from './Line';

const defaultEditorStateRecord = {
  lines: List<Line>()
};
const EditorStateRecord = Record(defaultEditorStateRecord);
export class EditorState extends EditorStateRecord {
  getLines = () => this.get('lines');
  addLine = (index: number, line: Line): EditorState =>
    this.set('lines', this.getLines().insert(index, line));
  addLines = (index: number, lines: Line[]): EditorState => {
    let currentState = this as EditorState;
    for (let i = 0; i < lines.length; ++i) {
      const line = lines[i];
      currentState = currentState.addLine(index + i, line);
    }
    return currentState;
  };
}
