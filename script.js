const config = {
    width: 500,
    height: 500,
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
    this.load.image("background", "./background.jpg");
    this.load.image("pipe", "./pipe.png");
}

function create() {
    const background = [];
    for (let i = 0; i < 100; i++) {
        background.push(this.add.sprite(0, config.height, 'background').setOrigin(1, 1).setScale(1.1));
    }
    Phaser.Actions.AlignTo(background, Phaser.Display.Align.RIGHT_BOTTOM);

    this.bird = this.physics.add.image(config.width / 2, config.height / 2, "bird")
        .setCollideWorldBounds(true)
        .setScale(.05);

    for (let i = 1; i < 100; i++) {
        this.pipeDown = this.physics.add.staticImage(1000 * (i / 2), config.height, 'pipe')
            .setOrigin(1, 1)
            .setScale(.5)
            .refreshBody();
        this.pipeUp = this.physics.add.staticImage(1000 * (i / 2), 0, 'pipe')
            .setOrigin(1, 1)
            .setScale(.5)
            .setAngle(180)
            .refreshBody();

        this.hitBird = false;

        this.pipeUp.body.setOffset(-this.pipeUp.width / 2, -this.pipeUp.height / 2);

        this.physics.add.collider(this.pipeUp, this.bird, handleHit, null, this);
        this.physics.add.collider(this.pipeDown, this.bird, handleHit, null, this);
    }

    this.cursors = this.input.keyboard.createCursorKeys();
    this.keys = this.input.keyboard.addKeys("W, A, S, D");

    this.cameras.main.startFollow(this.bird);

    this.cameras.main.setBounds(0, 0, 5000, config.height);
    this.physics.world.setBounds(0, 0, 5000, config.height);

    this.bird.setVelocityX(120);

    // Trigger the questions after certain intervals
    this.time.delayedCall(5000, showQuestion1, [], this);
    this.time.delayedCall(10000, showQuestion2, [], this);
    this.time.delayedCall(15000, showQuestion3, [], this);
}

function update() {
    if (this.hitBird) { return }
    this.bird.rotation = this.bird.body.angle;
    if (this.cursors.up.isDown) {
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
        this.bird.setVelocityX(180); // Increase speed and continue the game
    } else {
        this.scene.restart(); // Restart the game
    }
}

function showQuestion3() {
    this.bird.setVelocityX(0); // Pause the game while answering the question

    const question = '¿Qué estructura celular controla la actividad de la célula?\n1. Núcleo\n2. Lisosoma';
    const answer = prompt(question);

    if (answer === '1') {
        this.bird.setVelocityX(210); // Increase speed and continue the game
    } else {
        this.scene.restart(); // Restart the game
    }
}
