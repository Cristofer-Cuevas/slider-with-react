import React, { useRef, useState, useEffect } from "react";
import "./Carousel.css";

const Carousel = (props) => {
  const imagesContainer = useRef(null);

  let cont = 0;

  const handleClick = (e) => {
    console.log(e);

    if (e.target.className === "before-arrow") {
      --cont;
    } else if (e.target.className === "next-arrow") {
      ++cont;
    }

    // if cont is grater or equal to all of the images length we restart cont to 0 which makes us to go to the first image, If  cont === -1 we set cont equal to all of the images length -1 which makes us go to the last image (to see this in action go to the first image and then click the before arrow)
    if (cont >= allImages.length) {
      cont = 0;
    } else if (cont < 0) {
      cont = allImages.length - 1;
    }

    imagesContainer.current.style.left = "-" + cont + "00%";

    //Every time we click an arrow we delete the class and then we add it and this make the transition get played. We set a time out to have a delay adding the class otherwise we won't have enough time to delete it and therefore we would be adding the class before it gets deleted and we need to delete it so we can add it and then the transition get played.

    imagesContainer.current.children[cont].children[0].classList.toggle("infoContainerTransition", false);

    setTimeout(() => {
      imagesContainer.current.children[cont].children[0].classList.toggle("infoContainerTransition", true);
    }, 100);
  };

  // BUTTONS LOGIC
  let allImages;

  const [currentButtonValue, setCurrentButtonValue] = useState();

  //Depending on what button the user has clicked we filter the images for the button value (the button value is the country name) and display those images
  const filteredImages = props.images.filter((img) => {
    if (currentButtonValue === "All") {
      return (allImages = props.images);
    } else {
      return img.country.includes(currentButtonValue);
    }
  });

  //Setting the value of allImages depending on the value of filteredImages and then passing allImages variable to the Images component
  if (filteredImages.length > 0) {
    allImages = filteredImages;
  } else {
    allImages = props.images;
  }

  const handleButtonValue = (buttonValue) => {
    setCurrentButtonValue(buttonValue);
    // If you are in the image number 5 and then you click the canada button the app will crash showing a white screen with no content, restarting the value of CONT and telling to the imagesContainer to use that value will make  the first image of the array to display rather than the one the user was, making the white screen to desappear

    // If the user click a country button, instead of staying on the current image of that same country that the user has clicked, we restart the value of CONT to 0 and then we display the first image of each country the user has clicked
    cont = 0;
    imagesContainer.current.style.left = "-" + cont + "00%";
  };

  // This way we make for each country a single button
  let lastCountry = null;
  let buttons = [<Button key="All" buttonValue={handleButtonValue} country={"All"} />];

  props.images.forEach((img) => {
    if (lastCountry !== img.country) {
      buttons.push(<Button key={img.country} buttonValue={handleButtonValue} country={img.country} />);
    }
    lastCountry = img.country;
  });

  // As soon the entire page is available this code gets executed (that's the porpuse of useEffect)
  useEffect(() => {
    //Adding a width according to the images length
    imagesContainer.current.style.width = props.images.length + "00%";

    // As soon as the page loads the first image get his infoContainer element displayed
    imagesContainer.current.children[0].children[0].classList.add("infoContainerTransition");

    //Adding a automatically
    Array.from(imagesContainer.current.children).forEach((img) => {
      img.style.width = 100 / props.images.length + "%";
    });
  }, [imagesContainer, props, allImages]);

  return (
    <div className="carousel">
      <div className="button-container">{buttons}</div>
      <div className="arrows-container">
        <img className="before-arrow" alt="before arrow" src={props.arrows[0].beforeArrow} onClick={handleClick} />
        <img className="next-arrow" alt="next arrow" src={props.arrows[1].nextArrow} onClick={handleClick} />
      </div>
      <div ref={imagesContainer} className="imagesContainer">
        <Images images={allImages} />{" "}
      </div>
    </div>
  );
};

// IMAGES COMPONENT
const Images = (props) => {
  console.log(props);

  return (
    <>
      {props.images.map((img) => {
        return (
          <div className="imagesSubContainer">
            <div className="infoContainer">
              <p className="location">{img.location}</p>
            </div>
            <img className="images" src={img.imgUrl} alt={img.imgUrl} key={img.imgUrl} />
          </div>
        );
      })}
    </>
  );
};

// BUTTON COMPONENT
const Button = (props) => {
  const handleClick = (e) => {
    //sending the button value to the main component
    props.buttonValue(e.target.value);
  };

  return (
    <button className="countryBtn" onClick={handleClick} value={props.country}>
      {props.country}
    </button>
  );
};

export default Carousel;
