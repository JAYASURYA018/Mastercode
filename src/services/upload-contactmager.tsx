import 'rxjs/operators';
import toastermsg from "../services/toaster-manager";


const uploadContactsManager = 
{
    
    readContacts: function (inputFile: any, delimiter: any, resObject: any) {
        const reader = new FileReader();
        resObject.observalFileProperty = [];
        resObject.globalDataSchemeDetails = [];
        resObject.observalZoneName = [];
        resObject.observalOptionalBusiness = [];
        resObject.fileContents = [];
        resObject.fileHeaders = [];
        reader.onload = (e:any)=> {
            var fileContents = e.target.result;
            var headerRow = fileContents.split('\n')[0];
            var fileInformation = fileContents.split('\n');
            var headerRowObject = headerRow.split(delimiter);

            for (var i = 0; i < fileInformation.length; i++) {
                resObject.FileContents.push({ Content: fileInformation[i] });
            }

            resObject.FileHeaders.push({ headerRow: headerRow });


            resObject.observalFileProperty.push({ Id: '0', Name: '' });
            resObject.observalZoneName.push({ Id: '0', Name: '' });

            for (var headerRowObjectIndex = 0; headerRowObjectIndex < headerRowObject.length; headerRowObjectIndex++) {
                if (headerRowObject[headerRowObjectIndex] == null || headerRowObject[headerRowObjectIndex] == "") {
                    toastermsg.toastMessage("Check the File,Column Should not be Empty", 'error');
                    return false;
                }

                resObject.observalFileProperty.push({ Id: (i + 1).toString(), Name: headerRowObject[i] });
                resObject.observalZoneName.push({ Id: (i + 1).toString(), Name: headerRowObject[i] });
                resObject.observalOptionalBusiness.push({ FieldId: (i + 1).toString(), Field: headerRowObject[i], isenabled: false });
                resObject.globalDataSchemeDetails.push({ FieldId: (i + 1).toString(), FieldName: headerRowObject[i], FieldType: '', Format: '', FormatEnable: false });
            }
            resObject.observalZoneName.push({ Id: 'SAME', Name: "Campaign Specific TimeZone" });
            resObject.observalZoneName.push({ Id: 'ZIPCODE', Name: "Zip Code Specific TimeZone" });
            resObject.observalZoneName.push({ Id: 'AREA', Name: "Area Specific TimeZone" });

        };
        reader.readAsText(inputFile);
        return resObject;
    },
    EditProfileContacts:function (FileHeaders: any, delimiter: any, resObject: any) {
        resObject.observalFileProperty = [];
        resObject.observalZoneName = [];
        resObject.observalOptionalBusiness = [];
        resObject.fileContents = [];
        resObject.delimiters = [];
        var fileContents = FileHeaders;
        var headerRow = fileContents.split('\n')[0];
        var fileInformation = fileContents.split('\n');
        var headerRowObject = headerRow.split(delimiter);

        for (var i = 0; i < fileInformation.length; i++) {
            resObject.fileContents.push(fileInformation[i]);
        }
        resObject.observalFileProperty.push({ Id: '0', Name: '' });
        resObject.observalZoneName.push({ Id: '0', Name: '' });

        for (var rowIndex = 0; rowIndex < headerRowObject.length; rowIndex++) {
            if (headerRowObject[rowIndex] == null || headerRowObject[rowIndex] == "") {
                toastermsg.toastMessage("Check the File,Column Should not be Empty", 'error');
                return false;
            }

            resObject.observalFileProperty.push({ Id: (rowIndex + 1).toString(), Name: headerRowObject[rowIndex] });
            resObject.observalZoneName.push({ Id: (rowIndex + 1).toString(), Name: headerRowObject[rowIndex] });
            resObject.observalOptionalBusiness.push({ FieldId: (rowIndex + 1).toString(), Field: headerRowObject[rowIndex], isenabled: false });
        }
        resObject.observalZoneName.push({ Id: 'SAME', Name: "Campaign Specific TimeZone" });
        resObject.observalZoneName.push({ Id: 'ZIPCODE', Name: "Zip Code Specific TimeZone" });
        resObject.observalZoneName.push({ Id: 'AREA', Name: "Area Specific TimeZone" });

        resObject.delimiters.push({ refValue: "-", refText: "-" });
        resObject.delimiters.push({ refValue: "!", refText: "!" });
        resObject.delimiters.push({ refValue: "$", refText: "$" });
        resObject.delimiters.push({ refValue: "%", refText: "%" });
        resObject.delimiters.push({ refValue: "&", refText: "&" });
        resObject.delimiters.push({ refValue: "*", refText: "*" });
        resObject.delimiters.push({ refValue: ",", refText: "," });
        resObject.delimiters.push({ refValue: "^", refText: "^" });
        resObject.delimiters.push({ refValue: "|", refText: "|" });
        resObject.delimiters.push({ refValue: "\t", refText: "tab" });
        return resObject;

    }
    
}
export default uploadContactsManager;