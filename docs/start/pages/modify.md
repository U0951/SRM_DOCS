# 修改页面

:::tip 提示
修改页面和新增页面相似，只是多了获取数据的过程，和最后提交的接口和参数不同
:::

## 基础修改页面

```ts
import Form from '@utils/form'

export default new Form('modify.page')
  .dataUrl('/api/modify/getModifyData', process.env.VUE_APP_PURCHASE_API)
  .url('/api/modify/modifyItem', process.env.VUE_APP_PURCHASE_API)
  .title('formTitle.baseInfo')
  .add('prop')
  .end()

```

## 自定义获取数据接口

```ts
import Form from '@utils/form'
import http from '@plugin/axios'

async function getData(vm: any) {
  const data: any = await http({
    url: '/api/modify/getModifyData',
    baseURL: process.env.VUE_APP_PURCHASE_API,
    data: { id: vm.$route.params.id }
  })
  vm.setData(data) // 也可以直接赋值 vm.data = data
  vm.createForm()
}

export default new Form('modify.page')
  .dataUrl(getData)
  .url('/api/modify/modifyItem', process.env.VUE_APP_PURCHASE_API)
  .title('formTitle.baseInfo')
  .add('prop')
  .end()

```
