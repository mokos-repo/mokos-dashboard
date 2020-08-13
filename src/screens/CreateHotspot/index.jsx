import React, { useState } from 'react'
import axios from 'axios'
import { useInput } from "../../hooks/inputHooks";
import { FormContainer } from './styles';
import { withApollo } from 'react-apollo';
import { CREATE_HOTSPOT } from './queries'

const CreateHotspot = ({ client }) => {
    const [errorMessage, setErrorMessage] = useState("")
    const { value: unique_name, bind: bindHotspotHandle } = useInput("");
    const { value: title, bind: bindTitle } = useInput("");
    const { value: description, bind: bindDescription } = useInput("");
    const { value: is_new, setValue: setIsNew } = useInput(true);
    const { value: is_featured, setValue: setIsFeatured } = useInput(false);
    const { value: opening_hour, bind: bindOpeningHour } = useInput("");
    const { value: closing_hour, bind: bindClosingHour } = useInput("");
    const { value: longitude, bind: bindLongitude } = useInput("");
    const { value: latitude, bind: bindLatitude } = useInput("");
    const { value: locationDesc, bind: bindLocationDesc } = useInput("");
    const [isLoading, setIsLoading] = useState(false)
    const [file, setFile] = useState("")
    const [tags, setTags] = useState([{title: ""}])
    let imageId = ""
    
    const validate = () => {
        // Validate tags
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
        if (opening_hour === "" || closing_hour === ""){
            setErrorMessage("Opening and Closing hour not set properly")
            return false
        }

        return true
    }

    const CreateHotspot = async () => {
        setErrorMessage("")
        setIsLoading(true)
        if(validate()){
            console.log(process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET)
            if(imageId === "" && file!==""){
                const formdata = new FormData()
                formdata.append('file', file)
                formdata.append('upload_preset', process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET)
                const response = await axios.post(
                    `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`,
                    formdata
                )
                imageId = response.data.public_id
            }
            await client.mutate({
                mutation: CREATE_HOTSPOT,
                variables: {
                    unique_name: unique_name,
                    title: title,
                    description: description,
                    is_new: is_new,
                    is_featured: is_new,
                    opening_hour: opening_hour,
                    closing_hour: closing_hour,
                    longitude: longitude,
                    latitude: latitude,
                    locationDesc: locationDesc,
                    tags: tags,
                    logo: imageId
                }
            })
        }
        setIsLoading(false)
    }

    // handle input change
    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...tags];
        list[index][name] = value;
        setTags(list);
    };
    
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

    return (
        <div>
            <h2>Create Hotspot</h2>
            <FormContainer>
                <input placeholder = "Hotspot Handle" {...bindHotspotHandle} />
                <input placeholder = "Title" {...bindTitle} />
                <input placeholder = "Description" {...bindDescription} />
                <div>
                    <p>Is New</p>
                    <input placeholder = "New" type="radio" name = "new" checked={is_new} onChange={()=>setIsNew(true)}/>
                    <label>True</label>
                    <input placeholder = "New" type="radio" name = "new" checked={!is_new} onChange={()=>setIsNew(false)}/>
                    <label>False</label>
                </div>
                <div>
                    <p>Is Featured</p>
                    
                    <input placeholder = "New" type="radio" name = "featured" checked={is_featured} onChange={()=>setIsFeatured(true)}/>
                    <label>True</label>

                    <input placeholder = "New" type="radio" name = "featured" checked={!is_featured} onChange={()=>setIsFeatured(false)}/>
                    <label>False</label>
                </div>
                <div style={{display: 'flex', flexDirection: 'row', width: '100%'}}>
                    <input placeholder = "Opening Hour" type="time" {...bindOpeningHour}/>
                    <input placeholder = "Closing hour" type="time" {...bindClosingHour}/>
                </div>
                <div>
                    <p>Location</p>
                    <input placeholder = "Longitude" {...bindLongitude}/>
                    <input placeholder = "Latitude" {...bindLatitude}/>
                    <input placeholder = "Desc" {...bindLocationDesc}/>
                    {/* <input placeholder = "Place description" /> */}
                </div>

                <div>
                    <p>Other</p>
                    {tags.map((x, i) => (
                        <div key={i}>
                            <input
                                name="title"
                                placeholder="Tag"
                                value={x.title}
                                onChange={e => handleInputChange(e, i)} />

                            {tags.length !== 1 && <button
                                className="mr10"
                                onClick={() => handleRemoveClick(i)}>Remove</button>}
                            {tags.length - 1 === i && <button onClick={handleAddClick}>Add</button>}
                        </div>
                    ))}
                </div>

                <input type="file" onChange={(e) => setFile(e.target.files[0])}/>
                
                <p>{errorMessage}</p>
                <button style={{background: "#0d324d", 
                                height: "40px", color: "white", 
                                fontSize: "20px", width: "max-content",
                                padding: "5px 30px", margin: "20px 0px 0px 0px",
                                border: "0px", borderRadius: "5px"}}
                        onClick={CreateHotspot}>{isLoading? "Loading...":"Create"}</button>
            </FormContainer>
        </div>
    )
}

export default withApollo(CreateHotspot)
