import React from "react";

class SimpleComponent extends React.Component {
  constructor() {
    super();

    this.state = {
      // remember to explore the contents of this array as it gets logged to console
      eObjArray: []
    };
  }

  handleClick = e => {
    // run the app with and without e.persist() to see the difference in the console!
    
    // e.persist()

    if (this.state.eObjArray.includes(e)){
      // eObj already in array, do not add to eObjArray
      console.warn("eObj not added to arr")

      // what is below will equate to true because:
      // even though we are comparing two variables, they both point to the same object in memory

      // console.log("comparison result (is obj in Arr same as current eObj?):", this.state.eObjArray[0] ===e)

    } else {
      console.warn("eObj yes added to arr")
      console.log("eObj while executing eventHandler: ", e)
      this.setState({
        eObjArray: [...this.state.eObjArray, e]
      }, () => {
        console.log("most up-to-date this.state.eObjArray: ", this.state.eObjArray);
        console.log("eObj after eventHandler is out of execution stack: ", e);
      }
    )


  };

  render() {
    return (
      <div>
        <p>Open the console to see the app at work!</p>
        <button onClick={this.handleClick}>
          Trigger onClick Event
        </button>
      </div>
    )
  }
}

export default SimpleComponent;
