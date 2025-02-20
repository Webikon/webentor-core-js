import collapse from '@alpinejs/collapse';
import Alpine from 'alpinejs';

// Register default plugins
Alpine.plugin(collapse);

// Make Alpine globally available
window.Alpine = Alpine;

document.addEventListener('DOMContentLoaded', () => {
  Alpine.start();
});

export { Alpine };
