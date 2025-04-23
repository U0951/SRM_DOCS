# 导入和导出方法

## 导出

使用exportTable方法可以快速导出文件

### 基础用法

```ts
import { tableExport } from '@utils/common/common'

tableExport({
    url: '/api/exportApi',
    baseURL: process.env.VUE_APP_BASE_DATA_API,
    data: {}
  })

```

### 固定的下载文件名称

```ts
import { tableExport } from '@utils/common/common'

tableExport({
  name: 'fileName',
  url: '/api/exportApi',
  baseURL: process.env.VUE_APP_BASE_DATA_API,
  data: {}
})

```

:::tip 提示
如果`name`中没有`.`会加上时间戳使用默认后缀。如果默认后缀无效，请加上`suffix`参数。如果想使用固定的名称和后缀不做任何处理，请使用`fileName`参数
:::


## 导入

### 基础用法

```ts
import { tableImport } from '@utils/common/common'

tableImport({
  url: '/api/importApi',
  baseURL: process.env.VUE_APP_BASE_DATA_API,
  data: new FormData()
})

```

### 弹窗和默认模板的导入

```ts
import { dialogImport } from '@utils/common/common'

dialogImport({
  url: '/api/importApi',
  baseURL: process.env.VUE_APP_BASE_DATA_API,
  data: {},
  fileKey: 'file',
  downloadUrl: '/api/exportApi',
  downloadBaseURL: process.env.VUE_APP_BASE_DATA_API,
  downloadData: {},
  downloadTip: 'tip',
  downloadName: 'fildName'
})

```

:::tip 提示
只有`url`是必填参数，其余参数选填
:::
