/**
 * Provides findWithCache method that forces a minimum cache time on the find
 * requests.
 * 
 * @class Ember Data Store Cache Mixin
 */

import Ember from "ember";

export default Ember.Mixin.create({
    /**
     * Number of seconds to require caching when using findWithCache method.
     * 
     * @param cacheSeconds
     * @type {Integer}
     * @default 600
     */
    cacheSeconds: 600,
        
    /**
     * Customized find method that checks for cache within a certain timeframe.
     * 
     * @method findWithCache
     * @param {String} typeKey
     * @param {Mixed|Integer|Object} id
     * @param {Object} payload
     * @param {Integer} cacheTime Amount of time in seconds to cache for 
     * (overrides cacheSeconds param per instance)
     */
    findWithCache: function(typeKey, id, payload, cacheTime) {
        if (arguments.length === 1) {
            // Find all.
            
            // Get last queried time.
            var type = this.modelFor(typeKey);
            var requestedAt = this.typeMapFor(type).metadata.find_all_requested;
            var now = this._getTimeNow();
            
            cacheTime = cacheTime || this.get('cacheSeconds');
            if (requestedAt && now - requestedAt < cacheTime) {
                // If time is within cacheSeconds, get from store.
                return this.all(typeKey);
            } else {
                // Else, make request.
                return this.findAll(typeKey, id);
            }
        }
        
        if (Ember.typeOf(id) === 'object') {
            // Find query.
            Ember.assert('findWithCache does not support queries yet. To use cache, request with find and use store.filter instead.');
        }
        
        // Find record by ID. Already loads from store if present.
        Ember.assert('findWithCache does not support finding by id. Use find since it returns the record from the store if it is present.');
    },
    
    /**
     * Override findAll method of store to set the find_all_requested metadata
     * for use in determining the last request time in findWithCache
     * 
     * @method findAll
     * @param {String} typeKey
     */
    findAll: function(typeKey) {
        var type = this.modelFor(typeKey);
        this.typeMapFor(type).metadata.find_all_requested = this._getTimeNow();
        
        return this._super.apply(this, arguments);
    },
    
    /**
     * Return the current timestamp in seconds.
     * 
     * @method _getTimeNow
     * @private
     * @return {Integer} Timestamp in seconds.
     */
    _getTimeNow: function() {
        return Math.ceil(new Date() / 1000);
    }
});