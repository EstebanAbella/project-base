type Callback = (...args: any[]) => void

class NotificationService {
  private subscribers: Record<string, Callback[]> = {}

  on(event: string, callback: Callback) {
    if (!this.subscribers[event]) {
      this.subscribers[event] = []
    }
    this.subscribers[event].push(callback)
  }

  off(event: string, callback: Callback) {
    if (!this.subscribers[event]) return
    this.subscribers[event] = this.subscribers[event].filter(
      (cb) => cb !== callback
    )
  }

  emit(event: string, ...args: any[]) {
    if (!this.subscribers[event]) return
    this.subscribers[event].forEach((callback) => callback(...args))
  }
}

export default new NotificationService()
