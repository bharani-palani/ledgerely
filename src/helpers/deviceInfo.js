import { Capacitor } from "@capacitor/core";
import { v4 as uuidv4 } from "uuid";

const DEVICE_ID_STORAGE_KEY = "ledgerely_device_id";

export const getDeviceInfo = () => {
  let deviceId = localStorage.getItem(DEVICE_ID_STORAGE_KEY);
  const deviceIdWasMissing = !deviceId;
  if (!deviceId) {
    deviceId = uuidv4();
    localStorage.setItem(DEVICE_ID_STORAGE_KEY, deviceId);
  }

  return {
    deviceId,
    deviceIdWasMissing,
    platform: Capacitor.getPlatform(),
  };
};
