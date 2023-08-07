import {Event} from "effector";

export interface TableActionProps {
    id: number;
    isActive: boolean;
    disabled: boolean;

    editTooltipText?: string;
    toggleTooltipText?: string;

    confirmModalTitle: string;
    confirmModalBodyText: string;

    editRequested: Event<number>;
    toggleStatusRequested: Event<number>;

}