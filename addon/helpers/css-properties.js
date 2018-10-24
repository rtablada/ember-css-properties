import { helper } from '@ember/component/helper';
import { htmlSafe } from '@ember/string';
import { isEmpty } from '@ember/utils';
import cssesc from 'cssesc';

export function cssProperties([objStyles = {}], hashStyles = {}) {
  let stringStyles = '';
  let allStyles = Object.assign({}, objStyles, hashStyles);

  for (const propertyName in allStyles) {
    const propertyValue = allStyles[propertyName];

    if (isEmpty(propertyValue)) continue;

    const [singlePropertyValue] = propertyValue.split(';');

    stringStyles += `${cssesc(propertyName)}:${cssesc(singlePropertyValue)};`;
  }

  return htmlSafe(stringStyles);
}

export default helper(cssProperties);
