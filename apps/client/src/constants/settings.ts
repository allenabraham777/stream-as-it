const constants = {
  resolutions: {
    "4K": {
      label: "4K: 3840 X 2160",
      width: 3820,
      height: 2160,
    },
    "2K": {
      label: "2K: 2560 X 1440",
      width: 3820,
      height: 2160,
    },
    FHD: {
      label: "Full HD: 1920 X 1080",
      width: 1920,
      height: 1080,
    },
    HD: {
      label: "HD: 1280 X 720",
      width: 1280,
      height: 720,
    },
  },
};

export const resolutionList = Object.keys(constants.resolutions).map((key) => ({
  id: key,
  ...constants.resolutions[key as keyof typeof constants.resolutions],
}));

export default constants;
