# ember-data-store-cache
Provides ability to find all on ember data store with a minimum required cache time.

# Installation
 * ember install:addon ember-data-store-cache
 * ember install ember-data-store-cache ( ember cli ^0.2.3 )

# Usage

## Basic Usage
 * Add file `store.js` to the `app` directory. Extend DS.Store with the
ember-data-store-cache mixin.

```
import Ember from 'ember';
import DS from 'ember-data';
import CacheMixin from 'ember-data-store-cache/mixins/ember-data-store-cache';

export default DS.Store.extend(CacheMixin, {
});
```

 * Where you want to require a mandatory minumum cache time, use `findWithCache`
instead of `find`. (Currently works only on findAll type finds. findById
already uses the data in the store. findQuery isn't supported yet.)

```
model: function() {
    return this.store.findWithCache('user');
}
```

```
// Example: Request all from server then filter client-side.
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
import Ember from 'ember';
import DS from 'ember-data';
import CacheMixin from 'ember-data-store-cache/mixins/ember-data-store-cache';

export default DS.Store.extend(CacheMixin, {
    cacheSeconds: 120
});
```

### Cache Minimum per Request
 * Use specify the cache time per request, pass `cacheTime` parameter to 
`findWithCache` as the number of seconds to cache.

```
model: function() {
    return this.store.findWithCache('user', null, null, 300);
}
```
