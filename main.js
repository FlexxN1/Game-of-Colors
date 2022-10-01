const celeste = document.getElementById('celeste');
const violeta = document.getElementById('violeta');
const naranja = document.getElementById('naranja');
const verde = document.getElementById('verde');
const btnEmpezar = document.getElementById('btnEmpezar');
const audio = document.getElementById('tick');
const ULTIMO_NIVEL = 3;

class Juego {
    constructor() {
        this.inicializar = this.inicializar.bind(this);
        this.inicializar();
        this.generarSecuencia();
        setTimeout(this.siguienteNivel, 500);
    }

    inicializar() {
        this.toggleBtnEmpezar();
        this.siguienteNivel = this.siguienteNivel.bind(this);
        this.elegirColor = this.elegirColor.bind(this);
        this.nivel = 1;
        this.colores = {
            celeste,
            violeta,
            naranja,
            verde
        }
    }

    toggleBtnEmpezar() {
        if(btnEmpezar.classList.contains('hide')) {
            btnEmpezar.classList.remove('hide');
        } else {
            btnEmpezar.classList.add('hide');
        }
    }

    generarSecuencia() {
        this.secuencia = new Array(ULTIMO_NIVEL).fill(0).map(n => Math.floor(Math.random() * 4));
    }

    siguienteNivel() {
        document.getElementById('numero-nivel').innerHTML = this.nivel;
        this.numeroNivel = this.nivel;
        this.subNivel = 0;
        this.iluminarSecuencia();
        this.agregarEventoClick();
    }

    transformarNumeroAColor(num) {
        switch(num) {
            case 0:
                return 'celeste'
            case 1:
                return 'violeta'
            case 2:
                return 'naranja'
            case 3:
                return 'verde'
        }
    }

    transformarColorANumero(color) {
        switch(color) {
            case 'celeste':
                return 0
            case 'violeta':
                return 1
            case 'naranja':
                return 2
            case 'verde':
                return 3
        }
    }

    //usamos let en vez de var, para mantener el scope de la variable dentro del ciclo en cada iteración
    iluminarSecuencia() {
        for (let i = 0; i < this.nivel; i++) {
            let color = this.transformarNumeroAColor(this.secuencia[i]);
            setTimeout(() => this.iluminarColor(color), 1000*i);
        }
    }

    iluminarColor(color) {
        this.colores[color].classList.add('light');
        audio.play();
        setTimeout(() => this.apagarColor(color), 450);
    }

    apagarColor(color) {
        this.colores[color].classList.remove('light');
    }

    agregarEventoClick() {
        this.colores.celeste.addEventListener('click', this.elegirColor);
        this.colores.verde.addEventListener('click', this.elegirColor);
        this.colores.violeta.addEventListener('click', this.elegirColor);
        this.colores.naranja.addEventListener('click', this.elegirColor);
    }

    eliminarEventoClick() {
        this.colores.celeste.removeEventListener('click', this.elegirColor);
        this.colores.verde.removeEventListener('click', this.elegirColor);
        this.colores.violeta.removeEventListener('click', this.elegirColor);
        this.colores.naranja.removeEventListener('click', this.elegirColor);
    }

    elegirColor(e) {
        const nombreColor = e.target.dataset.color;
        const numeroColor = this.transformarColorANumero(nombreColor);
        this.iluminarColor(nombreColor);
        audio.play();
        if (numeroColor === this.secuencia[this.subNivel]) {
            this.subNivel++;
            if (this.subNivel === this.nivel) {
                this.nivel++;
                this.eliminarEventoClick();
                if (this.nivel === (ULTIMO_NIVEL + 1)) {
                    this.juegoGanado();
                } else {
                    setTimeout(this.siguienteNivel, 1500);
                }
            }
        } else {
            this.juegoPerdido();
        }
    }

    juegoGanado() {
        swal('Game of Colors', 'Ganaste el juego, felicitaciones! 😀🥳🎉', 'success')
            .then(this.inicializar);
    }

    juegoPerdido() {
        swal('Game of Colors', 'Lo sentimos, perdiste! ☹', 'error')
            .then(() => {
                this.eliminarEventoClick();
                this.inicializar();
            });
    }
}

function empezarJuego() {
    var juego = new Juego();
}
