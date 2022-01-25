import Swal from "sweetalert2";

export default function customConfirm(
    onConfirm: any,
    title: string = 'Are you sure?',
    confirmButtonText: string = "Delete"
) {
    Swal.fire({
        title,
        confirmButtonText,
        icon: 'warning',
        showCancelButton: true,
        cancelButtonColor: 'red',
        confirmButtonColor: 'blue'
    }).then(res => {
        if (res.isConfirmed) onConfirm();
    })
}