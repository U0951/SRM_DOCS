# Form
Form是生成表单页面的构造函数，大部分表单页面都可以通过使用Form来编写

## Form的作用

:::tip 提示
一个表单页面被拆分成了多个固定的模块和功能，每个模块和功能都对应这Form原型上的方法，通过调用模块中的方法可以修改整个页面
:::

## 表单全局配置

- **type** 表单的类型，有`add`和`modify`两种类型，代表新增页面和修改页面：

```ts
new Form().type('modify')
```

:::tip 提示
新增页面和修改页面大部分内容相同但是也部分是有区别的，所以要区分开
:::

- **setSpan** 设置表单栅格的分配，参数是1-24的数字，是栅格布局的方式，默认是8：

```ts
new Form().setSpan(12)
```

- **btns** 设置表单的按钮，默认会根据新增和修改两个不同的页面展示不同按钮：

```ts
new Form().btns[{
  type: 'primary',
  text: 'i18n.text',
  handle: () => { console.log('btn click') }
}]
```

:::tip 提示
`handle`函数中的`this`指向，指向表单页面实例
:::

## 接口相关的方法

- **url** 表单默认提交数据的接口：

```ts
new Form().url('/test/submit', process.env.VUE_APP_PURCHASE_API)

new Form().url(async function(this: any, data: any) {
  await http({
    url: '/test/submit',
    baseURL: process.env.VUE_APP_PURCHASE_API,
    data: data,
    loading: true
  })
  this.$router.back()
})
```

:::tip 提示
当参事是一个函数时，函数中`this`指向当前页面实例
:::

- **dataUrl** 获取表单页面的数据：

```ts
new Form().dataUrl('/test/getData', process.env.VUE_APP_PURCHASE_API)

new Form().dataUrl('/test/getData', process.env.VUE_APP_PURCHASE_API, data => ({ ...data, no: data.id }))

new Form().dataUrl(async function(this: any, vm: any) {
  const data = await http({
    url: '/test/getData',
    baseURL: process.env.VUE_APP_PURCHASE_API,
    data: { id: vm.$route.params.id },
    loading: true
  })
  vm.setData(data)
  vm.createForm()
})
```

:::tip 提示
当使用`dataUrl`时，`Form`的`type`会自动改变成`modify`。如果参数时一个函数，函数的`this`指向会指向当前实例，同时也会把当前实例作为参数传入到函数中。实例中的`setData`方法会给表单赋值，也可以直接修改实例中的`data`属性。使用`createForm`方法创建表单
:::

## 表单分组相关的方法

- **addGroup** 添加一个表单组：

```ts
new Form().addGroup('i18n.goupTitle')
```

- **title** 设置表单组的标题：

```ts
new Form().title('i18n.goupTitle')
```

## 表单组件相关的方法

- **add** 添加一个表单组件：

```ts
new Form().add('prop')
```

:::tip 提示
使用`add`方法会添加一个表单组件，并且把添加的组件设置为当前组件。默认会把传入的字符串当作`prop`，并且把前缀拼接上`prop`作为`label`
:::

- **prop** 修改当前组件的prop值：

```ts
new Form().add('prop').prop('prop')
```

:::tip 提示
`prop`会作为表单数据的key值
:::

- **label** 修改当前组件的label值：

```ts
new Form().add('prop').label('i18n.label')
```

:::tip 提示
如果传入的值中带有`.`会直接使用传入值，如果没有点就会拼接上前缀
:::

- **mapKey** 修改当前组件的唯一标识，默认是组件的prop值：

```ts
new Form().add('prop').mapKey('key')
```

- **default** 给当前组件设置默认值：

```ts
new Form().add('prop').default('defaultValue')
```

- **placeholder** 设置当前组件的占位符：

```ts
new Form().add('prop').placeholder('placeholder')
```

- **col** 设置当前组件的栅格中的占位，默认是`setSpan`中设置的占位值，`setSpan`未设置时默认是8：

