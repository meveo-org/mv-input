import { LitElement, html, css } from 'lit'

export class MvInput extends LitElement {
  static get properties() {
    return {
      name: { type: String },
      rounded: { type: Boolean },
      value: { type: String },
      placeholder: { type: String },
      focus: { type: Boolean, attribute: false },
      hasError: { type: Boolean, attribute: 'has-error', reflect: true },

      // valid type values include:
      // "hidden", "text", "search", "tel", "url",
      // "email", "password", "datetime", "date",
      // "month", "week", "time", "datetime-local",
      // "number", "range", "color", "checkbox",
      // "radio", "file", "submit", "image", "reset", "button"
      // default: "text"
      type: { type: String },
      disabled: { type: Boolean },
      required: { type: Boolean },
      immediate: { type: Boolean },
      multivalued: { type: Boolean },
      pattern: { type: String },
      patternMatcher: {
        type: String,
        attribute: 'pattern-matcher',
        reflect: true,
      },
      patternRegex: { type: String, attribute: 'pattern-regex', reflect: true },
    }
  }

  static get styles() {
    return css`
      :host {
        --mv-input-font-family: var(--font-family, Arial);
        --font-size: var(--mv-input-font-size, 16px);
        --color: var(--mv-input-color, #818181);
        --min-width: var(--mv-input-min-width, auto);
        --max-width: var(--mv-input-max-width, auto);
        --margin: var(--mv-input-margin, 0);
        --border: var(--mv-input-border, 1px solid #4e686d);
        --active-border: var(--mv-input-active-border, 1px solid #1d9bc9);
        --disabled-border: var(--mv-input-disabled-border, 1px solid #c8c6c6);
        --disabled-background: var(--mv-input-disabled-background, #f8f6f6);
        --placeholder-color: var(--mv-input-placeholder-color, #c8c6c6);
        --required-placeholder-color: var(
          --mv-input-required-placeholder-color,
          #818181
        );
        --active-box-shadow: var(
          --mv-input-active-box-shadow,
          inset 0 0 9px 0 rgba(29, 155, 201, 0.3)
        );
        --error-border: var(
          --mv-input-error-border,
          1px solid rgba(247, 112, 98, 1)
        );
        --error-box-shadow: var(
          --mv-input-error-box-shadow,
          inset 0 0 9px 0 rgba(229, 47, 47, 0.3)
        );
        --box-radius: 5px;
        --rounded-radius: 50px;
        --box-padding: var(--mv-input-box-padding, 11px 8px);
        --rounded-padding: 11px 20px;
        --prefix-width: var(--mv-input-prefix-width, 0);
        --suffix-width: var(--mv-input-suffix-width, 0);

        --inactive-box-shadow: var(--mv-input-inactive-box-shadow, none);
        --box-height: var(--mv-input-box-height, auto);
      }

      .mv-input {
        min-width: var(--min-width);
        max-width: var(--max-width);
        border: var(--border);
        margin: var(--margin);
        background-color: var(--mv-input-background, #ffffff);
        display: grid;
        grid-template-areas: 'prefix input-value suffix';
        grid-template-columns: var(--prefix-width) auto var(--suffix-width);
        align-items: center;
        padding-bottom:-1em
      }

      .mv-input:hover:not(.disabled),
      .mv-input.focus:not(.disabled) {
        border: var(--active-border);
        box-shadow: var(--active-box-shadow);
      }

      .mv-input.box.disabled {
        border: var(--disabled-border);
        background: var(--disabled-background);
      }

      .mv-input.box {
        border-radius: var(--box-radius);
        box-shadow: var(--mv-input-inactive-box-shadow);
        height: var(--box-height);
        padding: var(--box-padding);
      }

      .mv-input.rounded {
        padding: var(--rounded-padding);
        border-radius: var(--rounded-radius);
      }

      .mv-input.error {
        border: var(--error-border);
      }

      .mv-input.error:hover:not(.disabled),
      .mv-input.error.focus:not(.disabled) {
        border: var(--error-border);
        box-shadow: var(--error-box-shadow);
      }

      .mv-input-value {
        color: var(--color);
        font-family: var(--mv-input-font-family);
        font-size: var(--font-size);
        background-color: transparent;
        border: none;
        outline: none;
        padding: 0;
        grid-area: input-value;
        width: 100%;
      }

      ::placeholder {
        color: var(--placeholder-color);
        font-weight: 100;
      }

      .required::placeholder {
        font-weight: 700;
        color: var(--required-placeholder-color);
      }

      .prefix {
        grid-area: prefix;
        justify-self: center;
        align-self: center;
      }

      .suffix {
        grid-area: suffix;
        justify-self: center;
        align-self: center;
      }
      .item {
        cursor: pointer;
        background-color: rgb(0, 183, 255);
        margin: 0px 1%;
        padding: 0 1%;
        border-radius: 5px;
        color: rgb(0, 0, 0);
        display: inline-block;
        line-height: 2em;
        font-weight: normal;
        text-align: center;
        box-shadow: 2px 2px #ccc;
        font-size: 14px;
        width: 21%;
      }
      .item span {
        float: right;
        margin-left: 20px;
      }
      .results {
    display: inline-table;
    width: 30em;
    top: -1.6em;
    position: relative;
    float: right;
    margin-bottom: -2em;
}
      .results b {

        margin: 2px 1%;
      }
      .close {
        z-index: 99;
      }
      input {
        width: 50%;
        position: relative;
        z-index: 9;
      }
      .line-0{margin-bottom:0;}

    `
  }

