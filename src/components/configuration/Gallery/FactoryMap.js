import AwsFactory from "./AwsFactory";
import MediaFactory from "./MediaFactory";

const FactoryMap = (storageType, appData) => {
  switch (storageType) {
    case "AWSS3":
      return {
        library: new AwsFactory(appData),
      };
      break;
    case "SELF":
      return {
        library: new MediaFactory(appData),
      };
      break;
    case "https:":
      return {
        library: new MediaFactory(appData),
      };
      break;
    default:
      return {
        library: null,
      };
  }
};

export { FactoryMap };
