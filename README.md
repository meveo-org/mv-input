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
  disabled                                // the input is disabled
  required                                // the input's placeholder has a bolder text to indicate that
                                          // it is required
  immediate                               // this will immediately trigger the @input-change event on key press
                                          // otherwise, it waits for the focus to change or enter key is pressed
  pattern="mm/dd/yyyy"                    // This is the pattern used for input masking
  pattern-matcher="mdy"                   // This indicates which characters in the pattern will be matched
                                          // when entering a character (not used if pattern is not defined)
  pattern-regex="\\d"                     // Regular expression that is used to match the input value
                                          // (not used if pattern is not defined)
>
  <button slot="prefix"> @ </button>      // shows this element before the input box
  <button slot="suffix"> >> </button>     // shows this element after the input box
</mv-input>
```

You can also check this [demo](https://input.meveo.org/)


## Acknowledgement
Input masking logic is derived from [stackoverflow](https://stackoverflow.com/a/55010378)