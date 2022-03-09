import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { getMemes } from '../store/memesReducer';

/**
 * COMPONENT
 */
const Home = (props) => {
  const memes = useSelector((state) => state.memes);
  const username = useSelector((state) => state.auth.username);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMemes());
  }, []);

  return (
    <div>
      <Container maxWidth="sm">
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
          sx={{ fontFamily: 'Syne' }}
        >
          Welcome, {username}
        </Typography>
      </Container>
      <div>
        <Grid container spacing="6">
          {memes.map((meme) => {
            if (
              ['Smug Pepe', 'This is Fine', 'One Does Not Simply'].includes(
                meme.name
              )
            )
              return (
                <Grid item xs={4} key={meme.id}>
                  <Card
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      margin: '5px',
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="300px"
                      image={meme.imageUrl}
                    />
                  </Card>
                </Grid>
              );
          })}
        </Grid>
      </div>
    </div>
  );
};

export default Home;
