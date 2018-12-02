<style lang="scss">
  @import '../scss/icons';
</style>

<template>
  <icon-button name="save" class="ar-icon ar-icon__xs ar-icon--no-border" @click.native="upload"/>
</template>

<script>
  import IconButton from './icon-button'
  import UploaderPropsMixin from '@/mixins/uploader-props'
  import { wav2mp3 } from '@/lib/utils'

  export default {
    mixins: [UploaderPropsMixin],
    props: {
      record: { type: Object }
    },
    components: {
      IconButton
    },
    methods: {
      upload () {
        if (!this.record.url) {
          return
        }

        this.startUpload && this.startUpload()
        this.$eventBus.$emit('start-upload')
        this.$eventBus.$emit('start-encoding')
        new Response(this.record.blob).arrayBuffer().then((buffer) => {
          let mp3 = wav2mp3(buffer)
          let data = new FormData()
          this.$eventBus.$emit('stop-encoding')
          data.append('audio', mp3, `${this.filename}.${mp3.type.split('/')[1]}`)

          let headers = Object.assign(this.headers, {})
          headers['Content-Type'] = `multipart/form-data; boundary=${data._boundary}`

          this.$http.post(this.uploadUrl, data, { headers: headers }).then(resp => {
            this.$eventBus.$emit('end-upload', 'success')
            this.successfulUpload && this.successfulUpload(resp)
          }).catch(error => {
            this.$eventBus.$emit('end-upload', 'fail')
            this.failedUpload && this.failedUpload(error)
          })
        })
      }
    }
  }
</script>
