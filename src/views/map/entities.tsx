import React from "react";

function Positions({entities}: { entities: EntitiesPayload }) {
  const entitiesArray: NewPosition[] = [];

  for (const kind in entities) {

    for (const id in entities[kind]) {
      const entity = entities[kind][id];
      entitiesArray.push({
        kind,
        id,
        x: entity.x,
        y: entity.y,
        heading: entity.heading,
        t: entity.t
      });
    }
  }

  return <>
    {entitiesArray.map((position) => {
      return <mesh position={[position.x, 0, position.y]} key={position.kind + position.id}>
        <boxGeometry attach="geometry" args={[1, 1, 1]}/>
        <meshStandardMaterial color={position.kind === 'vehicle' ? 'red' : 'blue'}/>
      </mesh>
    })}
  </>
}

export default Positions;
