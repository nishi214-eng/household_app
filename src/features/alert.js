import Swal from 'sweetalert2'
// sweetAlert2(おしゃれなAlert)を呼び出す関数
export function sweetAlert(genre,text){
    if(genre=="success"){
        Swal.fire({
            text: text,
            icon: 'success',
            confirmButtonText: '閉じる'
        })
    }else{
        Swal.fire({
            text: text,
            icon: 'error',
            confirmButtonText: '閉じる'
        })
    }
}