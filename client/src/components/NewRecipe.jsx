import React, { useState } from "react";
import "../styles/newrecipe.css";
import { BASE_URL } from "../helper/ref.js";
import Axios from "axios";

const NewRecipe = () => {
  const [recipeName, setRecipeName] = useState("");
  const [recipeIngradients, setRecipeIngradients] = useState("");
  const [recipeDescription, setRecipeDescription] = useState("");
  const [recipeNote, setRecipeNote] = useState("");
  const [loading, setLoading] = useState("");

  // image
  const [imageId, setImageId] = useState("");
  const [imageUploading, setImageUploading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (imageId) {
      setLoading(true);
      let user = JSON.parse(localStorage.getItem("userInfo"));

      Axios.post(`${BASE_URL}/recipe/addNewRecipe`, {
        userId: user.userId,
        recipeName: recipeName,
        recipeIngradients: recipeIngradients,
        recipeDescription: recipeDescription,
        recipeNote: recipeNote,
        recipeImageId: imageId,
      })
        .then((response) => {
          console.log("saved successfully");
          setLoading(false);
        })
        .catch((err) => {
          console.log("not saved due to: ", err);
          setLoading(false);
        });
    } else {
      alert("Please add the image");
    }
  }

  const onSelectFile = (event) => {
    const data = new FormData();
    data.append("testImage", event.target.files[0]);
    setImageUploading(true);
    Axios.post(`${BASE_URL}/image/imageUpload`, data)
      .then((response) => {
        setImageId(response.data._id);
        setImageUploading(false);
      })
      .catch((err) => {
        console.log(err);
        setImageUploading(false);
      });
  };

  return (
    <div className="newRecipe">
      {loading ? (
        <div className="loader-container">
          <div className="spinner"></div>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="left">
            <div> Add a recipe </div>
            <input
              placeholder="Name of the recipe"
              value={recipeName}
              onChange={(e) => setRecipeName(e.target.value)}
              required
            />
            <textarea
              placeholder="Ingradients"
              rows={6}
              value={recipeIngradients}
              onChange={(e) => setRecipeIngradients(e.target.value)}
              required
            ></textarea>
            <textarea
              placeholder="Recipe description and how to make it"
              rows={10}
              value={recipeDescription}
              onChange={(e) => setRecipeDescription(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="right">
            <div
              className={
                imageId ? "fileContainer fileUploaded" : "fileContainer"
              }
            >
              <div>
                {imageId && !imageUploading
                  ? "Image Uploaded!"
                  : imageUploading
                  ? "Uploading..."
                  : "Add Recipe Image"}
              </div>
              <input type="file" name="file" onChange={onSelectFile} />
              <i>(.jpg, .jpeg, or .png)</i>
            </div>
            <textarea
              placeholder="Note"
              rows={6}
              value={recipeNote}
              onChange={(e) => setRecipeNote(e.target.value)}
            ></textarea>
            <button type="submit">Save</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default NewRecipe;
