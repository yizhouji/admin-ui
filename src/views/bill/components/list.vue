<template>
  <div class="modal">
    <a-modal v-model="visible" width="400" footer centered destroyOnClose>
      <div slot="title" class="modal-title text-center">备注</div>
      <a-list
        item-layout="horizontal"
        :data-source="noteList"
        :pagination="{showSizeChanger: true, showQuickJumper: true, pageSize: 10, total: 50}"
      >
        <a-list-item slot="renderItem" slot-scope="item">
          <div class="text" style="color:#000000;">{{ item.text }}</div>
          <div
            class="date"
            style="padding-left:30px;color:#666666;font-size:12px;"
          >2020-07-30 12:00:00</div>
        </a-list-item>
      </a-list>
    </a-modal>
  </div>
</template>

<script>
export default {}
</script>

<style>
</style>
