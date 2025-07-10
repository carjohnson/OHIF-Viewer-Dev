import React from "react";
import { Button } from '@ohif/ui-next';


function BtnComponent( { measurementData, segmentationData, refreshData, setIsSaved }) {

  const handleButtonClick = () => {

    // refresh the annotation data before posting
    // segmentation data is refreshed automatically through segmentation service
    const [freshMeasurementData, freshSegmentationData ] = refreshData();
    console.log('Number of measurements: ', freshMeasurementData.length);
    console.log("Number of segments:", freshSegmentationData.length)

    window.parent.postMessage({
      type: 'annotations', 
      measurementdata: freshMeasurementData,
      segmentationdata: freshSegmentationData
    }, '*');
    setIsSaved(true);
  }

    return (
      <div>
        <br/>
        <Button onClick={handleButtonClick}>Post</Button>
      </div>
  );
}

export default BtnComponent
