import Swal from "sweetalert2";

export function createSwal(icon,title,color) {
    Swal.fire({
        "title":title,
        "icon":icon,
        "confirmButtonColor":color
    })
}