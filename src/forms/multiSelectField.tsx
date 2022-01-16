import { MultiSelectedItem } from "../models";
import '../stylings/multiSelectField.css';

interface MultiSelectFieldProps {
    fieldLabel: string;
    selectedItems: MultiSelectedItem[];
    nonSelectedItems:  MultiSelectedItem[];
    onChange(selectedItems: MultiSelectedItem[], nonSelectedItems:  MultiSelectedItem[]): void;
}

export default function MultiSelecField (props: MultiSelectFieldProps) {

    function select(item: MultiSelectedItem) {
        const selected = [...props.selectedItems, item];
        const nonSelected = props.nonSelectedItems.filter(nonSelectedItem => nonSelectedItem.value !== item.value);
        props.onChange(selected, nonSelected);

    }

    function deselect(item: MultiSelectedItem) {
        const nonSelected = [...props.nonSelectedItems, item];
        const selected = props.selectedItems.filter(selectedItem => selectedItem.value !== item.value);
        props.onChange(selected, nonSelected);

    }

    function selectAll() {
        const selected = [...props.selectedItems, ...props.nonSelectedItems];
        const nonSelected = [] as MultiSelectedItem[];
        props.onChange(selected, nonSelected);

    }

    function deselectAll() {
        const nonSelected = [...props.selectedItems, ...props.nonSelectedItems];
        const selected = [] as MultiSelectedItem[];
        props.onChange(selected, nonSelected);

    }

    return (
        <div className="mb-3">
            <label>{props.fieldLabel}</label>
        <div className="multiple-selector">
            <ul>
                {props.selectedItems.map(item => <li key={item.key} onClick={() => {select(item)}}>{item.value}</li>)}
            </ul>
            <div className="multiple-selector-butttons">
            <button type="button" onClick={selectAll}>{'>>'}</button>
            <button type="button" onClick={deselectAll}>{'<<'}</button>
            </div>
            <ul>
                {props.nonSelectedItems.map(item => <li key={item.key} onClick={() => {deselect(item)}}>{item.value}</li>)}
            </ul>
        </div>
        </div>
    );
}