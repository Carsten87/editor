/**
 * @preserve
 *
 *                                      .,,,;;,'''..
 *                                  .'','...     ..',,,.
 *                                .,,,,,,',,',;;:;,.  .,l,
 *                               .,',.     ...     ,;,   :l.
 *                              ':;.    .'.:do;;.    .c   ol;'.
 *       ';;'                   ;.;    ', .dkl';,    .c   :; .'.',::,,'''.
 *      ',,;;;,.                ; .,'     .'''.    .'.   .d;''.''''.
 *     .oxddl;::,,.             ',  .'''.   .... .'.   ,:;..
 *      .'cOX0OOkdoc.            .,'.   .. .....     'lc.
 *     .:;,,::co0XOko'              ....''..'.'''''''.
 *     .dxk0KKdc:cdOXKl............. .. ..,c....
 *      .',lxOOxl:'':xkl,',......'....    ,'.
 *           .';:oo:...                        .
 *                .cd,      ╔═╗┌┬┐┬┌┬┐┌─┐┬─┐    .
 *                  .l;     ║╣  │││ │ │ │├┬┘    '
 *                    'l.   ╚═╝─┴┘┴ ┴ └─┘┴└─   '.
 *                     .o.                   ...
 *                      .''''','.;:''.........
 *                           .'  .l
 *                          .:.   l'
 *                         .:.    .l.
 *                        .x:      :k;,.
 *                        cxlc;    cdc,,;;.
 *                       'l :..   .c  ,
 *                       o.
 *                      .,
 *
 *              ╦ ╦┬ ┬┌┐ ┬─┐┬┌┬┐  ╔═╗┌┐  ┬┌─┐┌─┐┌┬┐┌─┐
 *              ╠═╣└┬┘├┴┐├┬┘│ ││  ║ ║├┴┐ │├┤ │   │ └─┐
 *              ╩ ╩ ┴ └─┘┴└─┴─┴┘  ╚═╝└─┘└┘└─┘└─┘ ┴ └─┘
 *
 *
 * Created by Valentin on 10/22/14.
 *
 * Copyright (c) 2015 Valentin Heun
 *
 * All ascii characters above must be included in any redistribution.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

/**********************************************************************************************************************
 **********************************************************************************************************************/

/**
 * @desc
 * @param
 * @param
 * @return
 **/

var deleteLines = function (x21, y21, x22, y22) {
    // window.location.href = "of://gotsome";
    for (var keysome in objectExp) {
        if (!objectExp.hasOwnProperty(keysome)) {
            continue;
        }

        var thisObject = objectExp[keysome];
        for (var subKeysome in thisObject.objectLinks) {
            if (!thisObject.objectLinks.hasOwnProperty(subKeysome)) {
                continue;
            }
            var l = thisObject.objectLinks[subKeysome];
            var oA = thisObject;
            var oB = objectExp[l.ObjectB];
            var bA = oA.objectValues[l.locationInA];
            var bB = oB.objectValues[l.locationInB];

            if (bA === undefined || bB === undefined || oA === undefined || oB === undefined) {
                continue; //should not be undefined
            }
            if (checkLineCross(bA.screenX, bA.screenY, bB.screenX, bB.screenY, x21, y21, x22, y22, globalCanvas.canvas.width, globalCanvas.canvas.height)) {
                delete thisObject.objectLinks[subKeysome];
                console.log("iam executing link deletion");
                deleteLinkFromObject(thisObject.ip, keysome, subKeysome);
            }
        }
    }

};
/**********************************************************************************************************************
 **********************************************************************************************************************/

/**
 * @desc
 * @param
 * @param
 * @return
 **/

