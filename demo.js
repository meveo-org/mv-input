import { LitElement, html, css } from "lit";
import "@meveo-org/mv-container";
import "./mv-input.js";

const moduleName = !window.importShim ? "@meveo-org/mv-container" : "mv-container"

// import ("@meveo-org/mv-container").catch(() => import ("mv-container"));

//console.log(importShim);

export class MvInputDemo extends LitElement {
  static get properties() {
    return {
      detail: { type: Object, attribute: false },
      theme: { type: String, attribute: true }
    };
  }

  static get styles() {
    return css`
      :host {
        font-family: var(--font-family, Arial);
        font-size: var(--font-size-m, 10pt);
      }

      mv-container {
        --mv-container-min-width: 300px;
        --mv-container-min-height: 200px;
        --mv-container-margin: 20px auto;
        --mv-container-padding: 20px 30px;
      }

      i {
        font-style: normal;
        color: #00b7ff;
        font-weight: bold;
        font-size: 1.2em;
      }

      fieldset > label,
      label > input {
        cursor: pointer;
      }

      fieldset {
        width: 120px;
        margin-left: 10px;
        border: 2px solid red;
        -moz-border-radius: 8px;
        -webkit-border-radius: 8px;
        border-radius: 8px;
        color: #818181;
      }

      legend {
        font-weight: 500;
        color: red;
      }

      .prefix-suffix {
        --mv-input-prefix-width: 24px;
        --mv-input-suffix-width: 24px;
      }
    `;
  }

  constructor() {
    super();
    this.detail = {};
    this.theme = "light";
  }

  render() {
    const { theme } = this;
    return html`
      <fieldset>
        <legend>Theme</legend>
        <label>
          <input
            type="radio"
            name="theme"
            value="light"
            checked
            @change="${this.changeTheme}"
          />Light
        </label>
        <label>
          <input
            type="radio"
            name="theme"
            value="dark"
            @change="${this.changeTheme}"
          />Dark
        </label>
      </fieldset>
      <mv-container .theme="${theme}">
        <h2>Default</h2>
        <mv-input
          name="default"
          placeholder="Default"
          @input-change="${this.changeValue}"
        ></mv-input>

        <h2>Rounded</h2>
        <mv-input
          name="rounded"
          placeholder="Rounded"
          rounded
          @input-change="${this.changeValue}"
        ></mv-input>

        <h2>Has error</h2>
        <mv-input
          name="has error"
          placeholder="Error"
          has-error
          @input-change="${this.changeValue}"
        ></mv-input>

        <h2>Disabled</h2>
        <mv-input
          name="disabled"
          placeholder="Disabled"
          @input-change="${this.changeValue}"
          disabled
        ></mv-input>

        <h2>Required</h2>
        <mv-input
          name="required"
          placeholder="Required"
          @input-change="${this.changeValue}"
          required
        ></mv-input>

        <h2>With prefix and suffix</h2>
        <mv-input
          name="with prefix and suffix"
          class="prefix-suffix"
          placeholder="With prefix and suffix"
          @input-change="${this.changeValue}"
        >
          <i slot="prefix">&#64;</i>
          <i slot="suffix">&#x27A4;</i>
        </mv-input>

        <h2>Pattern</h2>
        <mv-input
          name="pattern"
          placeholder="mm/dd/yyyy"
          @input-change="${this.changeValue}"
          pattern="mm/dd/yyyy"
          pattern-matcher="mdy"
        ></mv-input>

        <h2>Immediate</h2>
        <mv-input
          name="immediate"
          placeholder="Immediate"
          @input-change="${this.changeValue}"
          immediate
        ></mv-input>

        <h2>Multivalued</h2>
        <mv-input
          name="Multivalued"
          @input-change="${this.changeValue}"
          @remove="${this.changeValue}"
          immediate
          multivalued
        ></mv-input>





      </mv-container>
      <mv-container .theme="${theme}">
        <pre>${JSON.stringify(this.detail, null, 2)}</pre>
      </mv-container>
    `;
  }

  changeValue = event => {
    const { detail } = event;
    this.detail = detail;
  };

  changeTheme = originalEvent => {
    this.theme = originalEvent.target.value;
  };
}

customElements.define("mv-input-demo", MvInputDemo);
