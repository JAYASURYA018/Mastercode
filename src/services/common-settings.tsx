import * as _ from "underscore";
import store from "../store/store";

const CommonService = {

    getConfig: function (configName: any) {
        let state: any = store?.getState();
        let configValue = _.where(state?.masterState?.masterData?.master?.appConfigList, { refText: configName });
        return configValue != null && configValue.length > 0 ? configValue[0].refValue : '';
    }
}

export default CommonService;
