(function() {

    var svg = document.getElementById("drawing"),
        countInput = document.getElementById("count"),
        angleInput = document.getElementById("angle"),
        growthInput = document.getElementById("growth"),
        width = window.innerWidth - 250,
        height = window.innerHeight,
        boxHeight = height,
        boxWidth = parseInt(width / height * boxHeight),
        boxLeft = boxWidth / 2 * -1,
        boxTop = boxHeight / 2 * -1,
        angle = 0,
        increase = Math.sqrt(3),
        angleIncr = Math.PI / 6,
        starNo = 0,
        size,
        indx,
        startSize = 50,
        until = 10;

    function resize() {
        svg.setAttribute("width", width);
        svg.setAttribute("height", height);
        svg.setAttribute("viewBox", boxLeft + " " + boxTop + " " + boxWidth + " " + boxHeight);
    }

    function points2String(points) {
        var p, i, a = [];
        for (i = 0; i < points.length; i++) {
            a[i] = points[i][0] + " " + points[i][1];
        }
        return a.join(",");
    }

    function drawPoly(points) {
        var poly = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
        poly.setAttribute("points", points2String(points));
        poly.setAttribute("fill", "transparent");
        poly.setAttribute("stroke", "white");
        poly.setAttribute("stroke-width", "1");
        svg.appendChild(poly);
    }

    function rotate(points, radians) {
        var cos = Math.cos(radians),
            sin = Math.sin(radians),
            pt, x, y,
            i;

        for (i = 0; i < points.length; i++) {
            pt = points[i];
            x = pt[0];
            y = pt[1];
            pt[0] = x * cos - y * sin;
            pt[1] = x * sin + y * cos;
        }
    }

    function drawStar(sideLength, radians) {
        var half = sideLength / 2,
            polyHeight = sideLength * Math.sqrt(3) / 2,
            heightOffset = polyHeight / 3,
            points;
        points = [[0, heightOffset * -2], [half * -1, heightOffset], [half, heightOffset]];
        rotate(points, radians);
        drawPoly(points);
        points = [[0, heightOffset * 2], [half * -1, heightOffset * -1], [half, heightOffset * -1]];
        rotate(points, radians);
        drawPoly(points);
    }

    function drawStars() {
        size = startSize;
        for (starNo = 0; starNo < until; starNo++) {
            drawStar(size, angle);
            size *= increase;
            angle += angleIncr;
        }
    }

     function parseInput() {
         until = eval(countInput.value);
         angleIncr = eval(angleInput.value);
         increase = eval(growthInput.value);
     }
     
    function draw() {
        document.body.removeChild(svg);
        svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.id = "drawing";
        document.body.appendChild(svg);
        parseInput();
        resize();
        drawStars();
    }

    resize();
    drawStars();

     document.getElementById("drawButton").addEventListener("click", draw);
     
}());
