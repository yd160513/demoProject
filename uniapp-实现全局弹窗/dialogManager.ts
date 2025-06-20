import { createApp, h, ref } from 'vue'
import TestDialog from './testDialog.vue'

// 存储所有弹窗实例
const dialogInstances = ref<any[]>([])

// 创建并显示新弹窗
export const showDialog = (options?: { config?: any, data?: any }) => {

  const config = options?.config || {}
  const data = options?.data || {}

  // 创建唯一ID
  const dialogId = `dialog_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`
  
  // 创建容器元素
  const container = document.createElement('div')
  container.id = dialogId
  document.body.appendChild(container)
  
  // 创建应用实例
  const app = createApp({
    setup() {
      const visible = ref(true)
      const dialogConfig = ref({ ...config })
      const dialogData = ref({ ...data })
      
      // 关闭弹窗时卸载
      const closeHandler = () => {
        visible.value = false
        setTimeout(() => {
          // 延迟卸载确保动画完成
          app.unmount()
          document.body.removeChild(container)
          
          // 从实例列表中移除
          const index = dialogInstances.value.findIndex(d => d.id === dialogId)
          if (index !== -1) {
            dialogInstances.value.splice(index, 1)
          }
        }, 300)
      }
      
      return () => h(TestDialog, {
        visible: visible.value,
        config: dialogConfig.value,
        data: dialogData.value,
        onClose: closeHandler
      })
    }
  })
  
  // 挂载应用
  app.mount(container)
  
  // 存储实例引用
  dialogInstances.value.push({
    id: dialogId,
    container,
    app,
    close: () => app.unmount()
  })
  
  return dialogId
}

// 关闭所有弹窗
export const closeAllDialogs = () => {
  dialogInstances.value.forEach(instance => {
    instance.app.unmount()
    document.body.removeChild(instance.container)
  })
  dialogInstances.value = []
}
