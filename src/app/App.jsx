import { React, useState, useEffect } from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import ListItems from './components/ListItems/ListItems';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import WeatherPage from '../pages/WeatherPage/WeatherPage';
import MapPage from '../pages/MapPage/MapPage';
import DashboardPage from '../pages/DashboardPage/DashboardPage';
import AboutMelEasyTravelPage from '../pages/AboutMelEasyTravelPage/AboutMelEasyTravelPage';
import { getOneCallWeatherData } from '../utils/OpenWeatherApi/OpenWeatherApi';
// eslint-disable-next-line no-unused-vars
import { getTwitterData } from '../utils/twitterDataApi';
import logo from'../assets/images/logo.png';
import { listItem } from './components/ListItemTable/ListItemTable';
import './App.scss';
import initialWeatherData from './initialWeatherData.json';

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const mdTheme = createTheme();

const App = () => {
  const [open, setOpen] = useState(true);
  const [page, setPage] = useState('Dashboard');

  const updatePageName = () => {
    // eslint-disable-next-line no-undef
    const urlElements = window.location.href.split('/')
    listItem.forEach((element) => {
      if (element.link === urlElements[urlElements.length - 1]) {
        setPage(element.name);
        return;
      }
    })
  }

  const [weatherData, setWeatherData] = useState(initialWeatherData);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  useEffect(() => {
    const getCurrentCityWeather = async () => {
      const {status, data} = await getOneCallWeatherData();
      if (status === 200) {
        setWeatherData(data)
      }
    }
    getCurrentCityWeather();
  }, []);

  useEffect(() => {
    updatePageName();
  }, []);

  return ( 
    <ThemeProvider theme={ mdTheme }>
      <Box sx={ { display: 'flex' } }>
        <CssBaseline />

        <BrowserRouter>
          <AppBar position="absolute" open={ open }>
            <Toolbar
              sx={ {
              pr: '24px', // keep right padding when drawer closed
              } }
          >
              <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={ toggleDrawer }
                sx={ {
                marginRight: '36px',
                ...(open && { display: 'none' }),
                } }
            >
                <MenuIcon />
              </IconButton>

              <Typography
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
                sx={ { flexGrow: 1 } }
            >
                {page}
              </Typography>

              <IconButton color="inherit">
                <Badge badgeContent={ 4 } color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            </Toolbar>
          </AppBar>

          <Drawer variant="permanent" open={ open }>
            <Toolbar
              sx={ {
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
              } }
            >
              <img  src={ logo } style={ {width: "75%", height: "64px"} } alt="logo"/>

              <IconButton onClick={ toggleDrawer }>
                <ChevronLeftIcon />
              </IconButton>
            </Toolbar>

            <Divider />
            <ListItems page={ page } setPage={ setPage } />
          </Drawer>

          <Box
            component="main"
            className="main-container"
            sx={ {
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: `calc(100vh - 64px)`,
            overflow: 'auto',
            } }
        >
            <Routes>
              <Route exact path="/" element={ <DashboardPage weatherData={ weatherData } setPage={ setPage } /> } />
              <Route path="/dashboard" element={ <DashboardPage weatherData={ weatherData } setPage={ setPage }/> } />
              <Route path="/weather" element={ <WeatherPage weatherData={ weatherData } /> } />
              <Route path="/map" element={ <MapPage /> } />
              <Route path="/about-mel-easy-travel" element={ <AboutMelEasyTravelPage /> } />
            </Routes>
          </Box>
        </BrowserRouter>
      </Box>
    </ThemeProvider>
  );
}

export default App;
