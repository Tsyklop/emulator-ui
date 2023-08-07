import {StatusType} from "~/shared/api/types";

export interface TableFilterBarData {
    search: string,
    searchBy: string,
    status: 'ANY' | StatusType.ACTIVE | StatusType.INACTIVE
}