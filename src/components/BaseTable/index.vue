<template>
  <a-table
    :data-source="list"
    @change="pageChange"
    :loading="tableLoading"
    :pagination="pagination"
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
      list: [],
      pagination: {
        pageSize: 10,
        total: 0,
        current: 1,
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

    getData (dataSource, pageNum, pageSize) {
      if (dataSource) {
        this.dataSource = dataSource
        this.list = dataSource.list
        let pagination = this.pagination
        pagination.total = dataSource.total
        pagination.current = pageNum
        pagination.pageSize = pageSize
        this.pagination = pagination
        this.tableLoading = false
      } else {
        this.dataSource = []
        this.list = []
        let pagination = this.pagination
        pagination.current = 1
        pagination.pageSize = 10
        pagination.total = 0
        this.pagination = pagination
        this.tableLoading = false
      }
    },
    pageChange (e) {
      this.pagination = e
      this.$emit('pageChange', e)
    },
    onSelectChange (selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys
      this.$emit('onSelectChange', selectedRowKeys)
    }
  }
}
</script>

<style></style>
