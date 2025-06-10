# ViolationsUI: An interface for resolving compliance violations

## How to run locally
From root directory:

`$ npm install`

`$ npm start`

## UX Design Considerations
The overall priority (after correctness) was to facilitate rapid use. This means keyboard-friendliness.

So the page can be navigated with `TAB`/`SHIFT+TAB`/`ENTER`, and the violations and suggestions auto-populate with their first respective entries when loaded. I figure in the average use-case it doesn't particularly matter what order the user navigates the violations and suggestions in, they just want to see them.

I also kept the rejection box from auto-clearing when state changes because in my experience, users tend to supply boilerplate messages rather than writing a unique explanation every time.

Finally, I wanted to minimize "surprise forms", meaning: a form where conditionally-relevant fields appear out of nowhere once they become relevant. My experience tells me users *detest* that, even if the intention is to de-clutter the interface.

## Coding Considerations
I endeavored to DRY (Don't Repeat Yourself) the code as much as possible. Wherever I was tempted to copy-paste, I made a component or extracted a function.

Because the Component tree is quite shallow (at most 2 layers deep) I used controlled components instead of uncontrolled components. I was tempted to pass context to SuggestionControls to pare down the massive list of arguments, but ultimately decided it was preferable to be explicit about what was needed. In the future I might refactor SuggestionControls into a few different components to better manage that argument-list; it turned into a bit of a monolith.

## Limitations/Changes Wish List
I would like to add:
* Change previews
* Undo/redo buttons
* Banners instead of alerts
* A more elaborate UI (with color-blind-friendly color schemes, perhaps a dark mode)