function drawAllLines(thisObject, context) {
    var multiplier = 1;
    var captionOffsetY = 0;
    var counters = {};
    for (var subKey in thisObject.objectLinks) {
        if (!thisObject.objectLinks.hasOwnProperty(subKey)) {
            continue;
        }
        var l = thisObject.objectLinks[subKey];
        var oA = thisObject;

        if (!objectExp.hasOwnProperty(l.ObjectB)) {
            continue;
        }
        var oB = objectExp[l.ObjectB];
        if (!oA.objectValues.hasOwnProperty(l.locationInA)) {
            continue;
        }
        if (!oB.objectValues.hasOwnProperty(l.locationInB)) {
            continue;
        }
        var bA = oA.objectValues[l.locationInA];
        var bB = oB.objectValues[l.locationInB];

        if (bA === undefined || bB === undefined || oA === undefined || oB === undefined) {
            continue; //should not be undefined
        }
            // the line actuall screen possition gets changed so that when cutting the line of an out of image object
            // the line still gets cut

            var thisM = globalStates.height / 500 * 1000;

            // bA.screenZ =  thisM/(Math.sqrt(bA.screenZ));
            // bB.screenZ = thisM/(Math.sqrt(bB.screenZ));


            bA.screenZ = thisM / (bA.screenZ);
            bB.screenZ = thisM / (bB.screenZ);

           // console.log(oB.ObjectVisible);
           // console.log(oA.ObjectVisible);


        if (bA.screenZ > 3) {

            bA.screenZ = 3;
        }

        if (bA.screenZ < 0) {

            bA.screenZ = 0;
        }

        if (bB.screenZ > 3) {

            bB.screenZ = 3;
        }

        if (bA.screenZ < 0) {

            bA.screenZ = 0;
        }


        if (!oB.ObjectVisible) {
            if (!counters.hasOwnProperty(l.locationInA)) {
                counters[l.locationInA] = 0;
            } else {
                counters[l.locationInA]++;
            }

            if (counters[l.locationInA] == 0) {
                multiplier = 0;
            } else {
                if (counters[l.locationInA] % 2 == 0) {
                    multiplier = counters[l.locationInA] - 1;
                } else {
                    multiplier = -counters[l.locationInA];
                }
            }

            if (counters[l.locationInA] % 4 == 0) {
                captionOffsetY = 0;
            } else if (counters[l.locationInA] % 4 == 1) {
                captionOffsetY = 25;
            } else if (counters[l.locationInA] % 4 == 2) {
                captionOffsetY = 50;
            } else if (counters[l.locationInA] % 4 == 3) {
                captionOffsetY = 0;
            }


            bB.screenX = bA.screenX + 100 * multiplier;
                bB.screenY = -10;
                bB.screenZ = bA.screenZ;
            }


            if (!oA.ObjectVisible) {
            if (!counters.hasOwnProperty(l.locationInB)) {
                counters[l.locationInB] = 0;
            } else {
                counters[l.locationInB]++;
            }

            if (counters[l.locationInB] == 0) {
                multiplier = 0;
            } else {
                if (counters[l.locationInB] % 2 == 0) {
                    multiplier = counters[l.locationInB] - 1;
                } else {
                    multiplier = -counters[l.locationInB];
                }
            }

            if (counters[l.locationInB] % 4 == 0) {
                captionOffsetY = 0;
            } else if (counters[l.locationInB] % 4 == 1) {
                captionOffsetY = 25;
            } else if (counters[l.locationInB] % 4 == 2) {
                captionOffsetY = 50;
            } else if (counters[l.locationInB] % 4 == 3) {
                captionOffsetY = 0;
            }

            bA.screenX = bB.screenX + 100 * multiplier;
                bA.screenY = -10;
                bA.screenZ = bB.screenZ;
            }


            //   console.log( bB.screenZ);
        bA.screenZ = 1;
            bB.screenZ = 1;



        drawLine(context, [bA.screenX, bA.screenY], [bB.screenX, bB.screenY], bA.screenZ, bB.screenZ);

        //draw caption
        if (!oB.ObjectVisible && oA.ObjectVisible) {
            var tempFont = context.font;
            var tempFillStyle = context.fillStyle;
            context.font = "25px sans-serif";
            context.fillStyle = "white";
            context.fillText(oB.name + " " + bB.name, getIntersectionPoint(bA.screenX, bA.screenY, bB.screenX, bB.screenY, 20 + captionOffsetY), 20 + captionOffsetY);
            context.font = tempFont;
            context.fillStyle = tempFillStyle;
        }
        if (!oA.ObjectVisible && oB.ObjectVisible) {
            var tempFont = context.font;
            var tempFillStyle = context.fillStyle;
            context.font = "25px sans-serif";
            context.fillStyle = "white";
            context.fillText(oA.name + " " + bA.name, getIntersectionPoint(bA.screenX, bA.screenY, bB.screenX, bB.screenY, 20 + captionOffsetY), 20 + captionOffsetY);
            context.font = tempFont;
            context.fillStyle = tempFillStyle;
        }
    }
    globalCanvas.hasContent = true;
};

