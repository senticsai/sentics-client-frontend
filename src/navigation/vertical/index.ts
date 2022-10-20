// ** Icon imports
import HomeOutline from 'mdi-material-ui/HomeOutline'


// ** Type import
import {VerticalNavItemsType} from 'src/@core/layouts/types'
import MapMarkerOutline from "mdi-material-ui/MapMarkerOutline";
import ChartLine from "mdi-material-ui/ChartLine";

const navigation = (): VerticalNavItemsType => {
  return [
    {
      icon: HomeOutline,
      title: 'Dashboard',
      path: '/dashboard'
    },
    {
      icon: MapMarkerOutline,
      title: 'Map',
      path: '/map'
    },
    {
      icon: ChartLine,
      title: 'Analytics',
      path: '/analytics'
    },
  ]
}

export default navigation
