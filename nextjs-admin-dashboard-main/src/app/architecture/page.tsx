import { Suspense } from "react";


export default async function Home() {

  const diagramUrl = 'https://viewer.diagrams.net/?tags=%7B%7D&lightbox=1&highlight=0000ff&edit=_blank&layers=1&nav=1&title=HouseEstimatorDiagram.drawio&dark=auto#Uhttps%3A%2F%2Fdrive.google.com%2Fuc%3Fid%3D1w3yqR-ZbzEQkSqeZIR4iH6bBp753NOa3%26export%3Ddownload'
  return (
    <>
      <Suspense fallback={null}>
          <div style={{ width: '100%', height: '100vh', padding: '20px' }}>
              <h1>House Estimator Architecture</h1>
              <iframe
                  frameBorder="0"
                  style={{ width: '100%', height: '600px', border: 'none' }}
                  src={diagramUrl}
                  title="draw.io diagram"
              ></iframe>
          </div>
          );
      </Suspense>
    </>
  );
}