function getIntersectionPoint(line1StartX, line1StartY, line1EndX, line1EndY, intersectionY) {
    var x = (intersectionY - line1StartY) * (line1EndX - line1StartX) / (line1EndY - line1StartY) + line1StartX;
    return x;
}
/**********************************************************************************************************************
 **********************************************************************************************************************/

/**
 * @desc
 * @param
 * @param
 * @return
 **/

var drawInteractionLines = function () {

    // this function here needs to be more precise

    if (globalProgram.ObjectA) {

        var oA = objectExp[globalProgram.ObjectA];

        var tempStart = objectExp[globalProgram.ObjectA].objectValues[globalProgram.locationInA];


        // this is for making sure that the line is drawn out of the screen... Don't know why this got lost somewhere down the road.

        if (!oA.ObjectVisible) {
            tempStart.screenX = globalStates.pointerPosition[0];
            tempStart.screenY = -10;
            tempStart.screenZ = 1;
        }


        var thisM = globalStates.height / 500 * 1000;

        tempStart.screenZ = thisM / (tempStart.screenZ);

        if (tempStart.screenZ > 3) {
            tempStart.screenZ = 3;
        }
        if (tempStart.screenZ < 0) {
            tempStart.screenZ = 0;
        }

        tempStart.screenZ = 1;

        drawLine(globalCanvas.context, [tempStart.screenX, tempStart.screenY], [globalStates.pointerPosition[0], globalStates.pointerPosition[1]], tempStart.screenZ, 1);
    }

    if (globalStates.drawDotLine) {
        drawDotLine(globalCanvas.context, [globalStates.drawDotLineX, globalStates.drawDotLineY], [globalStates.pointerPosition[0], globalStates.pointerPosition[1]], 1, 1);
    }

    globalCanvas.hasContent = true;
};

/**********************************************************************************************************************
 **********************************************************************************************************************/

/**
 * @desc
 * @param
 * @param
 * @return
 **/

