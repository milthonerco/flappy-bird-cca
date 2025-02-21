const config = {
    width: innerWidth,
    height: innerHeight,
    type: Phaser.AUTO,
    parent: 'game',
    backgroundColor: '#000000',
    scene: {
        preload,
        create,
        update
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 600 },
            debug: true
        }
    }
};

new Phaser.Game(config);

function preload() {
    this.load.image("bird", "./bird.png");
    this.load.image("background", "./Diseño sin titulo (3).png");
    this.load.image("backgroundMiddle", "./Diseño sin titulo (5).png");
    this.load.image("backgroundFinal", "./Diseño sin titulo (6).png");
    this.load.image("pipe", "./Diseño sin título (4).png");
}

function create() {
    const background = [];
    background.push(this.add.sprite(1920, config.height, 'background').setOrigin(1, 1).setScale(1));

    for (let i = 0; i < 10; i++) {  // Aumentar el número de fondos para duplicar el camino
        background.push(this.add.sprite(0, config.height, 'backgroundMiddle').setOrigin(1, 1).setScale(1));
    }
    background.push(this.add.sprite(1920, config.height, 'backgroundFinal').setOrigin(1, 1).setScale(1));

    Phaser.Actions.AlignTo(background, Phaser.Display.Align.RIGHT_CENTER);

    this.bird = this.physics.add.image(config.width / 2, config.height / 2, "bird")
        .setCollideWorldBounds(true)
        .setScale(.05);

    for (let i = 1; i < 200; i++) {  // Aumentar el número de tuberías para duplicar el camino
        this.pipeDown = this.physics.add.staticImage(1000 * (i / 2), config.height, 'pipe')
            .setOrigin(1, 1)
            .setScale(.85)
            .refreshBody();
        this.pipeUp = this.physics.add.staticImage(1000 * (i / 2), 0, 'pipe')
            .setOrigin(1, 1)
            .setScale(.85)
            .setAngle(180)
            .refreshBody();

        this.hitBird = false;

        this.pipeUp.body.setOffset(-this.pipeUp.width / 1.18, -this.pipeUp.height / 1.18);

        this.physics.add.collider(this.pipeUp, this.bird, handleHit, null, this);
        this.physics.add.collider(this.pipeDown, this.bird, handleHit, null, this);
    }

    this.cursors = this.input.keyboard.createCursorKeys();
    this.keys = this.input.keyboard.addKeys("W, A, S, D");

    this.cameras.main.startFollow(this.bird);

    this.cameras.main.setBounds(0, 0, 10000, config.height);  // Duplicar el tamaño del escenario
    this.physics.world.setBounds(0, 0, 10000, config.height);

    this.bird.setVelocityX(120);

    this.input.on('pointerdown', function (pointer) {
        this.bird.setVelocityY(-250);  // Mover el pajarito al hacer clic
    }, this);

    // Trigger the questions after certain intervals
    this.time.delayedCall(5000, showQuestion1, [], this);
    this.time.delayedCall(10000, showQuestion2, [], this);
    this.time.delayedCall(15000, showQuestion3, [], this);
    this.time.delayedCall(18000, showQuestion4, [], this);
    this.time.delayedCall(20000, showQuestion4, [], this);
    this.time.delayedCall(25000, showQuestion5, [], this);
    this.time.delayedCall(30000, showQuestion6, [], this);
    this.time.delayedCall(35000, showQuestion7, [], this);
    this.time.delayedCall(40000, showQuestion8, [], this);
    this.time.delayedCall(45000, showQuestion9, [], this);
    this.time.delayedCall(50000, showQuestion10, [], this);
}

function update() {
    if (this.hitBird) { return }
    this.bird.rotation = this.bird.body.angle;
    if (this.cursors.up.isDown || this.keys.W.isDown) {
        this.bird.setVelocityY(-250);
    }
}

function handleHit() {
    this.hitBird = true;
    this.bird.rotation = this.bird.body.angle;
    this.bird.setVelocityX(0);
    this.bird.setVelocityY(-500);
    this.bird.setGravityY(1000);
    this.bird.setCollideWorldBounds(false);
    this.bird.body.checkCollision.none = true;

    setTimeout(() => {
        this.scene.restart();
    }, 3500);
}

