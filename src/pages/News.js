import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import GitHubIcon from '@material-ui/icons/GitHub';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import Header from './Header';
import MainFeaturedPost from './MainFeaturedPost';
import FeaturedPost from './FeaturedPost';
import Main from './Main';
import Sidebar from './Sidebar';
import Footer from './Footer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Divider from '@material-ui/core/Divider';
import Hidden from '@material-ui/core/Hidden';
import NewsService from '../Services/NewsService';
import './style.css';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
  },
  mainGrid: {
    marginTop: theme.spacing(3),
  },
}));

 

class News extends Component {
  constructor(props) {
    super(props)
    this.state = {
      apiKey: "0d13285ae62e4d78b8bec7d6591fabb2",
      featuredPosts : [] ,
      mainFeaturedPosts:[]
    }
  }

componentDidMount = async () => {
    const { match } = this.props
    const q = match.params?.id
  const { apiKey } = this.state
  await this.getNews({ 
    apiKey,
    q,
    sortBy:"popularity"
  })
}
getNews = async (data) => {
  let list = []
  try {
    const res = await NewsService.everything(data)
    if (res.status == "ok") {
      list = res.data
      // console.log(list)
    }
  } catch (err) {

  } finally {
    this.setState({
      loading: false,
      featuredPosts: list,
      mainFeaturedPosts: list[0]
    })
  }
}

render() {
    const { featuredPosts, mainFeaturedPosts } = this.state
  
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header title="TechLifeDiary News"/>
        <Grid  container spacing={2}>
        
          <Grid item xs={12} md={12}>
            <MainFeaturedPost post={mainFeaturedPosts} />
              <Grid container spacing={4}>
                {featuredPosts.map((post) => (
                  <FeaturedPost key={post.title} post={post} />
                ))}
              </Grid>
          </Grid>

         

        </Grid>
         
         
        
      </Container>
      <Footer title="TechLifeDiary News" description="" />
    </React.Fragment>
  );
}
}
export default (withStyles(useStyles, { withTheme: true })(News))