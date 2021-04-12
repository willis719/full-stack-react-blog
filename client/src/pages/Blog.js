import { Button, Grid, TextField } from '@material-ui/core'
import React, { useState } from 'react'
import { useHistory } from 'react-router'

export default function Blog() {
    const [form, setForm] = useState({
        title: '',
        content: ''
    })
    const history = useHistory()

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value    // equivalent to username = "steve"
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        // TODO: send data to backend
        fetch('/api/v1/posts', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                title: form.title,
                content: form.content,
            })
        })
        .then((res) => res.json())
        .then((data) => {
            if (data.error) {
                alert(data.error);
            } else {
                history.push('/')
            }
        });
    }

    return (
        <div>
            <h1>Blog</h1>
            <form onSubmit={handleSubmit}>
                <Grid container>
                    <Grid item xs={12}>
                        <TextField required label="Title" fullWidth type="text" onChange={handleChange} value={form.title} name="title" />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField required label="content" fullWidth multiline type="content" onChange={handleChange} value={form.content} name="content" />
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" color="primary">Submit</Button>
                    </Grid>
                </Grid>
            </form>
        </div>
    )
}
