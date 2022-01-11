import React from "react";

export interface GenericList<T> {
    list?: T[];
    loadingUi?: React.ReactElement;
    emptyListUi?: React.ReactElement;
    children?: React.ReactNode;
}