```ts
new Form().add('prop').col(12)

new Form().add('prop').col({ span: 7, push: 1 })
```

:::tip 提示
可以传入一个对象，对象属性可以参照[elementui](https://element.eleme.cn/#/zh-CN/component/layout#col-attributes)中的栅格`col`属性
:::

- **br** 强制换行：

```ts
new Form().add('prop').br()
```

- **show** 是否显示当前组件：

```ts
new Form().add('prop').show(false)

new Form().add('prop').show(vm => vm.type === 1)
```

- **component** 设置当前组件使用的vue组件：

```ts
new Form().add('prop').component('el-input-number')

new Form().add('prop').component({
  component: 'el-input-number',
  min: 0
})

new Form().add('prop').component({
  component: { render(h) { return h('el-input') }},
  disabled: true
})
```

- **select** 当前组件使用远程搜索选择框，是一个特殊的`component`方法：

```ts
new Form().add('prop').select('/select/getOptions')

new Form().add('prop').select(new Select())
```

:::tip 提示
远程搜索的详情配置可以参考[Select](../functions/select)功能模块
:::

- **op** 当前组件使用一个枚举值的选择框，是一个特殊的`component`方法：

```ts
new Form().add('prop').op('options')

new Form().add('prop').op(new Options())
```

:::tip 提示
枚举值的详情配置可以参考[Options](../functions/options)功能模块
:::

- **tinymce** 当前组件使用文本编辑器，是一个特殊的`component`方法：

```ts
new Form().add('prop').label('').bindFormItem('label-width', '0').tinymce()
```

- **formItemComponent** 设置当前组件，会覆盖规则组件：

```ts
new Form().formItemComponent('prop', 'el-form-item')
```

- **table** 当前组件使用table表格，是一个特殊的`formItemComponent`：

```ts
new Form().table('listProp', new TableSelect())
```

:::tip 提示
`TableSelect`的详情配置可以参考[TableSelect](../modules/tableSelect)功能模块
:::

- **rules** 给当前组件添加校验规则：

```ts
new Form().add('prop').rules({ required: true, message: 'i18n.requiredTip', trigger: 'blur' })

new Form().add('prop').rules([
  { required: true, message: 'i18n.requiredTip', trigger: 'blur' },
  { max: 10, message: 'i18n.maxTip', trigger: 'blur' }
])
```

- **required** 给当前组件添加一条必填的校验规则，是一个特殊的`rules`：

```ts
new Form().add('prop').required()

new Form().add('prop').required('i18n.requiredTip')
```

- **listRequired** 给当前组件添加一条长度大于0的校验规则，是一个特殊的`rules`：

```ts
new Form().add('listProp').listRequired()

new Form().add('listProp').listRequired('i18n.listRequiredTip')
```

- **attrs** 给组件绑定多个属性，接受一个对象作为参数：

```ts
new Form().add('prop').attrs({ disabled: true, style: { width: '200px' }})
```

- **bind** 给组件绑定一个属性：
```ts
new Form().add('prop').bind('disabled', true).bind(length: 12)
```

- **attrsFormItem** 给`el-form-item`组件绑定多个属性，接受一个对象作为参数：

```ts
new Form().add('prop').attrsFormItem({ labelWidth: '0' })
```

- **bindFormItem** 给`el-form-item`组件绑定一个属性：

```ts
new Form().add('prop').bindFormItem('labelWidth', '0').bindFormItem('class', 'custom-class')
```

- **listeners** 给组件绑定多个事件，接受一个对象作为参数：

```ts
new Form().add('prop').listeners({ input: () => console.log('on input') })
```

:::tip 提示
绑定的回调函数接受的第一个参数是当前组件实例，原来事件的其他参数一次往后排列
:::

- **on** 给组件绑定一个事件：

```ts
new Form().add('prop').on('input', () => console.log('on input'))
```