function showQuestion1() {
    this.bird.setVelocityX(0); // Pause the game while answering the question

    const question = '¿Con qué país centroamericano Colombia comparte frontera marítima y terrestre?\n1. Panamá\n2. México';
    const answer = prompt(question);

    if (answer === '1') {
        this.bird.setVelocityX(150); // Increase speed and continue the game
    } else {
        this.scene.restart(); // Restart the game
    }
}

function showQuestion2() {
    this.bird.setVelocityX(0); // Pause the game while answering the question

    const question = '¿Cuál es la montaña costera más alta del mundo?\n1. Sierra Nevada de Santa Marta\n2. Nevado del Ruiz';
    const answer = prompt(question);

    if (answer === '1') {
        this.bird.setVelocityX(220); // Increase speed and continue the game
    } else {
        this.scene.restart(); // Restart the game
    }
}

function showQuestion3() {
    this.bird.setVelocityX(0); // Pause the game while answering the question

    const question = '¿En qué departamento colombiano el inglés es una lengua oficial?\n1. Santa Marta\n2. San Andrés';
    const answer = prompt(question);

    if (answer === '2') {
        this.bird.setVelocityX(280); // Increase speed and continue the game
    } else {
        this.scene.restart(); // Restart the game
    }
}

function showQuestion4() {
    this.bird.setVelocityX(0); // Pause the game while answering the question

    const question = '¿Qué prócer de la independencia de Colombia es conocido como “el hombre de las leyes”?\n1. Francisco de Paula Santander\n2. Simon Bolivar';
    const answer = prompt(question);

    if (answer === '1') {
        this.bird.setVelocityX(240); // Increase speed and continue the game
    } else {
        this.scene.restart(); // Restart the game
    }
}

function showQuestion5() {
    this.bird.setVelocityX(0); // Pause the game while answering the question

    const question = '¿En qué año se promulgó la actual constitución política de Colombia?\n1. 1991\n2. 1992';
    const answer = prompt(question);

    if (answer === '1') {
        this.bird.setVelocityX(270); // Increase speed and continue the game
    } else {
        this.scene.restart(); // Restart the game
    }
}

function showQuestion6() {
    this.bird.setVelocityX(0); // Pause the game while answering the question

    const question = '¿Cuál es la etnia indígena más numerosa de Colombia?\n1. Arhuacos\n2. Wayuu';
    const answer = prompt(question);

    if (answer === '2') {
        this.bird.setVelocityX(300); // Increase speed and continue the game
    } else {
        this.scene.restart(); // Restart the game
    }
}


function showQuestion7() {
    this.bird.setVelocityX(0); // Pause the game while answering the question

    const question = '¿En qué año la Selección Colombia logró su histórica victoria 5-0 contra Argentina?\n1. 1993\n2. 1995';
    const answer = prompt(question);

    if (answer === '1') {
        this.bird.setVelocityX(330); // Increase speed and continue the game
    } else {
        this.scene.restart(); // Restart the game
    }
}


function showQuestion8() {
    this.bird.setVelocityX(0); // Pause the game while answering the question

    const question = '¿En qué fecha ocurrió el Grito de Independencia?\n1. 20 de julio de 1810\n2. 20 de julio de 1820';
    const answer = prompt(question);

    if (answer === '1') {
        this.bird.setVelocityX(360); // Increase speed and continue the game
    } else {
        this.scene.restart(); // Restart the game
    }
}

function showQuestion9() {
    this.bird.setVelocityX(0); // Pause the game while answering the question

    const question = '¿Qué departamento tiene más parques naturales en Colombia?\n1. Amazonas\n2. Meta';
    const answer = prompt(question);

    if (answer === '2') {
        this.bird.setVelocityX(390); // Increase speed and continue the game
    } else {
        this.scene.restart(); // Restart the game
    }
}

function showQuestion10() {
    this.bird.setVelocityX(0); // Pause the game while answering the question

    const question = 'Estas islas le pertenecen al departamento del Cauca\n1. Isla Gorgona y Mompox\n2. Isla Gorgona e Isla Gorgonilla';
    const answer = prompt(question);

    if (answer === '2') {
        this.bird.setVelocityX(420); // Increase speed and continue the game
    } else {
        this.scene.restart(); // Restart the game
    }
}