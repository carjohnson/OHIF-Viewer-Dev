import React from "react";
import { Button } from '@ohif/ui-next';

function BtnComponent( { annotationData }) {

  const handleButtonClick = () => {
    console.log('Number of annotations: ', annotationData.length);
    window.parent.postMessage({ type: 'annotation', annotationdata: annotationData }, '*');

  }

    return (
      <div>
        <br/>
        <Button onClick={handleButtonClick}>Post</Button>
      </div>
  );
}

export default BtnComponent
