const getElementId = ({ id, type }: { id: string; type: string }) => {
  const element = document.getElementById(id);

  switch (type) {
    case "canvas":
      return element as HTMLCanvasElement;
    default:
      break;
  }
};

export default getElementId;
