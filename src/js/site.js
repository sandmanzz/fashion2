// Localized site content: import this (not content.js) from pages/components.
import raw from './content.js';
import { localize } from './i18n.js';

export default localize(raw);
