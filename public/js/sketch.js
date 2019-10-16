// For more: https://github.com/auduno/clmtrackr

var ctracker, cnv, videoInput;
var glasses, moustache, whiskers, pipe, ears, hat, nose;
var mode, saving;

function preload() {
    glasses = loadImage("img/glasses.png");
    moustache = loadImage("img/moustache.png");
    whiskers = loadImage("img/whiskers.png");
    pipe = loadImage("img/pipe.png");
    ears = loadImage("img/ears.png");
    hat = loadImage("img/hat.png");
    nose = loadImage("img/nose.png");
}

function setup() {
    // setup camera capture
    videoInput = createCapture(VIDEO);
    videoInput.size(800, 600);
    videoInput.position(0, 0);

    // setup canvas
    cnv = createCanvas(800, 600);
    cnv.position(0, 0);
    pixelDensity(1);
    // setup tracker
    ctracker = new clm.tracker();
    ctracker.init(pModel);
    ctracker.start(videoInput.elt);
    noStroke();
    mode = 1;
    saving = false;
}

function draw() {
    clear();

    // get array of face marker positions [x, y] format
    var positions = ctracker.getCurrentPosition();


    /*for (var i = 0; i < positions.length; i++) {
    // set the color of the ellipse based on position on screen
    fill(map(positions[i][0], width * 0.33, width * 0.66, 0, 255), map(positions[i][1], height * 0.33, height * 0.66, 0, 255), 255);
    // draw ellipse at each position point
    ellipse(positions[i][0], positions[i][1], 8, 8);
}*/
    if (saving) {
        //draw video image behind the prop on the canvas just for this frame
        image(videoInput, 0, 0, width, height);
    }
    if (positions.length > 1) {
        //angle between eyes gives angle of head
        var ang = atan2(positions[27][1] - positions[32][1], positions[27][0] - positions[32][0]);
        //distance between eyes so can work out scale
        var d = int(dist(positions[27][0], positions[27][1], positions[32][0], positions[32][1]));
        var scl = map(d, 0, 290, 0, 1.8);

        if (mode == 1) {
            push();
            //33 position between eyes
            translate(positions[33][0], positions[33][1]);
            rotate(ang + PI);
            scale(scl);
            image(glasses, 0 - glasses.width / 2, 0 - glasses.height / 2);
            pop();
        } else if (mode == 2) {
            push();
            //37 position base of nose
            translate(positions[37][0], positions[37][1]);
            rotate(ang + PI);
            scale(scl);
            image(moustache, 0 - moustache.width / 2, -15);
            pop();
        } else if (mode == 3) {
            push();
            //41 position mid nose
            translate(positions[41][0], positions[41][1]);
            rotate(ang + PI);
            scl *= 1.8;
            scale(scl);
            image(whiskers, 0 - whiskers.width / 2, 0);
            pop();
        } else if (mode == 4) {
            push();
            //56 position left mouth
            translate(positions[56][0], positions[56][1]);
            rotate(ang + PI);
            scale(scl);
            image(pipe, 0 - pipe.width, 0);
            pop();
        } else if (mode == 5) {
            //33 to 62 length of nose place this distance above 33 for ears
            var d2 = int(dist(positions[33][0], positions[33][1], positions[37][0], positions[37][1]));
            push();
            //33 mid eyes
            translate(positions[33][0], positions[33][1]);
            rotate(ang + PI);
            scale(scl);
            image(ears, 0 - ears.width / 2, 0 - (ears.height + d2));
            pop();
        } else if (mode == 6) {
            //33 to 62 length of nose place this distance above 33 for ears
            var d2 = int(dist(positions[33][0], positions[33][1], positions[37][0], positions[37][1]));
            push();
            //20 position left eyebrow
            translate(positions[20][0], positions[20][1]);
            rotate(ang + PI);
            scale(scl);
            image(hat, 0 - hat.width / 2, 0 - (hat.height + d2));
            pop();
        } else if (mode == 7) {
            push();
            //20 position left eyebrow
            translate(positions[62][0], positions[62][1]);
            rotate(ang + PI);
            scale(scl);
            image(nose, 0 - nose.width / 2, 0 - nose.height / 2);
            pop();
        }
    }
    if (saving) {
        saveCanvas(cnv, 'me', 'png');
        saving = false;
    }

}

function keyPressed() {
    if (keyCode === RIGHT_ARROW) {
        if (mode == 7) {
            mode = 1;
        } else {
            mode++;
        }
    }
    if (keyCode === LEFT_ARROW) {
        if (mode == 1) {
            mode = 7;
        } else {
            mode--;
        }
    }
    if (keyCode === 83) {
        saving = true;
    }
}
