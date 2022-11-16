## PC水印组件
  - 在插槽使用
  - 禁止控制台篡改水印
  - 可挂在body任意层
  - 建议全部写成行内样式, 方可预防水印篡改
- ```html
    // 使用方式
    <create-watermark>
        <div style="display: flex; align-items: center; justify-content: center; height: 80px; line-height: 80px; padding: 80px; color: #000; font-size: 18px; box-sizing: content-box;">
            <span>水印测试</span>
        </div>
    </create-watermark>
  ```
