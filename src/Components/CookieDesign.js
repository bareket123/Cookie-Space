import React, {useEffect, useRef, useState} from 'react';
import '../Styles/LoginStyle.scss';
import '../Styles/CookieDesign.css'
import { Stage, Layer, Circle } from 'react-konva';
import axios from "axios";
import cookiesColor from "./CookiesColor";
import Recipe from "./Recipe";
import recipes from "./Recipes";
import UserMenu from "./UserMenu";


const CookieDesign = () => {
    const [cookieColor , setCookieColor] = useState(cookiesColor.goldBrown);
    const [cookieChipColor , setCookieChipColor] = useState(cookiesColor.chocolateChip);
    const [foundRecipes,setFoundRecipes]=useState([]);
    const [isSubmit,setIsSubmit]=useState(false);
    const chipsCordi=[
        {x:window.innerWidth / 2,y:window.innerHeight / 3.99},
        {x:window.innerWidth / 1.66,y:window.innerHeight / 2.5},
        {x:window.innerWidth / 2.599,y:window.innerHeight / 2.6},
        {x:window.innerWidth / 2.1111,y:window.innerHeight / 2.11111},
        {x:window.innerWidth / 2.5,y:window.innerHeight / 1.7},
        {x:window.innerWidth / 1.888,y:window.innerHeight / 1.66},
        {x:window.innerWidth / 1.666,y:window.innerHeight / 1.39},
        {x:window.innerWidth / 2.229,y:window.innerHeight / 1.339},
        {x:window.innerWidth / 2.01199,y:window.innerHeight / 1.22},

    ]

    function submitButton() {

        let query = "";
        switch (cookieChipColor){
            case cookiesColor.chocolateChip:
                query="chocolate+chip+cookies"
                break;

        }
        const api_key = "e3c693562dee4f888713ca5113daf302";
        const cuisine = "United States";

        const url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${api_key}&query=${query}&cuisine=${cuisine}&addRecipeInformation=true`;

        axios.get(url).then((response) => {
          setFoundRecipes(response.data.results);

        });
        setIsSubmit(true)
    }




    return (
        <div style={{  height:" 100%",
            position:"relative",
            top:"70px",
            justifyContent: "center",
            alignItems: "center",
            }}>

        {
            !isSubmit?
                <div style={{position:"relative",bottom:"80px"}}>
                    <Stage width={window.innerWidth} height={window.innerHeight}>
                        <Layer>
                            <Circle
                                x={window.innerWidth / 2}
                                y={window.innerHeight / 2}
                                radius={200}
                                fill={cookieColor}
                                shadowColor="rgba(0,0,0,0.5)" // Add shadow for depth
                                shadowBlur={10}
                                shadowOffsetX={5}
                                shadowOffsetY={5}
                            />
                            {
                                chipsCordi.map((chip, index) => {
                                // Calculate distance between chip and center of big circle and make sure all chip is inside the cookie
                                const distance = Math.sqrt(
                                    Math.pow(chip.x - window.innerWidth / 2, 2) +
                                    Math.pow(chip.y - window.innerHeight / 2, 2)
                                );
                                const angle = Math.atan2(chip.y - window.innerHeight / 2, chip.x - window.innerWidth / 2);
                                if (distance > 170) {
                                    chip.x = (window.innerWidth / 2) + 170 * Math.cos(angle);
                                    chip.y = (window.innerHeight / 2) + 170 * Math.sin(angle);
                                }
                                return (
                                    <Circle
                                        key={index}
                                        x={chip.x}
                                        y={chip.y}
                                        radius={30}
                                        fill={cookieChipColor}
                                        shadowColor="rgba(0,0,0,0.5)" // Add shadow for depth
                                        shadowBlur={5}
                                        shadowOffsetX={2}
                                        shadowOffsetY={2}
                                        draggable // Make circles draggable for demonstration
                                        onDragMove={(e) => console.log('Dragging', e)}
                                    />
                                );
                            })}
                        </Layer>
                    </Stage>
                    <button onClick={submitButton} className={"modal-button"} style={{position: 'fixed', bottom: '50px', right: '10px'}}>Submit
                    </button>
                    <label style={{top: '200px', textDecoration: 'underline'}}>Type Of Dough:
                        <label style={{top: '230px'}}>
                            <input type="radio" name="dough" style={{marginRight: "10px"}}
                                   onChange={() => setCookieColor(cookiesColor.goldBrown)} checked={cookieColor===cookiesColor.goldBrown} />
                            Golden Brown
                        </label>
                        <label style={{top: '260px'}}>
                            <input type="radio" name="dough" style={{marginRight: "10px"}}
                                   onChange={() => setCookieColor(cookiesColor.darkBrown)} />
                            Dark Brown
                        </label>
                        <label style={{top: '290px'}}>
                            <input type="radio" name="dough" style={{marginRight: "10px"}}
                                   onChange={() => setCookieColor(cookiesColor.redVelvet)} />
                            Red Velvet
                        </label>
                    </label>

                    <label style={{top: '340px', textDecoration: 'underline'}}>Extras:
                        <label style={{top: '370px'}}>
                            <input type="radio" name="extras" style={{marginRight: "10px"}}
                                   onChange={() => setCookieChipColor(cookiesColor.chocolateChip)} checked={cookieChipColor===cookiesColor.chocolateChip} />Dark Chocolate
                        </label>
                        <label style={{top: '400px'}}>
                            <input type="radio" name="extras" style={{marginRight: "10px"}}
                                   onChange={() => setCookieChipColor(cookiesColor.milkChocolateChip)} />Milk Chocolate
                        </label>
                        <label style={{top: '430px'}}>
                            <input type="radio" name="extras" style={{marginRight: "10px"}}
                                   onChange={() => setCookieChipColor(cookiesColor.whiteChocolate)} />White Chocolate
                        </label>
                        <label style={{top: '460px'}}>
                            <input type="radio" name="extras" style={{marginRight: "10px"}}
                                   onChange={() => setCookieChipColor(cookiesColor.saltCaramelChip)} />Salt Caramel
                        </label>
                    </label>


                </div>
                :
                <div className={"recipes-view"} style={{width:window.innerWidth+10}} >
                    <div style={{ display: "flex", flexDirection: "row", whiteSpace: "nowrap" }} className={"scroll-container"}>
                        {foundRecipes.map((recipe, index) => (
                            <Recipe key={index} title={recipe.title} image={recipe.image} url={recipe.sourceUrl} />
                        ))}
                    </div>

                </div>

        }
            {
                isSubmit&&
                <button className={"go-back"} onClick={()=>{setIsSubmit(!isSubmit)}}>Go Back</button>
            }

        </div>
    );
};

export default CookieDesign;


