import React, { useState } from 'react'
import { useInput } from "../../hooks/inputHooks";
import { FormContainer } from './styles';

const CreateHotspot = () => {
    const { value: hotspot_handle, bind: bindHotspotHandle } = useInput("");
    const { value: title, bind: bindTitle } = useInput("");
    const { value: description, bind: bindDescription } = useInput("");
    const { value: is_new, setValue: setIsNew } = useInput(true);
    const { value: is_featured, setValue: setIsFeatured } = useInput(false);
    const { value: opening_hour, bind: bindOpeningHour } = useInput("");
    const { value: closing_hour, bind: bindClosingHour } = useInput("");
    const [tags, setTags] = useState([{title: ""}])

    // handle input change
    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...tags];
        list[index][name] = value;
        setTags(list);
    };
    
    // handle click event of the Remove button
    const handleRemoveClick = index => {
        const list = [...tags];
        list.splice(index, 1);
        setTags(list);
    };
    
    // handle click event of the Add button
    const handleAddClick = () => {
        setTags([...tags, { title: "" }]);
    };

    console.log(hotspot_handle, title, description, opening_hour, closing_hour, is_new, is_featured, tags)

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
                    <input placeholder = "Longitude"/>
                    <input placeholder = "Latitude" />
                    <input placeholder = "Place description"/>
                </div>

                <div>
                    <p>Other</p>
                    {tags.map((x, i) => (
                        <div>
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

            </FormContainer>
        </div>
    )
}

export default CreateHotspot
