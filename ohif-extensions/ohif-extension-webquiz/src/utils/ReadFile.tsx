import React from "react";
import { Label } from '@ohif/ui';

function ReadFile() {

  console.log('***** In the ReadFile script *****');
  debugger;

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  let fileToParse;

  const handleChange = (event) => {
    if (event.target.files) {
      let quizFile = event.target.files[0];
      // alert( `File name: ${quizFile.name}` );
      fileToParse = quizFile;
      }
  }

  const handleSubmit = (event) => {
    debugger;
    console.log("In handleReadXml")
    var rawFile = new XMLHttpRequest();
    var allText;


    // rawFile.onreadystatechange = () => {
    //   if (rawFile.readyState == 4 && rawFile.status == 200) { {
    //       allText = rawFile.responseXML;
    //       alert(allText);
    //       // const parser = new DOMParser();
    //       // const xml = parser.parseFromString(rawFile.response, fileToParse);
    //     }
    //   }
    // }

      //==========================
      rawFile.onload = function() {
        // allText = rawFile.responseXML;
        // alert(allText);
        const parser = new DOMParser();
        // const xml = parser.parseFromString(rawFile.response, "text/xml");
      }


      rawFile.open("GET", fileToParse, true);
      rawFile.send(null);


    }

  

  return (
    <form onSubmit={handleSubmit}>
      <br/>
      <Label>==========================</Label>
      <div>
        <Label>
          select quiz file:
          <input type="file" onChange={handleChange } />
        </Label>
      </div>
      <br />
      <button type="submit">Upload</button>
      <Label>==========================</Label>
    </form>
  )

}

export default ReadFile;
