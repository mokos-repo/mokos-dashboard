import React, { useState } from 'react'
import { useInput } from "../../hooks/inputHooks";
import { FormContainer } from './styles';

const CreateHotspot = () => {
    const { value: hotspot_handle, bind: bindHotspotHandle } = useInput("");
    const { value: title, bind: bindTitle } = useInput("");
    const { value: description, bind: bindDescription } = useInput("");
    const { value: is_new, bind: bindIsNew } = useInput(true);
    const { value: is_featured, bind: bindIsFeatured } = useInput(false);
    const { value: opening_hour, bind: bindOpeningHour } = useInput("");
    const { value: closing_hour, bind: bindClosingHour } = useInput("");
    const [tags, setTag_number] = useState(0)


    return (
        <div>
            <h2>Create Hotspot</h2>
            <FormContainer>
                <input placeholder = "Hotspot Handle" {...bindHotspotHandle} />
                <input placeholder = "Title" {...bindTitle} />
                <input placeholder = "Description" {...bindDescription} />
                <div>
                    <p>Is New</p>
                    <input placeholder = "New" type="radio" name = "new" checked={is_new} {...bindIsNew} value={true}/>
                    <label>True</label>
                    <input placeholder = "New" type="radio" name = "new" checked={!is_new} value={false}/>
                    <label>False</label>
                </div>
                <div>
                    <p>Is Featured</p>
                    
                    <input placeholder = "New" type="radio" name = "featured" checked={is_featured} {...bindIsFeatured} value={true}/>
                    <label>True</label>

                    <input placeholder = "New" type="radio" name = "featured" checked={!is_featured} {...bindIsFeatured} value={false}/>
                    <label>False</label>
                </div>
                <div style={{display: 'flex', flexDirection: 'row', width: '100%'}}>
                    <input placeholder = "Opening Hour"/>
                    <input placeholder = "Closing hour"/>
                </div>
                <div>
                    <p>Location</p>
                    <input placeholder = "Longitude"/>
                    <input placeholder = "Latitude" />
                    <input placeholder = "Place description"/>
                </div>

                <div>
                    <p>Other</p>
                    <input placeholder = "Tag"/>
                    {}
                    <button>Add Tag</button>
                </div>

            </FormContainer>
        </div>
    )
}

export default CreateHotspot
