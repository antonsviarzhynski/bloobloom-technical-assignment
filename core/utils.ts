import { uuid } from "vue-uuid";

export function throttle(func: Function, ms: number): () => any {
  let isThrottled = false;
  let savedArgs: any;
  let savedThis: any;

  return function wrapper(this: any) {
    if (isThrottled) {
      savedArgs = arguments;
      savedThis = this;
      return;
    }

    func.apply(this, arguments);
    isThrottled = true;

    setTimeout(function () {
      isThrottled = false;
      if (savedArgs) {
        wrapper.apply(savedThis, savedArgs);
        savedArgs = savedThis = null;
      }
    }, ms);
  };
}

export function generateId() {
  return uuid.v4();
}
