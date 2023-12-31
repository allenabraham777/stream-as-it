import { atom } from 'recoil';
import constants from 'constants/settings';

const settingsState = atom({
    key: 'settingsState',
    default: {
        resolution: {
            id: 'FHD',
            width: constants.resolutions.FHD.width,
            height: constants.resolutions.FHD.height
        }
    } as ISettings
});

export default settingsState;
