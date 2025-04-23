# Dialog
Dialog是生成Promise形式的弹窗的构造函数

## 通用方法

- **title** 设置弹框标题：

```ts
import Dialog from '@utils/common/dialog'

const dialog = new Dialog('authority.office')
  .title('title')

```

- **confirmButtonText** 设置确认按钮文字：

```ts
import Dialog from '@utils/common/dialog'

const dialog = new Dialog('authority.office')
  .confirmButtonText('confirmButtonText')

```

- **cancelButtonText** 设置取消按钮文字：

```ts
import Dialog from '@utils/common/dialog'

const dialog = new Dialog('authority.office')
  .cancelButtonText('cancelButtonText')

```

- **isfooter** 是否需要底部：

```ts
import Dialog from '@utils/common/dialog'

const dialog = new Dialog('authority.office')
  .isfooter(false)

```

- **footer** 自定义底部：

```ts
import Dialog from '@utils/common/dialog'

const dialog = new Dialog('authority.office')
  .footer((h, vm) => h('div'))

```

- **dialog** 设置弹框属性：

```ts
import Dialog from '@utils/common/dialog'

const dialog = new Dialog('authority.office')
  .dialog({ width: '500px' })

```

:::tip 提示
可参考elementui弹框的属性，可参考[element-ui文档](https://element.eleme.cn/#/zh-CN/component/dialog#attributes)
:::

- **component** 设置弹框内置的组件：

```ts
import Dialog from '@utils/common/dialog'

const dialog = new Dialog('authority.office')
  .component(Component)

```

## 表单全局配置

- **type** 表单的类型，有`add`和`modify`两种类型，代表新增页面和修改页面：

```ts
new Form().type('modify')
```
