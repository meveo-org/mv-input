import { LitElement, html, css } from "lit-element";

export class MvInput extends LitElement {
  static get properties() {
    return {
      name: { type: String, attribute: true },
      rounded: { type: Boolean, attribute: true },
      value: { type: String, attribute: true },
      placeholder: { type: String, attribute: true },
      focus: { type: Boolean, attribute: false },
      hasError: { type: Boolean, attribute: "has-error", reflect: true },

      // valid type values include:
      // "hidden", "text", "search", "tel", "url",
      // "email", "password", "datetime", "date",
      // "month", "week", "time", "datetime-local",
      // "number", "range", "color", "checkbox",
      // "radio", "file", "submit", "image", "reset", "button"
      // default: "text"
      type: { type: String, attribute: true },
      disabled: { type: Boolean, attribute: true },
      required: { type: Boolean, attribute: true },
      immediate: { type: Boolean, attribute: true }
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
  }

  render() {
    const boxStyle = this.rounded ? "rounded" : "box";
    const focusClass = this.focus ? " focus" : "";
    const errorClass = this.hasError ? " error" : "";
    const requiredClass = this.required ? " required" : "";
    const disabledClass = this.disabled ? " disabled" : "";
    const containerClass = `mv-input ${boxStyle}${focusClass}${errorClass}${requiredClass}${disabledClass}`;
    const inputClass = `mv-input-value ${boxStyle}${requiredClass}`;
    return html`
      <div class="${containerClass}">
        <div class="prefix">        
          <slot name="prefix"></slot>
        </div>
        <input
          .type="${this.type}"
          name="${this.name}"
          .value="${this.value || ""}"
          placeholder="${this.placeholder || ""}"
          class="${inputClass}"
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

  inputChange = keyPressed => originalEvent => {
    const { name, type } = this;
    const { target } = originalEvent;
    const { value } = target;
    const onKeyPress = this.immediate && keyPressed;
    const onChange = !this.immediate && !keyPressed;
    const shouldDispatchEvent = onKeyPress || onChange;
    if (shouldDispatchEvent) {
      this.dispatchEvent(
        new CustomEvent("input-change", {
          detail: { name, type, value, originalEvent }
        })
      );
    }
  };

  focusInInput = () => {
    this.focus = true;
  };

  focusOutInput = () => {
    this.focus = false;
  };
}

customElements.define("mv-input", MvInput);
