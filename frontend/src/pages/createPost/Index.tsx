import { Autocomplete, Box, Button, Container, Grid, Checkbox, TextField } from "@mui/material";
import { FormEvent, useState } from "react"
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const CreatePostPage = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const post = {
      title,
      image,
      body,
      tags,
    }

    console.log(post);
  }

  return (
    <Container component="main" maxWidth="xs">
      <h1>Create Post</h1>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              required
              name="title"
              fullWidth
              id="title"
              label="Título"
              autoFocus
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              name="image"
              fullWidth
              id="image"
              label="Imagem"
              autoFocus
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="outlined-textarea"
              fullWidth
              label="Escreva seu post aqui!"
              placeholder="Placeholder"
              multiline
              rows={6}
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />
            <Grid item xs={12}>
              <Autocomplete
                fullWidth
                multiple
                id="tags"
                options={tags}
                disableCloseOnSelect
                getOptionLabel={(tags) => tags.title}
                renderOption={(props, tags, { selected }) => (
                  <li {...props}>
                    <Checkbox
                      icon={icon}
                      checkedIcon={checkedIcon}
                      style={{ marginRight: 8 }}
                      checked={selected}
                    />
                    {tags.title}
                  </li>
                )}
                renderInput={(params) => (
                  <TextField {...params} label="Tags" />
                )}
                sx={{ marginTop: "15px" }}
              />
            </Grid>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Postar!
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}

const tags = [
  { title: "viagem" },
  { title: "futebol" },
  { title: "esporte" },
  { title: "computador" },
  { title: "jogos" },
  { title: "escola" },
]
export default CreatePostPage