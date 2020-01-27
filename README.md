# mv-input

MvInput is a Meveo input component based on lit-element.

## Quick Start

To experiment with the MvInput component.

1. Clone this repo.

2. Serve the project from the root directory with some http server (best served with meveo itself)

3. Update the input demo component in demo.js file

## Sample usage

```html
<mv-input
  type="text"                             // type accepts all valid values for html input tag
  name="input-name"                       // the name of of the input, this is returned in the details
                                          // when an input-change event is dispatched.
  value="${this.inputValue}"              // the value of the input
  placeholder="Enter text here"           // placeholder shown on input when no value is entered yet
  rounded                                 // the input is rendered with rounded ends
  has-error                               // the input is rendered with error borders
  @input-change="${this.changeValue}"     // custom event dispatched when the input value is changed
>
  <button slot="prefix"> @ </button>      // shows this element before the input box
  <button slot="suffix"> >> </button>     // shows this element after the input box
</mv-input>
```

You can also check this [demo](https://input.meveo.org/)
