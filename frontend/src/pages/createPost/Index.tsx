import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import { Autocomplete, Box, Button, Checkbox, Container, Grid, TextField } from "@mui/material";
import { FormEvent, useContext, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../../contexts/authContext";
import { useInsertDocument } from "../../hooks/useInsertDocument";
import { IPost, ITags } from "../../interfaces/Post";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const CreatePostPage = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState<ITags[]>([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const { user } = useContext(AuthContext);
  const { insertDocument, response } = useInsertDocument("posts");

  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      new URL(image);
    } catch (err) {
      setError("A imagem precisa ser uma URL!")
      return
    }

    const post: IPost = {
      title,
      image,
      body,
      tags,
      uid: user?.uid,
      username: user?.displayName,
    }

    insertDocument(post);
    setSuccess(true);
    setTitle("");
    setImage("");
    setBody("");
    setTags([]);

    navigate("/", { state: success })
  }

  useEffect(() => {
    setError("")
  }, [title, image, body])

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
              value={image}
              onChange={(e) => setImage(e.target.value)}
              error={!!error && error.includes("imagem")}
              helperText={error}
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
                multiple
                id="tags"
                options={tagsList}
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
                value={tags}
                onChange={(e, value) => setTags(value)}
                fullWidth
                aria-required
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

const tagsList = [
  { id: 1, title: "viagem" },
  { id: 2, title: "futebol" },
  { id: 3, title: "esporte" },
  { id: 4, title: "computador" },
  { id: 5, title: "jogos" },
  { id: 6, title: "escola" },
]
export default CreatePostPage