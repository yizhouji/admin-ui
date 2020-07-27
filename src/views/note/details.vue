<template>
  <div class="details">
    <a-modal
      v-model="visible"
      width="734px"
      centered
      destroy-on-close
    >
      <div
        slot="title"
        class="modal-title text-center"
      >
        备注
      </div>
      <div class="form">
        <input type="textarea">
      </div>
    </a-modal>
  </div>
</template>

<script>
export default {
  data () {
    return {
      visible: false
    }
  },
  methods: {
    show () {
      this.visible = true
    }
  }
}
</script>

<style>
</style>
