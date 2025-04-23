# 打印功能

### 基础用法

```ts
import { tablePrint } from '@utils/common/common'

tablePrint({
  url: '/api/printApi',
  baseURL: process.env.VUE_APP_BASE_DATA_API,
  data: {}
})

```
