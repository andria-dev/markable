import { Record, Set } from 'immutable';

const defaultCharacterRecord = {
  value: '',
  styles: Set<string>()
};
const CharacterRecord = Record(defaultCharacterRecord);
export class Character extends CharacterRecord {
  getValue = () => this.get('value');
  setValue = (value: string) => this.set('value', value);

  getStyles = () => this.get('styles');
  addStyle = (style: string): Character => this.set('styles', this.getStyles().add(style));
  removeStyle = (style: string): Character => this.set('styles', this.getStyles().delete(style));
}
