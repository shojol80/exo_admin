import isEmpty from '@modules/isEmpty'

export default function (view){
    if (isEmpty(view)) return false
    return '/resources/views/'+view.replace(/\./g,'/')+'.blade.php'
};
