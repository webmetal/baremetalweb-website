export function enableEvents(obj) {
    if (obj.on != null) return;

    obj._events = new Map();
    obj.on = on;
    obj.notifyPropertyChanged = notifyPropertyChanged;
    obj.getProperty = getProperty;
    obj.setProperty = setProperty;
}

export function disableEvents(obj) {
    obj._events.clear();

    delete obj.on;
    delete obj.notifyPropertyChanged;
    delete obj._events;
    delete obj.getProperty;
    delete obj.setProperty;
}

function on(event, callback) {
    this._events.set(event, callback);
}

function notifyPropertyChanged(name, newValue) {
    const callback = this._events.get(name);
    callback && callback(name, newValue);
}

function getProperty(prop, callback) {
    const field = `_${prop}`;
    if (this[field] == null) {
        this[field] = callback();
    }

    return this[field];
}

function setProperty(prop, newValue) {
    const field = `_${prop}`;
    if (this[field] && this[field].dispose) {
        this[field].dispose();
    }

    this[field] = newValue;
    this.notifyPropertyChanged(prop, newValue);
}