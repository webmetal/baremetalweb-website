import {enableNotifications} from "./../../../mixins/event-mixin.js";

const ignoreProperties = ["_notifyProperty", "_events"];

/**
 * If an object is not already bound ready, enable all the features required to make it bindable.
 * @param obj {Object}: Object to bind on
 * @returns {*}
 */
export function enableBinding(obj) {
    if (!obj || obj.on == null) {
        enableNotifications(obj);
        return new Proxy(obj, {
            get: (obj, prop) => {
                if (prop == "proxy") return true;
                return obj[prop];
            },
            set: (obj, prop, value) => {
                if (obj.mute || ignoreProperties.indexOf(prop) != -1) {
                    obj[prop] = value;
                    return true;
                }

                if (typeof value == "object") {
                    value = enableBinding(value);
                    const oldValue = obj[prop];
                    copyEventsOver(oldValue, value);
                    obj[prop] = value;
                }

                obj[prop] = value;
                obj.notifyPropertyChanged(prop, obj[prop]);
                return true;
            }
        })
    }
    return obj;
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

function copyEventsOver(source, target) {
    if (!source || !source._events) return;

    if (source._events.size > 0) {
        const ar = Array.from(source._events);
        target._events = new Map(ar);
    }

    const keys = Object.keys(source);
    for (let key of keys) {
        if (source[key]._events != null) {
            target[key] = target[key] == null ? enableBinding({}) : enableBinding(target[key]);
            copyEventsOver(source[key], target[key]);
        }
    }
}