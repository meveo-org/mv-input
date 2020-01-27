import { LitElement, html, css } from "lit-element";
import "mv-container";
import "mv-font-awesome";
import "./mv-input.js";

export class MvInputDemo extends LitElement {
  static get properties() {
    return {
      detail: { type: Object, attribute: false }
    };
  }

  static get styles() {
    return css`
      :host {
        font-family: var(--font-family, MuseoSans);
        font-size: var(--font-size-m, 10pt);
      }

      mv-container {
        --mv-container-min-width: 300px;
        --mv-container-min-height: 200px;
        --mv-container-margin: 20px auto;
        --mv-container-padding: 20px 30px; 
      }
      mv-fa {
        color: #00B7FF;
      }
    `;
  }

  constructor() {
    super();
    this.detail = {};
  }

  render() {
    return html`
      <mv-container>
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

        <h2>With prefix and suffix</h2>
        <mv-input
          name="with prefix and suffix"
          placeholder="With prefix and suffix"
          @input-change="${this.changeValue}"
        >
          <mv-fa slot="prefix" icon="at"></mv-fa>
          <mv-fa slot="suffix" icon="play"></mv-fa>
        </mv-input>

      </mv-container>
      <mv-container>
        <pre>${JSON.stringify(this.detail, null, 2)}</pre>
      </mv-container>
    `;
  }

  changeValue = event => {
    const { detail } = event;
    this.detail = detail;
  };
}

customElements.define("mv-input-demo", MvInputDemo);