  constructor() {
    super()
    this.type = 'text'
    this.focus = false
    this.rounded = false
    this.hasError = false
    this.disabled = false
    this.required = false
    this.pattern = ''
    this.patternMatcher = '_'
    this.patternRegex = '\\d'
    this.multiValue = []
    this.enter = true
    this.count = 0

    this.distTop = 0

    this.firstLine = true

    this.addEventListener('keyup', function (event) {
      if (event.key === 'Enter') {
        this.enter = true
      }
    })
  }

  render() {
    const boxStyle = this.rounded ? 'rounded' : 'box'
    const focusClass = this.focus ? ' focus' : ''
    const errorClass = this.hasError ? ' error' : ''
    const requiredClass = this.required ? ' required' : ''
    const disabledClass = this.disabled ? ' disabled' : ''
    const containerClass = `mv-input ${boxStyle}${focusClass}${errorClass}${requiredClass}${disabledClass}`
    const inputClass = `mv-input-value ${boxStyle}${requiredClass}`
    const value = !!this.value || this.value === 0 ? this.value : ''
    const placeholder =
      !!this.placeholder || this.placeholder === 0 ? this.placeholder : ''
    return html`
      <div class="${containerClass}">
        <div class="prefix">
          <slot name="prefix"></slot>
        </div>

        ${this.multivalued && this.multiValue.length > 0
          ? html`
              <span class="results line-${this.count}">
                ${(this.results = this.multiValue.map(
                  (item, index) =>
                    html`
                      <b
                        class="item item${index}"
                        @click=${() => this.removeItem(item, index)}
                      >
                        ${item}
                        <span class="close">x</span>
                      </b>
                    `,
                ))}
              </span>
            `
          : ``}

        <input
          name="${this.name}"
          placeholder="${placeholder}"
          class="${inputClass}"
          .type="${this.type}"
          .value="${this.type === 'file' ? '' : value}"
          @change="${this.inputChange()}"
          @input="${this.inputChange(true)}"
          @focusin="${this.focusInInput}"
          @focusout="${this.focusOutInput}"
          ?disabled="${this.disabled}"
        />

        <div class="suffix">
          <slot name="suffix"></slot>
        </div>
      </div>
    `
  }

  connectedCallback() {
    super.connectedCallback()
    if (!!this.pattern) {
      this.matcher = new Set(this.patternMatcher)
      this.regex = new RegExp(this.patternRegex, 'g')
    }
  }

  inputChange = (keyPressed) => (originalEvent) => {
    const { name, type } = this
    const { target } = originalEvent
    let value
    if (type === 'file') {
      value = target.files[0]
    } else {
      value = target.value
    }
    const onKeyPress = this.immediate && keyPressed
    const onChange = !this.immediate && !keyPressed
    const shouldDispatchEvent = onKeyPress || onChange

    if (originalEvent.data == ' ' && this.multivalued) {
      if (value != ' ') {
        this.addValue(value,originalEvent)
      } else {
        this.shadowRoot.querySelector('input').value = ''
      }
    } else if (this.enter == true && this.multivalued) {
      originalEvent.data += ' '
      this.enter = false
      this.addValue(value,originalEvent)
    }
    if (!!this.pattern) {
      this.format(originalEvent)
    }
    if (shouldDispatchEvent) {
      this.dispatchEvent(
        new CustomEvent('input-change', {
          detail: { name, type, value, originalEvent },
        }),
      )
    }
  }

