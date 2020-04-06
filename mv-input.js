import { LitElement, html, css } from "lit-element";

export class MvInput extends LitElement {
  static get properties() {
    return {
      name: { type: String },
      rounded: { type: Boolean },
      value: { type: String },
      placeholder: { type: String },
      focus: { type: Boolean, attribute: false },
      hasError: { type: Boolean, attribute: "has-error", reflect: true },

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
      pattern: { type: String },
      patternMatcher: {
        type: String,
        attribute: "pattern-matcher",
        reflect: true
      },
      patternRegex: { type: String, attribute: "pattern-regex", reflect: true }
    };
  }

  static get styles() {
    return css`
      :host {
        --mv-input-font-family: var(--font-family, Arial);
        --font-size: var(--font-size-m, 16px);
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
        --box-padding: 11px 8px;
        --rounded-padding: 11px 20px;
        --prefix-width: var(--mv-input-prefix-width, 0);
        --suffix-width: var(--mv-input-suffix-width, 0);
      }

      .mv-input {
        min-width: var(--min-width);
        max-width: var(--max-width);
        border: var(--border);
        margin: var(--margin);
        background-color: var(--mv-input-background, #ffffff);
        display: grid;
        grid-template-areas: "prefix input-value suffix";
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
        padding: var(--box-padding);
        border-radius: var(--box-radius);
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
    `;
  }

  constructor() {
    super();
    this.type = "text";
    this.focus = false;
    this.rounded = false;
    this.hasError = false;
    this.disabled = false;
    this.required = false;
    this.pattern = "";
    this.patternMatcher = "_";
    this.patternRegex = "\\d";
  }

  render() {
    const boxStyle = this.rounded ? "rounded" : "box";
    const focusClass = this.focus ? " focus" : "";
    const errorClass = this.hasError ? " error" : "";
    const requiredClass = this.required ? " required" : "";
    const disabledClass = this.disabled ? " disabled" : "";
    const containerClass = `mv-input ${boxStyle}${focusClass}${errorClass}${requiredClass}${disabledClass}`;
    const inputClass = `mv-input-value ${boxStyle}${requiredClass}`;
    const value = !!this.value || this.value === 0 ? this.value : "";
    const placeholder =
      !!this.placeholder || this.placeholder === 0 ? this.placeholder : "";
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
          .value="${value}"
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
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    if (!!this.pattern) {
      this.matcher = new Set(this.patternMatcher);
      this.regex = new RegExp(this.patternRegex, "g");
    }
  }

  inputChange = keyPressed => originalEvent => {
    const { name, type } = this;
    const { target } = originalEvent;
    const { value } = target;
    const onKeyPress = this.immediate && keyPressed;
    const onChange = !this.immediate && !keyPressed;
    const shouldDispatchEvent = onKeyPress || onChange;
    this.format(originalEvent);
    if (shouldDispatchEvent) {
      this.dispatchEvent(
        new CustomEvent("input-change", {
          detail: { name, type, value, originalEvent }
        })
      );
    }
  };

  focusInInput = event => {
    this.focus = true;
    if (!!this.pattern) {
      this.format(event);
    }
  };

  focusOutInput = () => {
    this.focus = false;
  };

  firstPosition = this.pattern
    ? [...this.pattern].findIndex(character => this.matcher.has(character))
    : -1;

  clean = value => {
    value = value.match(this.regex) || [];
    return Array.from(this.pattern, character =>
      value[0] === character || this.matcher.has(character)
        ? value.shift() || character
        : character
    );
  };

  format = event => {
    const { target } = event;
    let isBackspace = event.key === "Backspace";
    const unmaskedValue = (position =>
      Array.from(this.pattern, (character, index) =>
        this.matcher.has(character) ? (position = index + 1) : position
      ))(0);
    const [start, end] = [target.selectionStart, target.selectionEnd].map(
      index => {
        index = this.clean(target.value.slice(0, index)).findIndex(character =>
          this.matcher.has(character)
        );
        return index < 0
          ? unmaskedValue[unmaskedValue.length - 1]
          : isBackspace
          ? unmaskedValue[index - 1] || firstPosition
          : index;
      }
    );
    target.value = this.clean(target.value).join``;
    target.setSelectionRange(start, end);
    isBackspace = false;
  };
}

customElements.define("mv-input", MvInput);
