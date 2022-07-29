import React from "react";
import ApiService from "../services/api-manager";
import 'rxjs/operators';
import ApiConstants from "../api-constants";

const checkUserEntity = async (userID: any, screenName: any, entityName: any, resUserObject: any) => {

    let params = {
        userid: userID,
        entityname: entityName
    };

    await ApiService.getAll(ApiConstants.getUserEntityRights, params).then((response) => {

        let filteredCreate = response.filter((i: any) => { return i.rightName.toLowerCase() == 'create'; });
        resUserObject.rightToCreate = (filteredCreate == null || filteredCreate.length <= 0) ? false : true;

        let filteredDelete = response.filter((i: any) => { return i.rightName.toLowerCase() == 'delete'; });
        resUserObject.rightToDelete = (filteredDelete == null || filteredDelete.length <= 0) ? false : true;

        let filteredUpdate = response.filter((i: any) => { return i.rightName.toLowerCase() == 'update'; });
        resUserObject.rightToUpdate = (filteredUpdate == null || filteredUpdate.length <= 0) ? false : true;

        let filteredUpload = response.filter((i: any) => { return i.rightName.toLowerCase() == 'upload'; });
        resUserObject.rightToUpload = (filteredUpload == null || filteredUpload.length <= 0) ? false : true;

        let filteredConfigure = response.filter((i: any) => { return i.rightName.toLowerCase() == 'configure'; });
        resUserObject.rightToConfigure = (filteredConfigure == null || filteredConfigure.length <= 0) ? false : true;

        let filteredSave = response.filter((i: any) => { return i.rightName.toLowerCase() == 'save'; });
        resUserObject.rightToSave = (filteredSave == null || filteredSave.length <= 0) ? false : true;

        let filteredSynchronize = response.filter((i: any) => { return i.rightName.toLowerCase() == 'synchronize'; });
        resUserObject.rightToSynchronize = (filteredSynchronize == null || filteredSynchronize.length <= 0) ? false : true;

        let filteredEnable = response.filter((i: any) => { return i.rightName.toLowerCase() == 'enable'; });
        resUserObject.uLRightsEnable = (filteredEnable == null || filteredEnable.length <= 0) ? false : true;

        let filteredCopy = response.filter((i: any) => { return i.rightName.toLowerCase() == 'copy'; });
        resUserObject.rightToCopyCampaign = (filteredCopy == null || filteredCopy.length <= 0) ? false : true;


        let filteredExecute = response.filter((i: any) => { return i.rightName.toLowerCase() == 'execute'; });
        resUserObject.rightToExecute = (filteredExecute == null || filteredExecute.length <= 0) ? false : true;

        let filteredView = response.filter((i: any) => { return i.rightName.toLowerCase() == 'view'; });
        resUserObject.rightToView = (filteredView == null || filteredView.length <= 0) ? false : true;

        let filteredPseudonymize = response.filter((i: any) => { return i.rightName == 'Pseudonymize'; });
        resUserObject.rightToPseudonymize = (filteredPseudonymize == null || filteredPseudonymize.length <= 0) ? false : true;

        let filteredTemplate = response.filter((i: any) => { return i.rightName == 'Template'; });
        resUserObject.rightToTemplate = (filteredTemplate == null || filteredTemplate.length <= 0) ? false : true;

        let filteredplay = response.filter((i: any) => { return i.rightName.toLowerCase() == 'play'; });
        resUserObject.rightToPlay = (filteredplay == null || filteredplay.length <= 0) ? false : true;

        let filteredDownload = response.filter((i: any) => { return i.rightName.toLowerCase() == 'download'; });
        resUserObject.rightToDownload = (filteredDownload == null || filteredDownload.length <= 0) ? false : true;

        let filteredBusinessParameters = response.filter((i: any) => { return i.rightName.toLowerCase() == 'business parameters'; });
        resUserObject.rightForBusinessParameters = (filteredBusinessParameters.length != 0) ? filteredBusinessParameters[0].selectStatus : false;

        let filteredCSS = response.filter((i: any) => { return i.rightName.toLowerCase() == 'contact selection strategy'; });
        resUserObject.rightForCSS = (filteredCSS.length != 0) ? filteredCSS[0].selectStatus : false;

        let filteredCL = response.filter((i: any) => { return i.rightName.toLowerCase() == 'contact lists'; });
        resUserObject.rightForCL = (filteredCL.length != 0) ? filteredCL[0].selectStatus : false;

        let filteredChaining = response.filter((i: any) => { return i.rightName.toLowerCase() == 'chaining'; });
        resUserObject.rightForChaining = (filteredChaining.length != 0) ? filteredChaining[0].selectStatus : false;

        let filteredMC = response.filter((i: any) => { return i.rightName.toLowerCase() == 'manage contacts'; });
        resUserObject.rightForMC = (filteredMC.length != 0) ? filteredMC[0].selectStatus : false;

        let filteredIVR = response.filter((i: any) => { return i.rightName.toLowerCase() == 'ivr template editor'; });
        resUserObject.rightForIVR = (filteredIVR.length != 0) ? filteredIVR[0].selectStatus : false

        let filteredEMailTemplate = response.filter((i: any) => { return i.rightName.toLowerCase() == 'emailtemplate'; });
        resUserObject.rightForEMailTemplate = (filteredEMailTemplate.length != 0) ? filteredEMailTemplate[0].selectStatus : false;

        let filteredSMSTemplate = response.filter((i: any) => { return i.rightName.toLowerCase() == 'smstemplate'; });
        resUserObject.rightForSMSTemplate = (filteredSMSTemplate.length != 0) ? filteredSMSTemplate[0].selectStatus : false;

        let filteredCSSSchedule = response.filter((i: any) => { return i.rightName.toLowerCase() == 'cssschedule'; });
        resUserObject.rightForCSSSchedule = (filteredCSSSchedule.length != 0) ? filteredCSSSchedule[0].selectStatus : false;

        let filteredRuntimeScheduling = response.filter((i: any) => { return i.rightName.toLowerCase() == 'runtimescheduling'; });
        resUserObject.rightForRuntimeScheduling = (filteredRuntimeScheduling.length != 0) ? filteredRuntimeScheduling[0].selectStatus : false;

        let filteredCMScheduling = response.filter((i: any) => { return i.rightName.toLowerCase() == 'contactmodescheduling'; });
        resUserObject.rightForCMScheduling = (filteredCMScheduling.length != 0) ? filteredCMScheduling[0].selectStatus : false
            
        let filteredCampaignHolidays = response.filter((i: any) => { return i.rightName.toLowerCase() == 'holidays'; });
        resUserObject.rightForCampaignHolidays = (filteredCampaignHolidays.length != 0) ? filteredCampaignHolidays[0].selectStatus : false;

        let filteredExpBuilder = response.filter((i: any) => { return i.rightName.toLowerCase() == 'expressionbuilder'; });
        resUserObject.rightForExpBuilder = (filteredExpBuilder.length != 0) ? filteredExpBuilder[0].selectStatus : false;

        let filteredCampaignTarget = response.filter((i: any) => { return i.rightName.toLowerCase() == 'campaigntarget'; });
        resUserObject.rightForCampaignTarget = (filteredCampaignTarget.length != 0) ? filteredCampaignTarget[0].selectStatus : false;

        let filteredServerScripts = response.filter((i: any) => { return i.rightName.toLowerCase() == 'server scripts'; });
        resUserObject.rightForServerScripts = (filteredServerScripts.length != 0) ? filteredServerScripts[0].selectStatus : false;

        let filteredContactThreshold = response.filter((i: any) => { return i.rightName.toLowerCase() == 'contactthreshold'; });
        resUserObject.rightForContactThreshold = (filteredContactThreshold.length != 0) ? filteredContactThreshold[0].selectStatus : false;

        let filteredAI = response.filter((i: any) => { return i.rightName.toLowerCase() == 'ai configuration'; });
        resUserObject.rightForAI = (filteredAI.length != 0) ? filteredAI[0].selectStatus : false;

        let filteredTelephonyOutcome = response.filter((i: any) => { return i.rightName.toLowerCase() == 'telephony outcomes'; });
        resUserObject.rightForTelephonyOutcome = (filteredTelephonyOutcome.length != 0) ? filteredTelephonyOutcome[0].selectStatus : false;

        let filteredAgentDesktop = response.filter((i: any) => { return i.rightName.toLowerCase() == 'agent desktop configuration'; });
        resUserObject.rightForAgentDesktopConfiguration = (filteredAgentDesktop.length != 0) ? filteredAgentDesktop[0].selectStatus : false;

        return resUserObject;
    });
    return resUserObject;
}
export default checkUserEntity;