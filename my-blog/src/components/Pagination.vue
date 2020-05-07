<template>
  <div class="pagination">
    <el-pagination background layout="prev, pager, next" :total = total></el-pagination>
  </div>
</template>
<script>
export default {
  data() {
    return {
      msg: "123",
    };
  },
  props:{
      total:Number
  },
  created(){
      console.log(this.total)
  }
};
</script>
<style scoped>
.pagination{
    text-align: center;
}
</style>