import React from "react";
import { Button } from '@ohif/ui-next';


function BtnComponent( { measurementData, segmentationData }) {

  const handleButtonClick = () => {
    console.log('Number of measurements: ', measurementData.length);
    console.log("Number of segmentations:", segmentationData.length)

    window.parent.postMessage({
      type: 'annotations', 
      measurementdata: measurementData,
      segmentationdata: segmentationData
    }, '*');

  }

    return (
      <div>
        <br/>
        <Button onClick={handleButtonClick}>Post</Button>
      </div>
  );
}

export default BtnComponent
