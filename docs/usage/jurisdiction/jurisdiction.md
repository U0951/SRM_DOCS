# 常见按钮

页面中经常会出现下图中的按钮，其中常见按钮都存在一些固定的写法和规范，下面将会介绍如何快速高效的添加一个常见的按钮。更多详情可参考[Jurisdiction](../../utils/modules/jurisdiction)

![jurisdiction-image](/usage/jurisdiction-show.jpg)

## 跳转页面

使用to方法，传入跳转页面的路由名称

```ts
import Jurisdiction from '@utils/jurisdiction'

new Jurisdiction('jurisdiction')
  .lib('add').to('Jurisdiction.RouterName')
```

## 删除数据

使用del方法，传入删除数据的接口删除页面的数据

```ts
import Jurisdiction from '@utils/jurisdiction'

new Jurisdiction('jurisdiction')
  .lib('delete').del('/api/deleteApi', process.env.VUE_APP_BASE_DATA_API)
```

## 导出按钮

使用tableExport可以快速的导出表格数据，更多详情可参考[exportAndImport](../../utils/other/exportAndImport)

```ts
import Jurisdiction from '@utils/jurisdiction'
import { tableExport } from '@utils/common/common'

function exportTable(this: any) {
  tableExport({
    name: this.$t('exportFileName'),
    url: '/api/exportApi',
    baseURL: process.env.VUE_APP_BASE_DATA_API,
    data: {}
  })
}

new Jurisdiction('jurisdiction')
  .lib('export').handle(exportTable)
```

## 导入按钮

使用dialogImport方法可以快速生成一个导入弹框，更多详情可参考[exportAndImport](../../utils/other/exportAndImport)

```ts
import Jurisdiction from '@utils/jurisdiction'
import { dialogImport } from '@utils/common/common'

async function importTable(this: any) {
  await dialogImport({
    url: '/api/importApi',
    baseURL: process.env.VUE_APP_BASE_DATA_API,
    downloadUrl: '/api/exportApi',
    downloadBaseURL: process.env.VUE_APP_BASE_DATA_API,
    downloadTip: 'tip text',
    downloadName: 'templateName'
  })
  this.reset()
}

new Jurisdiction('jurisdiction')
  .lib('import').handle(importTable)
```

## 打印按钮

使用tablePrint方法跳转打印页面，更多详情可参考[exportAndImport](../../utils/other/print)

```ts
import Jurisdiction from '@utils/jurisdiction'
import { tablePrint } from '@utils/common/common'

function printTable(this: any) {
  tablePrint({
    url: '/api/printApi';
    baseURL: process.env.VUE_APP_BASE_DATA_API;
    data: {};
  })
}

new Jurisdiction('jurisdiction')
  .lib('print').handle(printTable)
```
