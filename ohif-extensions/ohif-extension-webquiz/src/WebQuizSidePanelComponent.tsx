import React from 'react';
import { sqrt } from 'math.js'
// import BtnComponent from './Questions/btnComponent';
// import ReadFile from './utils/ReadFile';

/**
 *  Creating a React component to be used as a side panel in OHIF.
 *  Also performs a simple div that uses Math.js to output the square root.
 */
function WebQuizSidePanelComponent() {

    return (
        <div className="text-white w-full text-center">
            {`Web Quiz version : ${sqrt(9)}`}
            {/* {ReadFile()} */}
            {/* {BtnComponent()} */}
        </div>
    );
}
export default WebQuizSidePanelComponent;
