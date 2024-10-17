const saveHachsOnStore = async (hachs = []) => {
  try {
    const pageId = await generateImageHash(image.src);
    console.log({ pageId });
    if (hachs.length > 0) {
      localStorage.setItem(`hachs_${pageId}`, JSON.stringify(hachs));
    } else {
      removeHachFromStore(pageId);
    }
  } catch (error) {
    console.log(error);
  }
};

const getHachsFromStore = (pageId) => {
  const storedHachuras = localStorage.getItem(`hachs_${pageId}`);
  if (storedHachuras) {
    return storedHachuras;
  }
};

const removeHachFromStore = (pageId) => {
  localStorage.removeItem(`hachs_${pageId}`);
};
