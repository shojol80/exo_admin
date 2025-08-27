import TextCodeEditAside from '@/components/dialogs/TextCodeEditAside'

export default {
    methods: {
        async editCodeAside({disk, selectedFile}) {
            // get file for edit
            let data = await this.$store.dispatch('fm/getFile', {
                disk: disk,
                path: selectedFile.path,
            })

            await this.$dialogs.show(TextCodeEditAside, {
                value: data,
                filename: selectedFile.basename,
                onSave: async function (content) {
                    const formData = new FormData();
                    // add disk name
                    formData.append('disk', disk);
                    // add path
                    formData.append('path', selectedFile.dirname);
                    // add updated file
                    formData.append('file', new Blob([content]), selectedFile.basename);
                    await this.$store.dispatch('fm/updateFile', formData)
                }
            })
        },
    }
}
