<template>
  <div class="pagination">
    <el-pagination 
      background 
      layout="prev, pager, next" 
      :total="Number(total)"
      @current-change="currentChangeHandler"
    ></el-pagination>
  </div>
</template>
<script>
export default {
  data() {
    return {
      msg: "123"
    };
  },
  props: {
    total: Number
  },
  created() {
    console.log(this.total);
  },
  methods:{
    currentChangeHandler(val){
      console.log('触发分页事件,当前第几页',val)
      this.$emit('currentPage',val)
    }
  }
};
</script>
<style scoped>
.pagination {
  text-align: center;
}
</style>