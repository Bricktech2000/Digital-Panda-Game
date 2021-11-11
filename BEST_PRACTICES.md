# Best Practices

## Overall

- use 2 spaces for tab everywhere
  > Just for consistency's sake, decreases the amount of indenting necessary

## JavaScript

- arrow functions `() => {}` instead of plain `function`s
  > Just for consistency's sake, they are alomst identical
- `const` by default, `var` only when required
  > Most variables don't change by default, so it's better to mark them as const
- Prettier code formatter with `'`
  > Allows for unified code formatting
- `===` when comparing `null` or `undefined`
  > In JavaScript, `null == undefined` but `null !== undefined`

## CSS

- CSS variables for common properties, such as `--bg` or `--sans`
  > Using CSS variables for fonts and colors allows easy theming
