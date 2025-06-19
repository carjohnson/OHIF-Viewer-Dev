import React from "react";
import { Button } from '@ohif/ui';

function BtnComponent( { annotationData }) {

  const handleButtonClick = () => {
    console.log('Number of annotations: ', annotationData.length);
    window.parent.postMessage({ type: 'annotation', annotationdata: annotationData }, '*');
  }

    return (
      <div>
        <br/>
        <div>
          <Button onClick={handleButtonClick}>Post</Button>
        </div>
   </div>
  );
}

export default BtnComponent
