<template>
  <page-header-wrapper>
    <div id="table-container">
      <a-card :bordered="false">
        <div class="table-title" slot="title">
          <div class="text">记事列表</div>
          <div class="operation">
            <a-input-search placeholder="请输入查询条件" style="width: 200px" @search="onSearch" />
            <a class="item" @click="addHandel">新建文件</a>
            <a class="item">上传图片</a>

            <a-dropdown :trigger="['click']" overlayClassName="drop">
              <div class="item-line">
                <a-icon type="setting" />
                <span>操作</span>
              </div>
              <a-menu slot="overlay" @click="onClick">
                <a-menu-item key="1" @click="addHandel">添加</a-menu-item>
                <a-menu-item key="2">删除</a-menu-item>
              </a-menu>
            </a-dropdown>
          </div>
        </div>

        <a-list
          :grid="{ gutter: 16, column: 4,lg:4,md:3,sm:2 }"
          :data-source="list"
          :pagination="pagination"
        >
          <a-list-item slot="renderItem" slot-scope="item" @click="linkDetails(item)">
            <template v-if="item.imgPaths.length>0">
              <a-card class="note-card">
                <img :src="item.imgPaths[0]" alt />
                <div class="text">
                  <div class="title">{{ item.notepadTitle }}</div>
                  <div class="dsc" v-if="item.notepadContent">{{ item.notepadContent }}</div>
                  <div class="date">
                    <span class="doted danger" v-if="item.significance === 1 " />
                    <span class="doted info" v-if="item.significance === 2 " />
                    <span class="doted gray" v-if="item.significance === 3 " />
                    {{ item.createTime }}
                  </div>
                </div>
              </a-card>
            </template>
            <template v-else>
              <a-card class="note-card no-img">
                <div class="text">
                  <div class="title">{{ item.notepadTitle }}</div>
                  <div class="dsc" v-if="item.notepadContent">{{ item.notepadContent }}</div>
                  <div class="date">
                    <span class="doted danger" v-if="item.significance === 1 " />
                    <span class="doted info" v-if="item.significance === 2 " />
                    <span class="doted gray" v-if="item.significance === 3 " />
                    {{ item.createTime }}
                  </div>
                </div>
              </a-card>
            </template>
          </a-list-item>
        </a-list>
      </a-card>
    </div>
    <Details ref="Details" />
    <add ref="Add" @getList="getList"></add>
  </page-header-wrapper>
</template>

<script>
import { getNote } from '@/api/note'
import Details from './details'
import add from './add'

export default {
  name: 'Note',
  components: {
    Details,
    add
  },
  data () {
    return {
      result: {},

      list: [],
      pagination: {
        pageSizeOptions: ['10', '20', '30'],
        pageNum: 1,
        pageSize: 10,
        total: 0,
        showQuickJumper: true,
        showSizeChanger: true,
        onChange: page => {
          let pagination = this.pagination
          pagination.pageNum = page
          this.pagination = pagination
          this.getList()
        },
        onShowSizeChange: (current, size) => {
          console.log(current, size)
          let pagination = this.pagination
          pagination.pageNum = 1
          pagination.pageSize = size
          this.form = pagination
          this.getList()
        }
      }
    }
  },
  mounted () {
    this.getList()
  },
  methods: {
    getList () {
      const { pageNum, pageSize } = this.pagination
      getNote({ pageNum, pageSize }).then((res) => {
        let result = res.result
        this.list = res.result.list
        let pagination = this.pagination
        if (result.total > 0) {
          pagination.total = result.total
        } else {
          pagination.total = 0
        }
        this.pagination = pagination
        console.log(this.pagination)
      })
    },
    addHandel () {
      this.$refs.Add.show()
    },
    onSearch () {},
    linkDetails (item) {
      this.$refs.Details.show(item)
    },
    onClick () {}
  }
}
</script>

<style lang="less">
.note-card {
  background: #eeeeee;
  color: #000000;
  border-radius: 24px;
  overflow: hidden;
  height: 250px;
  .ant-card-body {
    padding: 0;
    height: 100%;
    position: relative;
  }

  img {
    width: 100%;
    height: 100%;
  }
  .text {
    padding: 20px;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: #eeeeee;
    z-index: 2;
    .title {
      color: #262626;
      font-size: 16px;
      font-weight: bold;
      margin-bottom: 5px;
    }
    .dsc {
      color: #666666;
      font-size: 14px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      word-break: break-all;
      line-height: 20px;
      margin-bottom: 5px;
    }
    .date {
      color: #666666;
      font-size: 14px;
      display: flex;
      align-items: center;
    }
  }
}
.no-img {
  .text {
    top: 0;
    .more-text {
      color: #666666;
      font-size: 14px;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 5;
      overflow: hidden;
    }
    .date {
      padding: 20px;
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      color: #666666;
      font-size: 14px;
      z-index: 3;
    }
  }
}
.doted {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 4px;
  margin-right: 5px;
}
.info {
  background: #3ba0ff;
}
.danger {
  background: #f2637b;
}
.gray {
  background: #999999;
}
.drop {
  li {
    padding: 5px 20px;
  }
}
</style>
