import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

function HomePage() {
  console.log({env: process.env});
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Strava Stats
          </Typography>
          <Link color="inherit" href={`http://www.strava.com/oauth/authorize?client_id=${process.env.REACT_APP_STRAVA_STATS_CLIENT_ID}&response_type=code&redirect_uri=http://localhost:3000/exchange_token&approval_prompt=force&scope=read`}>Login</Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default HomePage;
