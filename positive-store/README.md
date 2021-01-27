![Positive Learning](https://positive.fi/wp-content/uploads/2020/09/White.png)

Welcome to **Positive Store**. This package contains a central store of data, resolver logic, internationalization (i18n) content, and theme values, which is consumed by the `web-ui` and `mobile-ui` projects.

---

## Goals

The goals of the `positive-store` are:

- Centralize all shared requests and data manipulation into one location for consistent functionality and logic across apps
- Provide a global store allowing apps to only handle their local states
- Allow greater control and separation of data to minimize leaks, renders, and unexpected data triggers across routes

## Getting Started

**`npm run build`**

Runs a one-time build

**`npm run dev`**

Listens and rebuilds when changes are saved. If a consumer app is running at the same time, it will reload when the new build is completed.

## Using Positive Store

There are two ways of adding the Positive Store to a project.

**First**, add the package to the app's dependencies with a relative path to the `positive-store` directory within the `varis` repo.

```json
"positive-store": "file:../positive-store",
```

**Second**, in the terminal, in the `positive-store` directory, run `npm pack` which will build build the app into a `.tgz` file. Add this file into the project and link to it in `package.json`.

```json
"positive-store": "file:./positive-store-1.0.0.tgz",
```

Once installed, wrap the primary `App` component in the `PositiveProvider` to expose the store's hooks throughout.

```jsx
import { PositiveProvider } from "positive-store";

return (
  <PositiveProvider>
    <App />
  <PositiveProvider>
);
```

The `PositiveProvider` accepts several attributes to customize functionality between products.

```js
interface IProps {
  authModel?: IAuthModel;
  baseUrl: string;
  env: Environment;
  groups?: { model: IGroupModel, persistConfig: PersistConfig<IGroupModel> };
  sanityConfig?: ISanityProps;
  settings?: { model: ISettingsModel, persistConfig: PersistConfig<ISettingsModel> };
  userModel?: IUserModel;
}
```

### Providers

When wrapping the app with the `<PositiveProvider>`, other providers become accessible to use as needed.

#### LanguageProvider

Wrapping an app with the `LanguageProvider` allows the content to be translated across multiple languages. The provider uses [react-i18next](https://react.i18next.com/) under the hood and pulls the language value from the `Positive Store`'s `SettingModel`.

```jsx
import { PositiveProvider, LanguageProvider } from "positive-store";

return (
  <PositiveProvider>
    <LanguageProvider translations={...}>
      <App />
    </LanguageProvider>
  <PositiveProvider>
);
```

The `LanguageProvider` requires a `translations` prop which follows the [I18n Best Practices](../../docs/frontend-best-practices.md#internationalization-i18n).

```js
const translations = {
  app: {
    actions: {
      activate_tips: {
        en: 'Activate tips',
        fi: 'Aktivoi vinkit',
      },
    },
  },
};
```

When using the `LanguageProvider`, the `useTranslation` hook is exposed and used to consume the language-specific content.

```js
import { useTranslation } from 'positive-store';

const Component: FunctionComponent = () => {
  const { t } = useTranslation();

  return <span>{t('app.actions.activate_tips')}</span>;
};
```

### Hooks

When wrapping an app in the `PositiveProvider` there are multiple hooks exposed, providing access to each specific section's state and public actions.

- `useAudienceState()` / `useAudienceActions()`

- `useAuthState()` / `useAuthActions()`

- `useExerciseState()` / `useExerciseActions()`

- `useGoalState()` / `useGoalActions()`

- `useGroupState()` / `useGroupActions()`

- `useInvitationState()` / `useInvitationActions()`

- `useMembershipState()` / `useMembershipActions()`

- `useMomentState()` / `useMomentActions()`

- `useSanityState()` / `useSanityActions()`

- `useSettingsState()` / `useSettingsActions()`

- `useStrengthState()` / `useStrengthActions()`

- `useTranslation()`

- `useUserState()` / `useUserActions()`

#### Examples

##### Access the global `language` value and `setLanguage` method

```js
import { useSettingsState, useSettingsActions } from 'positive-store';

const App: FunctionComponent = () => {
  const { language } = useSettingsState();
  const { setLanguage } = useSettingsActions();
};
```

##### Access the `audience` state and actions and its corresponding `strengths`

```js
import { useAudienceState, useAudienceActions, useStrengthState } from 'positive-store';

const App: FunctionComponent = () => {
  const { audience } = useAudienceState();
  const { setAudience } = useAudienceActions();
  const { strengths } = useStrengthState();
};
```

### Types

The `PositiveStore` exports many content _Types_ and _Enums_ to be used in the project UIs to ensure data consistency and decrease loose-string-conditionals. All non-interface, data types can be found in the `types/` directory.

```json
Audience,
AuthRequestType,
Class,
Environment,
Exercise,
ExerciseSection,
ExerciseSectionKey,
ExerciseSectionTitle,
Group,
GroupRole,
GroupType,
IAuthModel,
IAuthModelThunks,
IGroupModel,
IGroupModelListeners,
IllustrationSlug,
Invitation,
InvitationStatus,
InvitationType,
ISettingsModel,
IStoreModel,
IUserModel,
Language,
Membership,
Moment,
Organization,
Path,
PersistConfig,
PersistStorage,
SanityDataset,
Slide,
SanityImageSource,
Status,
Strength,
StrengthSlug,
Theme,
User,
```

### Request Status

To ensure a quality experience for the user, data requests must be handled properly, by displaying loading states, and having control of the stages of a request. The `PositiveStore` applies the following values to a request's status.

```ts
enum Status {
  complete = 'complete',
  idle = 'idle',
  loading = 'loading',
}
```

- **idle**: A request will be marked as `idle` when it is ready to be called
- **loading**: A request will be marked as `loading` after it has been called but before completing its request and resolver logic
- **complete**: A request will be marked as `complete` after it has completed and the `finally` block as executed.

**Note**: After a request has ben marked as completed, that model's listeners will execute to then reset the request status to `idle`. This allows logic in the UI to run when the status is complete, but returns the request to an `idle` state automatically.

### Errors

Each model in the `PositiveStore` contains an `error` state value.

```ts
error: Record<RequestType, { error: Error; status: number } | undefined>;
```

The `error` value is to be handled with each request.

Thunk requests are built using `try...catch...finally` blocks. After a successful request, its `error` value is reset to `undefined`. If the `catch` block is triggered, that request's error is updated with the returned data

### Caching

Requests not made to Sanity are made using Axios. To handle caching, the Axios Cache Adapter is used. To handle 'concurrent' requests, an optimistic locking(_ish_) approach has been implemented to allow data stabiliy without offloading that work to the UI.

Each store model contains a state value, `requestTimestamps`.

```ts
type RequestTimestamps = {
  fresh: number;
  stale: number;
};
```

#### Stale

When making any request other than `GET`, the `stale` timestamp is set to `Date.now()`. This means any request which would affect the source data sets a `stale` timestamp. This is then referenced when making a `GET` request to decide if the data is _fresh_ and can be pulled from the cache, or if it's _stale_ and a new request needs to be made.

#### Fresh

The `fresh` timestamp is set to `Date.now()` when making any `GET` request. This timestamp is used to know when the data was last _fresh_. But before making any request, the model's `fresh` and `stale` timestamps are compared. If the `stale` time is more recent than the `fresh`, then a new request is made. If not, the data is pulled from the cache.

```ts
const {
  requestTimestamps: { fresh, stale },
} = getState();
const isCacheStale = fresh < stale;
```

#### Listeners

It is common that when one request is made, it affects another model's data, thus maing it _stale_. Listeners are used to update cross-model `stale` timestamps to ensure accurate requests across models.

**Example**
Wen setting the `selectedGroup` in the `group` model, the `stale` timestamps are updated for group-dependant data, like `moments` and `goals`.

## Positive Store Development

The `positive-store` follows the general [Frontend Best Practices](../../docs/frontend-best-practices.md) but adds some specific patterns to help retain strict control over its data.

### Canceling Requests

Any request using the Axios client, can be cancelled by utilizing `CancelToken`s. Read more about these tokens [here](https://github.com/axios/axios#cancellation).

Each model state will contain a `request` value.

```ts
request: Partial<Record<RequestType, CancelTokenSource | undefined>>;
```

For each request that is to be cancellable, create a new `CancelToken` and `tokenSource`. Then the `tokenSource` is passed in the Axios call's request body.

```js
import axios from 'axios';

const CancelToken = axios.CancelToken;
const tokenSource = CancelToken.source();

await client.get(paths.group.memberships.get(payload), {
  cancelToken: tokenSource.token,
});
```

Then assign the `tokenSource` to the `request` value in the state.

```js
actions.setRequest({ type: RequestType.fetchMemberships, value: tokenSource });
```

This allows additional requests to check if the token exists, and if so, cancel the previous request to prevent duplicates or race-conditions.

```js
const requestToken = getState().request.fetchMemberships;

if (requestToken) {
  requestToken.cancel();
}
```

At last, in the `finally` block of a request, reset the `tokenSource` in the state.

```js
actions.setRequest({ type: RequestType.fetchMemberships, value: undefined });
```

### Listeners

The store utilizes listener methods with `actionsOn` and `thunkOn`. These listeners run side effects specific to the return data.

**Listeners should not be triggered across sections.** This is done to preserve visibility of data and to ensure unexpected or unnecessary requests across sections are not triggered.

## Tooling

- [Redux Dev Tools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en)

  The Easy Peasy store plugs into the Redux Dev Tools Chrome extension allowing for greater easier debugging.

## Resources

- [Microbundle](https://github.com/developit/microbundle)
- [Axios](https://github.com/axios/axios)
- [Easy Peasy](https://github.com/ctrlplusb/easy-peasy)
