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
        background-color: #00b7ff;
        margin: 2px 2px;
        padding: 2px 10px;
        border-radius: 5px;
        color: #fff;
        border: solid 1px #000;
        box-shadow: 2px 2px 2px #333;
        display: inline-block;
      }
      .results {
        display: table;
        padding-top: 5px;
      }
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
        </span>
        <div class="suffix">
          <slot name="suffix"></slot>
        </div>


       
 
      </div>

      ${
        this.multivalued
          ? html`
              <div class="results">
                ${(this.results = this.multiValue.map(
                  (item, index) =>
                    html`
                      <span
                        class="item item${index}"
                        @click=${() => this.removeItem(item, index)}
                      >
                        ${item} x
                      </span>
                    `,
                ))}
              </div>
            `
          : ``
      }`
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
 
        this.multiValue.push(value)

        this.shadowRoot.querySelector('input').value = ''
        this.results = this.focus = false
        this.focus = true

        this.name = 'multivalued'

        value = this.multiValue
      } else {
        this.shadowRoot.querySelector('input').value = ''
      }
    } else if (this.enter == true && this.multivalued) {

        originalEvent.data += ' '


        this.enter = false
        this.multiValue.push(value)

        this.shadowRoot.querySelector('input').value = ''
        this.results = this.focus = false
        this.focus = true

        this.name = 'multivalued'

        value = this.multiValue


        

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

  removeItem(item, index, originalEvent) {
    const { name, type } = this

    if (this.multiValue.length == 1) {
      this.results = []
      this.multiValue = []
    } else {
      this.results.splice(index, 1)
      this.multiValue.splice(index, 1)
    }

    this.focus = false
    this.focus = true

    let value
    value = this.multiValue

    this.dispatchEvent(
      new CustomEvent('input-change', {
        detail: { name, type, value, originalEvent },
      }),
    )
  }

  focusInInput = (event) => {
    this.focus = true
    if (!!this.pattern) {
      this.format(event)
    }
  }

  focusOutInput = (originalEvent) => {
    const { name, type } = this
    const { target } = originalEvent
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
