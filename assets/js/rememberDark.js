let checkbox = document.getElementById('darkMode'); //prendo la mia checkbox
let state = false;

//ad ogni click ottengo lo stato della checkbox e lo salvo nel local storage assieme alla data
checkbox.addEventListener('click', function () {
    //console.log('SPUNTA:' + checkbox.checked);
    state = checkbox.checked;
    const obj = {
        darkMode: state,
        date: new Date().getTime() / (1000 * 60 * 60 * 24),
    }
    //localStorage.setItem("mode" + itemN, JSON.stringify(obj));
    localStorage.setItem("mode", JSON.stringify(obj));
});

//al caricamento della pagina recupero l'ulitmo oggetto del local storage

document.addEventListener('DOMContentLoaded', function () {
    let retrievedObject = localStorage.getItem('mode');

    //pars ultimo oggetto, se darkMode = true cambio css
    let obj = JSON.parse(retrievedObject);

    let darkCCS = document.getElementById('darkCSS');
    let defCSS = document.getElementById('defCSS');
    if (obj != null) {
        if (obj.darkMode) {
            darkCCS.disabled = false;
            defCSS.disabled = true;
            checkbox.checked = true;
        } else {
            darkCSS.disabled = true;
            defCSS.disabled = false;

        }
    }
});


