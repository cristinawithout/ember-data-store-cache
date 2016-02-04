# ember-data-store-cache CHANGELOG

## v1.0.0
### Changed
- Requires Ember data 1.13+.
- Change call to Ember Data store.all() to store.peekAll()

## v0.0.7
### Changed
- `find_all_requested` changed from timestamp to an object with properties
`timestamp`, `resolved`, and `promise`
- `findWithCache` checks if find request was already made. If so, returns the
associated promise to prevent multiple requests before first is complete
