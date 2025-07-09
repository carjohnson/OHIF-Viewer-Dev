import React, { useEffect, useState } from 'react';
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
    // set up useEffect hook to manage gathering all data from services
    //  as the other components may be updating asynchronously and this
    //  component needs to be subscribed to those updates

    const [segmentationData, setSegmentationData] = useState([]);
    const { servicesManager } = useSystem();
    const { segmentationService } = servicesManager.services;

    // Annotation listener for measurements
    useEffect(() => {
        const handleAnnotation = (o_annotationdata) => {
        console.log("===> boom - annotation completed");
        const bIsNotIncluded = lo_annotationdata.findIndex(item => item === o_annotationdata.detail) === -1;
        if (bIsNotIncluded) {
            lo_annotationdata.push(o_annotationdata.detail);
        }
        };

        cornerstone.eventTarget.addEventListener(
        cornerstoneTools.Enums.Events.ANNOTATION_COMPLETED,
        handleAnnotation
        );

        return () => {
        cornerstone.eventTarget.removeEventListener(
            cornerstoneTools.Enums.Events.ANNOTATION_COMPLETED,
            handleAnnotation
        );
        };
    }, []);


    // Initial Segmentation Fetch
    useEffect(() => {
        const updateSegmentations = () => {
        const lo_segmentations = segmentationService.getSegmentations();
        console.log("===> num segs:", lo_segmentations.length);

        const lo_allVolumes = [];

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
        setSegmentationData(lo_allVolumes);
        };

        // Initial fetch
        updateSegmentations();

        // Optional: subscribe to changes if OHIF exposes a pubSubService or similar
        // Otherwise, you can trigger updateSegmentations manually when needed

    }, [segmentationService]);



    return (
        <div className="text-white w-full text-center">
        {`Web Quiz version : ${sqrt(4)}`}
        <BtnComponent
            measurementData={lo_annotationdata}
            segmentationData={segmentationData}
        />
        </div>
    );


}



export default WebQuizSidePanelComponent;


/////////////////////////////////////////////////////////
/* for future - to watch for segmentation updates:

    
    // Segmentation Update Listener
    useEffect(() => {
    const { EVENTS, subscribeDebounced, getSegmentation, getSegmentations } = segmentationService;

    const { unsubscribe } = subscribeDebounced(
        EVENTS.SEGMENTATION_DATA_MODIFIED,
        ({ segmentationId }) => {
        const updatedSegmentation = getSegmentation(segmentationId);
        if (!updatedSegmentation) return;

        // Option 1: Re-fetch all segmentations
        const allSegmentations = getSegmentations();
        setSegmentationData([...allSegmentations]);

        // Option 2: Update just the one that changed (if you're tracking by ID)
        // setSegmentationData(prev =>
        //   prev.map(seg => seg.id === segmentationId ? updatedSegmentation : seg)
        // );
        }
    );

    return () => {
        unsubscribe(); // Clean up on unmount
    };
    }, [segmentationService]);

*/

///////////////////////////////////////////////////////

// helper function

// const buildVolumeTable = () => {
//   const lo_segmentations = segmentationService.getSegmentations();
//   const lo_allVolumes = [];

//   lo_segmentations.forEach((segmentation, segIndex) => {
//     const segments = segmentation.segments;

//     Object.keys(segments).forEach((segmentKey) => {
//       const segment = segments[segmentKey];
//       const volume = segment?.cachedStats?.namedStats?.volume?.value;

//       if (volume !== undefined) {
//         lo_allVolumes.push({
//           segmentation: segIndex + 1,
//           segment: segmentKey,
//           volume,
//         });
//       }
//     });
//   });

//   return lo_allVolumes;
// };


    // useEffect(() => {
    //     const volumes = buildVolumeTable();
    //     setSegmentationData(volumes);
    //     }, [segmentationService]);

    // // Segmentation Update Listener
    // useEffect(() => {
    // const { EVENTS, subscribeDebounced, getSegmentation, getSegmentations } = segmentationService;

    // const { unsubscribe } = subscribeDebounced(
    //     EVENTS.SEGMENTATION_DATA_MODIFIED,
    //     ({ segmentationId }) => {
    //     const updatedSegmentation = getSegmentation(segmentationId);
    //     if (!updatedSegmentation) return;

    //     // Option 1: Re-fetch all segmentations
    //     const allSegmentations = getSegmentations();
    //     setSegmentationData([...allSegmentations]);

    //     // Option 2: Update just the one that changed (if you're tracking by ID)
    //     // setSegmentationData(prev =>
    //     //   prev.map(seg => seg.id === segmentationId ? updatedSegmentation : seg)
    //     // );



    //     }
    // );

    // useEffect(() => {
    //     const { EVENTS, subscribeDebounced } = segmentationService;

    //     const { unsubscribe } = subscribeDebounced(
    //         EVENTS.SEGMENTATION_DATA_MODIFIED,
    //         ({ segmentationId }) => {
    //         const updatedVolumes = buildVolumeTable();
    //         setSegmentationData(updatedVolumes);
    //         }
    //     );

    //     return () => {
    //         unsubscribe();
    //     };
    // }, [segmentationService]);
