import React, { Component } from 'react';
import { Cartesian, Panel } from '@extjs/reactor/modern';
import ChartToolbar from '../Charts/ChartToolbar';

Ext.require([
    'Ext.chart.series.Bar',
    'Ext.chart.axis.Numeric',
    'Ext.chart.axis.Category'
]);

export default class BasicBarChartExample extends Component {

    store = Ext.create('Ext.data.Store', {
        fields: ['country', 'agr', 'ind', 'ser'],
        data: [
            { country: 'USA',     agr: 188217, ind: 2995787, ser: 12500746},
            { country: 'China',   agr: 918138, ind: 3611671, ser: 3792665},
            { country: 'Japan',   agr: 71568,  ind: 1640091, ser: 4258274},
            { country: 'UK',      agr: 17084,  ind: 512506,  ser: 1910915},
            { country: 'Russia',  agr: 78856,  ind: 727906,  ser: 1215198}
        ]
    });

    state = {
        theme: 'default'
    };

    changeTheme = (select, choice) => {
        this.setState({ theme: choice.get('value') })
    }

    render() {
        const { theme } = this.state;

        return (
            <Panel shadow layout="fit">
                <ChartToolbar
                    onThemeChange={this.changeTheme}
                    theme={theme}
                />
                <Cartesian
                    insetPadding="70 40 0"
                    platformConfig={{
                        phone: {
                            insetPadding: '50 0 0'
                        }
                    }}
                    flipXY
                    store={this.store}
                    theme={theme}
                    series={[{
                        type: 'bar',
                        xField: 'country',
                        yField: 'ind',
                        style: {
                            opacity: 0.80,
                            minGapWidth: 10
                        },
                        label: {
                            field: 'ind',
                            display: 'insideEnd',
                            renderer: 'onSeriesLabelRender'
                        }
                    }]}
                    axes={[{
                        type: 'numeric',
                        position: 'bottom',
                        fields: 'ind',
                        grid: true,
                        maximum: 4000000,
                        majorTickSteps: 10,
                        title: 'Billions of USD',
                        renderer: 'onAxisLabelRender'
                    }, {
                        type: 'category',
                        position: 'left',
                        fields: 'country',
                        grid: true
                    }]}
                    sprites={[{
                        type: 'text',
                        text: '2011 Industry size in major economies',
                        fontSize: 21,
                        width: 100,
                        height: 30,
                        x: 40, // the sprite x position
                        y: 35  // the sprite y position
                    }, {
                        type: 'text',
                        text: 'Source: http://en.wikipedia.org/wiki/List_of_countries_by_GDP_sector_composition',
                        fontSize: 10,
                        x: 40,
                        y: 50
                    }]}
                />
            </Panel>            
        )
    }
}