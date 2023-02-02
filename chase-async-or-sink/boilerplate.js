// DO NOT MODIFY
const runner = {
    el: document.getElementById('runner'),

    getPosition: function () {
        return parseInt(this.el.style.left) || 0;
    },

    speed: 300,

    currentMovement: 0,

    direction: "right",

    moveRight: function (speed) {
        this.direction = "right";
        clearInterval(this.currentMovement)
        let newSpeed = speed || this.speed;
        console.log('current interval speed:', newSpeed)
        this.currentMovement = setInterval(()=>{
            const currentPosition = parseInt(this.el.style.left) || 0;
            if (currentPosition < 700) {
                let newPosition = currentPosition + 10;
                this.el.style.left = `${newPosition}px`;
                this.el.style.transform = "scaleX(1)";
            } else {
                // throw new Error('Your runner went out of bounds!');
                clearInterval(this.currentMovement)
            }
        }, newSpeed)
        return this;
    },

    moveLeft: function (speed) {
        this.direction = "left";
        clearInterval(this.currentMovement)
        let newSpeed = speed || this.speed;
        console.log('current interval speed:', newSpeed)
        this.currentMovement = setInterval(() => {
            const currentPosition = parseInt(this.el.style.left) || 0;
            if (currentPosition < 700) {
                let newPosition = currentPosition - 10;
                this.el.style.left = `${newPosition}px`;
                this.el.style.transform = "scaleX(-1)";
            } else {
                // throw new Error('Your runner went out of bounds!');
                clearInterval(this.currentMovement)
            }
        }, newSpeed)
        return this;
    },

    slowDown: function () {
        this.speed += 25;
        this.moveForward()
        return this;
    },

    speedUp: function () {
        this.speed -= 25;
        this.moveForward()
        return this;
    },

    moveForward(){
        if(this.direction === 'right'){
            this.moveRight();
        } else {
            this.moveLeft();
        }
    },
}

// runner.moveRight()

const message = document.getElementById('message');

const pacer = {
    el: document.getElementById('pacing'),

    index: 0,

    direction: "right",

    getPosition: function () {
        return parseInt(this.el.style.left);
    },

    movement(steps){
        let currentPosition = parseInt(pacer.el.style.left) || 0;

        function move(steps) {
            let totalTraveled = 0;
            if(steps.length === 0){
                message.innerText = 'Well done!! Uncomment the next round in your app.js'
                return;
            }

            let increment = steps[0].direction === 'right' ? 10 : -10;

            let anim = setInterval(() => {
                
                totalTraveled += 10;
                let newPosition = currentPosition += increment;
                pacer.el.style.left = `${newPosition}px`;

                // distance to fall

                let runnerTooFarLeft = (pacer.getPosition()) < (runner.getPosition() - 8)
                let runnerTooFarRight = (pacer.getPosition()+40)  > (runner.getPosition()+120)
                if (runnerTooFarLeft || runnerTooFarRight){
                    try {
                        throw new Error('You fell off! Refresh to restart. (cmd + shift + r)')
                    } catch (error) {
                        alert(error)
                        clearInterval(anim);
                        return;
                    }
                }


                if (totalTraveled > steps[0].distance ) {
                    clearInterval(anim);
                    steps.shift()
                    move(steps)
                }
            }, steps[0].duration)
            
            message.innerText = steps[0].message;
        }


        move(steps)
    }
}


function after100(cb) {
    setTimeout(function () {
        console.log('running');
        cb()
    }, 100)
}
function after300(cb) {
    setTimeout(function () {
        console.log('running');
        cb()
    }, 300)
}

function after600(cb) {
    setTimeout(function () {
        cb()
    }, 600)
}

function after1000(cb) {
    setTimeout(function () {
        cb()
    }, 1000)
}

function after3000(cb) {
    setTimeout(function () {
        cb()
    }, 3000)
}

function after9000(cb) {
    setTimeout(function () {
        cb()
    }, 9000)
}


let round = [
    {
        message: 'getting started!',
        duration: 300,
        distance: 720,
        direction: 'right'
    },
]

function round1(){
    round = [
        {
            message: 'getting started!',
            duration: 300,
            distance: 720,
            direction: 'right'
        },
    ]
}

function round2(){
    round = [
        {
            message: 'getting started!',
            duration: 300,
            distance: 360,
            direction: 'right'
        },
        {
            message: 'Speeding Up!',
            duration: 100,
            distance: 360,
            direction: 'right'
        },
    ]
}

function round3() {
    round = [
        {
            message: 'getting started!',
            duration: 200,
            distance: 200,
            direction: 'right'
        },
        {
            message: 'Speeding Up!',
            duration: 100,
            distance: 290,
            direction: 'right'
        },
        {
            message: 'Slowing Down!',
            duration: 200,
            distance: 230,
            direction: 'right'
        },
    ]
}

function round4() {
    round = [
        {
            message: 'getting started!',
            duration: 300,
            distance: 170,
            direction: 'right'
        },
        {
            message: 'Speeding Up!',
            duration: 120,
            distance: 300,
            direction: 'right'
        },
        {
            message: 'what?!',
            duration: 200,
            distance: 200,
            direction: 'left'
        },
        {
            message: 'Heading back home!',
            duration: 50,
            distance: 460,
            direction: 'right'
        },
    ]
}

function round5() {
    round = [
        {
            message: 'Stay on target...',
            duration: 80,
            distance: 450,
            direction: 'right'
        },
        {
            message: 'Speeding Up! Hard Left!',
            duration: 120,
            distance: 150,
            direction: 'left'
        },
        {
            message: 'Slowing Down! Left!',
            duration: 400,
            distance: 300,
            direction: 'left'
        },
        {
            message: 'Slowing Down! And back around!',
            duration: 300,
            distance: 250,
            direction: 'right'
        },
        {
            message: 'Right Shark!',
            duration: 100,
            distance: 200,
            direction: 'left'
        },
        {
            message: 'Left Shark! (left shark is slower)',
            duration: 400,
            distance: 400,
            direction: 'right'
        },
        {
            message: 'Homestretch!',
            duration: 100,
            distance: 300,
            direction: 'right'
        },
    ]
}


// DO NOT MODIFY
