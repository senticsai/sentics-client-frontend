// ** MUI Imports
import {MapComponent} from "../../views/map";
import {useEffect, useState} from "react";

const Map = () => {
  const [positions, setPositions] = useState<EntitiesPayload>({
    human: {},
    vehicle: {}
  });

  useEffect(() => {
    // TODO use react-hooks-sse
    const evtSource = new EventSource("http://localhost:3000/live", {withCredentials: true});
    evtSource.onmessage = function (e) {
      setPositions(JSON.parse(e.data));
    }
  }, [])


  return (
    <>
      <style global jsx>{`
        .layout-page-content {
          width: 100% !important;
          max-width: 100% !important;
          padding: 0 !important;
          position: relative !important;
        }

        .layout-page-content > div {
          width: 100% !important;
          max-width: 100% !important;
          padding: 0 !important;
          position: absolute !important;
          top: 0 !important;
          left: 0 !important;
          height: 100% !important;
          min-height: 1000px;
        }
      `}</style>
      <MapComponent positions={positions}/>
    </>
  )
}

export default Map
