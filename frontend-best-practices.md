![Positive Learning](https://positive.fi/wp-content/uploads/2020/03/White.svg)

# Web-UI Best Practices & Standards

## Purpose

This document aims to provide a set of best practices and guidelines to follow when working within the web-ui codebase. The standards we follow should focus on three key aspects of the product:

- **Scalability** and how the product can drastically grow across regions
- **Accessibility** and ensuring all users experience the product as intended
- **Maintainability** and consistent patterns to improve new development and the integration of developers into the codebase

### Table of Contents

- [Purpose](#purpose)
- [React](#react)
- [TypeScript](#typescript)
- [Styling](#styling)
- [Accessibility](#accessibility)
- [Internationalization (i18n)](#internationalization-i18n)
- [File & Component Structure](#file-component-structure)
- [Analytics](#analytics)
- [Testing](#testing)

---

## React

- Keep components small and single-function specific
- Loose JSX should not be passed as a prop
  No superfluous wrapper elements. Instead, use `<Fragment>` or `<>...</>`
- When iterating over data do not use the array `index` in the `key` value. If the data has come from the backend and has a unique ID, use it. If no unique ID already exists, create a key using `uuid`.
- Whenever printing a date or time, the value must be provided a timezone to ensure the correct regional value
- Logic relating to the entirety of a component or route should live in that container. The UI of a component or route should live in UI components and handle no external logic or functionality. The goal is to keep a separation between logic and presentational UI

**Example**
Let’s consider the `Modal`. A single modal is generally built of four components:
The `Modal` container itself, the `Header`, the `Content`, and the `Footer`

- The `Container` file is where logic and functionality related to the `Modal` as a whole would live.
  - This logic could include things like binding events for keyboard accessibility, disabling the page scroll behind the Modal, or animating the entire component into view.
- The `Container` doesn’t care about its content, but builds the overall functionality needed to serve it.
- The remaining UI components handle just that; their specific UI purpose.

Following the [File & Component Structure](#file-component-structure) would create this directory:

```
components/
  Modal/
    index.ts
    Container.tsx
    Content.tsx
    Footer.tsx
    Header.tsx
```

The index file would export all of the components as an object.

```js
export default {
  Container,
  Content,
  Footer,
  Header,
};
```

Looking at an abbreviated `Modal/Container.tsx` example, we can see how it's set up. The file sets up the functionality and overall structure of the `Modal` while letting its children define their own UI and specific needs independently.

The `Container` is doing a few things, like placing it into the `Portal` and rendering the `Backdrop` required for the view. It handles animating itself in on mount and is wrapped in `FocusOn` to address accessibility needs. This is all functionality needed for every instance of the `Modal`. This defines the overall functionality and structure of the `Modal` component while its children define themselves independently.

This allows the `Modal` to be used with flexibility while communicating clearly its structure and semantics. Also, it allows each individual component to accept only its own specific props, without needing to pass every piece of data into the container to either pass further down or conditionally process.

This pattern results in easy-to-read code with single-purpose components that are small, easy to maintain, and handle only the scope of their required props.

```jsx
/* Modal/Container.tsx */
<Portal id={id}>
  <Backdrop transitionDuration={transitionDuration} isShown={isOpen} />
  <CSSTransition
    mountOnEnter
    unmountOnExit
    appear
    in={isOpen}
    classNames="dialog"
    timeout={transitionDuration}
  >
    <SlidingWrapper timeout={transitionDuration} role="dialog">
      <FocusOn onClickOutside={close} onEscapeKey={close}>
        {children}
      </FocusOn>
    </SlidingWrapper>
  </CSSTransition>
</Portal>

/* In Use */
<Modal.Container close={...} isOpen={...}>
  <Modal.Header title={localize('title')} />
  <Modal.Content>
    <p>{localize('discard_changes')}</p>
  </Modal.Content>
  <Modal.Footer>
    <PillButton danger onClick={} label={localize('discard_changes')} />
  </Modal.Footer>
</Modal.Container>
```

---

## TypeScript

Type checking the product is an important step that improves the overall code quality. This is done by:

1. Ensuring consistent data types
2. Easing the burden of testing
3. Catching errors at build, well before code can reach production
4. Creating documentation at a glance when opening a component

### Patterns

- Components are not to accept spread (or infinite) props.
  Spread props (`...props`) cannot accurately be typed. Meaning, we cannot know, see, or validate what information is coming into the component safely. It limits our control and vision when spread props are passed down to further child components, which can also lead to unexpected renders and behavior.
- The use of `any` types are to be used in only the rarest of situations, (_ie: when dealing with third-party libraries that may not have TypeScript support, like react-localize._)
- Custom shared types should live in `src/types`
- Loose string conditionals should be avoided. They are troublesome due to the ease of typos and frequency of value changes. These values should be converted into immutable `ENUMS` ensuring that any comparisons are against the same data and any value changes need to only be made in one location. These, too, should live in the same `src/types` directory or file

**Example**

```js
if (strength.slug === 'love-of-beauty') { ... }
// should become
if (strength.slug === STRENGTH_SLUGS.LOVE_OF_BEAUTY) { ... }

// src/types/strengths.ts
export enum STRENGTH_SLUGS {
  COMPASSION = 'compassion',
  COURAGE = 'courage',
  LOVE_OF_BEAUTY = 'love-of-beauty',
  ...
}
```

---

## Styling

Styles are written using [Styled Components](https://styled-components.com/), separating styling from markup.

### Best Practices

- All styling is to be done through Styled Components. Styling is not to be done inline in the JSX. By keeping styles from the JSX we gain many advantages

  - There is no need for spread (or infinite) props to enable components to accept all possible style properties. (_See [TypeScript](#typescript)_).
  - We retain the ability to use common CSS features like:

    - Variables
    - Functions and queries
    - Accessibility conditionals
    - Selectors, pseudo selectors, and component selectors
    - [React Native support](https://styled-components.com/docs/basics#react-native)

  - Logic-driven styles should be pulled from JSX and handled in the Styled Component as they will execute every render regardless of whether the condition has changed.

```jsx
/* In Use */
<Card isActive={isActive} />

/* Instead of */
<Card bg={isActive ? 'green' : 'white'} />;
```

- The use of colors and spacings should come from the `theme` functions.
- Fonts sizes are to be set with relative `rem` units, and not `px` values (_See more under [Accessibility](#accessibility)_)
- Animations that involve movement of an element, or multiple properties changing, should be wrapped in a `prefers-reduced-motion` conditional for accessibility purposes.

```jsx
@media (prefers-reduced-motion) { //disable or simplify the animation }
```

- The `!important` declaration is not to be used. It is reserved for top level, situational events only, like forcing full screen or locking page scroll behind a modal. Most other cases can be resolved with tighter scoping of styles and/or componentization.
- Interactive elements must have a `focus` state and be keyboard accessible
- Do not add units (like `px` or `%`) to `0` values. `0` === `0px`, `0%` and so on
- Style properties should be ordered alphabetically

---

## Accessibility

Given the wide audience of schools and students, we need to prioritize accessibility to ensure everybody can have a Positive (🥁) experience with our product.

There are three levels of Accessibility Conformance – A, AA, and AAA being the most accessible. There’s a lot of low-hanging fruit to instantly provide a much more accessible experience. If we do these things, we can be AA compliant, which is suitable for our audience as well as regional expectations, for example, in the US.

- [Understanding Levels of Conformance](https://www.w3.org/TR/UNDERSTANDING-WCAG20/conformance.html#uc-levels-head)
- [Web Content Conformance Guidelines](https://www.w3.org/TR/WCAG20/#conformance-reqs)

### Best Practices

#### General

Two Practices that Enable Semantic Markup ([source](https://html.com/semantic-markup/))

- Semantic markup requires that HTML elements be used according to their intended purpose.

  - For example: `Heading` levels must flow `1-6` in order and without skipping and levels
  - Descriptive tags like `header`, `footer`, `article`, `section`, and `nav` should be used instead of `div`s
  - Semantic markup requires the separation of content and presentation.

- In Chrome, install the [Lighthouse](https://developers.google.com/web/tools/lighthouse) extension to periodically run accessibility audits
- Interactive elements must have a `focus` state, and be keyboard accessible
- All images must have an appropriate, localized alt tag
- Icon buttons must have an appropriate, localized description
- Fonts sizes are to be set with relative `rem` units, and not `px` values. This better supports screen and text zooming and different density displays

#### Dialogs & Modals

- When opening a dialog or modal, focus should be auto applied to the first focusable element
- When opened, dialogs and modals are to be focus locked. This means, when opened and tabbing through the elements, the focus never leaves the modal
- While opened, the main document should not be scrollable behind the modal
- While opened, non-modal content should be set to aria-hidden to hide it from screen readers
- It must be possible to close all dialogs or modals via the `escape` key
- On close, the `focus` should return to the element that triggered the dialog or modal initially

#### Dropdown Menus

- Dropdown menus must be selectable with `tab`, interactive with `enter`, and traversable with arrow keys
- They should also close on `escape` and when `focus` leaves

#### Forms

- All form fields must have a screen-readable `label`
- Tab `focus` should progress through the form sequentially
- Upon `submit`, the form data is to be validated with Joi prior to proceeding and sending the data onward to the backend.
  - This provides the ability to quickly give specific feedback to the user on the UI without making any requests, while adding an extra layer of security
  - If there is an error, an appropriate, and localized, error message is to be displayed
  - If there is an error, the invalid field is to be given `focus`
  - If there are multiple errors, the first invalid field should be given `focus`

#### Animations

- Animations that involve movement of an element, or multiple properties changing, should be wrapped in a `prefers-reduced-motion` conditional for accessibility purposes.

```jsx
@media (prefers-reduced-motion) { //disable or simplify the animation }
```

---

## Internationalization (i18n)

Currently, localization is handled with [React Localize](https://github.com/stevey-p/react-localize).

### Best Practices

- No text is to be hardcoded. Exceptions include:
  - Event tracking, logger events, and [analytics](#analytics)
  - Data not currently being pulled from Sanity
- All translations are added to `src/contexts/LanguageContext/content.ts`
- The file is broken into individual sections and sub sections

```js
{
  app : {
    actions: { ... },
    errors: { ... },
  },
  route: {
    login: {
      errors: { ... },
    },
    landing: { ... },
  }
}
```

- Key naming should follow snake case conventions

```js
happy_kids_learn_best: { ... }
```

- Each key will contain all translations grouped together. We anticipate accommodating multiple languages and grouping texts together should provide quick information at a glance as to what translations should be and are needed.

```js
cancel: {
  en: 'Cancel',
  fi: 'Peruuttaa'
}
```

- Each key can be nested with similar keys. For example:

```js
create: {
  en: 'Create',
  fi: '',
  group: {
    en: 'Create group',
    fi: '',
  },
}

// instead of

create: {
  en: 'Create',
  fi: ''
},
create_group: {
  en: 'Create group',
  fi: ''
}
```

In use, this language object is flattened down with the language keys removed, creating the keys to be used like:

```jsx
<span>{localize('app.actions.cancel')}</span>
```

_Note:_ Ultimately, TypeScript can be used to create the Type for this flattened object to allow for autocomplete functionality. Unfortunately, it will need to be updated manually while adding new keys to the translation file itself.

---

## File & Component Structure

By default, components should be a single, self-named file containing a single component with a single responsibility.

### File Structure

```
components/
  Button.tsx
  SanityIllustration.tsx
  ...
```

When a component requires more than a single file, it becomes a self-named folder.

```
components/
  Resources/
    index.ts
    Resources.tsx
    Resource.tsx
  ...
```

The `index` file will `import` and `export default Resources`. This is done, so when importing the `Resources` section, the statement would look like:

```js
import Resources from 'components/Resources';
// instead of
import Resources from 'components/Resources/Resources';
```

This approach, along with _#1_, also simplifies and reduces error risks when editing multiple files at once. When several tabs / files are open in an editor, and they're all named `index` it becomes confusing to know which file is which without checking each one. The same logic applies to `Routes`.

```
routes/
  Teach/
    index.ts
    Teach.tsx
    LessonPlans.tsx
    ...
```

A single route will often be made up of several sections. With the same reasoning, the index file should `import` and `export` the primary route file. It is okay, though, for the `index` to handle some preliminary functionality not really tied to the UI, such as defining additional sub-routes.

Each section should follow the same logic if it contains additional sub-sections.

Sections are going to be built with other smaller components. Sometimes, these components require more than one component themselves. When this is the case, they should also follow the same structural pattern.

```
routes/
  Teach/
    StrengthCards/
      index.ts
      Card.tsx
      Wrapper.tsx
    index.ts
    Teach.tsx
    LessonPlans.tsx
  ...
```

In this example, the `StrengthCards` section requires two separate components to handle the overall layout of the cards with `Wrapper` and the `Card` itself.

### Component Structure

Component files should follow the same consistent structure as well, being:

- Global imports
- Local imports
- Interface and Type declarations
- Component
- Styled components
- Exports

---

## Analytics

Analytics are handled by [Matomo](https://matomo.org/).

- All actionable events a user can perform should be logged
- All Personal Identifiable Information (PII) must be scrubbed prior to logging the event
- Event actions should follow the same verbiage tense

```
"Create new moment"
“Edit a group”
“Change language”
"Open create group modal"
```

---

## Testing

Currently only end-to-end testing is practised. Our pragmatic reasoning is that having E2E tests helps us be sure that from an end-user’s point of view things are working. At this point, developers do not find adding unit tests in addition to E2E tests that valuable.

Revisit the discussion of other types of testing in the team when you feel that it would improve the development experience.

### End-to-end (E2E) testing

E2E tests are located outside of the React apps in a separate application. In monorepo the application is in the `tests/e2e` directory.

The main goal of E2E tests is to perform actions in the target application from a user perspective.

- When locating elements, prefer to rely on visible information. For example, if the website has a button with the title “Send an invitation” then it should be clicked in tests using `I.click(“Send an invitation”)`. This ensures that even if the clickable element implementation details change, the test still passes as the functionality is provided to the user through the UI.

- The test cases should always clean up after themselves, so that every test case starts from a “blank page”. This ensures that there are minimal dependencies between the test cases.

Check out more [best practices on CodeceptJS website](https://codecept.io/best).
