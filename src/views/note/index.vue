<template>
  <page-header-wrapper>
    <div id="table-container">
      <a-card :bordered="false">
        <div class="table-title" slot="title">
          <div class="text">记事列表</div>
          <div class="operation">
            <a-input-search placeholder="请输入查询条件" style="width: 200px" @search="onSearch" />
            <a class="item">新建文件</a>
            <a class="item">上传图片</a>
            <div class="item-line">
              <a-icon type="setting" />
              <span>操作</span>
            </div>
          </div>
        </div>

        <a-list
          :grid="{ gutter: 16, column: 4,lg:4,md:3,sm:2 }"
          :data-source="list"
          :pagination="{showSizeChanger: true, showQuickJumper: true, pageSize: 8, total: 50}"
        >
          <a-list-item slot="renderItem" slot-scope="item" @click="linkDetails">
            <template v-if="item.img">
              <a-card class="note-card">
                <img :src="item.img" alt />
                <div class="text">
                  <div class="title">{{ item.title }}</div>
                  <div class="dsc" v-if="item.dsc">{{ item.dsc }}</div>
                  <div class="date">
                    <span class="doted danger" v-if="item.type === 1 "></span>
                    <span class="doted info" v-if="item.type === 2 "></span>
                    {{ item.date }}
                  </div>
                </div>
              </a-card>
            </template>
            <template v-else>
              <a-card class="note-card no-img">
                <div class="text">
                  <div class="title">{{ item.title }}</div>
                  <div class="more-text" v-if="item.dsc">{{ item.dsc }}</div>
                  <div class="date">
                    <span class="doted danger" v-if="item.type === 1 "></span>
                    <span class="doted info" v-if="item.type === 2 "></span>
                    {{ item.date }}
                  </div>
                </div>
              </a-card>
            </template>
          </a-list-item>
        </a-list>
      </a-card>
    </div>
    <Details ref="Details" />
  </page-header-wrapper>
</template>

<script>
import Details from './details'
export default {
  name: 'Note',
  components: {
    Details
  },
  data () {
    return {
      list: [
        {
          title: 'Title 1',
          date: '2020-07-15 12:00:00',
          type: 1,
          dsc:
            '哈哈哈哈或或或或或或或或或或或或或或哈哈哈哈或或或或或或或或或或或或或或哈哈哈哈或或或或或或或或或或或或或或哈哈哈哈或或或或或或或或或或或或或或哈哈哈哈或或或或或或或或或或或或或或哈哈哈哈或或或或或或或或或或或或或或哈哈哈哈或或或或或或或或或或或或或或哈哈哈哈或或或或或或或或或或或或或或哈哈哈哈或或或或或或或或或或或或或或哈哈哈哈或或或或或或或或或或或或或或哈哈哈哈或或或或或或或或或或或或或或哈哈哈哈或或或或或或或或或或或或或或哈哈哈哈或或或或或或或或或或或或或或哈哈哈哈或或或或或或或或或或或或或或哈哈哈哈或或或或或或或或或或或或或或哈哈哈哈或或或或或或或或或或或或或或哈哈哈哈或或或或或或或或或或或或或或哈哈哈哈或或或或或或或或或或或或或或哈哈哈哈或或或或或或或或或或或或或或哈哈哈哈或或或或或或或或或或或或或或哈哈哈哈或或或或或或或或或或或或或或哈哈哈哈或或或或或或或或或或或或或或哈哈哈哈或或或或或或或或或或或或或或'
        },
        {
          title: 'Title 2',
          date: '2020-07-15 12:00:00',
          type: 2,
          dsc: '哈哈哈哈或或或或或或或或或或或或或或',
          img: require('../../assets/coupon.png')
        },
        {
          title: 'Title 3',
          date: '2020-07-15 12:00:00',
          img: require('../../assets/coupon.png')
        },
        {
          title: 'Title 4',
          date: '2020-07-15 12:00:00',
          type: '',
          dsc: '哈哈哈哈或或或或或或或或或或或或或或'
        },
        {
          title: 'Title 4',
          date: '2020-07-15 12:00:00',
          type: '',
          dsc: '哈哈哈哈或或或或或或或或或或或或或或'
        },
        {
          title: 'Title 4',
          date: '2020-07-15 12:00:00',
          type: '',
          dsc: '哈哈哈哈或或或或或或或或或或或或或或'
        },
        {
          title: 'Title 4',
          date: '2020-07-15 12:00:00',
          type: '',
          dsc: '哈哈哈哈或或或或或或或或或或或或或或'
        },
        {
          title: 'Title 4',
          date: '2020-07-15 12:00:00',
          type: '',
          dsc: '哈哈哈哈或或或或或或或或或或或或或或'
        },
        {
          title: 'Title 4',
          date: '2020-07-15 12:00:00',
          type: '',
          dsc: '哈哈哈哈或或或或或或或或或或或或或或'
        }
      ]
    }
  },
  methods: {
    onSearch () {},
    linkDetails () {
      this.$refs.Details.show()
    }
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
</style>
