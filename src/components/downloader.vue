<style lang="scss">
  @import '../scss/icons';
</style>

<template>
  <icon-button
    id="download"
    class="ar-icon ar-icon__xs ar-icon--no-border"
    name="download"
    @click.native="download"/>
</template>

<script>
  import IconButton from './icon-button'
  import { wav2mp3 } from '@/lib/utils'

  export default {
    props: {
      record    : { type: Object },
      filename  : { type: String }
    },
    components: {
      IconButton
    },
    methods: {
      download () {
        if (!this.record.url) {
          return
        }

        let link = document.createElement('a')
        this.$eventBus.$emit('start-encoding')
        new Response(this.record.blob).arrayBuffer().then((buffer) => {
          let mp3 = wav2mp3(buffer)
          this.$eventBus.$emit('stop-encoding')
          link.href = window.URL.createObjectURL(mp3)
          link.download = `${this.filename}.${mp3.type.split('/')[1]}`
          link.click()
        })
      }
    }
  }
</script>
