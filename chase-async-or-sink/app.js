///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
// How to play
// Issue commands to your runner inside the yourCode function

// runner.moveRight() // moves right
// runner.moveLeft()  // moves left
// runner.speedUp()   // speeds up
// runner.slowDown()  // slows down

// You can chain on commands to the runner object, e.g.
// runner.moveRight().speedUp().speedUp() 

// Run a command from above after a specified delay:
// after100(fn)
// after300(fn)
// after600(fn)
// after1000(fn)
// after3000(fn)
// after9000(fn)

// example: 

// after100(function(){
//     runner.moveRight()
// })

///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
function yourCode() {

    // ADD YOUR CODE HERE

    // Uncomment the lines below to get started
    after1000(function() {
        runner.moveRight();
    })
    
    
    //round 2
    // after9000(function() {
    //     after3000(function() {
    //         runner.speedUp().speedUp().speedUp().speedUp().speedUp().speedUp().speedUp().speedUp();
    //     });
    // });

    //round 3
    // runner.speedUp().speedUp().speedUp()

    // after3000(function() {
    //     after1000(function() {
    //         after600(function() {
    //             runner.speedUp().speedUp().speedUp().speedUp().speedUp()

    //             after3000(function() {
    //                 runner.slowDown().slowDown().slowDown().slowDown().slowDown()
    //             })
    //         })
    //     })
    // })

    //round 4
    // after3000(function() {
    //     after1000(function() {
    //         after1000(function() {
    //             runner.speedUp().speedUp().speedUp().speedUp().speedUp().speedUp().speedUp()

    //             after3000(function() {
    //                 after1000(function() {
    //                     runner.moveLeft().slowDown().slowDown().slowDown()

    //                     after3000(function() {
    //                         after1000(function() {
    //                             after300(function() {
    //                                 runner.moveRight().speedUp().speedUp().speedUp().speedUp().speedUp().speedUp()
    //                             })
    //                         })
    //                     })
    //                 })
    //             })
    //         })
    //     })
    // })

    //round 5 (right left left right left right)
    after300(function() {
        runner.speedUp().speedUp().speedUp().speedUp().speedUp().speedUp().speedUp().speedUp().speedUp()

        after3000(function() {
            after300(function() {
                runner.moveLeft().slowDown().slowDown()

                after1000(function() {
                    after1000(function() {
                        runner.slowDown().slowDown().slowDown().slowDown().slowDown().slowDown().slowDown().slowDown().slowDown().slowDown()

                        after9000(function() {
                            after3000(function() {
                                runner.moveRight().speedUp().speedUp()

                                after3000(function() {
                                    after3000(function() {
                                        after1000(function() {
                                            after1000(function() {
                                                runner.moveLeft().speedUp().speedUp().speedUp().speedUp().speedUp().speedUp().speedUp().speedUp()

                                                after1000(function() {
                                                    after1000(function() {
                                                        after600(function() {
                                                            runner.moveRight().slowDown().slowDown().slowDown().slowDown().slowDown().slowDown().slowDown().slowDown().slowDown()

                                                            after9000(function() {
                                                                after3000(function() {
                                                                    after3000(function() {
                                                                        after1000(function() {
                                                                            runner.speedUp().speedUp().speedUp().speedUp().speedUp().speedUp().speedUp().speedUp().speedUp().speedUp()
                                                                        })
                                                                    })
                                                                })
                                                            })
                                                        })
                                                    })
                                                })
                                            })
                                        })
                                    })
                                })
                            })
                        })
                    })
                })
            })
        })
    })
}

// uncomment the next round when you have completed the current one
// round1() // Freebie
// round2() // Warm up (HINT: You will need to start using the afterX commands)
// round3() // Tricky
// round4() // Hard
round5() // Nightmare


// DO NOT MODIFY
// Will stop the program whenever runner.moveRight or runner.moveLeft throws an error
yourCode()
pacer.movement(round)
// DO NOT MODIFY
