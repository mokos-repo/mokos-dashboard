import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import axios from 'axios'
import { withApollo } from 'react-apollo'
import { GET_ALL_HOTSPOTS } from '../ListHotspot/queries';
import { FormContainer } from './styles';
import { useInput } from '../../hooks/inputHooks';
import { CREATE_MENU_ITEM } from './queries';

const CreateMenu = ({ client }) => {

    const [hotspots, setHotspots] = useState([]);
    const [hotspot, setHotspot] = useState();
    const { value: title, bind: bindTitle } = useInput("");
    const { value: description, bind: bindDescription } = useInput("");
    const { value: price, bind: bindPrice } = useInput("0");
    const [tags, setTags] = useState([{title: ""}]);
    const [isLoading, setIsLoading] = useState(false);
    const [file, setFile] = useState("");
    let imageId = ""

    const CreateMenuItem = async () => {
        console.log(process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET)
        setIsLoading(true)
        if(imageId === "" && file !== ""){
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
            mutation: CREATE_MENU_ITEM,
            variables: {
                hotspot,
                title,
                price,
                tags,
                description,
                image: imageId
            }
        })
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
    }, [client]);

    return (
        <FormContainer>
            <Select ref={React.createRef()} options={hotspots} onChange={(e)=>setHotspot(e.value)} defaultValue={hotspots[0]}/>
            <input placeholder="title" {...bindTitle}/>
            <input placeholder="price" {...bindPrice}/>
            <input placeholder="descrption" {...bindDescription}/>

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

            <input placeholder="image" type="file" onChange={(e) => setFile(e.target.files[0])}/>

            <button style={{background: "#0d324d", 
                                height: "40px", color: "white", 
                                fontSize: "20px", width: "max-content",
                                padding: "5px 30px", margin: "20px 0px 0px 0px",
                                border: "0px", borderRadius: "5px"}}
                        onClick={CreateMenuItem}>{isLoading? "Loading...":"Create"}</button>
        </FormContainer>
    )
}

export default withApollo(CreateMenu)
