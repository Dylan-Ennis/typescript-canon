import Button from 'react-bootstrap/Button'
import React from "react"



const Create = () => {
    return (
        <div>
            <div>
                <h1>Create</h1>
            </div>
            <form>
                <label>
                    Name:
                    <input type="text" name="name"/>
                </label>
                <input type="submit" value="Submit" />
            </form>
            <Button variant="dark">View Continuation</Button>
            <Button variant="dark">Create Continuation</Button>
        </div>
    )
}

export default Create;