export const getProjectSocialImage = (project) => {
  const image = project.thumbnail || project.heroImage;
  return image && /\.(?:png|jpe?g|webp)$/i.test(image)
    ? image
    : '/assets/og-image.png';
};
