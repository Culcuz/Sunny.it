document.addEventListener('DOMContentLoaded', function () {
    let checkbox = document.getElementById('darkMode'); //prendo la mia checkboxs

    checkbox.addEventListener('click', function () {
        let darkCCS = document.getElementById('darkCSS');
        let defCCS = document.getElementById('defCSS');
        if (checkbox.checked) {
            darkCCS.disabled = false;
            defCCS.disabled = true;
        } else {
            darkCCS.disabled = true;
            defCCS.disabled = false;
        }
    });
});