import type { DirectiveBinding } from '@/types';

function onVisibleChange(el: HTMLElement, binding: DirectiveBinding) {
  const value: boolean = binding.value;
  el.style.visibility = value ? 'visible' : 'hidden';
}

const visible = {
  inserted: onVisibleChange,
  update: onVisibleChange,
  componentUpdated: onVisibleChange
}

export default visible;