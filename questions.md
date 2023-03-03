1. PureComponent does a shallow comparison of state change. Since it compares only object reference, it breaks the app when the object changes the keys and values but not the reference, in practice, the app won't rerender and the UI won't display the updated data.

2. When we update the context it doesn't trigger rerender as props and state.

3. Callback: a parent has a method to get that information and pass it to the child by prop. Then the child calls it wherever it is necessary.
   Global Store: Any Component has Access to It. The most known is Redux.
   React Context: The parent adds the set state method to the context, then the children can call it to change the information

4. Cache: the hook useMemo only executes when the props aren't the same as before preventing re-render
   State: sometimes we need to track the state of data but it doesn't affect the UI, so we should useRef instead of useState, since useRef tracks state changes without triggering re-render.

5. Fragment is a React tag that is indicated to use to encapsulate tags on the component since it returns a JSX expression and they must have one parent element. And it prevents having div tag which makes more complex the HTML structure.

6. Wrapped Component: wrap component adds and removes props to the wrapped component
   Composition: create a new component overriding only the prototype, this way do not need to change the original component
   Cross-Cutting Concerns: also uses wrap strategic but to remove duplicated logic in different components

7. You can use then/catch with callbacks like `callingApi().then(successCallback).catch(failCallback)`. Or you can wait the promise and encapsulate is with try/catch like `try { await callingApi(); successCallback() } catch (error) { failCallback(error) }`.

8. One argument and can be the value or a method that takes the previous state as a parameter. It is async since it doesn't rerender exactly when it's called for performance reasons.

9. Move the logic from lifecycle methods to equivalent hooks and useState for the state.

10. Pure CSS, precompiled CSS like SCSS, styled components...

11. Use dangerouslySetInnerHTML