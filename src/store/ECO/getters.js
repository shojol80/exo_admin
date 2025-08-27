const fqtToArray= (state)=>{
    let fqt = state.forms && state.forms.fqt
    let fqt_array = []
    for (const item in fqt) {
        if (fqt.hasOwnProperty(item)) {
            fqt_array.push(fqt[item])
        }
    }
    return fqt_array
};
export default {
    define(state) {
        return state.define
    },
    fqtArray(state) {
        return fqtToArray(state)
    },
    fqtArrayId(state) {
        let fqt = state.forms && state.forms.fqt
        let fqt_array = []
        for (const item in fqt) {
            if (fqt.hasOwnProperty(item)) {
                fqt_array[+fqt[item].fqt_id] = fqt[item]
            }
        }
        return fqt_array
    },
    getFqtById: state => fqt_id =>{
        return fqtToArray(state).find(item => {
            return +item.fqt_id === +fqt_id
        })
    }
};
