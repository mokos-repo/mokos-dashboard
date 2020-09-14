import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useInput } from "../../hooks/inputHooks";
import { FormContainer } from '../CreateHotspot/styles';
import { withApollo } from 'react-apollo';
import { UPDATE_HOTSPOT, GET_HOTSPOT } from './queries'

const UpdateHotspot = ({ client, match }) => {
    const [errorMessage, setErrorMessage] = useState("")
    const { value: unique_name, bind: bindHotspotHandle, setValue: setUniqueName } = useInput("");
    const { value: title, bind: bindTitle, setValue: setTitle } = useInput("");
    const { value: description, bind: bindDescription, setValue: setDescription } = useInput("");
    const { value: is_new, setValue: setIsNew } = useInput(true);
    const { value: is_featured, setValue: setIsFeatured } = useInput(false);
    const { value: opening_hour_id, setValue: setOpeningHourId } = useInput("")
    const { value: opening_hour, bind: bindOpeningHour, setValue: setOpeningHour } = useInput("");
    const { value: closing_hour, bind: bindClosingHour, setValue: setClosingHour } = useInput("");
    const { value: locationId, setValue: setLocationId } = useInput("");
    const { value: longitude, bind: bindLongitude, setValue: setLongitude } = useInput("");
    const { value: latitude, bind: bindLatitude, setValue: setLatitiude } = useInput("");
    const { value: locationDesc, bind: bindLocationDesc, setValue: setLocationDesc } = useInput("");
    const [isLoading, setIsLoading] = useState(false)
    const [file, setFile] = useState("")
    const [tags, setTags] = useState([{}])
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

    const UpdateHotspot = async () => {
        setErrorMessage("")
        setIsLoading(true)
        if(validate()){
            console.log(process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET)
            const variables = {
                id: match.params.pk,
                unique_name: unique_name,
                title: title,
                description: description,
                is_new: is_new,
                is_featured: is_featured,
                opening_hourID: opening_hour_id,
                opening_hour: opening_hour,
                closing_hour: closing_hour,
                longitude: longitude,
                latitude: latitude,
                locationDesc: locationDesc,
                locationID: locationId,
                tags: tags
            }
            if(imageId === "" && file!==""){
                const formdata = new FormData()
                formdata.append('file', file)
                formdata.append('upload_preset', process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET)
                const response = await axios.post(
                    `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`,
                    formdata
                )
                imageId = response.data.public_id
                variables.logo = imageId
            }

            await client.mutate({
                mutation: UPDATE_HOTSPOT,
                variables
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
    
    const setHotspot = (hotspot) => {
        filterTags(hotspot)
        setUniqueName(hotspot.unique_name)
        setOpeningHour(hotspot.opening_hour.opening_hour)
        setClosingHour(hotspot.opening_hour.closing_hour)
        setTitle(hotspot.title)
        setLongitude(hotspot.address.longitude)
        setLatitiude(hotspot.address.latitude)
        setDescription(hotspot.description)
        setLocationDesc(hotspot.address.description)
        setLocationId(hotspot.address.id)
        setOpeningHourId(hotspot.opening_hour.id)
        setTags(hotspot.tags)
        setIsFeatured(hotspot.is_featured)
        setIsNew(hotspot.is_new)
    }

    // handle click event of the Add Tag button
    const handleAddClick = () => {
        setTags([...tags, { title: "" }]);
    };

    const filterTags = (hotspot) => {
        hotspot.tags.forEach(element => {
            delete element['__typename']
        });
    }

    useEffect(() => {
        setIsLoading(true)
        client.query({
            query: GET_HOTSPOT,
            variables:{
                id: match.params.pk
            }
        }).then(res => {
            const hotspot = res.data.getHotspot
            setHotspot(hotspot)
            setIsLoading(false)
        }).catch(error=>{
            console.log(error)
            setIsLoading(false)
        })
    }, [client, match])

    return (
        <div>
            <h2>Edit Hotspot</h2>
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
                        onClick={isLoading?()=>{}:UpdateHotspot}>{isLoading? "Loading...":"Update"}</button>
            </FormContainer>
        </div>
    )
}

export default withApollo(UpdateHotspot)
