import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';

export default function SkeletonCard() {
  return (
    <Paper elevation={2}>
      <Box sx={{ position: 'relative', pt: '75%' }}>
        <Skeleton
          variant='rectangular'
          width='100%'
          height='100%'
          sx={{ position: 'absolute', inset: 0 }}
        />
      </Box>
      <Box sx={{ p: '10px' }}>
        <Typography variant='body1' gutterBottom noWrap>
          <Skeleton variant='text' />
        </Typography>
        <Typography variant='body2' noWrap gutterBottom>
          <Skeleton variant='text' />
        </Typography>
        <Typography variant='h6'>
          <Skeleton variant='text' />
        </Typography>
        <Typography variant='h6'>
          <Skeleton variant='text' />
        </Typography>
        <Skeleton variant='rectangular' height='50px' />
        <Typography gutterBottom>
          <Skeleton variant='text' />
        </Typography>
      </Box>
    </Paper>
  );
}
