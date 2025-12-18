# Vendelux Ticketmaster Event Search

This simple front end application allows a user to search event information against the Ticketmaster system.

It is built using:

- Vite
- tailwind
- framer motion
- Vite's built in reverse proxy utility

```
npm i
npm run dev
npm run test
npm run storybook
```

## Structure

- *./components*
  - example of design system atomic components with corresponding Storybook variations

- *./utils*
  - example utility files with corresponding simple vitest tests
  - sessionStorage adapter as an example of abstracting out storage api from implementation

- *./providers*
  - context provider to supply global state for application with corresponding simple vitest tests

- *./api*
  - lightweight xhttp client which calls vite's built in proxy server
  - proxy routes requests to ticketmaster api along with api key and search params

- *./configs.ts*
  - dynamic configuration which supplies the event wizard. Each step maps to a search param field accepted by ticketmaster and also contains it's own validation function

### Enhancements if there was more time

- Componentize layouts and widgets (eg. wizard) to further reusability and consistency
- Leverage mature libraries to handle forms (eg. react hook form), virtualization lib to optimize rendering, etc.
- Build out server side api with proper structuring, observability, logging and error handling
- Integration test, snapshot testing, e2e testing suites
  