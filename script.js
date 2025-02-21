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

    const question = '¿Qué orgánulo se encarga de la respiración celular?\n1. Mitocondria\n2. Ribosoma';
    const answer = prompt(question);

    if (answer === '1') {
        this.bird.setVelocityX(150); // Increase speed and continue the game
    } else {
        this.scene.restart(); // Restart the game
    }
}

function showQuestion2() {
    this.bird.setVelocityX(0); // Pause the game while answering the question

    const question = '¿Cuál es la función de los ribosomas?\n1. Síntesis de proteínas\n2. Transporte de lípidos';
    const answer = prompt(question);

    if (answer === '1') {
        this.bird.setVelocityX(220); // Increase speed and continue the game
    } else {
        this.scene.restart(); // Restart the game
    }
}

function showQuestion3() {
    this.bird.setVelocityX(0); // Pause the game while answering the question

    const question = '¿Qué estructura celular controla la actividad de la célula?\n1. Núcleo\n2. Lisosoma';
    const answer = prompt(question);

    if (answer === '1') {
        this.bird.setVelocityX(280); // Increase speed and continue the game
    } else {
        this.scene.restart(); // Restart the game
    }
}

function showQuestion4() {
    this.bird.setVelocityX(0); // Pause the game while answering the question

    const question = '¿Qué estructura celular controla la actividad de la célula?\n1. Núcleo\n2. Lisosoma';
    const answer = prompt(question);

    if (answer === '2') {
        this.bird.setVelocityX(350); // Increase speed and continue the game
    } else {
        this.scene.restart(); // Restart the game
    }
}
