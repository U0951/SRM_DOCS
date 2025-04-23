# Table
Table是生成表格的构造函数，大部分表格都可以通过使用Table来编写

## 表格滚动相关的方法

- **fixedTop** 表格头固定时距离顶部的高度，默认是50：

```ts
import Table from '@/utils/table'

const table = new Table('authority.office').fixedTop(50)

```

- **scroller** 表格头固定时滚动容器，默认是window：

```ts
import Table from '@/utils/table'

const table = new Table('authority.office').scroller(window)

```

## 表格通用相关的方法

- **edit** 表格是否可以编辑，默认不可编辑：

```ts
import Table from '@/utils/table'

const table = new Table('authority.office').edit(true)

```

- **type** 表格类型：

```ts
import Table from '@/utils/table'

const table = new Table('authority.office').type('index')

```

:::tip 提示
表格有3种类型`selection` , `index`, `none`
:::

- **type** 表格类型：

```ts
import Table from '@/utils/table'

const table = new Table('authority.office').type('index')

```

:::tip 提示
表格有3种类型`selection` , `index`, `none`
:::

- **sortable** 表格是否可以排序：

```ts
import Table from '@/utils/table'

const table = new Table('authority.office').sortable(false)

```

- **classes** 自定义表格class属性：

```ts
import Table from '@/utils/table'

const table = new Table('authority.office').classes('class-name')
const table = new Table('authority.office').classes(['class-name1', 'class-name2'])

```

- **operation** 表格操作：

```ts
import Table from '@/utils/table'
import Operation from '@utils/common/operation'

const table = new Table('authority.office').operation(new Operation())

```

:::tip 提示
通常在多级表格种使用，场景不多。大部分情况使用List种的Operation已经足够了。Operation详情，可参考[Operation](../functions/./operation)
:::



## 表格原生相关的方法

:::tip 提示
可参考elementui种表格的属性，可参考[element-ui文档](https://element.eleme.cn/#/zh-CN/component/table#table-attributes)
:::

- **selectable** 是否可以选择：

```ts
import Table from '@/utils/table'

function selectable(row: any, index: number) {
  return true
}

const table = new Table('authority.office').selectable(selectable)

```

- **rowClassName** 自定义行class属性：

```ts
import Table from '@/utils/table'

function rowClassName(row: any, index: number) {
  return 'custom-class-name'
}

const table = new Table('authority.office').rowClassName(rowClassName)

```

## 表格Column相关的方法

- **add** 添加一列：

```ts
import Table from '@/utils/table'

const table = new Table('authority.office').add('column')

```

- **get** 切换到一列：

```ts
import Table from '@/utils/table'

const table = new Table('authority.office').get('column')

```

- **lib** 从通用列种复制一列：

```ts
import Table from '@/utils/table'

const table = new Table('authority.office').lib('column')

```

- **label** 设置列的标题：

```ts
import Table from '@/utils/table'

const table = new Table('authority.office').add('column').label('label')

```

- **width** 设置列的最小宽度：

```ts
import Table from '@/utils/table'

const table = new Table('authority.office').add('column').width(160)

```

- **fixedWidth** 设置列的固定宽度：

```ts
import Table from '@/utils/table'

const table = new Table('authority.office').add('column').fixedWidth(160)

```

- **tooltip** 设置列超出不显示：

```ts
import Table from '@/utils/table'

const table = new Table('authority.office').add('column').tooltip()

```

- **format** 格式化列的内容：

```ts
import Table from '@/utils/table'

function format(data: any) {
  return data.row.name
}

const table = new Table('authority.office').add('column').format(format)

```

- **date** 日期格式化列的内容，默认格式化格式`yyyy-MM-dd`：

```ts
import Table from '@/utils/table'

const table = new Table('authority.office').add('column').date()
const table = new Table('authority.office').add('column').date('yyyy-MM-dd')

```

- **name** 展示本行的另一个字段：

```ts
import Table from '@/utils/table'

const table = new Table('authority.office').add('column').name('columnName')

```

- **withName** 以编码-名称的形式展示字段：

```ts
import Table from '@/utils/table'

const table = new Table('authority.office').add('column').withName('columnName')

```

- **html** 以html的形式显示：

```ts
import Table from '@/utils/table'

function html(data: any) {
  return `<span>${data.value}</span>`
}

const table = new Table('authority.office').add('column').html(html)

```

- **component** 以组件的形式显示：

```ts
import Table from '@/utils/table'

const table = new Table('authority.office').add('column').component(Component)

```

- **op** 以枚举值的形式显示：

```ts
import Table from '@/utils/table'

const table = new Table('authority.office').add('column').op('key')

```

- **sort** 当前行的排序方式：

```ts
import Table from '@/utils/table'

const table = new Table('authority.office').add('column').sort()
const table = new Table('authority.office').add('column').sort(false)
const table = new Table('authority.office').add('column').sort('custom')

```

- **link** 链接，需要配合detail使用：

```ts
import Table from '@/utils/table'

const table = new Table('authority.office').add('column').link()

```

- **editor** 可编辑的组件：

```ts
import Table from '@/utils/table'

const table = new Table('authority.office').add('column').editor()
const table = new Table('authority.office').add('column').editor({ component: 'el-input' })
const table = new Table('authority.office').add('column').editor({ component: Component })

```

- **setColumn** 设置原生列属性：

```ts
import Table from '@/utils/table'

const table = new Table('authority.office').add('column').setColumn('fixed', 'right')

```

:::tip 提示
可参考elementui种表格的属性，可参考[element-ui文档](https://element.eleme.cn/#/zh-CN/component/table#table-column-attributes)
:::

- **show** 是否显示列：

```ts
import Table from '@/utils/table'

function show(data: any) {
  return true
}

const table = new Table('authority.office').add('column').show(false)
const table = new Table('authority.office').add('column').show(show)

```