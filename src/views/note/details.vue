<template>
  <div class="noteAdd">
    <a-modal v-model="visible" width="734px" centered destroy-on-close @ok="handleOk">
      <div slot="title" class="modal-title text-left">
        <a-icon type="snippets" theme="twoTone" twoToneColor="#1890FF" style="margin-right:5px" />记事本详情
      </div>
      <div class="form">
        <a-input
          v-model="notepadTitle"
          placeholder="请输入标题"
          style="border:none;margin-bottom:10px;font-weight:bold;font-size:14px;" />
        <p></p>
        <a-textarea
          v-model="notepadContent "
          placeholder="请输入描述"
          :auto-size="{ minRows: 5, maxRows: 5 }"
          style="border:none;margin-bottom:20px;" />
        <div class="clearfix">
          <a-upload
            list-type="picture-card"
            :file-list="fileList"
            multiple
            @preview="handlePreview"
            :before-upload="beforeUpload"
            @change="handleChange">
            <div v-if="fileList.length < 8">
              <a-icon type="plus" />
              <div class="ant-upload-text">点击上传</div>
            </div>
          </a-upload>
        </div>
      </div>
      <div class="title">
        <a-icon type="snippets" theme="twoTone" twoToneColor="#1890FF" style="margin-right:5px" />选择事件重要级
      </div>
      <a-radio-group v-model="significance" name="radioGroup" :default-value="radio" @change="radioChange">
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
  import {
    getNoteDetails,
    modifyNote
  } from '../../api/note'
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
        edit: true,
        notepadId: '',
        deletePics: [],
        fileListUid: []
      }
    },
    methods: {
      radioChange (e) {
        this.radio = e.target.value
      },
      show (id) {
        this.baseList = []
        this.deletePics = []
        this.notepadId = id
        getNoteDetails(id).then(res => {
          let data = res.result
          let arr = []
          if (data.imgPaths && data.imgPaths.length > 0) {
            let imgPaths = data.imgPaths
            for (let index = 0; index < imgPaths.length; index++) {
              const element = imgPaths[index]
              // eslint-disable-next-line no-useless-escape
              let aaa = element.lastIndexOf('\/')
              let imgId = element.substring(aaa + 1, element.length)
              arr.push({
                uid: imgId,
                name: 'image.png',
                status: 'done',
                url: element,
                from: 1
              })
            }
            data.imgPaths = arr
          }
          this.visible = true
          this.fileList = arr
          this.significance = data.significance
          this.notepadTitle = data.notepadTitle
          this.notepadContent = data.notepadContent
        })
      },
      beforeUpload (file) {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
        if (!isJpgOrPng) {
          this.$message.error('图片格式只能是image/jpeg或者image/png')
        }
        const isLt2M = file.size / 1024 / 1024 < 1
        if (!isLt2M) {
          this.$message.error('图片大小不能超过2m')
        }

        // return isJpgOrPng && isLt2M

        this.fileList = [...this.fileList, file]
        return false
      },
      async handleChange ({
        file,
        fileList
      }) {
        this.fileList = fileList
        if (file.from) {
          this.deletePics.push(file.uid)
        } else {
          if (file.status === 'removed') {
            let index = this.fileListUid.indexOf(file.uid)
            this.fileListUid.splice(index, 1)
            this.baseList.splice(index, 1)
          } else {
            this.fileListUid.push(file.uid)
            let baseList = this.baseList

            let Base64 = await this.getBase64(file)
            let a = ''

            if (Base64.indexOf('data:image/png;base64,') > -1) {
              a = Base64.replace('data:image/png;base64,', '')
              baseList.push(a)
            }
            if (Base64.indexOf('data:image/jpeg;base64,') > -1) {
              a = Base64.replace('data:image/jpeg;base64,', '')
              baseList.push(a)
            }

            this.baseList = baseList
          }
        }
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
        //  console.log('handlePreview:', file)
        if (!file.url && !file.preview) {
          file.preview = await this.getBase64(file.originFileObj)
        }
        //  console.log(file)
        this.previewImage = file.url || file.preview
        this.previewVisible = true
      },
      handleOk () {
        const {
          baseList,
          fileList,
          significance,
          notepadTitle,
          notepadContent,
          notepadId,
          deletePics
        } = this

        let formData = {
          significance,
          notepadTitle,
          notepadId,
          deletePics
        }
        let a = notepadTitle.trim().length > 0 && fileList.length > 0
        let b = notepadTitle.trim().length > 0 && notepadContent.trim().length > 0
        if (a) {
          formData.newAddPics = baseList
        }
        if (b) {
          formData.notepadContent = notepadContent
        }
        if (a || b) {
          //  console.log()
        } else {
          this.$message.error('请输入内容')
          return
        }
        modifyNote(formData).then((res) => {
          this.$message.success('提交成功')
          this.previewImage = ''
          this.fileList = []
          this.baseList = []
          this.significance = 3
          this.notepadTitle = ''
          this.notepadContent = ''
          setTimeout(() => {
            this.visible = false
            this.$emit('getList')
          }, 2000)
        })
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

  // /deep/ .anticon-delete {
  //   display: none
  // }
</style>
