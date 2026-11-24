// Homepage entry: V3 has its own page composition, V1/V2 share main.js.
import { isV3 } from './js/ui-version.js';
import './v3/v3.css';

if (isV3) import('./v3/home.js');
else import('./main.js');
