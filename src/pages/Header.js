import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import InputBase from '@material-ui/core/InputBase';
import Paper from '@material-ui/core/Paper';
const useStyles = makeStyles((theme) => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbarTitle: {
    flex: 1,
  },
  toolbarSecondary: {
    justifyContent: 'space-between',
    overflowX: 'auto',
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
  },
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'right',
    width: 350,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
}));
const sections = [
  { title: 'Technology', url: '/technology' },
  { title: 'Design', url: '/design' },
  { title: 'Culture', url: '/culture' },
  { title: 'Business', url: '/business' },
  { title: 'Politics', url: '/politics' },
  { title: 'Opinion', url: '/opinion' },
  { title: 'Science', url: '/science' },
  { title: 'Health', url: '/health' },
  { title: 'Style', url: '/style' },
  { title: 'Travel', url: '/travel' },
];
export default function Header(props) {
  const classes = useStyles();
  const { title } = props;

  return (
    <React.Fragment>
      <Toolbar className={classes.toolbar}>
        {/* <Button size="small">Subscribe</Button> */}
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="left"
          noWrap
          className={classes.toolbarTitle}
        >
          {title}
        </Typography>
        <Paper component="form" className={classes.root}>
        <IconButton type="submit" className={classes.iconButton} aria-label="search">
          <SearchIcon />
        </IconButton>
        <InputBase
          className={classes.input}
          placeholder="Search news"
          inputProps={{ 'aria-label': 'search news' }}
          name="search"
        />
        </Paper>
        
      </Toolbar>
      <Toolbar component="nav" variant="dense" className={classes.toolbarSecondary}>
        {sections.map((section) => (
          <Link
            color="inherit"
            noWrap
            key={section.title}
            variant="body2"
            href={section.url}
            className={classes.toolbarLink}
          >
            {section.title}
          </Link>
        ))}
      </Toolbar>
    </React.Fragment>
  );
}

Header.propTypes = {
  sections: PropTypes.array,
  title: PropTypes.string,
};
