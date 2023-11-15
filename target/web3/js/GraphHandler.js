
const svg = document.getElementById('svg');
const error = document.getElementById('error_div');
const form = document.getElementById('addNewResultForm');
let points = [];
let R;

function handleSelectOneMenuChange(selectOneMenu) {
    R = parseInt(selectOneMenu.value);
    sessionStorage.setItem('R_field', R);

    document.getElementById('data-dynamic-rx').textContent = +R/2;
    document.getElementById('data-dynamic-rxx').textContent = +R;
    document.getElementById('data-dynamic-r-x').textContent = -R/2;
    document.getElementById('data-dynamic-r-xx').textContent = -R;
    document.getElementById('data-dynamic-ry').textContent = +R/2;
    document.getElementById('data-dynamic-ryy').textContent = +R;
    document.getElementById('data-dynamic-r-y').textContent = -R/2;
    document.getElementById('data-dynamic-r-yy').textContent = -R;

    const pointsSVG = document.querySelectorAll('#svg circle');
    pointsSVG.forEach(function(point) {
        point.parentNode.removeChild(point);
    });
    const savedData = sessionStorage.getItem('graphData');
    if (savedData) {
    const parsedData = JSON.parse(savedData);
    const { x, y } = parsedData;
    points=[];
    for (let i = 0; i < x.length; i++) {
        const point = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        console.log(R);
        console.log(((parseFloat(x[i]) - 2 * R) * (100 / R) + 400).toFixed(0));
        console.log((200 - (100 / R) * (parseFloat(y[i]))).toFixed(0));
        point.setAttribute('cx', ((parseFloat(x[i]) - 2 * R) * (100 / R) + 400).toFixed(0));
        point.setAttribute('cy', (200 - (100 / R) * (parseFloat(y[i]))).toFixed(0));
        point.setAttribute('r', 3);
        point.setAttribute('fill', 'red');
        if (areaCheck(parseFloat(x[i]), parseFloat(y[i]), R)){
            point.setAttribute('fill', 'green');
        }
        svg.appendChild(point);
        points.push(point);
    }
    }
}

function handleButtonClick(){
    error.innerHTML = '';
    const x = sessionStorage.getItem('x_field');
    const y = sessionStorage.getItem('y_field');
    const R = sessionStorage.getItem('R_field');

    const point = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    point.setAttribute('cx', ((x - 2 * R) * (100 / R) + 400).toFixed(0));
    point.setAttribute('cy', (200 - (100 / R) * (y)).toFixed(0));
    point.setAttribute('r', 3);
    point.setAttribute('fill', 'red');
    if (areaCheck(x, y, R)){
        point.setAttribute('fill', 'green');
    }
    svg.appendChild(point);
    points.push(point);

    savePointsToSessionStorage(points);

    if (validation(parseFloat(x), parseFloat(y))){
        remoteCommand();
    }
}

svg.addEventListener("click", addPoint);

function addPoint(e) {
    error.innerHTML = '';
    const rect = svg.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    let RValue = parseInt(sessionStorage.getItem('R_field'));
    const point = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    point.setAttribute('cx', x);
    point.setAttribute('cy', y);
    point.setAttribute('r', 3);
    point.setAttribute('fill', 'red');
    if (areaCheck(((x - 400) / (100 / RValue) + (2 * RValue)).toFixed(2), ((400 - y) / (100 / RValue) - (2 * RValue)).toFixed(2), RValue)){
        point.setAttribute('fill', 'green');
    }
    svg.appendChild(point);
    points.push(point);
    savePointsToSessionStorage(points);
    let xInput = document.getElementById("addNewResultForm:x_value");
    let yInput = document.getElementById("addNewResultForm:y_value");
    xInput.value = ((x - 400) / (100 / RValue) + (2 * RValue)).toFixed(2);
    yInput.value = ((400 - y) / (100 / RValue) - (2 * RValue)).toFixed(2);
    sessionStorage.setItem("x_field", xInput.value);
    sessionStorage.setItem("y_field", yInput.value);

    callRemoteCommand();
}

function callRemoteCommand(){
    remoteCommand();
}

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
        for (var i = 0; i < x.length; i++){
            if (!isNaN(R), !isNaN(x[i]),!isNaN(y[i])){
                const point = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                point.setAttribute('cx', ((parseFloat(x[i]) - 2 * RValue) * (100 / RValue) + 400).toFixed(0));
                point.setAttribute('cy', (200 - (100 / RValue) * (parseFloat(y[i]))).toFixed(0));
                point.setAttribute('r', 3);
                point.setAttribute('fill', 'red');
                if (areaCheck(parseFloat(x[i]), parseFloat(y[i]), RValue)){
                    point.setAttribute('fill', 'green');
                }
                svg.appendChild(point);
                points.push(point);
            }
        }
    }
}

function areaCheck(x, y, r){
    if (x>=0 && y>=0 && x<=r/2 && y<=r){
        return true;
    }
    if (x<=0 && y<=0 && x>=-r && y>=x-r){
        return true;
    }
    if (x<=0 && y>=0 && Math.sqrt(x*x+y*y)<=r){
        return true;
    }
    return false;
}

function validation(x, y){
    if (!(x>-3)){
        error.textContent = "x need be >-3";
        return false;
    }
    if (!(y>-5)){
        error.textContent = "y need be >-5";
        return false;
    }
    if (!(x<5)){
        error.textContent = "x need be <5";
        return false;
    }
    if (!(y<5)){
        error.textContent = "y need be <5";
        return false;
    }
    return true;
}