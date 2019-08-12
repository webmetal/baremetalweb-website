import {enableNotifications} from "./../../../mixins/event-mixin.js";

/**
 * If an object is not already bound ready, enable all the features required to make it bindable.
 * @param obj {Object}: Object to bind on
 * @returns {*}
 */
export function enableBinding(obj) {
    if (obj.on == null) {
        enableNotifications(obj);
        return new Proxy(obj, {
            get: (obj, prop) => {return obj[prop]},
            set: (obj, prop, value) => {
                obj[prop] = value;
                obj.notifyPropertyChanged(prop, value);
                return true;
            }
        })
    }
}

/**
 * When binding on a path each object on that path must be set as bindable
 * @param context {Object} context object to start binding path on
 * @param property {String} property path for binding
 * @param callback {Function} callback for when property changes
 */
export function enableBindingPath(context, property, callback) {
    const properties = property.split(".");
    let parent = context;

    for (let i = 0; i < properties.length -1; i++) {
        const prop = properties[i];
        const obj = parent[prop];

        parent[prop] = enableBinding(obj);
        parent.on(prop, callback);
        parent = obj;
    }

    const field = properties[properties.length -1];
    parent.on(field, callback);
}