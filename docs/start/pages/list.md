# 列表页面
列表页面是当前项目最常见的页面

## 基础列表页面

```ts
import List from '@utils/list'
const { Search, Table } = List

const search = new Search('list.page')
  .placeholder('searchPlaceholder')
  .add('options').op('yesNo').default('N')
  .add('remark')
  .lib('dateTimeRange').label('dateTimeRange').prop(['startOperateDate', 'endOperateDate'])

const table = new Table('list.page')
  .add('options')
  .add('remark').tooltip()
  .add('startOperateDate').width(160)
  .add('endOperateDate').width(160)

export default new List()
  .url('/api/list/getDate', process.env.VUE_APP_SCHEDULE_API)
  .search(search)
  .table(table)
  .end()

```


## 用自定义的请求获取数据

```ts
import List from '@utils/list'
const { Table } = List

const table = new Table('list.page').add('prop')

async function getData(params: any) {
  const info = await http<any>({
    url: '/api/list/getDate',
    baseURL: process.env.VUE_APP_SCHEDULE_API,
    data: params
  })
  return info
}

export default new List()
  .api(getData)
  .table(table)
  .end()

```

## 整体的操作按钮

```ts
import List from '@utils/list'
const { Table, Jurisdiction } = List

const jurisdiction = new Jurisdiction('list.page')
  .add('add').handle(() => console.log('add btn click'))

const table = new Table('list.page').add('prop')

export default new List()
  .url('/api/list/getDate', process.env.VUE_APP_SCHEDULE_API)
  .jurisdiction(jurisdiction)
  .table(table)
  .end()

```

:::tip 提示
详情可参考[Jurisdiction](../../utils/modules/jurisdiction)模块
:::

## 列表中的操作按钮

```ts
import List from '@utils/list'
const { Table, Operation } = List

const operation = new Operation('list.page')
  .add('add').handle(() => console.log('add operation btn click'))

const table = new Table('list.page').add('prop')

export default new List()
  .url('/api/list/getDate', process.env.VUE_APP_SCHEDULE_API)
  .jurisdiction(jurisdiction)
  .table(table)
  .end()

```

## 列表中详情

```ts
import List from '@utils/list'
const { Table, Detail } = List

const detail = new Detail('list.page')
  .add('prop')

const table = new Table('list.page').add('prop').link()

export default new List()
  .url('/api/list/getDate', process.env.VUE_APP_SCHEDULE_API)
  .detail(detail)
  .table(table)
  .end()

```

:::tip 提示
详情可参考[detail](../../utils/modules/detail)模块
:::

## 有tabs页面的表格

```ts
import List from '@utils/list'
const { Table, Tabs } = List

const tabs = new Tabs()
  .url('/srmCheckApply/getStatusCount', process.env.VUE_APP_PURCHASE_API)
  .default('0')
  .name('checkStatusName')
  .value('checkStatus')
  .count('checkStatusCount')
  .prop('checkStatus')

const table = new Table('list.page').add('prop')

export default new List()
  .url('/api/list/getDate', process.env.VUE_APP_SCHEDULE_API)
  .tabs(tabs)
  .table(table)
  .end()

```

:::tip 提示
详情可参考[tabs](../../utils/modules/tabs)模块
:::

## 有额外的搜索条件

```ts
import List from '@utils/list'
const { Table, Search } = List

const extra = new Search('list.page')
  .add('prop')

const search = new Search('list.page')
  .extra(extra)

const table = new Table('list.page').add('prop')

export default new List()
  .url('/api/list/getDate', process.env.VUE_APP_SCHEDULE_API)
  .search(search)
  .table(table)
  .end()

```

:::tip 提示
详情可参考[search](../../utils/modules/search)模块
:::

## 有子表格

```ts
import List from '@utils/list'
import MultipleTable from '@utils/multiple-table'
const { Table } = List

const childTable = new Table('bidmanagementpur.biddingauditlist')
  .add('childProp')

const table = new MultipleTable('bidmanagementpur.biddingauditlist')
  .listProp('list')
  .add('prop')
  .table(childTable)

export default new List()
  .url('/api/list/getDate', process.env.VUE_APP_SCHEDULE_API)
  .table(table)
  .end()

```

:::tip 提示
详情可参考[multipleTable](../../utils/modules/multipleTable)模块
:::

## 自定义表格

```vue
// custom-table.vue
<template>
  <div>custom-table</div>
</template>
```

```ts
// index.ts
import List from '@utils/list'
import CustomTable from './custom-table.vue'
const { Table } = List

const table = new Table('list.page').template(CustomTable)

export default new List()
  .url('/api/list/getDate', process.env.VUE_APP_SCHEDULE_API)
  .table(table)
  .end()

```

:::tip 提示
详情可参考[table](../../utils/modules/table)模块
:::
