# ember-data-store-cache
Provides ability to use a minimum required cache time on Ember Data requests.

Currently works only on findAll type finds. findById
already uses the data in the store. findQuery isn't supported yet.

# Installation
 * ember install:addon ember-data-store-cache
 * ember install ember-data-store-cache ( ember cli ^0.2.3 )

# Usage

## Basic Usage
 * Add file `store.js` to the `app` directory and extend DS.Store with the
ember-data-store-cache mixin.

```
import DS from 'ember-data';
import CacheMixin from 'ember-data-store-cache/mixins/ember-data-store-cache';

export default DS.Store.extend(CacheMixin, {
});
```

 * Where you want to require a mandatory minumum cache time, use `findWithCache`
instead of `find`.

```
// Find all users. Use what's in the store if find has already been done within
// minimum cache time.
model: function() {
    return this.store.findWithCache('user');
}
```

```
// Find all users then filter client-side for users with requested company ID.
beforeModel: function() {
    return this.store.findWithCache('user');
},

model: function() {
    var company = this.modelFor('companies.read');
    return this.store.filter('user', function(user) {
        return user.get('company.id') === company.get('id');
    });
}
```

## Customizations

### Default Cache Minimum
 * Default cache minimum is 10 minutes. To override, set the property
`cacheSeconds` in `store.js`.

```
import DS from 'ember-data';
import CacheMixin from 'ember-data-store-cache/mixins/ember-data-store-cache';

export default DS.Store.extend(CacheMixin, {
    cacheSeconds: 120
});
```

### Cache Minimum per Request
 * To specify the cache time per request, pass `cacheTime` parameter to
`findWithCache` as the number of seconds to cache.

```
model: function() {
    return this.store.findWithCache('user', null, null, 300);
}
```

### Clearing cache

There are 2 methods to clearing the cache.

 * clearCache: Remove all entries of typeKey from the store and reset the
metadata cache time so the next request via findWithCache will make the request
to the server.
 * clearCacheTime: Reset the cache time for time to null so the next request via
findWithCache will make the request to the server.
