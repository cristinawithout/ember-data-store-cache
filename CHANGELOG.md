# ember-data-store-cache CHANGELOG

## v0.0.7
### Changed
- `find_all_requested` changed from timestamp to an object with properties
`timestamp`, `resolved`, and `promise`
- `findWithCache` checks if find request was already made. If so, returns the
associated promise to prevent multiple requests before first is complete
