import Grid from './Grid/Grid';
import Panel from './Panel/Panel';
import TabPanel from './TabPanel/TabPanel';
import Toolbar from './Toolbar/Toolbar';
import Tree from './Tree/Tree';
import TreeList from './TreeList/TreeList';
import List from './List/List';
import NestedList from './NestedList/NestedList';
import Animations from './Animations/Animations';
import Button from './Button/Button';
import Carousel from './Carousel/Carousel';
import TextField from './TextField/TextField';
import EmailField from './EmailField/EmailField';
import UrlField from './UrlField/UrlField';
import PasswordField from './PasswordField/PasswordField';
import SpinnerField from './SpinnerField/SpinnerField';
import CheckBoxField from './CheckBoxField/CheckBoxField';
import DatePickerField from './DatePickerField/DatePickerField';
import SelectField from './SelectField/SelectField';
import SliderField from './SliderField/SliderField';
import ToggleField from './ToggleField/ToggleField';
import TextAreaField from './TextAreaField/TextAreaField';
import RadioField from './RadioField/RadioField';
import Gauge from './Gauge/Gauge';
import FormPanel from './FormPanel/FormPanel';
import PivotGrid from './PivotGrid/PivotGrid';
import Video from './Video/Video';
import Audio from './Audio/Audio';
import ProgressBar from './ProgressBar/ProgressBar';
import Menu from './Menu/Menu';
import ActionSheet from './ActionSheet/ActionSheet';
import ToolTip from './ToolTip/ToolTip';
import Picker from './Picker/Picker';
import TouchEvents from './TouchEvents/TouchEvents';
import Msg from './Msg/Msg';
import Toast from './Toast/Toast';
import Calendar from './Calendar/Calendar';
import TitleBar from './TitleBar/TitleBar';
import BasicScatterChart from './BasicScatterChart/BasicScatterChart';
import BasicRadarChart from './BasicRadarChart/BasicRadarChart';
import BasicPieChart from './BasicPieChart/BasicPieChart';
import BasicLineChart from './BasicLineChart/BasicLineChart';
import BasicGaugeChart from './BasicGaugeChart/BasicGaugeChart';
import BasicBarChart from './BasicBarChart/BasicBarChart';
import BasicAreaChart from './BasicAreaChart/BasicAreaChart';
import BasicColumnChart from './BasicColumnChart/BasicColumnChart';

const root = {
    id: 'root',
    children: [
        { text: 'ActionSheet', component: ActionSheet },
        { text: 'Animations', component: Animations },
        { text: 'Button', component: Button },
        { text: 'Calendar', component: Calendar },
        { text: 'Carousel', component: Carousel },
        { text: 'Charts', children: [
            { text: 'Area Chart', children: [
                { text: 'Basic Area Chart', component: BasicAreaChart }
            ] },
            { text: 'Bar Chart', children: [
                { text: 'Basic Bar Chart', component: BasicBarChart }
            ] },
            { text: 'Column Chart', children: [
                { text: 'Basic Column Chart', component: BasicColumnChart }
            ] },
            { text: 'Gauge Charts', children: [
                { text: 'Basic Gauge Chart', component: BasicGaugeChart }
            ] },
            { text: 'Line Charts', children: [
                { text: 'Basic Line Chart', component: BasicLineChart }
            ] },
            { text: 'Pie Charts', children: [
                { text: 'Basic Pie Chart', component: BasicPieChart }
            ] },
            { text: 'Radar Charts', children: [
                { text: 'Basic Radar Chart', component: BasicRadarChart }
            ] },
            { text: 'Scatter Charts', children: [
                { text: 'Basic Scatter Chart', component: BasicScatterChart }
            ] }
        ] },
        { text: 'Form Fields', children: [
            { text: 'CheckBoxField', component: CheckBoxField },
            { text: 'DatePickerField', component: DatePickerField },
            { text: 'EmailField', component: EmailField },
            { text: 'FormPanel', component: FormPanel },
            { text: 'PasswordField', component: PasswordField },
            { text: 'RadioField', component: RadioField },
            { text: 'SelectField', component: SelectField },
            { text: 'SliderField', component: SliderField },
            { text: 'SpinnerField', component: SpinnerField },
            { text: 'TextAreaField', component: TextAreaField },
            { text: 'TextField', component: TextField },
            { text: 'ToggleField', component: ToggleField },
            { text: 'UrlField', component: UrlField }
        ] },
        { text: 'Grids', children: [
            { text: 'Grid', component: Grid },
            { text: 'PivotGrid', component: PivotGrid }
        ] },
        { text: 'Lists', children: [
            { text: 'List', component: List },
            { text: 'NestedList', component: NestedList },
            { text: 'TreeList', component: TreeList }
        ]},
        { text: 'Media', children: [
            { text: 'Video', component: Video },
            { text: 'Audio', component: Audio }
        ] },
        { text: 'Menu', component: Menu },
        { text: 'Msg', component: Msg },
        { text: 'Panel', component: Panel },
        { text: 'Picker', component: Picker },
        { text: 'ProgressBar', component: ProgressBar },
        { text: 'TabPanel', component: TabPanel },
        { text: 'TitleBar', component: TitleBar },
        { text: 'Toast', component: Toast },
        { text: 'Toolbar', component: Toolbar },
        { text: 'TouchEvents', component: TouchEvents },
        { text: 'Trees', children: [
            { text: 'Tree', component: Tree },
            { text: 'TreeList', component: TreeList }
        ] }
    ]
};

function transform(node) {
    if (!node.id) node.id = node.text.replace(/\s/g, '');
    node.leaf = !node.hasOwnProperty('children');

    if (node.children) {
        node.children.forEach(child => transform(child))
    }
}

transform(root);

export default root;