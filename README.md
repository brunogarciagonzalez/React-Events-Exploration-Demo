# An exploration into "event pooling", "event object nullification", and event.persist()


## Sync vs Async

First, we need to remember the difference between the synchronous protocol of code execution, and the asynchronous protocol of code execution.

When some code is synchronous, it is “in sync” with the code being executed before and after it: it will be wholly performed directly after the previous step in the program is finished executing, and before whatever step is next.  

When some code is asynchronous, it is “not in sync”, it does not follow this straightforward protocol of execution. Invoking the async code at a specific step does not mean that it will be wholly performed directly after the previous step.

Furthermore, whatever step is next in the code (and subsequent steps thereafter) can be executed before the async code is wholly executed. The async functions will get wholly executed once the execution stack clears, check out this video for a thorough explanation of asynchronous code execution in javascript:<a href="https://youtu.be/8aGhZQkoFbQ?t=624 ">here</a> (I recommend watching the whole thing, but for our purposes, watch 10:24 - 16:16)

## setState() may be async

If we read the React documentation {scroll to “Using State Correctly”, <a href="https://reactjs.org/docs/state-and-lifecycle.html">here</a> }, we can see that -- many times -- changes in state do not happen as soon as `setState()` is called. Instead, the inner-workings of React make the decision of when to actually update the state.

It may be milliseconds, so it may be hard to tell, but it is not happening immediately. In fact, React selects the best time to update state and may batch these updates into one larger update.  Those times, `SetState()` is async, and React decided when to trigger the process. `setState()` is not always asynchronous - there are times that the react code will change state synchronously (based on some black-boxed and situation dependent stuff) -- but we <b>cannot depend on it being synchronous</b>.

I think of it sort of like when one uses Git: there is staging the changes and then there is actually committing+pushing the changes. We write the code to “stage” the changes to state, and the inner-workings of React decide when to actually commit+push the changes to the state, maybe all at once.

So, `setState()` may be asynchronous: in those instances -- many times -- the state will not actually be set until after the execution stack is cleared. Plus, React may run extra logic behind the scenes, such as batching state changes into one asynchronous update.

## Synthetic Events and Pooling

Synthetic Events are “pooled”, meaning that the event object will be reused by React elsewhere in our application. In order to do this, “pooling” the event involves nullifying its properties after the execution of the callback triggered by the DOM event. This is a feature built-in to React for performance reasons.

In javascript, non-primitive data types are passed by reference. This means that variables “housing” objects (or arrays, or functions, i.e. the non-primitive data types) do not actually “house” the object, but “house” a reference to the memory address of that object.

When it comes to the SyntheticEvent object, “reusing it” is a way of saying that the js code being run by the browser won’t use memory for a new event object per event, but instead will use the same object in memory for all events. To go about this, the React developers have decided to nullify the values of the keys of this object after the event is used. The keys are reused, but the value to each key is reset to `null`. This resetting of all values of the object to `null` is why the React docs describe the event object as getting “nullified”.

This nullification means that the old values to the keys are no longer in use by our program (the datatype `null` has taken their place), and so the JS garbage-collector does the job of freeing up the memory that was being used by these values.

So even if you have a variable that points to the SyntheticEvent object in memory (e.g. `let eventCopy = event`), that variable actually houses a reference to the one object in memory that is being reused by React. This object’s properties are soon nullified as preparation for it to be used for the housing of event data for the next DOM event.

Due to this nullification of the event object’s properties, these properties cannot be accessed in an asynchronous way. By the time your asynchronous functions, say `setState()`, is actually wholly executed and we are trying to access the event’ properties (e.g. `event.currentTarget.value`), the event object has been “pooled”, and its properties are `null`.

## The need for event.persist() whn invoking setState() in certain circumstances

So -- many times -- by the time `setState()` is actually executed (and the event is actually accessed), the event object being accessed has been nullified. (`setState()` "may be asyncronous" as per the documentation) The variable that houses the reference to the event object (e.g. `event` or `e`) still houses a correct reference to the one object in memory, but we cannot access the values that are no longer associated with it’s keys. To keep the event object from being “pooled” and therefore keep it from being nullified, we call `event.persist()`.

Doing this “removes the synthetic event from the pool”: it will not be reused with later DOM events, because React will use other memory to make another event object to take the place of the one we are using. Since the event is not nullified, it keeps its keys’ values, and so we can now interact with the event object asynchronously. At this point, there are two event objects in memory: the one we have persisted and is now never to be pooled again, and the new event object which will be pooled and reused from now on. (Clone down this repo and install & run, open the console to see the code at work. Check the comments in SimpleComponent.js and un-comment console.logs as you use the app to explore React's management of event objects)

Note: If not using the synthetic event with async functions, then the event is accessed immediately, so `event.persist()` is not necessary.

## Alternative to event.persist()

One alternative to using `event.persist()`: you can store the data you need in a variable (e.g. `const example = event.target`). The const would house the reference to the DOM object, completely independent of a reference to the event object. In this way, we retain access to the event’s target, while no longer needing to access the target through the event object.

Also:
```
this.setState(
  {
    selectedItem: this.state.stuffArray.find(item => item.id === e.target.dataset.id)
  }
);
```

The above works due to the fact that the value associated with the “selectedItem” key is computed synchronously, ASAP in the execution stack. The `.find()` method being invoked, its return is what is actually going to get associated with the “selectedItem” key of the object.

## Another Interesting Case You May Run Into

A situation where `event.currentTarget` is `null` even with `event.persist()`:
* https://github.com/facebook/react/issues/2857



## Resources:
* <a href="https://reactjs.org/docs/events.html">React docs: Events</a>
* <a href="https://github.com/facebook/react/issues/11527">Explanation by Dan Abramov on why setState() is asynchronous</a>
* <a href="https://twitter.com/dan_abramov/status/959507572951797761?lang=en">Tweet by Dan Abramov showing that there are situations in which setState() is synchronous</a>
