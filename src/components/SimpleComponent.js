import React from "react";

class SimpleComponent extends React.Component {
  constructor() {
    super();

    this.state = {
      toCheck: []
    };
  }

  handleClick = e => {
    // e.persist()
    if (this.state.toCheck.includes(e)){
      // eObj already in array, do nothing
      console.warn("eObj not added to arr")

      // what is below will equate to true because:
      // even though we are comparing two variables, they both point to the same object in memory

      console.log("comparison result (is obj in Arr same as current eObj?):", this.state.toCheck[0] ===e)

      // =======

      // what is below will equate to true because:
      // since it is same object in memory, the keys of object in the array have been updated with the new values, in order to be passed into this callback this.handleClick!

      console.log("in state:", this.state.toCheck[0].dispatchConfig)
      console.log("arg:", e.dispatchConfig)
    } else {
      console.warn("eObj yes added to arr")
      this.setState({
        toCheck: [...this.state.toCheck, e]
      }, () => console.log(this.state.toCheck))
    }


  };

  render() {
    return (
      <button onClick={this.handleClick}>
        Trigger onClick Event
      </button>
    )
  }
}

export default SimpleComponent;
