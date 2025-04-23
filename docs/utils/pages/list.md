# List
List是生成列表页面的构造函数，大部分列表页面都可以通过使用List来编写

## List的作用

:::tip 提示
一个列表页面被拆分成了多个固定的模块和功能，每个模块和功能都对应这List原型上的方法，通过调用模块中的方法可以修改整个页面
:::

## 搜索相关的方法

- **api** 用来获取页面数据的方法，参数是返回Promise的回调函数，回调函数接收搜索参数作为参数：

```ts
function api(this: any, params: any) {
  return Promise.resolve({
    total: 100,
    records: []
  })
}

new List().api(api)

```

:::tip 提示
回调函数的`this`会指向list页面的vue组件实例。`Promise`的返回值需要包含`total`和`records`
:::


- **url** 是特殊的api方法，只需要传入`url`,`baseURL`,`params`即可，其中`baseURL`和`params`是可选参数：

```ts
new List().url('/test/url')

new List().url('/test/url', process.env.VUE_APP_PURCHASE_API)

new List().url('/test/url', process.env.VUE_APP_PURCHASE_API, { stauts: ['1', '2'] })

new List().url(
  '/test/url',
  process.env.VUE_APP_PURCHASE_API,
  (params: any) => ({ stauts: params.stauts.join(',') })
)
```

:::tip 提示
第三个参数`params`是可选参数，可以参数一个对象作为请求的参数，也可以传入一个返回对象的函数，函数接受默认人搜索值作为参数，可以用来格式化接口传参
:::


- **autoSearch** 接受一个布尔值作为参数，判断是否页面加载直接发送请求获取数据，默认是直接发送

```ts
new List().autoSearch(false)
```

- **sort** 可以设置列表获取数据的默认排序方式，接受一个对象作为参数：

```ts
new List().sort({ field: 'createTime', order: 'asc' })
```

:::tip 提示
`field`属性决定排序的字段名称, `order`属性可选值是`asc`和`desc`，代表升序和降序
:::

## 模块功能相关的方法

- **table** 接受一个`Table`实例，用来描述列表页面的表格，详情可参考[Table](../modules/table)模块

```ts
const table = new Table()

new List().table(table)
```

- **search** 接受一个`Search`实例，用来描述列表页面的高级搜索，详情可参考[Search](../modules/search)模块

```ts
const search = new Search()

new List().search(search)
```

- **tabs** 接受一个`Tabs`实例，用来描述列表页面的Tabs标签，详情可参考[Tabs](../modules/tabs)模块

```ts
const tabs = new Tabs()

new List().tabs(tabs)
```

- **detail** 接受一个`Detail`实例，用来描述列表页面的详情，详情可参考[Detail](../modules/detail)模块

```ts
const detail = new Detail()

new List().detail(detail)
```

- **jurisdiction** 接受一个`Jurisdiction`实例，用来描述列表页面的操作按钮，详情可参考[Jurisdiction](../modules/jurisdiction)模块

```ts
const jurisdiction = new Jurisdiction()

new List().jurisdiction(jurisdiction)
```

- **pagination** 接受一个`Pagination`实例，用来描述列表页面的分页器，详情可参考[Pagination](../modules/pagination)模块

```ts
const pagination = new Pagination()

new List().pagination(pagination)
```


## 其他的方法

- **operation** 接受一个`Operation`实例，用来描述列表页面中的表格操作，详情可参考[Operation](../functions/operation)功能
```ts
const operation = new Operation()

new List().operation(operation)
```

- **keepSelection** 用来控制列表换页时，是否保存选中的选项，默认不保存

```ts
new List().keepSelection(true)
```

- **selectProp** 当`keepSelection`选择`true`时，可以选择判断数据的相同的依据，默认是通过索引来判断的

```ts
new List().selectProp('id')
```

- **end** 输入列表页面的vue组件

```ts
new List().end()
```

:::tip 提示
List实例中的方法默认返回当前实例，支持链式调用，但是`end`返回vue组件，所以适合在最后调用。
:::
