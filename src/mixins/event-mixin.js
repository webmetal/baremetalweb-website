export function enableEvents(obj) {
    if (obj.on != null) return;

    obj._events = new Map();
    obj.on = on.bind(obj);
    obj.notifyPropertyChanged = notifyPropertyChanged.bind(obj);
}

export function disableEvents(obj) {
    obj.on = null;
    obj.notifyPropertyChanged = null;
    obj._events.clear();
    obj._events = null;
}

function on(event, callback) {
    this._events.set(event, callback);
}

function notifyPropertyChanged(name, newValue) {
    const callback = this._events.get(name);
    callback && callback(name, newValue);
}