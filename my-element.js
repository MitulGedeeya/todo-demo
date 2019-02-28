import { LitElement, html } from 'lit-element';

import '@vaadin/vaadin-radio-button/vaadin-radio-button.js';
import '@vaadin/vaadin-radio-button/vaadin-radio-group.js';
import '@vaadin/vaadin-text-field/vaadin-text-field.js';
import '@vaadin/vaadin-checkbox/vaadin-checkbox.js';
import '@vaadin/vaadin-button/vaadin-button.js';

const filters = {
    SHOW_ALL: 'All',
    SHOW_DONE: 'Done',
    SHOW_PENDING: 'Pending'
};

class MyElement extends LitElement {

    render() {
        return html`
            <link rel="stylesheet" href="./flex.css">
            <style>
                :host {
                    display: block;
                }

                .header {
                    height: 64px;
                    background: lightgrey;
                    font-size: 24px;
                }
                
                .add-container {
                    margin: 16px;
                }

                .text-field {
                    margin-right: 8px;
                    min-width: 350px;
                }

                .item-list {
                    max-width: 1180px;
                    margin: 16px;
                }

                .card {
                    height: 48px;
                    width: 250px;
                    margin: 8px;
                    padding: 8px;
                    color: #757575;
                    border-radius: 5px;
                    background-color: #fff;
                    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2);
                }

                .card:hover {
                    transition: all .9s;
                    transform: scale(1.03);
                }
            </style>
            <div class="header layout horizontal center center-center">Todo App</div>
            <div class="layout vertical center center-center">
                <div class="add-container layout horizontal">
                    <vaadin-text-field
                        theme="primary"
                        class="text-field"
                        placeholder="Todo"
                        maxlength="50"
                        value='${this.currentItem}'
                        @change="${this.updateCurrentItem}">
                    </vaadin-text-field>
                    <vaadin-button
                        theme="primary"
                        @click="${this.addItem}">
                        ADD
                    </vaadin-button>
                </div>
                <vaadin-radio-group 
                    label="Status" 
                    value="${this.currentFilter}" 
                    @value-changed="${this.updateFilterValue}">

                    ${Object.values(filters).map((item) =>
                        html`
                            <vaadin-radio-button value="${item}">${item}</vaadin-radio-button>
                        `
                    )}
                </vaadin-radio-group>
                <div class="item-list layout vertical center center-center wrap">
                    ${this.filterItems(this.items).map((item) =>
                        html`
                            <div class="card item">
                                <vaadin-checkbox 
                                    ?checked="${item.done}" 
                                    @change="${e => this.updateItemStatus(item, e.target.checked)}">
                                    ${item.item}
                                </vaadin-checkbox>
                            </div>
                        `)}
                </div>          
            </div>
    `;
    }

    /**
      * Object describing property-related metadata used by Polymer features
      */
    static get properties() {
        return {
            name: { type: String },
            items: { type: Array },
            currentItem: { type: String },
            currentFilter: { type: String }
        };
    }

    constructor() {
        super();
        this.name = 'Mitul Gedeeya';
        this.currentItem = '';
        this.currentFilter = filters.SHOW_ALL;
        this.items = []
    }

    addItem(e) {
        if (!this.currentItem) {
            return;
        }

        this.items = [...this.items, {
            item: this.currentItem,
            done: false
        }];

        this.currentItem = '';
    }

    updateCurrentItem(e) {
        this.currentItem = e.target.value;
    }

    updateItemStatus(item, checked) {
        item.done = checked;
    }

    updateFilterValue(e) {
        this.currentFilter = e.target.value;
    }

    filterItems(items) {
        console.log(items);
        if (this.currentFilter === 'All') {
            return items;
        }

        if (this.currentFilter === 'Done') {
            return items.filter((value) => value.done);
        }

        if (this.currentFilter === 'Pending') {
            return items.filter((value) => !value.done);
        }
    }
}

// Register the new element with the browser.
customElements.define('my-element', MyElement);
