// ** Icon imports
import HomeOutline from 'mdi-material-ui/HomeOutline'
import MapMarkerOutline from "mdi-material-ui/MapMarkerOutline";
import ChartLine from "mdi-material-ui/ChartLine";

// ** Type import
import { HorizontalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): HorizontalNavItemsType => {
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
