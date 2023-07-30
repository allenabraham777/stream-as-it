import React from "react";
import { useRecoilState } from "recoil";
import constants, { resolutionList } from "constants/settings";
import settingsState from "store/settingsState";

type Props = {};

const Resolution = (props: Props) => {
  const [settings, setSettings] = useRecoilState(settingsState);

  const selectResolution = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value;
    const resolution =
      constants.resolutions[id as keyof typeof constants.resolutions];
    setSettings({
      ...settings,
      resolution: {
        id,
        width: resolution.width,
        height: resolution.height,
      },
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-lg font-medium text-left">Video Resolution</h1>
      <div className="flex gap-4 relative">
        <select value={settings.resolution.id} onChange={selectResolution}>
          {resolutionList.map(({ id, label }) => (
            <option key={id} value={id}>
              {label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Resolution;
