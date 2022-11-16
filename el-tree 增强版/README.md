## el-tree 增强版

- 基础 element 封装
- 提供了 $attrs / $listeners
- 可筛选指定层级数据
- 文字超出宽度变成 ... , 鼠标经过显示 el-tooltip
```html
  // 使用方式
  <tree-super :data='deptOptions' :props='defaultProps' default-expand-all @node-click="handleNodeClick" ref="tree" :filter-node-method="filterNode" node-key="id" :expand-on-click-node='false' />
```
