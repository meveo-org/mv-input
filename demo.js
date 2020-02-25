import { LitElement, html, css } from "lit-element";
import "mv-container";
import "mv-font-awesome";
import "./mv-input.js";

export class MvInputDemo extends LitElement {
  static get properties() {
    return {
      detail: { type: Object, attribute: false },
      open: { type: Boolean, attribute: true },
      theme: { type: String, attribute: true }
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
      
      mv-fa[icon="lightbulb"] {
        font-size: 50px;
        cursor: pointer;
        margin: 20px;
      }
      
      .theme {
        display: flex;
        justify-content: flex-start;
      }
    `;
  }

  constructor() {
    super();
    this.detail = {};
    this.theme = "light";
    this.open = true;
  }

  render() {
    const iconColor = `color: ${this.open ? "yellow" : ""}`;
    const textColor = `color: ${this.open ? "" : "#FFFFFF"}`;
    return html`
      <div class="theme">
        <mv-fa icon="lightbulb" style="${iconColor}" @click=${this.toggleLightBulb}></mv-fa>
      </div>
      <mv-container .theme="${this.theme}" style="${textColor}">
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
      <mv-container .theme="${this.theme}" style="${textColor}">
        <pre>${JSON.stringify(this.detail, null, 2)}</pre>
      </mv-container>
    `;
  }

  changeValue = event => {
    const { detail } = event;
    this.detail = detail;
  };

  toggleLightBulb = () => {
    this.open = !this.open;
    if (this.open) {
      this.theme = "light";
    } else {
      this.theme = "dark";
    }
  };
}

customElements.define("mv-input-demo", MvInputDemo);
