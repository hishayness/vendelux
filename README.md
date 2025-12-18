# Vendelux Ticketmaster Event Search

This simple front end application allows a user to search event information against the Ticketmaster system.

It is built using:

- Vite
- tailwind
- framer motion
- Vite's built in reverse proxy utility

## Structure

- *./components*
  - example of design system atomic components with corresponding Storybook variations

- ./utils
  - example utily files with corresponding vitest tests

- ./providers
  - context provider to supply global state for application with corresponding vitest tests

- ./api
  - lightweight xhttp client which calls vitest built in proxy server. 
  - routes requests to ticketmaster api along with api key and search params

- ./configs.ts
  - dynamic configuration which supplies the event wizard. Each step maps to a search param field accepted by ticketmaster and also have it's only validation function

### 
