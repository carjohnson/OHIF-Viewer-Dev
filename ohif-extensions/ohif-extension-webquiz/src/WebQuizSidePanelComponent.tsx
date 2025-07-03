import React from 'react';
import { sqrt } from 'math.js'
import BtnComponent from './Questions/btnComponent';
import { useSystem } from '@ohif/core';

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

    const { servicesManager } = useSystem();
    const { segmentationService } = servicesManager.services;
    const lo_segmentations = segmentationService.getSegmentations();
    console.log("===> num segs:", lo_segmentations.length);

    const lo_allVolumes: { segmentation: number; segment: string; volume: number }[] = [];

    lo_segmentations.forEach((segmentation, segIndex) => {
        const segments = segmentation.segments;

        Object.keys(segments).forEach((segmentKey) => {
            const segment = segments[segmentKey];
            const volume = segment?.cachedStats?.namedStats?.volume?.value;

            if (volume !== undefined) {
                lo_allVolumes.push({
                    segmentation: segIndex + 1,
                    segment: segmentKey,
                    volume,
                });
            }
        });
    });

    console.table(lo_allVolumes);    

    return (
        <div className="text-white w-full text-center">
            {`Web Quiz version : ${sqrt(4)}`}
            <BtnComponent measurementData = {lo_annotationdata} segmentationData={lo_allVolumes} />
        </div>
    );
}
export default WebQuizSidePanelComponent;
