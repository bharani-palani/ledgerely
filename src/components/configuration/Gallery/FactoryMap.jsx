import AwsFactory from "./AwsFactory";
import MediaFactory from "./MediaFactory";

const FactoryMap = (storageType, appData) => {
  switch (storageType) {
    case "AWSS3":
      return {
        library: new AwsFactory(appData),
      };
    case "SELF":
      return {
        library: new MediaFactory(appData),
      };
    case "https:":
      return {
        library: new MediaFactory(appData),
      };
    default:
      return {
        library: null,
      };
  }
};

export { FactoryMap };
