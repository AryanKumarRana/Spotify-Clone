import { openUploadWidget } from "../../utils/CloudinaryService";
import { cloudinary_upload_preset } from "../../config";
const CloudinaryUpload = ({setUrl, setName}) => {
  const uploadImageWidget = () => {
    let myUploadWidget = openUploadWidget(
      {
        cloudName: "duu2eiwup",
        uploadPreset: cloudinary_upload_preset,
        sources: ["local"],
        //  sources: ["local", "url", "camera"]
      },
      function (error, result) {
        if (!error && result.event === "success") {
          setUrl(result.info.secure_url);
          setName(result.info.original_filename);
          // props.onImageUpload(result.info.public_id);
        } else {
          if(error){
            console.log(error);
          }
        }
      }
    );
    myUploadWidget.open();
  };

  return (
    <button className="bg-white text-black rounded-full p-4 font-semibold" onClick={uploadImageWidget}>
      Select Track
    </button>
  );
};

export default CloudinaryUpload;
