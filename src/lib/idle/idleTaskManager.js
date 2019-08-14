class IdleTaskManager {
    constructor() {
        this.processing = false;
        this.list = [];
    }

    dispose() {
        this.list = null;
    }

    /**
     * Add a function to the manager to call once the system is idle
     * @param fn {Function}
     */
    add(fn) {
        fn && this.list.push(fn);
        !this.processing && this._processQueue();
    }

    _processQueue() {
        this.processing = true;
        requestIdleCallback(deadline => {
            while((deadline.timeRemaining() > 0 || deadline.didTimeout) && this.list.length) {
                let fn = this.list.shift();
                fn();
            }
            this.processing = false;
            this.list.length && this._processQueue();
        }, {timeout: 1000})
    }
}

window.idleTaskManager = new IdleTaskManager();