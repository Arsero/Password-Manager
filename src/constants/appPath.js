import { remote } from 'electron';
import path from 'path';
import { db } from './constants';

export const appPath = path.join(remote.app.getPath('userData'), db);
