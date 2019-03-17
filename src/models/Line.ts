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

const defaultLineRecord: {
  characters: List<Character>;
  blockStyle?: string;
} = {
  characters: List<Character>(),
  blockStyle: null
};
const LineRecord = Record(defaultLineRecord);
export class Line extends LineRecord {
  getCharacters(): List<Character> {
    return this.get('characters');
  }

  addCharacters(index: number, value: Character): Line {
    return this.set('characters', this.getCharacters().insert(index, value));
  }

  removeCharacters(range: Range): Line {
    const characters = this.getCharacters();
    const updatedCharacters = characters
      .slice(0, range.start.index)
      .concat(characters.slice(range.start.index, range.end.index));

    return this.set('characters', updatedCharacters);
  }
}
