import React from 'react';
import { ViewPort, TitleBar, TabPanel, Panel, Component, Container, Toolbar, Button, List, TreeList, SearchField } from '@extjs/reactor/modern';
import hljs, { highlightBlock } from 'highlightjs';
import code from './code';

// JSX syntax highlighting
import 'highlightjs/styles/atom-one-dark.css';
import H_js from './H_js';
hljs.registerLanguage('js', H_js);

export default class Layout extends React.Component {
    
    constructor() {
        super();
        this.codePanels = [];

        this.navStore = Ext.create('Ext.data.Store', {
            data: Object.keys(code).map(entry => {
                return { name: entry, path: '/' + entry };
            })
        });

        this.navTreeStore = Ext.create('Ext.data.TreeStore', {
            rootVisible: true,
            root: {
                children: Object.keys(code).map(entry => {
                    return { 
                        id: entry,
                        text: entry, 
                        path: '/' + entry,
                        leaf: true
                    };
                })
            }
        });
    }

    componentDidMount() {
        this.highlightCode();
    }

    componentDidUpdate() {
        this.highlightCode();
    }
    
    highlightCode() {
        for (let el of this.refs.examples.el.query('.code')) {
            highlightBlock(el);
        }
    }

    filterNav(field, value) {
        this.navStore.clearFilter();
        this.navStore.filterBy(record => value === '' || record.get('name').toLowerCase().indexOf(value.toLowerCase()) !== -1);
    }

    onNavChange(path) {
        const { router, location } = this.props;
        
        if (location.pathname !== path) {
            router.push(path)
        }
    }

    render() {
        const { router, children, location } = this.props;
        const key = location.pathname.slice(1);
        const files = code[key];
        const docsMode = location.query.mode === 'docs';
        
        return (
            <Container layout={{type: 'hbox', align: 'stretch'}} cls="main-background">
                { !docsMode && (
                    <Container layout="fit" flex={4}>
                        <TitleBar docked="top">
                            <div className="ext-sencha"/>
                            Ext JS Reactor Kitchen Sink
                        </TitleBar>
                        <Container layout={{type: 'hbox', align: 'stretch'}} flex={1}>
                            <Container scrollable="y">
                                <TreeList
                                    ui="component-tree"
                                    style={{backgroundColor: 'white'}}
                                    width={250}
                                    store={this.navTreeStore}
                                    expanderOnly={false}
                                    shadow
                                    onSelectionChange={(tree, record) => this.onNavChange(record.get('path'))}
                                    selection={this.navTreeStore.getNodeById(key)}
                                />
                            </Container>
                            <Container layout="fit" flex={1} margin={30}>{ children }</Container>
                        </Container>
                    </Container>
                )}
                { files && (
                    <TabPanel 
                        tabBar={{hidden: docsMode && files.length === 1 }}
                        title="Code"
                        flex={2}
                        bodyPadding="0"
                        shadow={true}
                        ref="examples"
                        style={{backgroundColor: '#282c34'}}
                    >
                        { files.map((file, i) => (
                            <Container 
                                key={i}
                                scrollable={true}
                                title={file.file}
                                layout="fit"
                                style={{backgroundColor: '#282c34'}}
                                html={'<pre><code class="code js xml">' + file.content.replace(/</g, '&lt;').replace(/>/g, '&gt;') + '</code></pre>'}
                            />
                        ))}
                    </TabPanel>
                )}
            </Container>
        );
    }
}

