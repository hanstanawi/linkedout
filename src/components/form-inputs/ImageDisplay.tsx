type ImageDisplayProps = {
  imageSrc: string;
  imageAlt: string;
  onRemoveImage: () => void;
};

function ImageDisplay({
  imageSrc,
  imageAlt,
  onRemoveImage,
}: ImageDisplayProps) {
  return (
    <div className="flex flex-col items-center justify-center py-3">
      <img
        src={imageSrc}
        alt={imageAlt}
        className="inline-block md:h-20 h-16 md:w-20 w-16 object-cover rounded-full"
      />
      <button
        type="button"
        className="  bg-bgBlue hover:bg-bgDarkBlue text-white
rounded-sm text-[9px] font-semibold py-0.5 px-4 mt-1 flex justify-center"
        onClick={onRemoveImage}
      >
        Remove
      </button>
    </div>
  );
}

export default ImageDisplay;
