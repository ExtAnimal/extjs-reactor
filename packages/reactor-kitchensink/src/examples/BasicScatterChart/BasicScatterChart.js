import React, { Component } from 'react';
import { Cartesian, Panel, Button, Toolbar, SegmentedButton, Spacer, Label } from '@extjs/reactor/modern';
import createData from './data';
import ChartToolbar from '../Charts/ChartToolbar';

Ext.require([
    'Ext.chart.*',
    'Ext.chart.series.Scatter',
    'Ext.chart.axis.Numeric',
    'Ext.chart.axis.Category'
]);

export default class BasicScatterChartExample extends Component {
    
    constructor() {
        super();
        this.refresh();
    }

    store = Ext.create('Ext.data.Store', {
        fields: ['id', 'g0', 'g1', 'g2', 'g3', 'g4', 'g5', 'g6', 'name']
    });

    state = {
        theme: 'default'
    };

    refresh = () => {
        this.store.loadData(createData(25));
    }

    toggleZoomOnPan = (zoomOnPan) => {
        this.refs.chart.getInteraction('panzoom').setZoomOnPan(zoomOnPan);
    }

    changeTheme = (select, choice) => {
        this.setState({ theme: choice.get('value') })
    }

    render() {
        const { theme } = this.state;

        return (
            <Panel shadow layout="fit">
                <ChartToolbar
                    onRefreshClick={this.refresh}
                    onToggleZoomOnPan={this.toggleZoomOnPan}
                    onThemeChange={this.changeTheme}
                    theme={theme}
                />
                <Cartesian
                    ref="chart"
                    insetPadding="20 20 10 10"
                    store={this.store}
                    theme={theme}
                    legend={{
                        position: 'bottom'
                    }}
                    interactions={[
                        'panzoom',
                        'itemhighlight'
                    ]}
                    series={[{
                        type: 'scatter',
                        xField: 'id',
                        yField: 'g1',
                        title: 'Group 1',
                        highlightCfg: {
                            strokeStyle: 'red',
                            lineWidth: 5
                        },
                        marker: {
                            type: 'path',
                            path: [
                                ['M', 0, 1],
                                ['L', 1, 0],
                                ['L', 0, -1],
                                ['L', -1, 0],
                                ['Z']
                            ],
                            scale: 10,
                            lineWidth: 2
                        }
                    }, {
                        type: 'scatter',
                        xField: 'id',
                        yField: 'g2',
                        title: 'Group 2',
                        highlightCfg: {
                            strokeStyle: 'red',
                            lineWidth: 5
                        },
                        marker: {
                            type: 'circle',
                            radius: 10,
                            lineWidth: 2
                        }
                    }]}
                    axes={[{
                        type: 'numeric',
                        position: 'left',
                        fields: ['g1', 'g2', 'g3', 'g4'],
                        visibleRange: [0, 1],
                        style: {
                            estStepSize: 20
                        },
                        label: {
                            rotate: {
                                degrees: -30
                            }
                        }
                    }, {
                        type: 'category',
                        position: 'bottom',
                        visibleRange: [0, 0.5],
                        fields: 'id'
                    }]}
                />
            </Panel>
        )
    }
}