import { Input } from '@progress/kendo-react-inputs';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { Translation, withTranslation } from 'react-i18next';

export interface SearchBarFilterProps {
    searchText: any;
    inputVal: string;
}

const SearchBarFilter = (props: SearchBarFilterProps) => {
    const commonNs = { ns: ['common'] };
    const [searchState, setSearchState] = useState("");

    useEffect(() => {
        props.searchText(searchState)
    }, [searchState]);
    useEffect(() => {
        setSearchState(props.inputVal)
    }, [props.inputVal]);

    return (
        <Translation ns={['common']}>
            {
                (t) => <>
                   
                    <div className="report-filter-search">
                        <div className="search-input pl-0 text-right">
                            <i className="icon-tool-search"></i>
                            <Input placeholder="Filter" title="Filter"
                            
                                aria-labelledby="Search-Bar" id="Search-Bar"
                                aria-describedby="Search-Bar" name="Search-Bar"
                                value={searchState} onChange={(e: any) => { setSearchState(e.target.value) }}/>
                                {/* <i className="icon-tool-search"></i> */}
                        </div>
                    </div>
                </>
            }
        </Translation>
    );
}
export default withTranslation(['common'])(SearchBarFilter)