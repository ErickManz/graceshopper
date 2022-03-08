import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getMemes } from '../store/memesReducer';
import { Link } from 'react-router-dom';
import { me } from '../store';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import Typography from '@mui/material/Typography';

function UnlistedMemes() {
  const memes = useSelector((state) => state.memes);
  const user = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(me());
    dispatch(getMemes());
  }, []);

  return (
    <>
      {user.roleId !== 1 ? (
        <div>ACCESS DENIED</div>
      ) : (
        <Grid container spacing="6">
          {memes.map((meme) => {
            if (meme.status === 'unlisted')
              return (
                <Grid item xs={3} key={meme.id}>
                  <Card
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      margin: '5px',
                    }}
                  >
                    <CardActionArea component={Link} to={`/memes/${meme.id}`}>
                      <CardMedia
                        component="img"
                        height="200px"
                        image={meme.imageUrl}
                      />
                    </CardActionArea>
                    <CardContent>
                      <Typography variant="subtitle1">{meme.name}</Typography>
                      <Typography variant="subtitle1">
                        Currently Unavailable
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              );
          })}
        </Grid>
      )}
    </>
  );
}

export default UnlistedMemes;
