<template>
  <page-header-wrapper>
    <div id="table-container">
      <a-card :bordered="false" class="cardBox">
        <div class="table-title" slot="title">
          <div class="text">记事列表</div>
          <div class="operation">
            <!-- <a-input-search placeholder="请输入查询条件" style="width: 200px" @search="onSearch" /> -->
            <a class="item" @click="addHandle">新建文件</a>
            <a class="item" @click="addHandle">上传图片</a>

            <a class="item" v-if="deletList.length>0">
              <a-button type="danger" :loading="deleteLoading" @click="deletConfirm">确认删除</a-button>
            </a>
            <a-button type="primary" style="margin-left:48px" v-if="checkBool" @click="canceHandle">取消删除</a-button>
            <a-dropdown :trigger="['hover']" overlayClassName="drop" style="cursor: pointer;">
              <div class="item-line">
                <a-icon type="setting" />
                <span>操作</span>
              </div>
              <a-menu slot="overlay">
                <a-menu-item key="1" @click="addHandle">添加</a-menu-item>
                <a-menu-item key="2" @click="deletHandle">删除</a-menu-item>
              </a-menu>
            </a-dropdown>
          </div>
        </div>
        <a-checkbox-group @change="onChange">
          <a-list :grid="{ gutter: 16, column: 4,lg:4,md:3,sm:2 }" :data-source="list" :pagination="pagination">
            <a-list-item slot="renderItem" slot-scope="item">

              <template v-if="item.imgPaths.length>0">
                <a-card class="note-card">
                  <img :src="item.imgPaths[0]" alt @click="linkDetails(item.notepadId)" />
                  <div class="text" @click="linkDetails(item.notepadId)">
                    <div class="title">{{ item.notepadTitle }}</div>
                    <div class="dsc" v-if="item.notepadContent">{{ item.notepadContent }}</div>
                    <div class="date">
                      <span class="doted danger" v-if="item.significance === 1 " />
                      <span class="doted info" v-if="item.significance === 2 " />
                      <span class="doted gray" v-if="item.significance === 3 " />
                      {{ item.createTime }}
                    </div>
                  </div>
                  <div class="check" v-if="checkBool">
                    <a-checkbox :value="item.notepadId" />
                  </div>
                </a-card>
              </template>
              <template v-else>
                <a-card class="note-card no-img">
                  <div class="text" @click="linkDetails(item.notepadId)">
                    <div class="title">{{ item.notepadTitle }}</div>
                    <div class="dsc" v-if="item.notepadContent">{{ item.notepadContent }}</div>
                    <div class="date">
                      <span class="doted danger" v-if="item.significance === 1 " />
                      <span class="doted info" v-if="item.significance === 2 " />
                      <span class="doted gray" v-if="item.significance === 3 " />
                      {{ item.createTime }}
                    </div>
                  </div>
                  <div class="check" v-if="checkBool">
                    <a-checkbox :value="item.notepadId" />
                  </div>
                </a-card>
              </template>

            </a-list-item>
          </a-list>
        </a-checkbox-group>
      </a-card>
    </div>
    <Details ref="Details" @updateList="updateList" @getList="getList" />
    <add ref="Add" @getList="getList"></add>
  </page-header-wrapper>
</template>

<script>
  import {
    getNote,
    deletNoteList
  } from '@/api/note'
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
        query: '',
        list: [],
        pagination: {
          pageSizeOptions: ['10', '20', '30'],
          pageNum: 1,
          pageSize: 10,
          total: 0,
          // hideOnSinglePage: true,
          showQuickJumper: true,
          showSizeChanger: true,
          onChange: page => {
            let pagination = this.pagination
            pagination.pageNum = page
            this.pagination = pagination
            this.getList()
          },
          onShowSizeChange: (current, size) => {
            //  console.log(current, size)
            let pagination = this.pagination
            pagination.pageNum = 1
            pagination.pageSize = size
            this.form = pagination
            this.getList()
          }
        },
        checkBool: false,
        deletList: [],
        deleteLoading: false
      }
    },
    mounted () {
      this.query = this.$route.query

      if (this.$route.query && this.$route.query.add === true) {
        this.$refs.Add.show()
      }
      if (this.$route.query && this.$route.query.id) {
        console.log(this.$route.query.id)
        this.$refs.Details.show(this.$route.query.id)
      }
      this.getList()
    },
    methods: {
      getList () {
        this.checkBool = false
        const {
          pageNum,
          pageSize
        } = this.pagination
        getNote({
          pageNum,
          pageSize
        }).then((res) => {
          let result = res.result
          this.list = res.result.list
          let pagination = this.pagination
          if (result.total > 0) {
            pagination.total = result.total
          } else {
            pagination.total = 0
          }
          this.pagination = pagination
          //  console.log(this.pagination)
        })
      },
      deletConfirm () {
          this.deleteLoading = true
          deletNoteList({ 'notepadIds': this.deletList }).then(res => {
            this.updateList()
            this.deleteLoading = false
            this.deletList = []
          }).catch(() => {
            this.deleteLoading = false
          })
      },
      updateList () {
        let pagination = this.pagination
        pagination.pageNum = 1
        pagination.pageSize = 10
        this.pagination = pagination
        this.$nextTick(() => {
          this.getList()
        })
      },
      addHandle () {
        this.$refs.Add.show()
        this.checkBool = false
      },
      deletHandle () {
        this.checkBool = true
      },
      onChange (e) {
        this.deletList = e
      },
      onSearch () {},
      linkDetails (id) {
        this.$refs.Details.show(id)
      },
      canceHandle () {
        this.deletList = []
        this.checkBool = false
      }
    }
  }
</script>

<style lang="less">
  .note-card {
    border-color: #eeeeee;
    color: #000000;
    border-radius: 24px;
    overflow: hidden;
    cursor: pointer;
    height: 250px;

    .ant-card-body {
      padding: 0;
      height: 100%;
      position: relative;
    }

    .check {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      padding: 20px;
      box-sizing: border-box;
      z-index: 2;
      background: rgba(0, 0, 0, 0.5);

      .ant-checkbox-wrapper {
        width: 100%;
        height: 100%;
        text-align: right;
      }
    }

    img {
      width: 100%;
      height: 100%;
      border-radius: 24px;
    }

    .text {
      padding: 20px;
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      background: #ffffff;
      // border:1px solid #eeeeee;
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
       background: #ffffff;
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
  .ant-checkbox-group{
    width: 100%;
  }
  .cardBox {
    .ant-card-body{
      background: #f7f7f7;
    }
  }
</style>
