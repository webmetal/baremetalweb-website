export class ProcessAction {
    constructor(title, id = null, nextId = null, fn = null) {
        this.title = title;
        this.id = id;
        this.nextId = nextId;
        this.fn = fn;
        this.input = null;
    }

    dispose() {
        this.title = null;
        this.id = null;
        this.nextId = null;
        this.fn = null;
        this.input = null;
    }

    async perform() {
        return this.fn && this.fn(this.input);
    }
}

export class Process extends ProcessAction {
    constructor(title, id) {
        super(title, id);
        this.items = [];
    }

    dispose() {
        for (let item of this.items) {
            item.dispose();
        }
        this.items = null;
        super.dispose();
    }

    add(step) {
        this.items.push(step);
    }

    async start() {
        const process = this._process();
        this.step = process.next();

        while(this.step.value) {
            const output = await this.step.value.perform();
            this.step = process.next();

            if (this.step.value != null) {
                this.step.value.input = output;
            }
        }
    }

    *_process() {
        if (this.step == null) {
            yield this.items[0];
        }

        const id = this.step.value.nextId;
        const result = this.items.find(item => item.id == id);
        yield result;

        if (result.nextId != null) {
            yield *this._process();
        }
    }
}


export class ProcessCondition {
}

export class ProcessBranch {
}