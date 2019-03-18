import { List, Record } from 'immutable';
import { Line } from './Line';

const defaultEditorStateRecord = {
  lines: List<Line>()
};
const EditorStateRecord = Record(defaultEditorStateRecord);
type EditorStateRecordType = Record<{
  lines: List<Line>;
}>;
type ExportedEditorState = {
  characters: {
    value: string;
    styles: string[];
  }[];
  blockStyle;
}[];

export class EditorState {
  private immutable: EditorStateRecordType;

  constructor(immutable: EditorStateRecordType) {
    this.immutable = immutable;
  }

  /** Creates a new empty EditorState */
  static create(): EditorState {
    return this.from([]);
  }

  /** Creates a new EditorState with the passed lines */
  static from(lines: Line[]): EditorState {
    return new EditorState(EditorStateRecord({ lines: List<Line>(lines) }));
  }

  /** Returns an array of plain JS lines; the result of Immutable.List<Line>.toJS() */
  export(): ExportedEditorState {
    return this.getLines().toJS();
  }

  getLines(): List<Line> {
    return this.immutable.get('lines');
  }

  getLine(index: number) {
    return this.getLines().get(index);
  }

  addLine(index: number, line: Line): EditorState {
    return new EditorState(this.immutable.set('lines', this.getLines().insert(index, line)));
  }

  addLines = (index: number, lines: Line[]): EditorState => {
    let currentState = this as EditorState;
    for (let i = 0; i < lines.length; ++i) {
      const line = lines[i];
      currentState = currentState.addLine(index + i, line);
    }
    return currentState;
  };
}
