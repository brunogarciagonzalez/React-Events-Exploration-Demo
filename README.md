# React Presentation Components Lab

## Overview
In this lab, you'll write a presentation component with minimal UI state and as a stateless function. 

## Overview
Presentation component are also frequently called "simple" components. Why? Because other than rendering themselves, they really don't know how to do much else. But, as we've seen, there's something blissful about being "simple" if you are a component.

In this lab, we'll illustrate this principle by building two components: a `SimpleComponent` and a `SimplerComponent`. Our `SimpleComponent` will be presentational, but it will have a tiny bit of state and therefore be less stable than our `SimplerComponent`. Specifically, our `SimpleComponent` will experience wild mood fluctuations. Our `SimplerComponent`, meanwhile, will be written as a "stateless functional" component and therefore be steadfastly happy.

## SimpleComponent
The specs for our `SimpleComponent` are as follows:
1. In the `components/SimpleComponent.js` file, create a `SimpleComponent` component.
2. The component should be declared as a class (instance of `Component`) so that it can carry state.
3. The component should have a state property called `mood` that has a default value of `happy`.
4. The component should simply render its current `mood` state to the page in a div.
5. The component should implement a `handleClick` function that can serve as a callback to the `<div>`'s click event. When clicked, the component's mood should toggle between `happy` and `sad` states.

While part of our design, the fact that this component's mood fluctuates when clicked makes it a less predictable part of our UI. As our program runs and users interact with it, we won't be able to predict what state our component is in. Obviously, many components need state in order to create interactive UIs. However, as we will see in the second component in this lab, it's good to avoid state entirely where possible.

## SimplerComponent
Although our `SimpleComponent` fits the pattern of a presentation component, the fact that it has state makes it unstable. To practice building a more stable type of presentational component, let's build a `SimplerComponent` to meet the following specifications:
1. In the `components/SimplerComponent.js` file, create a `SimplerComponent` component.
2. The component should be a "stateless functional" component.
3. It should render a `<div>` to the page that contains the text: "I am just happy".
4. It should receive one property called `handleClick` that performs some sort of action in response to a click — your choice!

When you've finished this component, take a moment to compare it to the previous presentational component we wrote. See how much more stable it is? It has no ability to change its output internally. We can always know, based on the props that we provide, what type of component it will produce. Note, as well, that this doesn't mean that the component lacks interactivity. We can actually determine a wide variety of click behaviors on the component just by providing a different callback. It's just that the component itself cannot determine its behavior. This kind of "simpleness" is actually a good thing because it makes our component more predictable and easier to maintain.

## Resources
- Dan Abramov – ["Presentational and Container Components"](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0)
- [Stateless Functions](https://facebook.github.io/react/docs/reusable-components.html#stateless-functions)

<p class='util--hide'>View <a href='https://learn.co/lessons/react-presentation-components-lab'>Presentation Components Lab</a> on Learn.co and start learning to code for free.</p>
