import * as React from 'react';
import '../../scss/_custom.scss';
interface InitialPageProps {
    title: string;
    description: string;
    subDescription: string;
    buttonText: string;
    linkText1: string;
    linkText2: string;
    hrefLink1?: string;
    hrefLink2?: string;
    onPopUpBtnClick: () => void;
}

const InitialPage = (props: InitialPageProps) => {
    return (
        <div className="container mt-5 text-center init-page">
            <div className="row pt-5 k-content k">
                <div className="col-md-5 mx-auto">
        <div className='deleteConfirmPopup'>
            <p className='heading'>{props.title}</p>
            <p className='description'>{props.description}</p>
                        <p className='subDescription'>{props.subDescription}</p>
                        <div className="row mt-5">
                            <div className="col-md-12">
                        <button type="button" onClick={() => { props.onPopUpBtnClick() }} className="k-button k-primary PopupBtn"> + {props.buttonText}</button>
                            </div>
                        </div>
                        <div className="mt-5">
                            <a href={props.hrefLink1} className='px-3 linktext'>{props.linkText1}</a>
                            <a href={props.hrefLink2} className='px-3 linktext border-left'>{props.linkText2}</a>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default InitialPage;