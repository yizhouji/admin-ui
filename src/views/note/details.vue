<template>
  <div class="noteAdd">
    <a-modal v-model="visible" width="734px" centered destroy-on-close footer>
      <div slot="title" class="modal-title text-left">
        <a-icon type="snippets" theme="twoTone" twoToneColor="#1890FF" style="margin-right:5px"/>记事本详情
      </div>
      <div class="form">
        <a-input
          disabled
          v-model="detail.notepadTitle"
          placeholder="请输入标题"
          style="border:none;margin-bottom:10px;font-weight:bold;font-size:14px;"
        />
        <p></p>
        <a-textarea
          disabled
          v-model="detail.notepadContent "
          placeholder="请输入描述"
          :auto-size="{ minRows: 5, maxRows: 5 }"
          style="border:none;margin-bottom:20px;"
        />
        <div class="clearfix" v-if="detail.imgPaths && detail.imgPaths.lenth>0">
          <a-upload
            list-type="picture-card"
            :file-list="detail.imgPaths"
            multiple
            @preview="handlePreview"
          >
            <!-- <div v-if="fileList.length < 8">
              <a-icon type="plus"/>
              <div class="ant-upload-text">点击上传</div>
            </div> -->
          </a-upload>
        </div>
      </div>
      <div class="title">
        <a-icon type="snippets" theme="twoTone" twoToneColor="#1890FF" style="margin-right:5px"/>选择事件重要级
      </div>
      <a-radio-group
        v-model="detail.significance"
        name="radioGroup"
        :default-value="radio"
        @change="radioChange"
        disabled
      >
        <a-radio :value="1" class="radio1">重要</a-radio>
        <a-radio :value="2" class="radio2">二级</a-radio>
        <a-radio :value="3" class="radio3">普通</a-radio>
      </a-radio-group>
      <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
        <img alt="example" style="width: 100%" :src="previewImage">
      </a-modal>
    </a-modal>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { addNote } from '../../api/note'
export default {
  data () {
    return {
      radio: 3,
      visible: false,
      significance: 3,
      notepadTitle: '',
      notepadContent: '',
      previewVisible: false,
      previewImage: '',
      fileList: [],
      baseList: [],
      edit: true
    }
  },
  methods: {
    radioChange (e) {
      this.radio = e.target.value
    },
    show (data) {
      if (data.imgPaths && data.imgPaths.length > 0) {
        let imgPaths = data.imgPaths
        let arr = []
         for (let index = 0; index < imgPaths.length; index++) {
           const element = imgPaths[index]
            arr.push({
              uid: index,
              name: 'image.png',
              status: 'done',
              url: element
            })
         }
         data.imgPaths = arr
      }
      this.visible = true
      this.detail = data
    },
    getBase64 (file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result)
        reader.onerror = error => reject(error)
      })
    },
    handleCancel () {
      this.previewVisible = false
    },
    async handlePreview (file) {
      console.log('handlePreview:', file)
      if (!file.url && !file.preview) {
        file.preview = await this.getBase64(file.originFileObj)
      }
      console.log(file)
      this.previewImage = file.url || file.preview
      this.previewVisible = true
    },
    async handleChange ({ file, fileList }) {
      let baseList = this.baseList
      let Base64 = await this.getBase64(file)
      baseList.push(Base64)
      this.baseList = baseList
      this.fileList = fileList
    }
  }
}
</script>

<style lang="less" scoped>
.form {
  padding: 10px;
  border: 1px solid #eeeeee;
  border-radius: 5px;

  .ant-input:focus {
    box-shadow: none;
  }

  p {
    border-top: 1px solid #eeeeee;
  }
}
.title {
  font-size: 16px;
  color: #000000;
  font-weight: bold;
  padding: 16px 0;
}
.radio1,
ant-radio-wrapper-checked {
  /deep/ .ant-radio-checked .ant-radio-inner {
    border-color: #f2637b;
  }
  /deep/.ant-radio-inner::after {
    background-color: #f2637b;
  }
  /deep/ .ant-radio-checked::after {
    border-color: #f2637b;
  }
}
.radio3,
ant-radio-wrapper-checked {
  /deep/ .ant-radio-checked .ant-radio-inner {
    border-color: #999999;
  }
  /deep/.ant-radio-inner::after {
    background-color: #999999;
  }
  /deep/ .ant-radio-checked::after {
    border-color: #999999;
  }
}
/deep/  .anticon-delete{
 display: none
}
</style>
