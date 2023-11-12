document.addEventListener("DOMContentLoaded", function() {
    const svg = document.getElementById('svg');
    const form = document.getElementById('addNewResultForm');
    let points = [];

    svg.addEventListener("click", addPoint);

    function addPoint(e) {
        const rect = svg.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        let RValue = parseInt(sessionStorage.getItem('R_field'));
        const point = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        point.setAttribute('cx', x);
        point.setAttribute('cy', y);
        point.setAttribute('r', 3);
        point.setAttribute('fill', 'red');
        svg.appendChild(point);
        points.push(point);
        savePointsToSessionStorage(points);
        let xInput = document.getElementById("addNewResultForm:x_value");
        let yInput = document.getElementById("addNewResultForm:y_value");
        xInput.value = ((x - 400) / (100 / RValue) + (2 * RValue)).toFixed(2);
        yInput.value = ((400 - y) / (100 / RValue) - (2 * RValue)).toFixed(2);
        sessionStorage.setItem("x_field", xInput.value);
        sessionStorage.setItem("y_field", yInput.value);

        const url = '/web3/controller?' + 'x=' + encodeURIComponent(xInput.value) + '&amp;y=' + encodeURIComponent(yInput.value) + '&amp;R=' + encodeURIComponent(RValue);

        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
            if (xhr.status === 200) {
                window.location.href='tablePage.xhtml';
            }
        };
        xhr.open('GET', url, true);
        xhr.send();
    }
    });

    function savePointsToSessionStorage(points) {
        let RValue = parseInt(sessionStorage.getItem('R_field'));
        const savedData = {
        x: points.map(function(point) {
            return parseFloat(((point.getAttribute('cx') - 400) / (100 / RValue) + (2 * RValue)).toFixed(2));
        }),
        y: points.map(function(point) {
            return parseFloat(((400 - point.getAttribute('cy')) / (100 / RValue) - (2 * RValue)).toFixed(2));
        })
        };
        sessionStorage.setItem('graphData', JSON.stringify(savedData));
    }

    function loadPointsFromLocalStorage() {
        const savedData = sessionStorage.getItem('graphData');
        if (savedData) {
            let RValue = parseInt(sessionStorage.getItem('R_field'));
            const parsedData = JSON.parse(savedData);
            const { x, y } = parsedData;
            for (var i = 0; i &lt; length; i++){
                if (!isNaN(R), !isNaN(x[i]),!isNaN(y[i])){
                    const point = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                    point.setAttribute('cx', ((parseFloat(x[i]) - 2 * RValue) * (100 / RValue) + 400).toFixed(0));
                    point.setAttribute('cy', (200 - (100 / RValue) * (parseFloat(y[i]))).toFixed(0));
                    point.setAttribute('r', 3);
                    point.setAttribute('fill', 'red');
                    svg.appendChild(point);
                    points.push(point);
                }
            }
        }
    }