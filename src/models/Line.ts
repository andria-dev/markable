import { List, Record } from 'immutable';
import { Character } from './Character';

interface Position {
  index: number;
}

interface LinePosition extends Position {
  line: number;
}

interface Range {
  start: Position;
  end: Position;
}

interface LineRange {
  start: LinePosition;
  end: LinePosition;
}
const defaultLineRecord = {
  characters: List<Character>()
};
const LineRecord = Record(defaultLineRecord);
export class Line extends LineRecord {
  getCharacters = () => this.get('characters');
  addCharacters = (index: number, value: Character): Line =>
    this.set('characters', this.getCharacters().insert(index, value));
  removeCharacters = (range: Range): Line =>
    this.set(
      'characters',
      this.getCharacters()
        .slice(0, range.start.index)
        .concat(this.getCharacters().slice(range.start.index, range.end.index))
    );
}
