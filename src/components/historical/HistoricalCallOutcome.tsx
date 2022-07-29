 import React from 'react'
import "./HistoricalReport.scss";
import { t } from "i18next";
import * as ReactDOM from "react-dom";
import GridTable from './HistoricalGridTable';
import HistoricalTableReport from './HistoricalReportTabs';
import HistoricalReportTabs from './HistoricalReportTabs';
import HistoricalGridTable from './HistoricalGridTable';

const HistoricalCallOutcome =()=> {

    const [iscallOutcome, setIsCallOutcome] = React.useState<boolean>(true)
    const [isTabData, setIsTabData] = React.useState<boolean>(false)
    const[isHeader,setIsHeader]=React.useState<boolean>(true)
    const[isHeightboolen,setisHeightboolen]=React.useState<boolean>(false)
    const defaultNs = { ns: ["history"] };


    const onHandleClick = () => {
        setIsCallOutcome(false)
        setIsTabData(true)
    }

    const onHandleexistClick =() =>{
    setIsTabData(false)
    setIsHeader(false)
    setIsCallOutcome(false)
    }
    
  return (
//     <div>
    
    
//     <>
//     {isHeader ? <header className=" row page-heading d-flex justify-content-between calloutcomehead">
//             <div className="col-6">
//               <h4 className="d-flex align align-self-center">
//                 {" "}
//                 <div className="d-inline-block pt-1 pr-2">
//                   <i className="icon-contact-strategy"></i>
//                 </div>
                
//                 {isHistoricalData}
//                 <span className="">
                  
//                 </span>{" "}
//               </h4>
//             </div >
//             <div>
//               <div className="col-6 text-right d-flex align align-self-center schedulereport ">

//               <div className="schedule border-right pr-16">
//               <img src="./images/clock.png"/><span style={{color:"#FD7B38"}}> Schedule Report</span> </div>
//                 <div className="callcopy  ">
//                   <img src="./images/send.png" />
//                 </div>
//                 <div  className="calldelete">
//                   <img src="./images/delete.png"/></div>
               
//                 <div className="border-left pl-16 mt-6">
//                       {/* <button
                   
//                    type="button"
//                    className="existbtn"
//                    onClick={onHandleexistClick}
//                  >
//       {t("history.historicalreport.exist", defaultNs)}   
    
//                        </button> */}
                       
//                     <button type="button" className="k-button k-primary"    >
//                       {t('history.historicalcallout.action' , defaultNs)}</button></div>
            
//                 <div className="border-left pl-16 mt-6 " onClick={onHandleexistClick}>
//                 <img src="./images/crossbtn.png"/>
//                 </div>
//               </div>
//             </div>
            
//           </header> :<HistoricalReportTabs isHistoricalData={isHistoricalData} setisHeightboolen={setisHeightboolen}/>}
    
//           {iscallOutcome && 
// <>
//               <div className="purgefilepage">
//                 <h4 className='welcomereport'>Welcome to {isHistoricalData} Report</h4>
//                 <p className="lorem_text">
//                   Ut enim ad minima veniam, quis nostrum exercitationem ullam
//                   corporis suscipit laboriosam, nisi ut aliquid.
//                 </p>
//                 <p className="mauris_text">
//                   At vero eos et accusamus et iusto odio dignissimos ducimus qui
//                   blanditiis praesentium voluptatum deleniti atque.
//                 </p>
//                 <div>
//                   <button
                   
//                     type="button"
//                     className=" addbuildbtn"
//                     onClick={onHandleClick}
//                   >
//                {t("history.calloutcome.buildbtn", defaultNs)}         
//                         </button>
//                 </div>
//                 <div className="watchbox">
//                   <p className="watchvideo"> {t("history.welcomepage.watch", defaultNs)}    </p>
//                   <div className="divid"></div>
//                   <p className="read_artical"> {t("history.welcomepage.readarticle", defaultNs)}  </p>
//                 </div>

//               </div>
// </>     
//      }
// </>

//      {isTabData && <HistoricalGridTable isHeightboolen={isHeightboolen}/>}
 
          
//     </div>


<div></div>
  )
}

export default HistoricalCallOutcome;