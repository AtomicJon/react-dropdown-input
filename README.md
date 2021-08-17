# react-dropdown-input

A React Dropdown Input (Select)

## Install

### NPM:
```
npm install @super-effective/react-dropdown-input
```

### Yarn:
```
yarn add @super-effective/react-dropdown-input
```

## Usage
Import the component:
```js
import ReactDropdownInput from '@super-effective/react-dropdown-input';
```

Render the component in your code:
```js
const options = [
  { id: 'test1', content: <span>test1</span> },
  { id: 'test2', content: <span>test2</span> },
];
<ReactDropdownInput options={options} onItemSelected={onItemSelected} selectedItemId="test1" />
```

### Props
|Prop|Type|Details|
|----|----|-------|
|`borderColor?`|`string`|The border color<br />Default: `#cdcdcf`|
|`borderWidth?`|`number|string`|The border width<br />Default: `1`|
|`borderRadius?`|`number|string`|The border radius<br />Default: `4`|
|`borderStyle?`|`string`|The border style (e.g. `solid`, `dashed`, etc.)<br />Default: `solid`|
|`dropDownClassName?`|`string`|The className to apply to the dropdown|
|`dropDownStyle?`|`React.CSSProperties`|The styles to apply to the dropdown|
|`excludeSelectedOption?`|`boolean`|Exclude the selected option from the list<br />Default: `false`|
|`fluid?`|`boolean`|Display the dropdown as a fluid item (no division between the value and the dropdown)<br />Default: `false`
|`options`|`DropDownInputOption[]`|The array options <br>`{ id: string; content: ReactNode; }`|
|`padding?`|`number`|Padding - applies to the drop down itself and its items|
|`paddingHorizontal?`|`number`|Horizontal padding - applies to the drop down itself and its items (overrides `padding`)<br />Default: `12`|
|`paddingVertical?`|`number`|Vertical padding - applies to the drop down itself and its items (overrides `padding`)<br />Default: `8`|
|`placeholder?`|`ReactNode`|The content to display when no option is selected<br />Default: "&nbsp;"|
|`selectedOptionClassName`|`string`|The className to apply to the selected option|
|`selectedOptionId`|`string`|The id of the selected option|
|`toggleIcon`|`ReactNode`|The element to display as the toggle icon|
|`onOptionSelected`|`(id: string) => void`|The callback function to be called when the selected option changes|
