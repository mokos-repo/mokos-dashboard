import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import axios from 'axios'
import { withApollo } from 'react-apollo'
import { GET_ALL_HOTSPOTS } from '../ListHotspot/queries';
import { FormContainer } from '../CreateMenuItem/styles';
import { useInput } from '../../hooks/inputHooks';
import { EDIT_MENU_ITEM, GET_MENU_ITEM } from './queries';

const EditMenuItem = ({ client, match }) => {

    const [hotspots, setHotspots] = useState([]);
    const [hotspot, setHotspot] = useState();
    const [id, setId] = useState("")
    const { value: title, setValue: setTitle , bind: bindTitle } = useInput("");
    const { value: description, setValue: setDescription , bind: bindDescription } = useInput("");
    const { value: price, bind: bindPrice, setValue: setPrice } = useInput("0");
    const [tags, setTags] = useState([{title: ""}]);
    const [ingredients, setIngredients] = useState([{title: ""}])
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("")
    const [file, setFile] = useState("");
    let imageId = ""

    const validate = () => {
        let tagDict = {}
        tags.forEach(tag => {
            if(tag.title === "") {
                setErrorMessage("Empty tag")
                return false
            } else if (tagDict[tag.title] === 0) {
                setErrorMessage("Duplicated tag")
                return false
            }
            tagDict[tag.title] = 0
        });

        if (hotspot === null || hotspot === undefined) {
            setErrorMessage("* Hotspot can't be empty")
            return false
        }
        else if (title === null || title === "") {
            setErrorMessage("* Title Can't be empty")
            return false
        }
        else if (price === "0") {
            setErrorMessage("* Price can't be 0")
            return false
        }
        return true
    }

    const EditMenuItem = async () => {
        if(validate()){
            console.log(process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET)
            setIsLoading(true)
            const variables = {
                id,
                hotspot: hotspot.value,
                title,
                price,
                tags,
                ingredients,
                description,
            }

            if(imageId === "" && file !== ""){
                const formdata = new FormData()
                formdata.append('file', file)
                formdata.append('upload_preset', process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET)
                const response = await axios.post(
                    `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`,
                    formdata
                )
                imageId = response.data.public_id
                variables.image = imageId
            }
            
            await client.mutate({
                mutation: EDIT_MENU_ITEM,
                variables
            })
            setIsLoading(false)
        }
    }

    // handle input change
    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...tags];
        list[index][name] = value;
        setTags(list);
    };

    const handleIngInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...ingredients]
        list[index][name] = value
        setIngredients(list)
    }
    
    // handle click event of the Remove Tag button
    const handleRemoveClick = index => {
        const list = [...tags];
        list.splice(index, 1);
        setTags(list);
    };
    
    // handle click event of the Add Tag button
    const handleAddClick = () => {
        setTags([...tags, { title: "" }]);
    };

    const handleIngredientAddClick = () => {
        setIngredients([...ingredients, { title: "" }])
    }

    const handleIngredientRemoveClick = index => {
        const list = [...ingredients];
        list.splice(index, 1);
        setIngredients(list);
    };

    const filterTags = (menuItem) => {
        menuItem.tags.forEach(element => {
            delete element['__typename']
        });
        menuItem.ingredients.forEach(element => {
            delete element['__typename']
        })
    }

    useEffect(() =>{ 
        client.query({
            query: GET_ALL_HOTSPOTS,
        }).then(res =>{
            let hotspots = []
            res.data.getAllHotspots.results.forEach(hotspot => {
                hotspots.push({label: hotspot.title, value: hotspot.id})
            })
            setHotspots(hotspots)
        }).catch(error => {
            console.log(error)
        })

        client.query({
            query: GET_MENU_ITEM,
            variables: {
                id: match.params.pk
            }
        }).then(res => {
            console.log(res.data.getMenuItem)
            setHotspot({value: res.data.getMenuItem.hotspot.id, label: res.data.getMenuItem.hotspot.title})
            setTitle(res.data.getMenuItem.title)
            setDescription(res.data.getMenuItem.description)
            setPrice(res.data.getMenuItem.price)
            filterTags(res.data.getMenuItem)
            setTags(res.data.getMenuItem.tags)
            setIngredients(res.data.getMenuItem.ingredients)
            setId(res.data.getMenuItem.id)

            console.log(res.data.getMenuItem)
        })

    }, [client, match]);

    return (
        <FormContainer>
            <Select ref={React.createRef()} options={hotspots} onChange={(e)=>setHotspot(e.value)} value={hotspot}/>
            <input placeholder="title" {...bindTitle}/>
            <input placeholder="price" {...bindPrice}/>
            <input placeholder="descrption" {...bindDescription}/>

            <h3>Tags Section</h3>
            {tags.map((x, i) => (
                        <div key={i}>
                            <input
                                name="title"
                                placeholder="Tag"
                                value={x.title || ''}
                                onChange={e => handleInputChange(e, i)} />

                            {tags.length !== 1 && <button
                                className="mr10"
                                onClick={() => handleRemoveClick(i)}>Remove</button>}
                            {tags.length - 1 === i && <button onClick={handleAddClick}>Add</button>}
                        </div>
                    ))}

            
            <h3>Ingredients Section</h3>
            {ingredients.map((x, i) => (
                        <div key={i}>
                            <input
                                name="title"
                                placeholder="Ingredient"
                                value={x.title || ''}
                                onChange={e => handleIngInputChange(e, i)} />

                            {ingredients.length !== 1 && <button
                                className="mr10"
                                onClick={() => handleIngredientRemoveClick(i)}>Remove</button>}
                            {ingredients.length - 1 === i && <button onClick={handleIngredientAddClick}>Add</button>}
                        </div>
                    ))}
            <input placeholder="image" type="file" onChange={(e) => setFile(e.target.files[0])}/>
            <p style={{color: "red"}}>{errorMessage}</p>
            <button style={{background: "#0d324d", 
                                height: "40px", color: "white", 
                                fontSize: "20px", width: "max-content",
                                padding: "5px 30px", margin: "20px 0px 0px 0px",
                                border: "0px", borderRadius: "5px"}}
                        disabled={isLoading}
                        onClick={EditMenuItem}>{isLoading? "Loading...":"Update"}</button>
        </FormContainer>
    )
}

export default withApollo(EditMenuItem)
