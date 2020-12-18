![Positive Learning](https://positive.fi/wp-content/uploads/2020/03/White.svg)

Welcome to **Positive Web-UI**. This package is for the user-facing Positive tooling and platform. This project was bootstrapped with [Create React PCVOnline](https://github.com/facebook/create-react-app).

#### Environments

- **Development**: [https://go.dev.positive.fi/](https://go.dev.positive.fi/)

  - Meant to be a sort of dev sandbox where anything can be broken at any time without any notice
  - This deploys from the `varis` -> `master` branch

- **Staging**: [https://go.staging.positive.fi/](https://go.staging.positive.fi/)

  - Meant for QA and user testing of upcoming releases. Should generally be in working order
  - This deploys from the `varis` -> `staging` branch

- **Production**: [https://go.positive.fi/](https://go.positive.fi/)
  - Actual production site
  - This deploys from the `varis` -> `production` branch

---

## Best Practices & Standards

For more information regarding the `web-ui` tech stack, coding practices, and patterns used within the codebase, view the [Best Practices & Standards](../../docs/frontend-best-practices.md) document.

Jump to a section in **Best Practices**:

- [Purpose](../../docs/frontend-best-practices.md#purpose)
- [React](../../docs/frontend-best-practices.md#react)
- [TypeScript](../../docs/frontend-best-practices.md#typescript)
- [Styling](../../docs/frontend-best-practices.md#styling)
- [Accessibility](../../docs/frontend-best-practices.md#accessibility)
- [Internationalization (i18n)](../../docs/frontend-best-practices.md#internationalization-i18n)
- [File & Component Structure](../../docs/frontend-best-practices.md#file-component-structure)
- [Analytics](../../docs/frontend-best-practices.md#analytics)
- [Testing](../../docs/frontend-best-practices.md#testing)

---

## Getting Started Locally

The steps needed to run `varis` and `web-ui` locally are outlined in the repo's primary `README`.

[Setting up the Development Environment](https://github.com/PositiveCV/varis#setting-up-the-development-environment)

##### Notes

The `web-ui` uses the `production` dataset by default. This can be adjusted via the terminal by running the following in the `web-ui` root.

```sh
export REACT_APP_SANITY_DATASET=development
# or
export REACT_APP_SANITY_DATASET=production
```

---

## Running Tests

The steps needed to run the end-to-end tests locally are outlined in the repo's primary `README`.

[Running end-to-end (e2e) tests](https://github.com/PositiveCV/varis/tree/master/tests#end-to-end-e2e-tests)
