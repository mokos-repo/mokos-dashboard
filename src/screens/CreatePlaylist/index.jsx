import React, { useState } from 'react'
import { FormContainer } from './styles'
import { withApollo } from 'react-apollo'
import { CREATE_PLAYLIST } from './queries'
import { useInput } from '../../hooks/inputHooks'

const CreatePlaylist = ({ client }) => {
    const [isLoading, setisLoading] = useState(false)
    const { value: title, bind: bindTitle } = useInput("");

    const CreatePlaylist = async () => {
        setisLoading(true)
        console.log(title);
        
        await client.mutate({
            mutation: CREATE_PLAYLIST,
            variables: {
                title
            }
        })
        setisLoading(false)
    }

    return (
        <div>
            <FormContainer>
                Create Playlist
                <input placeholder = "Playlist title" {...bindTitle} />
                <button style={{background: "#0d324d", 
                                height: "40px", color: "white", 
                                fontSize: "20px", width: "max-content",
                                padding: "5px 30px", margin: "20px 0px 0px 0px",
                                border: "0px", borderRadius: "5px"}}
                        onClick={CreatePlaylist}>{isLoading? "Loading...":"Create"}</button>
            </FormContainer>
        </div>
    )
}

export default withApollo(CreatePlaylist)
