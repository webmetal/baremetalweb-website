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
        this.process = null;
    }

    async perform() {
        return this.fn && this.fn(this.input);
    }
}

export class Process extends ProcessAction {
    constructor(title, id) {
        super(title, id);
        this.items = [];
        this.variables = {};
    }

    dispose() {
        for (let item of this.items) {
            item.dispose();
        }
        this.items = null;
        this.variables = null;
        super.dispose();
    }

    add(step) {
        this.items.push(step);
        step.process = this;
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

export class ProcessSetVariable extends ProcessAction {
    constructor(title, id, nextId, varName) {
        super(title, id, nextId);
        this.varName = varName;
    }

    async perform() {
        this.process.variables[this.varName] = this.input;
        return this.input;
    }
}

export class ProcessCondition extends ProcessAction {
    constructor(title, id, passId, failId, exp) {
        super(title, id, passId);
        this.passId = passId;
        this.failId = failId;
        this.fn = this._createFn(exp);
    }

    dispose() {
        this.failId = null;
        super.dispose();
    }

    _createFn(exp) {
        const expression = exp.split("@").join("this.process.variables.");
        return new Function(`return ${expression}`);
    }

    perform() {
        this.nextId = this.fn() ? this.passId : this.failId;
    }
}