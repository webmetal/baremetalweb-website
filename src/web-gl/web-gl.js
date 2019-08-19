class WebGL extends HTMLElement {
    async connectedCallback() {
        await this._loadTemplate().catch(error => console.error(error));
        await this._createContext();
        await this._setupProgram();
        await this._draw();
    }

    async _loadTemplate() {
        const template = document.createElement("template");
        template.innerHTML = await fetch(import.meta.url.replace(".js", ".html")).then(result => result.text());
        this.appendChild(template.content.cloneNode(true));
    }

    async _createContext() {
        const canvas = this.querySelector("canvas");
        this.gl = canvas.getContext("webgl");

        this.gl.viewport(0, 0, this.gl.drawingBufferWidth, this.gl.drawingBufferHeight);
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    }

    async _setupProgram() {
        const vShader = this.gl.createShader(this.gl.VERTEX_SHADER);
        this.gl.shaderSource(vShader, vShaderSrc);
        this.gl.compileShader(vShader);

        const fShader = this.gl.createShader(this.gl.FRAGMENT_SHADER);
        this.gl.shaderSource(fShader, fShaderSrc);
        this.gl.compileShader(fShader);

        this.program = this.gl.createProgram();
        this.gl.attachShader(this.program, vShader);
        this.gl.attachShader(this.program, fShader);
        this.gl.linkProgram(this.program);
    }

    async _draw() {
        const vertices = new Float32Array([
            -0.5, -0.5,
            0.5, -0.5,
            0.0, 0.5
        ]);

        const buffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, vertices, this.gl.STATIC_DRAW);

        this.gl.useProgram(this.program);
        this.program.color = this.gl.getUniformLocation(this.program, "color");
        this.gl.uniform4fv(this.program.color, [1.0, 1.0, 1.0, 1.0]);

        this.program.position = this.gl.getAttribLocation(this.program, "position");
        this.gl.enableVertexAttribArray(this.program.position);
        this.gl.vertexAttribPointer(this.program.position, 2, this.gl.FLOAT, false, 0, 0);


        this.gl.drawArrays(this.gl.TRIANGLES, 0, vertices.length / 2);
    }
}

const vShaderSrc = `
attribute vec2 position;
void main() {
   gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fShaderSrc = `
precision mediump float;
uniform vec4 color;
void main() {
 gl_FragColor = color;
}
`;

customElements.define("web-gl", WebGL);