var drawLine = function (context, lineStartPoint, lineEndPoint, lineStartWeight, lineEndWeight) {

    // calculating all needed values for drawing the line
    var linePointWeight2 = (lineStartWeight * 3 / 4) + (lineEndWeight / 4);
    var linePointWeight3 = (lineStartWeight * 2 / 4) + (lineEndWeight * 2 / 4);
    var linePointWeight4 = (lineStartWeight / 4) + (lineEndWeight * 3 / 4);

    var lineNormAlizer = 10; // find a formula for better representation
    var lineVector = vD(lineEndPoint, lineStartPoint);
    var lineVectorLength = Math.sqrt((lineVector[0] * lineVector[0]) + (lineVector[1] * lineVector[1]));
    var lineVectorNorm = [lineVector[0] / lineVectorLength, lineVector[1] / lineVectorLength];

    var lineArrowVector = vMN(lineVectorNorm, 20);
    var usedVector = vMN(lineVectorNorm, -18);
    var lineArrowVectorN = vMN(vR(lineArrowVector, -90), 34 / 80);
    var lineArrowVectorP = vMN(vR(lineArrowVector, 90), 34 / 80);
    var lineEndBall = vA(lineStartPoint, lineVector);
    var lineEnd = vA(vA(lineStartPoint, lineVector), vMN(lineVectorNorm, lineNormAlizer));
    var lineEnd_ = vA(vA(lineStartPoint, lineVector), vMN(lineVectorNorm, lineNormAlizer - 10));
    var lineEnd4 = vA(vA(lineStartPoint, vMN(lineVector, (1 / 4))), vMN(lineVectorNorm, lineNormAlizer));
    var lineEnd3 = vA(vA(lineStartPoint, vMN(lineVector, (2 / 4))), vMN(lineVectorNorm, lineNormAlizer));
    var lineEnd2 = vA(vA(lineStartPoint, vMN(lineVector, (3 / 4))), vMN(lineVectorNorm, lineNormAlizer));

    // Drawing the line for when the touch point is more then 20 pixels awalineY from the touchdown
    if (lineVectorLength > 20) {
        context.beginPath();
        context.arc(lineEndBall[0], lineEndBall[1], 7.5 * lineEndWeight, 0, Math.PI * 2);
        context.fillStyle = "#f9f90a";
        context.fill();
        context.closePath();

        context.beginPath();
        context.moveTo(vA(lineEnd, vMN(lineArrowVectorP, lineEndWeight))[0], vA(lineEnd, vMN(lineArrowVectorP, lineEndWeight))[1]);
        context.lineTo(lineEnd[0], lineEnd[1]);
        context.lineTo(vA(lineEnd, vMN(lineArrowVectorN, lineEndWeight))[0], vA(lineEnd, vMN(lineArrowVectorN, lineEndWeight))[1]);
        context.lineTo(vA(lineEnd2, vA(usedVector, vMN(lineArrowVectorN, linePointWeight4)))[0], vA(lineEnd2, vA(usedVector, vMN(lineArrowVectorN, linePointWeight4)))[1]);
        context.lineTo(vA(lineEnd2, usedVector)[0], vA(lineEnd2, usedVector)[1]);
        context.lineTo(vA(lineEnd2, vA(usedVector, vMN(lineArrowVectorP, linePointWeight4)))[0], vA(lineEnd2, vA(usedVector, vMN(lineArrowVectorP, linePointWeight4)))[1]);
        context.fillStyle = "#f9f90a";
        context.fill();
        context.closePath();

        context.beginPath();
        context.moveTo(vA(lineEnd2, vA(usedVector, vMN(lineArrowVectorP, linePointWeight4)))[0], vA(lineEnd2, vA(usedVector, vMN(lineArrowVectorP, linePointWeight4)))[1]);
        context.lineTo(lineEnd2[0], lineEnd2[1]);
        context.lineTo(vA(lineEnd2, vA(usedVector, vMN(lineArrowVectorN, linePointWeight4)))[0], vA(lineEnd2, vA(usedVector, vMN(lineArrowVectorN, linePointWeight4)))[1]);
        context.lineTo(vA(lineEnd3, vA(usedVector, vMN(lineArrowVectorN, linePointWeight3)))[0], vA(lineEnd3, vA(usedVector, vMN(lineArrowVectorN, linePointWeight3)))[1]);
        context.lineTo(vA(lineEnd3, usedVector)[0], vA(lineEnd3, usedVector)[1]);
        context.lineTo(vA(lineEnd3, vA(usedVector, vMN(lineArrowVectorP, linePointWeight3)))[0], vA(lineEnd3, vA(usedVector, vMN(lineArrowVectorP, linePointWeight3)))[1]);
        context.fillStyle = "#a3fb5e";
        context.fill();
        context.closePath();

        context.beginPath();
        context.moveTo(vA(lineEnd3, vA(usedVector, vMN(lineArrowVectorP, linePointWeight3)))[0], vA(lineEnd3, vA(usedVector, vMN(lineArrowVectorP, linePointWeight3)))[1]);
        context.lineTo(lineEnd3[0], lineEnd3[1]);
        context.lineTo(vA(lineEnd3, vA(usedVector, vMN(lineArrowVectorN, linePointWeight3)))[0], vA(lineEnd3, vA(usedVector, vMN(lineArrowVectorN, linePointWeight3)))[1]);
        context.lineTo(vA(lineEnd4, vA(usedVector, vMN(lineArrowVectorN, linePointWeight2)))[0], vA(lineEnd4, vA(usedVector, vMN(lineArrowVectorN, linePointWeight2)))[1]);
        context.lineTo(vA(lineEnd4, usedVector)[0], vA(lineEnd4, usedVector)[1]);
        context.lineTo(vA(lineEnd4, vA(usedVector, vMN(lineArrowVectorP, linePointWeight2)))[0], vA(lineEnd4, vA(usedVector, vMN(lineArrowVectorP, linePointWeight2)))[1]);
        context.fillStyle = "#53fdad";
        context.fill();
        context.closePath();

        context.beginPath();
        context.moveTo(vA(lineEnd4, vA(usedVector, vMN(lineArrowVectorP, linePointWeight2)))[0], vA(lineEnd4, vA(usedVector, vMN(lineArrowVectorP, linePointWeight2)))[1]);
        context.lineTo(lineEnd4[0], lineEnd4[1]);
        context.lineTo(vA(lineEnd4, vA(usedVector, vMN(lineArrowVectorN, linePointWeight2)))[0], vA(lineEnd4, vA(usedVector, vMN(lineArrowVectorN, linePointWeight2)))[1]);
        context.lineTo(vA(lineStartPoint, vMN(lineArrowVectorN, lineStartWeight))[0], vA(lineStartPoint, vMN(lineArrowVectorN, lineStartWeight))[1]);
        context.lineTo(lineStartPoint[0], lineStartPoint[1]);
        context.lineTo(vA(lineStartPoint, vMN(lineArrowVectorP, lineStartWeight))[0], vA(lineStartPoint, vMN(lineArrowVectorP, lineStartWeight))[1]);
        context.fillStyle = "#01fffd";
        context.fill();
        context.closePath();

    }
    // Drawing the line for when the touch point is less then 20 pixels awalineY from the touchdown
    else {
        context.beginPath();
        context.moveTo(vA(lineEnd_, vMN(lineArrowVectorP, lineEndWeight))[0], vA(lineEnd_, vMN(lineArrowVectorP, lineEndWeight))[1]);
        context.lineTo(lineEnd_[0], lineEnd_[1]);
        context.lineTo(vA(lineEnd_, vMN(lineArrowVectorN, lineEndWeight))[0], vA(lineEnd_, vMN(lineArrowVectorN, lineEndWeight))[1]);
        context.lineTo(vA(lineStartPoint, vMN(lineArrowVectorN, lineStartWeight))[0], vA(lineStartPoint, vMN(lineArrowVectorN, lineStartWeight))[1]);
        context.lineTo(lineStartPoint[0], lineStartPoint[1]);
        context.lineTo(vA(lineStartPoint, vMN(lineArrowVectorP, lineStartWeight))[0], vA(lineStartPoint, vMN(lineArrowVectorP, lineStartWeight))[1]);
        context.fillStyle = "#00fdff";
        context.fill();
        context.closePath();

        context.beginPath();
        context.arc(lineEndBall[0], lineEndBall[1], 7.5 * lineEndWeight, 0, Math.PI * 2);
        context.fillStyle = "#f9f90a";
        context.fill();
        context.closePath();

    }
    // Drawing the start point in anlineY case
    context.beginPath();
    context.arc(lineStartPoint[0], lineStartPoint[1], 8 * lineStartWeight, 0, Math.PI * 2);
    context.fillStyle = "#00fdff";
    context.fill();
    context.closePath();
};

