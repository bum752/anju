import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValueLoadable } from 'recoil';
import { storeSiderComponentCollapseState } from '../state/componentState';
import { selectedStoreState, storesState } from '../state/storeState';
import { store } from '../types/store';

const { kakao } = window;

interface IMap {
  height: number;
}

const Map = ({ height }: IMap) => {
  const [map, setMap] = useState<any>();
  const [markers, setMarkers] = useState<any[]>([]);
  const stores = useRecoilValueLoadable(storesState);
  const [, setSelectedStore] = useRecoilState(selectedStoreState);
  const [, setStoreComponentCollapse] = useRecoilState(storeSiderComponentCollapseState);

  useEffect(() => {
    if (!map && kakao) {
      kakao.maps.load(() => {
        const mapContainer = document.getElementById('map');
        const option = {
          center: new kakao.maps.LatLng(37.561201, 127.038542),
          level: 5,
        };
        const map = new kakao.maps.Map(mapContainer, option);

        setMap(map);

        kakao.maps.event.addListener(map, 'click', function () {
          setSelectedStore(null);
          setStoreComponentCollapse(true);
          markers.forEach((marker) => {
            marker.setMap(null);
          });
        });
      });
    }
  }, []);

  useEffect(() => {
    stores.state === 'hasValue' &&
      map &&
      stores.contents.forEach((store: store) => {
        const { latitude, longitude } = store;
        const markerPosition = new kakao.maps.LatLng(latitude, longitude);
        const marker = new kakao.maps.Marker({
          position: markerPosition,
          clickable: true,
        });
        setMarkers(markers.concat(marker));
        marker.setMap(map);
        kakao.maps.event.addListener(marker, 'click', function () {
          setSelectedStore(store);
          setStoreComponentCollapse(false);
        });
      });
  }, [map, stores]);

  return <>{kakao ? <div id="map" style={{ width: '100%', height: `${height}px` }} /> : '지원하지 않습니다.'}</>;
};

export default Map;
