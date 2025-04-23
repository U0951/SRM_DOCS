# 基础

## 基础介绍
- Search        高级搜索
- Operation     列表中的操作按钮
- jurisdiction  整体的操作按钮
- tabs          选项卡
  - name 与选项卡绑定值 value 对应的标识符，表示选项卡别名
  - value 绑定值 value 
  - count 数量
  - prop 传参参数
- Table         表格
- detail        列表的详情

```ts
// tabs

import List from '@utils/list'
const { Search, Table, Operation, Detail, Tabs, Jurisdiction } = List
// import http from '@/plugin/axios'

const tabs = new Tabs()
  .url('/srmCheckApply/getStatusCount', process.env.VUE_APP_PURCHASE_API)
  .default('0')
  .name('checkStatusName')
  .value('checkStatus')
  .count('checkStatusCount')
  .prop('checkStatus')

// const tabs = new Tabs()
//    .api(function() {
//     return http<any[]>({
//       url: '/sysEnum/getEnumByType',
//       baseURL: process.env.VUE_APP_BASE_API,
//       data: { enumMid: 'inquiryStatusName' }
//     }).then(res => {
//       const show = res.map(item => ({ ...item, checkStatusName: `${item.enumName}`, checkStatus: item.enumValue }))
//       show.unshift({ checkStatus: '', checkStatusName: '全部' })
//       return show
//     })
//   })
//   .default('0')
//   .name('checkStatusName')
//   .value('checkStatus')
//   .count('checkStatusCount')
//   .prop('checkStatus')

const jurisdiction = new Jurisdiction('')
  .add('add').handle(() => console.log('add btn click'))

const operation = new Operation('')
  .add('add').handle(() => console.log('add operation btn click'))

const search = new Search('')
  .placeholder('searchPlaceholder')

const table = new Table('')
  .add('addByName').width(160)

const detail = new Detail('')
  .add('1')

export default new List()
  .name('Inquiry.PriceTest')
  .url('/pricingSet/getPricingSetPage', process.env.VUE_APP_PURCHASE_API)
  .tabs(tabs)
  .search(search)
  .detail(detail)
  .jurisdiction(jurisdiction)
  .operation(operation)
  .table(table)
  .end()


```





## 常用组件 op,  select， date or dateTime
- op (枚举下拉框)
  - op('枚举id') 会自动调取后端接口
- select(远程搜索下拉框)
  - 在lib/select文件夹下面配置
  - url 后端接口链接
  - baseURL：接口前缀
  - value：选项的值
  - label： 选项的标签，若不设置则默认与 value 相同
  - 开启多选 .attrs({ multiple: true })
- data 日期选择器 .merge('data')
- dateTime 日期时间选择器 .merge('dataTime')


 ```ts
 import Select from '@utils/common/select/module'

const select = new Select()
  .url('/bmBarRule/getBmBarRuleHeadPage')
  .baseURL(process.env.VUE_APP_BASE_DATA_API)
  .params(() => {
    return { status: '1' }
  })
  .value('barRuleNo')
  .label(option => `${option.barRuleNo}-${option.barRuleName}`)

export default select

 ```

## 新增、修改、删除，某些状态不可操作

this 当前的vm实例 通过 vm.selection 拿到选择的数据数组
```ts
  // 用于 jurisdiction this 当前的vm实例
  // 1. 常用于编辑操作 编辑只允许选中一条
  .disabled(function(this: any) {
    if (this.selection.length !== 1) return true
    const selection = this.selection[0]
    if (selection.status !== '1') return $t('inquiry.priceManage.hint1')
    return false
  })
  // 2. 常用于批量操作
  .disabled(function(selection: any): any {
    if (!selection.length) return true
    if (selection.filter((i: any) => i.sourceStatus === '04' || i.sourceStatus === '02').length) return 'inquiry.findPool.findPoolTips'
    return false
  })

 //用于operation table列表  row 可以拿到当前行的传参
  .show((row) => { return row.inquiryStatus === '01' })

```
## 常见转换数据

- 转换 table 数据
data 参数 包含 index 当前行 value 当前属性值 和row 当前行值
```ts
.format((data) => { console.log(data) })

```

- 转换 详情数据
通过getData 来处理接口的返回值

```ts

async function getData(row: any) {
  const res: any = await getPricingDetail({ id: row.row.id + '' })
  res.isDetail = true
  return res
}

export default new Detail('inquiry.priceManage')
  .title('formTitle.baseInfo')
  .getData(getData)

```


- 转换 修改界面数据
通过getData 来处理接口的返回值

```ts

async function getData(vm: any) {
  const res: any = await getPricingDetail({ id: vm.$route.params.id })
  res.isDetail = vm.$route.query.isDetail || false
  vm.setData(res)
  vm.createForm()
}


export default new Form('inquiry.priceManage')
  .name('Inquiry.PriceAllocation.Modify')
  .dataUrl(getData)

```


- 新增和修改 处理提交值

```ts

export function submit(this: any, data: any) {
  const id = this.$route.params.id
  const status = data.status ? data.status : '0'
  return http({
    url: '/pricingSet/editPricingSet',
    baseURL: process.env.VUE_APP_PURCHASE_API,
    data: { ...data, ...status, id }
  })
}


export default new Form('inquiry.priceAllocation')
  .name('Inquiry.PriceAllocation.Add')
  .dataUrl(getData)
  .url(submit)
```



