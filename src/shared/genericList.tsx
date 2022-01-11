import {GenericList as GenericListModel } from '../models'
import Loader from './loader';

export default function GenericList<T>(props: GenericListModel<T>) {
    if(!props.list) {
        if(props.loadingUi) return props.loadingUi;
        return <Loader />
    } else if (props.list.length === 0) {
        if(props.emptyListUi) return props.emptyListUi;
        return <h1>There are no movies to display</h1>
    } else {
        return <>{props.children}</>;
    }
}