type Callback = (...args: any[]) => void;
interface Events {
  [key: string]: (...args: any) => void;
}

export class EventEmitter<T extends Events> {
  private listeners = new Map<keyof T, Set<Callback>>();

  public on = <E extends keyof T>(event: E, callback: T[E]) => {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }

    this.listeners.get(event)?.add(callback);
    return () => {
      this.listeners.get(event)?.delete(callback);
    };
  };

  public emit = <E extends keyof T>(event: E, ...args: Parameters<T[E]>) => {
    this.listeners.get(event)?.forEach(cb => cb.apply(this, args));
  };
}
