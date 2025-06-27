import React from 'react';
import { sqrt } from 'math.js'
import BtnComponent from './Questions/btnComponent';
// import ReadFile from './utils/ReadFile';

import * as cornerstone from '@cornerstonejs/core';
import * as cornerstoneTools from '@cornerstonejs/tools';

const lo_annotationdata = [];

/**
 *  Creating a React component to be used as a side panel in OHIF.
 *  Also performs a simple div that uses Math.js to output the square root.
 */
function WebQuizSidePanelComponent() {

    cornerstone.eventTarget.addEventListener(cornerstoneTools.Enums.Events.ANNOTATION_COMPLETED, (o_annotationdata) => {
        console.log("===> boom - annotation completed");
        const bIsNotIncluded = lo_annotationdata.findIndex(item => item === o_annotationdata.detail) === -1;
        if (bIsNotIncluded) {
            lo_annotationdata.push(o_annotationdata.detail);
        }
    })

    return (
        <div className="text-white w-full text-center">
            {`Web Quiz version : ${sqrt(9)}`}
            <BtnComponent annotationData = {lo_annotationdata} />
        </div>
    );
}
export default WebQuizSidePanelComponent;
