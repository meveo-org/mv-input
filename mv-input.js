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
      type: { type: String, attribute: true }
    };
  }

  static get styles() {
    return css`
			:host {
				--font-family: var(--mv-input-font-family, MuseoSans);
				--font-size: var(--font-size-m, 16px);
        --color: var(--mv-input-color, #818181);
        --min-width: var(--mv-input-min-width, auto);
        --max-width: var(--mv-input-max-width, auto);
        --border: var(--mv-input-border, 1px solid #4E686D);
        --active-border: var(--mv-input-active-border, 1px solid #1D9BC9);
        --placeholder-color: var(--mv-input-placeholder-color, #C8C6C6);
        --active-box-shadow: var(--mv-input-active-box-shadow, inset 0 0 9px 0 rgba(29, 155, 201, 0.3));
        --error-border: var(--mv-input-error-border, 1px solid rgba(247, 112, 98, 1));
        --error-box-shadow: var(--mv-input-error-box-shadow, inset 0 0 9px 0 rgba(229, 47, 47, 0.3));
        --box-radius: 5px;
        --rounded-radius: 50px;
        --box-padding: 11px 8px;
        --rounded-padding: 11px 20px;
      }

      input {
        color: var(--color);
        font-family: var(--font-family);
        font-size: var(--font-size);
        background-color: transparent;
        border: none;
        outline: none;
        padding: 0 8px;
        width: 100%;
      }

      .mv-input {
        min-width: var(--min-width);
        max-width: var(--max-width);
        border: var(--border);
        background-color: var(--mv-input-background, #FFFFFF);
        display: flex;
        flex-direction: row;
      }

      .mv-input:hover, .mv-input.focus {
        border: var(--active-border);
        box-shadow: var(--active-box-shadow);
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

      .mv-input.error:hover, .mv-input.error.focus {
        box-shadow: var(--error-box-shadow);
      }

      ::placeholder {
        color: var(--placeholder-color);
        font-weight: 100;
      }
		`;
  }

  constructor() {
    super();
    this.type = "text";
    this.focus = false;
    this.rounded = false;
    this.hasError = false;
  }

  render() {
    const boxStyle = this.rounded ? "rounded" : "box";
    const focusClass = this.focus ? " focus" : "";
    const errorClass = this.hasError ? " error" : "";
    const containerClass = `mv-input ${boxStyle}${focusClass}${errorClass}`;
    const inputClass = `mv-input-value ${boxStyle}`;
    return html`
      <div class="${containerClass}">
        <slot name="prefix"></slot>
        <input
          type="${this.type}"
          name="${this.name}"
          value="${this.value || ""}"
          placeholder="${this.placeholder || ""}"
          class="${inputClass}"
          @change="${this.inputChange}"
          @focusin="${this.focusInInput}"
          @focusout="${this.focusOutInput}"
        />
        </span>
        <slot name="suffix"></slot>
      </div>
    `;
  }

  inputChange = originalEvent => {
    const { name, type } = this;
    const { target } = originalEvent;
    const { value } = target;
    this.dispatchEvent(
      new CustomEvent("input-change", {
        detail: { name, type, value, originalEvent }
      })
    );
  };

  focusInInput = () => {
    this.focus = true;
  };

  focusOutInput = () => {
    this.focus = false;
  };
}

customElements.define("mv-input", MvInput);
