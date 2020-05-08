<template>
  <div>
    <quillEditor
      style="height:200px;margin-bottom:60px"
      v-model="content"
      ref="myQuillEditor"
      :options="editorOption"
      @blur="onEditorBlur($event)"
      @focus="onEditorFocus($event)"
      @change="onEditorChange($event)"
    />
    <!-- <el-button type="primary" @click="onEditorChange">保存</el-button> -->
    <el-button type="primary" @click="onCancel">清空</el-button>
  </div>
</template>
<script>
import { quillEditor } from "vue-quill-editor";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
export default {
  data() {
    return {
      msg: "",
      content: "",
      editorOption: {}
    };
  },
  components: {
    quillEditor
  },
  mounted() {
    console.log(this.content);
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill;
    }
  },
  methods: {
    onEditorReady(editor) {
      console.log("onEditorReady", this.content);
    },
    onEditorBlur() {
      // 失去焦点事件
      console.log("onEditorBlur", this.content);
    },
    onEditorFocus() {
      // 获得焦点事件
      console.log("onEditorFocus", this.content);
    },
    onEditorChange() {
      // 内容改变事件
      console.log("onEditorChange", this.content);
      this.$emit('editorContent',this.content)
    },
    // 取消
    onCancel(){
        this.content = ''
    }
  }
};
</script>