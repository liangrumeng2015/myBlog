import Vue from 'vue';
import {
  Button,
  Form,
  Input,
  FormItem,
  Message,
  Table,
  TableColumn
} from 'element-ui'

Vue.use(Button).use(Form).use(Input).use(FormItem).use(Table).use(TableColumn)

Vue.prototype.$message = Message
