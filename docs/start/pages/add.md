# 新增页面

## 基础新增页面

```ts
import Form from '@utils/form'

export default new Form('add.page')
  .url('/api/add/addItem', process.env.VUE_APP_PURCHASE_API)
  .title('formTitle.baseInfo')
  .add('prop')
  .end()

```

## 多组新增页面

```ts
import Form from '@utils/form'

export default new Form('add.page')
  .url('/api/add/addItem', process.env.VUE_APP_PURCHASE_API)
  .title('formTitle.baseInfo')
  .add('prop')
  .addGroup('groupTitle')
  .add('prop2')
  .end()

```

## 自定义提交接口

```ts
import Form from '@utils/form'
import http from '@plugin/axios'

function submit(this: any, data: any) {
  const id = this.$route.params.id
  return http({
    url: '/api/add/addItem',
    baseURL: process.env.VUE_APP_PURCHASE_API,
    data: { ...data, id },
    loading: true
  })
}

export default new Form('add.page')
  .url(submit)
  .title('formTitle.baseInfo')
  .add('prop')
  .end()

```

## 表格组件新增

```ts
import Form from '@utils/form'
import TableSelect from '@utils/table-select'
import Table from '@utils/table'
import Operation from '@utils/common/operation'

function remove(this: any, row: any, index: number) {
  const value = [...this.value]
  value.splice(index, 1)
  this.$emit('input', value)
}

const operation = new Operation()
  .add('remove').label('common.remove').handle(remove)

const dialogTable = new Table('admittance.process')
  .sortable(false)
  .add('prop')

const tableSelect = new TableSelect('add.page')
  .type('page')
  .url('/api/add/getTableData', process.env.VUE_APP_PURCHASE_API)
  .title('tableTitle')
  .dialogTitle('tableDialogTitle')
  .table(dialogTable)
  .operation(operation)
  .dialogTable(dialogTable)

export default new Form('add.page')
  .url('/api/add/addItem', process.env.VUE_APP_PURCHASE_API)
  .title('formTitle.baseInfo')
  .add('prop')
  .table('list', tableSelect).listRequired()
  .end()

```

## 自定义表单组件

```vue
// custom-item.vue
<template>
  <el-input v-bind="$attrs" class="custom-item" v-on="$listeners" />
</template>
```

```ts
// add.ts
import Form from '@utils/form'
import CustomItem from './custom-table.vue'

export default new Form('add.page')
  .url('/api/add/addItem', process.env.VUE_APP_PURCHASE_API)
  .title('formTitle.baseInfo')
  .add('prop').component(CustomItem)
  .end()

```

:::tip 提示
详情可参考[Form](../../utils/pages/form)页面
:::

## 复杂表单页面常用
 - **新增界面 如何对属性值进行赋值操作** 
 1. from提供  formLoaded（完成自定义加载后的回调） created等
 ```ts
 class ExtendForm extends Form {
  async formLoaded(vm: any) {
    const { name, mobile, email } = vm.$store.getters.userInfo
    vm.data.contactName = name
    vm.data.contactPhone = mobile
    vm.data.contactEmail = email
  }

  async created(vm: any) {
  }

  export default new ExtendForm('')
  .url('')
  .title('')
  .add()
```

 - **替换全部按钮事件名称** 
 ```ts
 export const btns = [
  { type: 'primary', text: 'common.confirmPublish', handle(this: any) { publish(this) } },
  { type: 'success', text: 'common.draft', handle(this: any) { publish(this) } },
  { type: 'default', text: 'common.cancel', handle(this: any) { this.$router.back() } }
]
export default new Form('')
  .btns(btns)
  .end()
```

 - **components** 
 1. 使用element 组件 列如单选框组(使用render or template )

```ts
const cell = {
  props: ['value'],
  render(h) {
    return h(
      'el-radio-group',
      { props: { value: this.value }, on: { input: val => this.$emit('input', val) }},
      [
        h('el-radio', { props: { label: 'type1' }}, ['紧急']),
        h('el-radio', { props: { label: 'type2' }}, ['一般'])
        h('el-radio', { props: { label: 'type3' }}, ['重要'])
      ]
    )
  }
}
const dateAttrs = { arrowControl: true, valueFormat: 'HH:mm:ss' }
const form = new Form('')
  .add('').component(cell)
  .add('').component('el-time-picker').attrs(Attrs)
// attrs 传递element组件对应的参数
```
2.使用自定义组件

组件内可以拿到 data( form表单所有属性值 ) value (当前属性值)  $page （当前页面vm实例）

（1） 可以直接使用 v-model 绑定 data.属性 进行更新属性值
（2） 也可通过 $emit('input') 更新属性值

```ts
  inject: {
    $page: {
      default: () => ({})
    }
  },
  props: {
    value: {
      type: String,
      default: ''
    },
    data: {
      type: Object,
      default: () => ({})
    }
  },

```

 - **弹窗（Dialog）** 

 (1)接收弹窗属性值
    通过vm.data 取值

 (2) 通过 attrs {row： {file: []} }可以传递属性值

 1. 普通表单弹窗

 ```ts
import Dialog from '@utils/common/dialog'
import Form from '@utils/form'
const dForm = new Form('')
  .setSpan(24)
  .add('file')`

const dialog = new Dialog('')
  .title('dialogTitle')
  .dialog({ width: '600px' })
  .form(dForm)

 const vm = await dialog.open({ attrs: { row: { }}})

 vm.data

 ```
 2. table列表弹窗

  ```vue
<template>
  <div class="return-receiving">
    <el-scrollbar ref="scroller" class="return-receiving-scroller">
      <dialog-table ref="dialog" :table-select="$tableSelect" :data="data" />
    </el-scrollbar>
  </div>
</template>

<script>
import DialogTable from '@utils/table-select/components/dialog-table'
import TableSelect from '@utils/table-select'
import Table from '@utils/table'

const table = new Table('inquiry.srmInqury.selectGoodstDialog')
  .sortable(false)
  .add('itemNo')
  .add('itemName')
  .add('itemSpec')
  .add('groupNo')
  .add('groupName')
  .add('unitNo')
const $tableSelect = new TableSelect()
  .type('page')
  .url('/bmItem/getBmItemPage', process.env.VUE_APP_PURCHASE_API)
  .dialogTable(table)

export default {
  components: {
    DialogTable
  },
  props: {
    data: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      selection: []
    }
  },
  computed: {
    $tableSelect() {
      return $tableSelect
    }
  },
  mounted() {
    this.$refs.dialog.open()
  },
  methods: {
    validate() {
      this.selection = this.$refs.dialog.selection
      if (!this.selection.length) {
        this.$message({ message: this.$t('deliverypurchase.deliverytrack.needSelection'), type: 'warning' })
      }
      return this.selection.length
    }
  }
}
</script>


 ```

 ``` ts
 const dialogGood = new Dialog('inquiry.srmInqury.selectGoodstDialog')
  .title('dialogTitle')
  .component(good)
  .validate(async(vm) => {
    const valid = await vm.validate()
    return valid
  })

  const vm = await dialogGood.open({ attrs: { }})
      const selection = vm.selection
 ```

 3. table选择列表弹窗

  ``` ts

  .table('goodsList', goodsList)
  参考路径
  http://localhost:8080/purchaser/inquiry/enquiry/add
  ```




