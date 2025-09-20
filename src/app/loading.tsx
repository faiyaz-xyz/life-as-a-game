import { BoxesLoader } from "react-awesome-loaders";

export const BoxesLoaderComponent = () => {
  return (
    <>
      <BoxesLoader
        style={{ marginBottom: "20px" }}
        desktopSize={"128px"}
        mobileSize={"80px"}
      />
    </>
  );
};
