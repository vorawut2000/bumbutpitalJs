import DashboardIcon from '@material-ui/icons/Dashboard';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import LoyaltyIcon from '@material-ui/icons/Loyalty';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import ForumIcon from '@material-ui/icons/Forum';

export const depressionSeverity = [
  {
    severity: "Minimal Depression",
  },
  {
    severity: "Mild Depression",
  },
  {
    severity: "Moderate Depression",
  },
  {
    severity: "Moderately severe Depression",
  },
  {
    severity: "Severe Depression",
  },
];

export const menuItems = [
  {
    text: "Dashboard",
    icon: <DashboardIcon color="primary" />,
    path: "/home",
  },
  {
    text: "Manage Contents",
    icon: <LibraryBooksIcon color="primary" />,
    path: "/contents",
  },
  {
    text: "Manage Videos",
    icon: <VideoLibraryIcon color="primary" />,
    path: "/videos",
  },
  {
    text: "Manage Users",
    icon: <PeopleAltIcon color="primary" />,
    path: "/users",
  },
  {
    text: "Manage Promotions",
    icon: <LoyaltyIcon color="primary" />,
    path: "/promotions",
  },
  {
    text: "Manage Hospitals",
    icon: <LocalHospitalIcon color="primary" />,
    path: "/hospitals",
  },
  {
    text: "Forum",
    icon: <ForumIcon color="primary" />,
    path: "/forum",
  },
];
