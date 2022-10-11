const Swal = require('sweetalert2')

window.addEventListener('load', function () {

    let editarUser = document.getElementById('editarUser');
    editarUser.addEventListener("click", function () {
        Swal.fire(
            'Editado!',
            'Você editou seus dados',
            'success'
          )
    });


});
