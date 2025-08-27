// VeeValidate v4 uses defineRule instead of extend
// import { defineRule } from 'vee-validate';

export default function () {
    //Cross reference does not work
/*    defineRule('subdomain', (value, [domain]) => {
        if (value) {
            return new Promise(resolve => {
                //validateSubdomain()
                resolve({
                    valid: false,
                    data: ['Not this value']
                })
            })
        }
        return true
    });*/
}
