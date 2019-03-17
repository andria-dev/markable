import { List, Record } from 'immutable';
import { Line } from './Line';

const defaultEditorStateRecord = {
  lines: List<Line>()
};
const EditorStateRecord = Record(defaultEditorStateRecord);
type EditorStateRecordType = Record<{
  lines: List<Line>;
}>;

export class EditorState {
  private immutable: EditorStateRecordType;

  constructor(immutable: EditorStateRecordType) {
    this.immutable = immutable;
  }

  /** Creates a new empty EditorState */
  static create(): EditorState {
    return this.fromContent(List<Line>());
  }

  /** Creates a new EditorState with the passed lines */
  static fromContent(lines: List<Line>): EditorState {
    return new EditorState(EditorStateRecord({ lines }));
  }

  getLines = () => this.immutable.get('lines');

  addLine = (index: number, line: Line): EditorState =>
    new EditorState(this.immutable.set('lines', this.getLines().insert(index, line)));

  addLines = (index: number, lines: Line[]): EditorState => {
    let currentState = this as EditorState;
    for (let i = 0; i < lines.length; ++i) {
      const line = lines[i];
      currentState = currentState.addLine(index + i, line);
    }
    return currentState;
  };
}