  addValue(value,originalEvent) {
    const { name, type } = this
    const input = this.shadowRoot.querySelector('input')
    const results = this.shadowRoot.querySelector('.results')

    this.multiValue.push(value)

    this.count++
    if (this.count == 5) {this.count=1}



    input.style.left = this.count * 25 + '%'

    if (this.count == 4) {
      this.distTop++
      this.firstLine == false

      this.count = 0

      input.style.left = 0 + 'em'

      this.firstLine = false
      // results.style.marginBottom = '-1em'
      if (this.firstLine == false) {
        if (this.count <= 0) {
          input.style.top = (this.distTop * 2 ) + 'em'
       
          //this.distTop = 0
        }

        //this.distTop = 0
      }
    }

    input.value = ''
    this.focus = false
    this.focus = true
    this.name = 'multivalued'
    value = this.multiValue

    this.dispatchEvent(
      new CustomEvent('input-change', {
        detail: { name, type, value, originalEvent },
      }),
    )


  }
  removeItem(item, index, originalEvent) {
    const { name, type } = this
    const input = this.shadowRoot.querySelector('input')

    this.count--

    console.log(this.count)
    if (this.count==-1){
      this.count=3
      this.distTop --
      input.style.top = (this.distTop * 2) + 'em'
  
    }
   if (this.count <= 0) {
      this.count = 0
   

    }

    if (this.count == 4) {



     


      input.style.left = this.count*25 + '%'
      input.style.top = (this.distTop * 2) + 'em'

      this.distTop --
      //this.count = 4
    } else {
      input.style.left = this.count * 25 + '%'
    }

    if (this.multiValue.length == 1) {
      this.multiValue = []
      this.count = 0
      this.firstLine = true
      this.distTop = 0
    } else {
      this.results.splice(index, 1)
      this.multiValue.splice(index, 1)
    }


    this.focus = false
    this.focus = true

    input.focus()

    let value
    value = this.multiValue

    this.dispatchEvent(
      new CustomEvent('input-change', {
        detail: { name, type, value, originalEvent },
      }),
    )
  }

  focusInInput = (event) => {
    if (!!this.pattern) {
      this.format(event)
    }
  }

  focusOutInput = (originalEvent) => {
    const { name, type } = this
    const { target } = originalEvent
    const input = this.shadowRoot.querySelector('input')
    //input.style.zIndex = '9'

    if (!!this.pattern && this.pattern === target.value) {
      target.value = ''
      this.dispatchEvent(
        new CustomEvent('input-change', {
          detail: { name, type, value: target.value, originalEvent },
        }),
      )
    }
    this.focus = false
  }

  isInMatcher = (character) => this.matcher.has(character)

  clean = (value) => {
    value = value.match(this.regex) || []
    return Array.from(this.pattern, (character) =>
      value[0] === character || this.matcher.has(character)
        ? value.shift() || character
        : character,
    )
  }

  format = (event) => {
    const { target, key } = event
    const unmaskedValue = ((position) =>
      Array.from(this.pattern, (character, index) =>
        this.matcher.has(character) ? (position = index + 1) : position,
      ))(0)

    const formattedCharacters = this.clean(target.value)
    const index = formattedCharacters.findIndex(this.isInMatcher)
    const isBackspace = key === 'Backspace'
    const firstPosition = [...this.pattern].findIndex(this.isInMatcher)
    const cursorPosition =
      index < 0
        ? unmaskedValue[unmaskedValue.length - 1]
        : isBackspace
        ? unmaskedValue[index - 1] || firstPosition
        : index

    target.value = this.clean(target.value).join``
    setTimeout(() => {
      target.setSelectionRange(cursorPosition, cursorPosition)
    })
  }
}

customElements.define('mv-input', MvInput)
