# parsesize

A tiny CSS preprocessor that converts the `size` property to `width` and `height`.

## How to use it

```
npm install -g parsesize
sizecss testfile.size
```

## Example

`testfile.size` input file:

```css
.never {
  color: blue;
  size: 20% 12rem;
}

.gonna {
  size: 50px;
}

.give {
  size: 300em 1px;
}

.you {
  size: 13%;
}

.up {
  border-radius: 30px;
  size: 80em;
}
```

Outputted `testfile.css` file:

```css
.never {
  color: blue;
  height: 20%;
  width: 12rem;
}

.gonna {
  height: 50px;
  width: 50px;
}

.give {
  height: 300em;
  width: 1px;
}

.you {
  height: 13%;
  width: 13%;
}

.up {
  border-radius: 30px;
  height: 80em;
  width: 80em;
}
```
