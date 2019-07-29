export function enableEvents(obj) {
    if (obj.on != null) return;

    obj._events = new Map();
    obj.on = on;
    obj.notifyPropertyChanged = notifyPropertyChanged;
}

export function disableEvents(obj) {
    obj._events.clear();

    delete obj.on;
    delete obj.notifyPropertyChanged;
    delete obj._events;
}

function on(event, callback) {
    this._events.set(event, callback);
}

function notifyPropertyChanged(name, newValue) {
    const callback = this._events.get(name);
    callback && callback(name, newValue);
}