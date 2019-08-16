/**
 * Call this function to set the full property and event features on an object.
 * @param obj {Object}
 */
export function enableEvents(obj) {
    enableNotifications(obj);
    obj.getProperty = getProperty;
    obj.setProperty = setProperty;
}

/**
 * Call this event to only allow the notifications features for objects.
 * This is most often used in isolation when using binding
 * @param obj {Object}
 */
export function enableNotifications(obj) {
    if (obj.on != null) return;

    obj._events = new Map();
    obj.on = on;
    obj.notifyPropertyChanged = notifyPropertyChanged;
}

/**
 * This is a cleanup function that removes all notification and event features.
 * @param obj {Object}
 */
export function disableEvents(obj) {
    obj.mute = true;
    obj._events && obj._events.clear();

    delete obj.on;
    delete obj.notifyPropertyChanged;
    delete obj._events;
    delete obj.getProperty;
    delete obj.setProperty;
}

/**
 * This is a recursive cleanup function that removes all notification and event features.
 * @param obj
 */
export function disableEventsRecursive(obj) {
    if (typeof obj != "object" || Array.isArray(obj)) return;
    disableEvents(obj);

    const children = Object.entries(obj).filter(item => item[1] && item[1].on);
    for(let child of children) {
        disableEventsRecursive(child[1]);
    }
}

/**
 * This function is used to register a notification when a property value changes
 * @param event
 * @param callback
 */
function on(event, callback) {
    if (!this._events.has(event)) {
        this._events.set(event, [callback]);
    }
    else {
        const ar = this._events.get(event);
        const fn = ar.find(item => item == callback);
        !fn && ar.push(callback);
    }
}

/**
 * When a property changes and you want to trigger side effects from this, use this function.
 * This is often used in binding scenarios or custom notifications to force a refresh of property values
 * @param name
 * @param newValue
 */
function notifyPropertyChanged(name, newValue) {
    const callback = this._events.get(name);
    callback && callback.forEach(fn => fn(name, newValue));
}

/**
 * Get property helper function to shorthand property getter features
 * @param prop {string} property name
 * @param callback {Function} this function is called if the object is not yet set and you want to determine it from another source.
 * @returns {*}
 */
function getProperty(prop, callback) {
    const field = `_${prop}`;
    if (this[field] == null) {
        this[field] = callback ? callback() : null;
    }

    return this[field];
}

/**
 * This is a property setter shorthand and deals with cleanup of existing objects before setting the new one.
 * @param prop
 * @param newValue
 */
function setProperty(prop, newValue) {
    const field = `_${prop}`;
    if (this[field] && this[field].dispose) {
        this[field].dispose();
    }

    if (this[field] && this[field].clear) {
        this[field].clear();
    }

    this[field] = newValue;
    this.notifyPropertyChanged(prop, newValue);
}