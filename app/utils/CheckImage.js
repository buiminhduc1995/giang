const CheckImage = (name) => {
  return (/\.(gif|jpg|jpeg|tiff|png)$/i).test(name)
};

export const CheckUrl = (url) =>{
  return (/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i).test(url)
}
export default CheckImage;