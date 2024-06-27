export const preloadImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    img.src = src;
    img.onload = () => {
      resolve(src);
    };
    img.onerror = (error) => {
      reject(error);
    };
  });
};
