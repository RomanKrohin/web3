document.addEventListener("DOMContentLoaded", function() {
    let xInput = document.getElementById("addNewResultForm:x_value");
    let yInput = document.getElementById("addNewResultForm:y_value");

    window.addEventListener('load', restoreFieldValues());

    function restoreFieldValues() {
            let selectMenu = document.getElementById("addNewResultForm:r_value");
            const savedXField = sessionStorage.getItem('x_field');
            const savedYField = sessionStorage.getItem('y_field');
            const savedRField = sessionStorage.getItem('R_field');
            if (savedXField) {
                xInput.value = parseFloat(savedXField).toFixed(2);
            }
        
            if (savedYField) {
                yInput.value = parseFloat(savedYField).toFixed(2);
            }
            if (savedRField) {
                selectMenu.value = parseInt(savedRField);
            }

            document.getElementById('data-dynamic-rx').textContent = +savedRField/2;
            document.getElementById('data-dynamic-rxx').textContent = +savedRField;
            document.getElementById('data-dynamic-r-x').textContent = -savedRField/2;
            document.getElementById('data-dynamic-r-xx').textContent = -savedRField;
            document.getElementById('data-dynamic-ry').textContent = +savedRField/2;
            document.getElementById('data-dynamic-ryy').textContent = +savedRField;
            document.getElementById('data-dynamic-r-y').textContent = -savedRField/2;
            document.getElementById('data-dynamic-r-yy').textContent = -savedRField;

            loadPointsFromLocalStorage();
    }
});