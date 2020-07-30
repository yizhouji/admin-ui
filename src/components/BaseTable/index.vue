<template>
  <a-table
    :data-source="dataSource.list"
    @change="pageNumChange"
    :loading="tableLoading"
    @showSizeChange="pageSizeChange"
    :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
  >
    <slot />
  </a-table>
</template>

<script>
export default {
  name: 'BaseTable',
  data () {
    return {
      tableLoading: false,
      selectedRowKeys: [],
      columns: [],
      dataSource: [],
      pagination: {
        pageSize: 20,
        total: 0,
        showQuickJumper: true,
        showSizeChanger: true

      }
    }
  },
  mounted () {
    this.$emit('getList')
  },
  methods: {
    loading () {
      this.tableLoading = true
    },
    hideLoading () {
        this.tableLoading = false
    },

    getData (dataSource) {
        if (dataSource && dataSource.list.length > 0) {
            this.dataSource = dataSource
        }

      let pagination = this.pagination
      pagination.total = dataSource.total
      this.pagination = pagination
      this.tableLoading = false
    },
    pageNumChange (e) {
         this.$emit('pageNumChange')
    },
    pageSizeChange (e) {
         this.$emit('pageSizeChange')
    },
    onSelectChange (selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys
      this.$emit('onSelectChange', selectedRowKeys)
    }
  }
}
</script>

<style>
</style>
