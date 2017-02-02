import React, { Component } from 'react';
import ExtJSComponent from './ExtJSComponent';

let settings = {};

/**
 * Configures React to resolve jsx tags.
 * @param {String} [viewport=true] Adds a stylesheet that mimics an Ext JS Viewport
 *    by setting the html, body, and react root element to height: 100%. Set this to true when using an
 *    Ext JS component at the root of your app.
 */
export function install({ viewport=false } = {}) {
    settings.viewport = viewport;

    if (viewport) {
        const style = document.createElement('style');
        style.innerHTML = 'html, body, div[data-reactroot] { height: 100%; }';
        document.head.appendChild(style);
    }
};

/**
 * Creates a react component for a given Ext JS component.
 *
 *  Single class example: const Grid = reactify('grid');
 *
 *  Multiple class example: const [ Grid, Panel ] = reactify('Grid', 'Panel');
 *
 * @param {String[]/Ext.Class[]} ...targets xtypes or instances of Ext.Class.
 * @returns {React.Component/React.Component[]} If a single argument is passed a single React.Component class is returned. If multiple arguments are passed, an array of React.Component classes is returned.
 */
export function reactify(...targets) {
    const result = [];

    for (let target of targets) {
        if (typeof(target) === 'string') {
            const name = target;
            target = Ext.ClassManager.getByAlias(`widget.${target}`);
            if (!target) throw new Error(`No xtype "${name}" found.  Perhaps you need to require it with Ext.require("${name}")?`);
        }

        const name = target.getName && target.getName();

        result.push(class extends ExtJSComponent {
            static get name() {
                return name;
            }

            get reactorSettings() {
                return settings;
            }

            createExtJSComponent(config) {
                const result = new target(config)
                if (config.floated && result.show) result.show(); // floated components are hidden by default in modern
                return result;
            }
        })
    }

    if (targets.length === 1) {
        return result[0];
    } else {
        return result;
    }
}