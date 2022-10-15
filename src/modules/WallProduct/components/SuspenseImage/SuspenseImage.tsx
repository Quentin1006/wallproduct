export const SuspenseImg = ({ src, ...rest }: any) => {
  new Promise<void>((resolve) => {
    const img = new Image();
    img.onload = () => {
      resolve();
    };
  });
  return <img alt="" src={src} {...rest} />;
};
