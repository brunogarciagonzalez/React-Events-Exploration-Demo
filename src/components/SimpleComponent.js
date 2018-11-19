import React from "react";

class SimpleComponent extends React.Component {
  constructor() {
    super();

    this.state = {
      toCheck: []
    };
  }

  // * a dive into "pooling" and "event object nullification" *
  // class instance variable that points to an array
  // When event callback takes place:

  //  if (event object is currently not in the array) {
  //    push event object into this array
  // }

 // Will there end up being only one obj in the end?

 // how does this relate to the virtual DOM?


  handleClick = e => {
    // e.persist()
    if (this.state.toCheck.includes(e)){
      // eObj already in array, do nothing
      console.warn("eObj not added to arr")

      // what is below will equate to true because:
      // even though we are comparing two variables, they both point to the same object in memory

      // console.log("comparison result (is same?):", this.state.toCheck[0].dispatchConfig===e.dispatchConfig)

      // =======

      // what is below will equate to true because:
      // since it is same object in memory, the keys of object in the array has been updated with the new values, in order to be passed into this callback this.handleClick!

      // console.log("in state:", this.state.toCheck[0].dispatchConfig)
      // console.log("arg:", e.dispatchConfig)
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
