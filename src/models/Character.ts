import { Record, Set } from 'immutable';

const defaultCharacterRecord = {
  value: '',
  styles: Set<string>()
};
const CharacterRecord = Record(defaultCharacterRecord);
export class Character extends CharacterRecord {
  getValue() {
    return this.get('value');
  }

  setValue(value: string) {
    return this.set('value', value);
  }

  getStyles() {
    return this.get('styles');
  }

  addStyle(style: string): Character {
    return this.set('styles', this.getStyles().add(style));
  }

  removeStyle(style: string): Character {
    return this.set('styles', this.getStyles().delete(style));
  }
}