/**********************************************************************************************************************
 **********************************************************************************************************************/

/**
 * @desc
 * @param
 * @param
 * @return
 **/

var drawDotLine = function (context, lineStartPoint, lineEndPoint, b1, b2) {
    context.beginPath();
    context.moveTo(lineStartPoint[0], lineStartPoint[1]);
    context.lineTo(lineEndPoint[0], lineEndPoint[1]);
    context.setLineDash([7]);
    context.lineWidth = 2;
    context.strokeStyle = "#00fdff";
    context.stroke();
    context.closePath();
};

/**
 * @desc
 * @param
 * @param
 * @return
 **/

var drawGreen = function (context, lineStartPoint, lineEndPoint, radius) {
    context.beginPath();
    context.arc(lineStartPoint[0], lineStartPoint[1], radius, 0, Math.PI * 2);
    context.strokeStyle = "#7bff08";
    context.lineWidth = 2;
    context.setLineDash([7]);
    context.stroke();
    context.closePath();

};

/**
 * @desc
 * @param
 * @param
 * @return
 **/

var drawRed = function (context, lineStartPoint, lineEndPoint, radius) {
    context.beginPath();
    context.arc(lineStartPoint[0], lineStartPoint[1], radius, 0, Math.PI * 2);
    context.strokeStyle = "#ff036a";
    context.lineWidth = 2;
    context.setLineDash([7]);
    context.stroke();
    context.closePath();
};

/**
 * @desc
 * @param
 * @param
 * @return
 **/

var drawBlue = function (context, lineStartPoint, lineEndPoint, radius) {
    context.beginPath();
    context.arc(lineStartPoint[0], lineStartPoint[1], radius, 0, Math.PI * 2);
    context.strokeStyle = "#01fffd";
    context.lineWidth = 2;
    context.setLineDash([7]);
    context.stroke();
    context.closePath();
};

/**
 * @desc
 * @param
 * @param
 * @return
 **/

var drawYellow = function (context, lineStartPoint, lineEndPoint, radius) {
    context.beginPath();
    context.arc(lineStartPoint[0], lineStartPoint[1], radius, 0, Math.PI * 2);
    context.strokeStyle = "#FFFF00";
    context.lineWidth = 2;
    context.setLineDash([7]);
    context.stroke();
    context.closePath();
};