## 弹窗 和 弹窗上传

普通表单弹窗
```ts
import Dialog from '@utils/common/dialog'
import Form from '@utils/form'
const dForm = new Form('')
 .setSpan(24)
 .add('file')

export const dialog = new Dialog('')
 .title('dialogTitle')
 .dialog({ width: '600px' })
 .form(dForm)

const vm = await dialog.open({ attrs: { row: { }}})
console.log(vm.data)


 await http({
    url: '/pricingSet/updateStatus',
    baseURL: process.env.VUE_APP_PURCHASE_API,
    data: { id: row.id, status: '1' }
 })

```

非自动上传

```ts
import { tableExport } from '@utils/common/common'
import Form from '@utils/form'
import Dialog from '@utils/common/dialog'
import UploadSelect from '@/components/select/upload-select/upload-select.vue'

function onExceed(this: any) {
  this.$message.warning(this.$t('common.onlyOneFileTip'))
}

export const fileNoAttrs = {
  autoUpload: false,
  onChange(this: any, file: any) {
    this.$emit('input', file.raw)
  },
  limit: 1,
  'on-exceed': onExceed
}

export const tip = {
  props: ['value'],
  methods: {
    download(this: any, options: any) {
      const { url, baseURL, data, downloadName } = options
      tableExport({
        url,
        baseURL,
        data,
        name: downloadName
      })
    }
  },
  render(this: any, h: any): any {
    const { url, baseURL, data, downloadTip, downloadName } = this.value || {}
    if (!url) {
      return h('div', { style: 'font-size: 12px;display: flex; align-items: center;' }, [downloadTip || ''])
    }
    const dowmTemplate = () => this.download({ url, baseURL, data, downloadName })
    return h(
      'div',
      { style: 'font-size: 12px;display: flex; align-items: center;' },
      [
        h('el-link', { props: { type: 'primary' }, on: { click: dowmTemplate }}, [this.$t('performance.qualitativescore.download')]),
        downloadTip || ''
      ]
    )
  }
}

const dForm = new Form('performance.qualitativescore')
  .setSpan(24)
  .add('fild').component(UploadSelect).col(24).attrs(fileNoAttrs).required()
  .add('info').label('').component(tip)

export const importDialog = new Dialog('performance.qualitativescore')
  .title('dialogTitle')
  .dialog({ width: '400px' })
  .form(dForm)

// 导入
export async function goodImport(this: any) {
  const query = {
    baseURL: process.env.VUE_APP_PURCHASE_API,
    downloadTip: this.$t('performance.qualitativescore.importTip'), // 提示语
    downloadName: this.$t('common.importTemplate'), // 名称配置
    url: '/inquiry/downloadGoodsTemplate' // 下载模板链接配置
  }
  await importDialog.open({ attrs: { row: { info: query }}}).then(async(vm: any) => {
    const data = vm.data
    console.log(data)
    const formData = new FormData()
    formData.set('file', vm.data.fild)
    // const res = await importGoodsInfoExcel(formData)
    // if (!Array.isArray(res)) { return }
    // console.log(res)
  })
}


```
自动上传


```ts

import Form from '@utils/form'
import Dialog from '@utils/common/dialog'
import UploadSelect from '@/components/select/upload-select/upload-select.vue'
// import { onSuccess, beforeRemove, parse, clickFile } from '../config/fn'
import { downloadFile } from '@/api/common/index'

function onSuccess(this: any, prop = 'file', res: any, file: any, fileList: any[]) {
  const { id: fileId, fileName } = res.data
  file.fileId = fileId
  file.fileName = fileName
  this.data[prop] = fileList.map(({ fileId, fileName }) => ({ fileId, fileName }))
}

function beforeRemove(this: any, prop = 'file', file: any) {
  this.data[prop] = this.data[prop].filter((item: any) => item.fileId !== file.fileId)
}

function parse(this: any, prop = 'file') {
  return this.data[prop] && this.data[prop].map((item: any) => ({ ...item, name: item.fileName }))
}

function clickFile(file: any) {
  downloadFile(process.env.VUE_APP_PURCHASE_API + '/srmNewsFile/downloadSrmNewsFileFileId', { fileId: file.fileId }, file.name)
}

const fileNoAttrs = {
  url: '/srmFile/uploadFile',
  baseURL: process.env.VUE_APP_BASE_API,
  getData: () => ({ fileType: 'inquiry' }), // 上传类型参数设置
  parse() { return parse.call(this, 'file') }, // create生命周期 格式化数据
  onSuccess(res: any, file: any, fileList: any) { onSuccess.call(this, 'file', res, file, fileList) }, // 成功后回调
  beforeRemove(file: any) { return beforeRemove.call(this, 'file', file) }, // 删除后回调
  disabled(vm: any) {
    return vm.data.disabled
  },
  clickFile // 下载文件
}

// 表单
const dForm = new Form('inquiry.enquiry')
  .setSpan(24)
  .add('file').component(UploadSelect).col(24).attrs(fileNoAttrs).required()
// 弹窗
export const fileDialog = new Dialog('inquiry.enquiry')
  .title('dialogTitle')
  .dialog({ width: '600px' })
  .form(dForm)

export async function showImport(this: any) {
  const vm: any = await fileDialog.open({ attrs: { row: { }}}) // vm 接收fileDialog的vm实例
  console.log(vm.data.file) // file 对应dForm 下面的file参数
}


```




