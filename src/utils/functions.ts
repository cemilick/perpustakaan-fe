import { Dispatch, SetStateAction } from "react";
import api from "./axios";
import moment from "moment/moment";
import "moment/locale/id";
moment.locale('id');

export class TableDataHelper {
    public static async getData(props: {
        path: string;
        setPageConfig: Dispatch<SetStateAction<any>>;
        setData: Dispatch<SetStateAction<any>>;
        page: any;
    }) {
        const { data: response } = await api.get(`/${props.path}?limit=10&page=${props.page}`);
        props.setData(response.data.data);
        props.setPageConfig({
            limit: response.data.per_page,
            total: response.data.total,
            page: response.data.current_page,
            total_data: response.data.total_data,
            offset: response.data.offset
        });
    }
}

export class DateHelper {
    public static formatDate(date: string) {
        return moment(date).format('DD MMMM YYYY');
    }
}