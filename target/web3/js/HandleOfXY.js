function saveXFieldValue(inputText) {
    let fieldXValue = inputText.value;
    sessionStorage.setItem("x_field", fieldXValue);
}


function saveYFieldValue(inputText) {
    let fieldYValue = inputText.value;
    sessionStorage.setItem("y_field", fieldYValue);
}
