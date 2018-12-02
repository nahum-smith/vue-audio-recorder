<style lang="scss">
  @import '../scss/icons';
</style>

<template>
  <icon-button name="save" class="ar-icon ar-icon__xs ar-icon--no-border" @click.native="upload"/>
</template>

<script>
  import IconButton from './icon-button'
  import UploaderPropsMixin from '@/mixins/uploader-props'

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

        let blob = this.record.blob

        this.$eventBus.$emit('start-upload')

        this.startUpload && this.startUpload()

        if (this.blobHandler) {
          blob = this.blobHandler(blob)
        }

        let data = new FormData()
        data.append('audio', blob, this.filename)

        let headers = Object.assign(this.headers, {})
        headers['Content-Type'] = `multipart/form-data; boundary=${data._boundary}`

        this.$http.post(this.uploadUrl, data, { headers: headers }).then(resp => {
          this.$eventBus.$emit('end-upload', 'success')
          this.successfulUpload && this.successfulUpload(resp)
        }).catch(error => {
          this.$eventBus.$emit('end-upload', 'fail')
          this.failedUpload && this.failedUpload(error)
        })
      }
    }
  }
</script>
